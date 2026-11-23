/* Territory Coverage Planner v2 — static site for GitHub Pages */
'use strict';
// Revised starting map, with Kentucky and Tennessee assigned to J.
// T = blue; J = orange; TnJ = purple; split = striped Pennsylvania.
const T_START = new Set('WA OR CA NV ID MT WY UT AZ CO HI MI GA SC NC VA MD DE NJ NY DC'.split(' '));
const J_START = new Set('AK NM TX ND SD NE KS OK MN IA MO WI IL IN OH AR LA FL MS AL KY TN'.split(' '));
const SHARED_START = new Set('ME VT NH MA CT RI WV'.split(' '));
const START_SPLIT = new Set(['PA']);
// New key intentionally starts with the new reference map rather than loading
// an older browser's saved starting assignments. Older saved plans remain in
// localStorage under their original key and can be exported/imported.
const STORAGE_KEY='territory-planner-tjnj-map-2026-11-v4';
const $=id=>document.getElementById(id);
const number=n=>Math.round(n||0).toLocaleString('en-US');
const currency=n=>'$'+number(n);
const compact=n=>Math.abs(n)>=1e12?'$'+(n/1e12).toFixed(2)+'T':Math.abs(n)>=1e9?'$'+(n/1e9).toFixed(2)+'B':Math.abs(n)>=1e6?'$'+(n/1e6).toFixed(1)+'M':currency(n);
const safe=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const TYPES=['t','j','shared','split','review'];
const TYPE_LABELS={t:'T only',j:'J only',shared:'TnJ shared',split:'T / J split',review:'Unassigned / review'};
let baseline=[],states=[],assignments={},selected='NY',filter='all',mapFeatures=null,geoPath=null,zoomBehavior=null;
// Portfolio switches affect comparison totals only, never state assignments.
let portfolioOptions={t:{shared:true,split:true},j:{shared:true,split:true}};
function defaults(data){return Object.fromEntries(data.map(s=>[s.code,{type:START_SPLIT.has(s.code)?'split':SHARED_START.has(s.code)?'shared':T_START.has(s.code)?'t':J_START.has(s.code)?'j':'review',tShare:50,note:''}]));}
function getAssignment(code){return assignments[code]||{type:'review',tShare:50,note:''};}
// 2024-25 Pennsylvania district-level territory analysis from PA Department of
// Education public enrollment and AFR expenditure files (499 matched districts).
// Harrisburg City SD is in T. County-based geographic proxy with five overrides.
// Shares are different because enrollment, ADM, and expenditure are not identical.
// These weights allocate the existing statewide dashboard figures; they do NOT
// replace the FY2024 statewide amounts with FY2025 district-only amounts.
const PA_SPLIT={
 students:937204/1505713,
 total:24774015334.95/38307316814.94,
 current:22359720498.98/34472464142.18,
 finance:1015584.235/(1015584.235+594932.934)
};
function portion(a,bucket){switch(bucket){case 'all':return 1;case 't':return a.type==='t'?1:a.type==='split'?a.tShare/100:0;case 'j':return a.type==='j'?1:a.type==='split'?(100-a.tShare)/100:0;case 'shared':return a.type==='shared'?1:0;case 'split':return a.type==='split'?1:0;case 'review':return a.type==='review'?1:0;case 'tportfolio':return a.type==='shared'?(portfolioOptions.t.shared?1:0):a.type==='split'?(portfolioOptions.t.split?a.tShare/100:0):portion(a,'t');case 'jportfolio':return a.type==='shared'?(portfolioOptions.j.shared?1:0):a.type==='split'?(portfolioOptions.j.split?(100-a.tShare)/100:0):portion(a,'j');default:return 0;}}
// Use the researched metric-specific PA shares for T/J comparisons and portfolios.
// Other split states retain their adjustable uniform share.
function metricPortion(s,bucket,metric){
 const a=getAssignment(s.code);
 if(s.code!=='PA'||a.type!=='split')return portion(a,bucket);
 const tShare=PA_SPLIT[metric];
 switch(bucket){
  case 't':return tShare;
  case 'j':return 1-tShare;
  case 'tportfolio':return portfolioOptions.t.split?tShare:0;
  case 'jportfolio':return portfolioOptions.j.split?1-tShare:0;
  default:return portion(a,bucket);
 }
}
function totals(bucket){
 let result={states:0,jurisdictions:0,students:0,total:0,finance:0,current:0,weightedStates:0};
 for(const s of states){
  const p=portion(getAssignment(s.code),bucket);
  const weights={students:metricPortion(s,bucket,'students'),total:metricPortion(s,bucket,'total'),finance:metricPortion(s,bucket,'finance'),current:metricPortion(s,bucket,'current')};
  if(!p&&!Object.values(weights).some(w=>w>0))continue;
  if(s.code!=='DC')result.states++;
  result.jurisdictions++;result.weightedStates+=(s.code==='DC'?0:p);
  result.students+=s.students*weights.students;
  result.total+=s.totalSpending*weights.total;
  result.finance+=s.financeEnrollment*weights.finance;
  result.current+=s.currentSpending*weights.current;
 }
 result.per=result.finance?result.current/result.finance:0;
 return result;
}
function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({version:3,assignments,states,portfolioOptions,updatedAt:new Date().toISOString()}));$('saveStatus').textContent='Saved on this device';}catch(e){$('saveStatus').textContent='Export to keep changes';}}
function renderKpis(){const a=totals(filter);$('kpis').innerHTML=[['States covered',number(a.states),'Distinct states; D.C. excluded'],['Public school students',number(a.students),'Fall 2023 baseline; PA shares from 2024–25 districts'],['Total education spending',compact(a.total),'FY2024 baseline; PA shares from FY2025 districts'],['Current spending per student',currency(a.per),'Weighted FY2024 finance totals; PA uses district-based shares']].map(([label,value,sub])=>`<article class="kpi"><div class="klabel">${label}</div><div class="value">${value}</div><div class="sub">${sub}</div></article>`).join('');$('filterDescription').textContent={all:'National totals count each state and D.C. once. Shared states are not duplicated.',t:'T-exclusive states plus T’s proportional share of split states. Shared states appear separately.',j:'J-exclusive states plus J’s proportional share of split states. Shared states appear separately.',shared:'Shared states appear here in full, independent of T and J exclusive coverage.',split:'Split states appear here at full value. Their T/J shares are divided only in individual territory totals.',review:'Unassigned states remain in overall totals and appear here for review.',tportfolio:'T working portfolio: T-only states plus whichever TnJ and T split allocations you selected below.',jportfolio:'J working portfolio: J-only states plus whichever TnJ and J split allocations you selected below.'}[filter];}
function renderComparison(){
 const groups=[['t','T exclusive + split share'],['j','J exclusive + split share'],['shared','TnJ jointly shared'],['split','Split state totals'],['review','Needs review']];
 $('comparison').innerHTML=groups.map(([bucket,label])=>{let a=totals(bucket);return `<div class="tcard"><div class="heading"><i class="dot ${bucket}"></i>${label}</div><div class="big">${number(a.students)}</div><div class="muted">public school students</div><div class="tmetrics"><div><span>States touched</span><b>${a.states}</b></div><div><span>Total spending</span><b>${compact(a.total)}</b></div><div><span>Current spend / pupil</span><b>${currency(a.per)}</b></div></div></div>`}).join('');
 const t=totals('tportfolio'),j=totals('jportfolio');
 $('portfolios').innerHTML=[['T working portfolio',t,'t'],['J working portfolio',j,'j']].map(([label,a,who])=>`<div class="tcard"><div class="heading"><i class="dot ${who}"></i>${label}</div><div class="big">${number(a.students)}</div><div class="muted">students in selected coverage</div><div class="tmetrics"><div><span>States touched</span><b>${a.states}</b></div><div><span>Total spending</span><b>${compact(a.total)}</b></div><div><span>Current spend / pupil</span><b>${currency(a.per)}</b></div></div><div class="portfolio-options"><label><input type="checkbox" data-who="${who}" data-part="shared" ${portfolioOptions[who].shared?'checked':''}> Include TnJ shared states</label><label><input type="checkbox" data-who="${who}" data-part="split" ${portfolioOptions[who].split?'checked':''}> Include ${who.toUpperCase()} share of split states</label></div></div>`).join('');
 $('portfolios').querySelectorAll('input[data-who]').forEach(el=>el.addEventListener('change',e=>{const {who,part}=e.target.dataset;portfolioOptions[who][part]=e.target.checked;persist();renderKpis();renderComparison();renderTable();drawMap();}));
}
function renderEditor(){let s=states.find(x=>x.code===selected);if(!s)return;let a=getAssignment(selected);$('statePicker').value=selected;$('selectionBadge').textContent=s.code;$('selectedStats').innerHTML=`<div><small>STUDENTS</small><strong>${number(s.students)}</strong></div><div><small>TOTAL EXPENDITURES</small><strong>${compact(s.totalSpending)}</strong></div><div><small>CURRENT / PUPIL</small><strong>${currency(s.perStudent)}</strong></div><div><small>FINANCE ENROLLMENT</small><strong>${number(s.financeEnrollment)}</strong></div>`;$('assignPicker').value=a.type;$('splitSlider').value=selected==='PA'&&a.type==='split'?Math.round(PA_SPLIT.students*100):a.tShare;$('splitSlider').disabled=selected==='PA'&&a.type==='split';$('splitValue').textContent=selected==='PA'&&a.type==='split'?'62.24% (district-based)':a.tShare+'%';$('splitField').hidden=a.type!=='split';$('stateNote').value=a.note||'';const pa=$('paSplitExplainer');if(pa)pa.hidden=!(selected==='PA'&&a.type==='split');}
function renderTable(){let q=$('search').value.trim().toLowerCase();let matches=states.filter(s=>(s.name+' '+s.code).toLowerCase().includes(q)&&(filter==='all'||portion(getAssignment(s.code),filter)>0));$('stateRows').innerHTML=matches.map(s=>{let a=getAssignment(s.code);let label=a.type==='split'?(s.code==='PA'?'T 62.24% students · J 37.76%':`T ${a.tShare}% · J ${100-a.tShare}%`):TYPE_LABELS[a.type];return `<tr><td><strong>${safe(s.name)}</strong> <span class="muted">${s.code}</span></td><td><span class="tag tag-${a.type}">${safe(label)}</span></td><td class="number">${number(s.students)}</td><td class="number">${compact(s.totalSpending)}</td><td class="number">${currency(s.perStudent)}</td><td><button type="button" class="edit-link" data-code="${s.code}">Edit</button></td></tr>`}).join('')||'<tr><td colspan="6">No matching states</td></tr>';$('stateRows').querySelectorAll('[data-code]').forEach(b=>b.addEventListener('click',()=>{selectState(b.dataset.code);document.querySelector('.editor').scrollIntoView({behavior:'smooth',block:'start'});}));}
function render(){renderKpis();renderComparison();renderEditor();renderTable();drawMap();}
function selectState(code){if(!states.some(s=>s.code===code))return;selected=code;renderEditor();drawMap();}
const FIPS={'01':'AL','02':'AK','04':'AZ','05':'AR','06':'CA','08':'CO','09':'CT','10':'DE','11':'DC','12':'FL','13':'GA','15':'HI','16':'ID','17':'IL','18':'IN','19':'IA','20':'KS','21':'KY','22':'LA','23':'ME','24':'MD','25':'MA','26':'MI','27':'MN','28':'MS','29':'MO','30':'MT','31':'NE','32':'NV','33':'NH','34':'NJ','35':'NM','36':'NY','37':'NC','38':'ND','39':'OH','40':'OK','41':'OR','42':'PA','44':'RI','45':'SC','46':'SD','47':'TN','48':'TX','49':'UT','50':'VT','51':'VA','53':'WA','54':'WV','55':'WI','56':'WY'};
const stateCode=f=>FIPS[String(f.id).padStart(2,'0')];
const fillColors={t:'#24547d',j:'#efa040',shared:'#8065aa',review:'#b3bbc5'};
function fill(code){let a=getAssignment(code);return a.type==='split'?'url(#splitHatch)':fillColors[a.type]||'#b3bbc5';}
function tooltip(code){let s=states.find(x=>x.code===code);if(!s)return code;let a=getAssignment(code);return `${s.name} (${code})\nCoverage: ${TYPE_LABELS[a.type]}${a.type==='split'?(code==='PA'?' (T 62.24% students / J 37.76%; different spending shares)':' (T '+a.tShare+'% / J '+(100-a.tShare)+'%)'):''}\nStudents: ${number(s.students)}\nTotal spending: ${compact(s.totalSpending)}\nCurrent spend / pupil: ${currency(s.perStudent)}\nTap to edit`;}
function drawMap(){
 if(!mapFeatures||!window.d3)return;
 const svg=d3.select('#map');svg.selectAll('*').remove();const defs=svg.append('defs');
 const hatch=defs.append('pattern').attr('id','splitHatch').attr('patternUnits','userSpaceOnUse').attr('width',12).attr('height',12).attr('patternTransform','rotate(32)');
 hatch.append('rect').attr('width',12).attr('height',12).attr('fill',fillColors.t);
 hatch.append('rect').attr('width',6).attr('height',12).attr('fill',fillColors.j);
 const g=svg.append('g').attr('class','map-geography');
 const projection=d3.geoAlbersUsa().fitExtent([[24,24],[936,570]],{type:'FeatureCollection',features:mapFeatures});
 geoPath=d3.geoPath(projection);
 // Approximate west/east Pennsylvania coverage with a north/south projected
 // boundary at Harrisburg's longitude (40.2732 N, 76.8867 W).
 // This is a visual planning boundary, NOT a county or district allocation.
 const paFeature=mapFeatures.find(f=>stateCode(f)==='PA');
 const paEastWest=getAssignment('PA').type==='split'&&!!paFeature;
 const hb=projection([-76.8867,40.2732]);
 if(paEastWest&&hb){
  const boundary=hb[0];
  defs.append('clipPath').attr('id','paWestClip').append('rect').attr('x',0).attr('y',0).attr('width',Math.max(0,boundary)).attr('height',595);
  defs.append('clipPath').attr('id','paEastClip').append('rect').attr('x',boundary).attr('y',0).attr('width',960-boundary).attr('height',595);
 }
 const displayFeatures=mapFeatures.filter(f=>!(paEastWest&&hb&&stateCode(f)==='PA'));
 g.selectAll('.state-shape').data(displayFeatures).join('path').attr('class',d=>'state-shape'+(stateCode(d)===selected?' selected':''))
  .attr('d',geoPath).attr('fill',d=>fill(stateCode(d)))
  .attr('opacity',d=>filter==='all'||portion(getAssignment(stateCode(d)),filter)>0?1:0.18)
  .attr('tabindex',0).attr('role','button').attr('aria-label',d=>tooltip(stateCode(d)).replaceAll('\n','; '))
  .on('click',(e,d)=>selectState(stateCode(d))).on('keydown',(e,d)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectState(stateCode(d));}}).append('title').text(d=>tooltip(stateCode(d)));
 if(paEastWest&&hb){
  const paPath=geoPath(paFeature),isSelected=selected==='PA';
  const fading=filter==='all'||portion(getAssignment('PA'),filter)>0?1:0.18;
  // West is J, East (including Harrisburg) is T.
  for(const [clip,color] of [['paWestClip',fillColors.j],['paEastClip',fillColors.t]]){
   g.append('path').attr('class','state-shape'+(isSelected?' selected':''))
    .attr('d',paPath).attr('clip-path',`url(#${clip})`).attr('fill',color).attr('opacity',fading)
    .attr('tabindex',0).attr('role','button').attr('aria-label',tooltip('PA').replaceAll('\n','; '))
    .on('click',()=>selectState('PA')).on('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectState('PA');}})
    .append('title').text(tooltip('PA')+'\nWest: J | East including Harrisburg: T (approximate boundary)');
  }
 }
 svg.append('text').attr('x',35).attr('y',580).attr('font-size',12).attr('fill','#60758c').text('Alaska and Hawaii shown as map insets');
 if(!zoomBehavior){zoomBehavior=d3.zoom().scaleExtent([1,5]).translateExtent([[0,0],[960,595]]).extent([[0,0],[960,595]]).on('zoom',event=>svg.select('g.map-geography').attr('transform',event.transform));}svg.call(zoomBehavior);
}
async function loadMap(){try{if(!window.d3||!window.topojson)throw Error('Map libraries unavailable');const response=await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');if(!response.ok)throw Error('Map boundary file unavailable');const atlas=await response.json();mapFeatures=topojson.feature(atlas,atlas.objects.states).features.filter(f=>stateCode(f));$('mapStatus').textContent='';drawMap();}catch(e){$('map').innerHTML='<text x="480" y="240" text-anchor="middle" fill="#61758d">Map could not load. Check your internet connection.</text><text x="480" y="270" text-anchor="middle" fill="#61758d">You can still edit using the state picker and table.</text>';$('mapStatus').textContent='';console.warn(e);}}
function download(filename,content,mime){let blob=new Blob([content],{type:mime});let url=URL.createObjectURL(blob);let a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);}
function csvCell(v){let s=String(v??'');return /[",\n\r]/.test(s)?'"'+s.replaceAll('"','""')+'"':s;}
function csv(cols,records){return [cols.join(','),...records.map(r=>cols.map(c=>csvCell(r[c])).join(','))].join('\r\n');}
function parseCsv(source){let rows=[],row=[],v='',quoted=false;for(let i=0;i<source.length;i++){let c=source[i];if(quoted){if(c==='"'&&source[i+1]==='"'){v+='"';i++;}else if(c==='"')quoted=false;else v+=c;}else if(c==='"')quoted=true;else if(c===','){row.push(v);v='';}else if(c==='\n'){row.push(v.replace(/\r$/,''));rows.push(row);row=[];v='';}else v+=c;}if(quoted)throw Error('Unclosed CSV quote');if(v||row.length){row.push(v);rows.push(row);}return rows;}
function validatedData(rows){const cols=['code','name','students','totalSpending','financeEnrollment','currentSpending'];if(!rows.length||cols.some(k=>!Object.hasOwn(rows[0],k)))throw Error('Missing columns: '+cols.join(', '));if(rows.length!==51)throw Error('Expected exactly 50 states plus D.C.');let known=new Set(baseline.map(s=>s.code)),seen=new Set();return rows.map(s=>{if(!known.has(s.code)||seen.has(s.code))throw Error('Unknown or duplicate jurisdiction '+s.code);seen.add(s.code);let o={...s};for(let k of ['students','totalSpending','financeEnrollment','currentSpending']){o[k]=Number(o[k]);if(!Number.isFinite(o[k])||o[k]<0)throw Error('Invalid '+k+' for '+s.code);}o.perStudent=o.financeEnrollment?o.currentSpending/o.financeEnrollment:0;return o;});}
function validatedPlan(obj){if(!obj||!obj.assignments||typeof obj.assignments!=='object')throw Error('Invalid plan file');const next=defaults(states);for(const s of states){let a=obj.assignments[s.code];if(!a)continue;let type=a.type||a.category||({blue:'t',orange:'j',unassigned:'review'}[a.a]);if(type==='blue')type='t';if(type==='orange')type='j';if(type==='unassigned')type='review';if(!TYPES.includes(type))throw Error('Invalid category for '+s.code);let tShare=Number(a.tShare??a.blueShare??a.pct??50);if(!Number.isFinite(tShare)||tShare<0||tShare>100)throw Error('Invalid share for '+s.code);next[s.code]={type,tShare,note:String(a.note||'')};}return next;}
function validateOptions(value){const result={t:{shared:true,split:true},j:{shared:true,split:true}};for(const who of ['t','j'])for(const part of ['shared','split'])if(typeof value?.[who]?.[part]==='boolean')result[who][part]=value[who][part];return result;}
function injectPortfolioUI(){
 const section=$('portfolios');if(!section)return;
 const heading=section.previousElementSibling;
 if(heading){const subtitle=heading.querySelector('p');if(subtitle)subtitle.textContent='Use the checkboxes in each portfolio to add or remove shared and split coverage without reassigning states.';}
 const style=document.createElement('style');style.textContent='.portfolio-options{border-top:1px solid #e5eaf0;margin-top:14px;padding-top:12px;display:grid;gap:10px}.portfolio-options label{display:flex;align-items:center;gap:9px;font-size:12px;color:#354d66;cursor:pointer;line-height:1.4}.portfolio-options input{width:17px;height:17px;flex:none;accent-color:#24547d}.pa-explainer{margin:10px 22px 0;padding:11px 12px;border-radius:8px;background:#f2f5fa;color:#344b64;font-size:11px;line-height:1.55}.pa-explainer[hidden]{display:none}';document.head.appendChild(style);
 const splitField=$('splitField');if(splitField){const note=document.createElement('div');note.id='paSplitExplainer';note.className='pa-explainer';note.hidden=true;note.textContent='Pennsylvania uses a researched 2024–25 district allocation (499 matched districts). T (east, including Harrisburg): 62.24% of students, 64.67% of total expenditures, 64.86% of operating expenditures and 63.06% of finance enrollment (ADM). J receives the remainder. Pennsylvania’s slider is locked because each metric has a distinct share. These shares are applied to the dashboard’s existing statewide FY2024 figures; the other states have not yet been updated to 2024–25. District geography remains an approximation.';splitField.insertAdjacentElement('afterend',note);}
 const foot=document.querySelector('.map-foot span');if(foot)foot.textContent='Pennsylvania uses a visual Harrisburg boundary; its student and spending splits use the 2024–25 district-level analysis (approximate geography).';
}
async function withFile(input,action){let file=input.files?.[0];if(!file)return;try{await action(await file.text());}catch(e){alert(e.message);}finally{input.value='';}}
function setup(){ $('statePicker').innerHTML=states.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(s=>`<option value="${s.code}">${safe(s.name)} (${s.code})</option>`).join('');$('statePicker').addEventListener('change',e=>selectState(e.target.value));$('assignPicker').addEventListener('change',e=>$('splitField').hidden=e.target.value!=='split');$('splitSlider').addEventListener('input',e=>{if(selected!=='PA')$('splitValue').textContent=e.target.value+'%';});$('applyBtn').addEventListener('click',()=>{assignments[selected]={type:$('assignPicker').value,tShare:Number($('splitSlider').value),note:$('stateNote').value};persist();render();});$('territoryFilter').addEventListener('change',e=>{filter=e.target.value;render();});$('search').addEventListener('input',renderTable);$('resetBtn').addEventListener('click',()=>{if(confirm('Reset all state assignments and notes to the new reference map?')){assignments=defaults(states);persist();render();}});$('exportBtn').addEventListener('click',()=>download('territory-plan-T-J-TnJ.json',JSON.stringify({version:3,assignments,states,portfolioOptions,exportedAt:new Date().toISOString()},null,2),'application/json'));$('planInput').addEventListener('change',e=>withFile(e,source=>{let obj=JSON.parse(source);if(obj.states)states=validatedData(obj.states);assignments=validatedPlan(obj);if(obj.portfolioOptions)portfolioOptions=validateOptions(obj.portfolioOptions);persist();render();}));$('dataInput').addEventListener('change',e=>withFile(e,source=>{let rows=parseCsv(source.trim());let headers=rows.shift().map(x=>x.trim().replace(/^\uFEFF/,''));states=validatedData(rows.filter(r=>r.some(x=>x.trim())).map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]]))));persist();render();$('dataFeedback').textContent='Imported new data for '+states.length+' jurisdictions. Export the plan for safekeeping.';}));$('restoreData').addEventListener('click',()=>{if(confirm('Restore the original education data? Assignments will be kept.')){states=structuredClone(baseline);persist();render();$('dataFeedback').textContent='Original data restored.';}});$('downloadCsv').addEventListener('click',()=>download('education-data.csv',csv(['code','name','students','totalSpending','perStudent','financeEnrollment','currentSpending'],states),'text/csv'));$('exportAssignments').addEventListener('click',()=>download('territory-assignments.csv',csv(['code','name','territory','tShare','note'],states.map(s=>({code:s.code,name:s.name,territory:getAssignment(s.code).type,tShare:getAssignment(s.code).type==='split'?getAssignment(s.code).tShare:'',note:getAssignment(s.code).note}))),'text/csv'));$('zoomIn').addEventListener('click',()=>{if(zoomBehavior&&window.d3)d3.select('#map').transition().duration(250).call(zoomBehavior.scaleBy,1.35)});$('zoomOut').addEventListener('click',()=>{if(zoomBehavior&&window.d3)d3.select('#map').transition().duration(250).call(zoomBehavior.scaleBy,1/1.35)});$('zoomReset').addEventListener('click',()=>{if(zoomBehavior&&window.d3)d3.select('#map').transition().duration(250).call(zoomBehavior.transform,d3.zoomIdentity)});}
async function init(){try{let res=await fetch('./education-data.json');if(!res.ok)throw Error('Education data file unavailable');let data=await res.json();baseline=data.states;states=structuredClone(baseline);assignments=defaults(states);try{let old=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(old?.states?.length===51&&old?.assignments){states=validatedData(old.states);assignments=validatedPlan(old);if(old.portfolioOptions)portfolioOptions=validateOptions(old.portfolioOptions);}}catch(e){console.warn('Ignored incompatible saved plan',e);}setup();injectPortfolioUI();render();loadMap();}catch(e){document.querySelector('main').innerHTML=`<section class="panel" style="padding:25px"><h2>Unable to load dashboard</h2><p>${safe(e.message)}</p><p>Upload all files together to GitHub Pages. Opening the HTML directly as a local file may prevent loading JSON.</p></section>`;}}
init();
