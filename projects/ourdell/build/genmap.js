const fs = require('fs');
const topojson = require('topojson-client');
const d3 = require('d3-geo');
const us = JSON.parse(fs.readFileSync('node_modules/us-atlas/states-albers-10m.json'));
const want = {"23":"Maine","33":"NewHampshire","50":"Vermont","25":"Massachusetts","44":"RhodeIsland","09":"Connecticut","36":"NewYork","34":"NewJersey","42":"Pennsylvania","39":"Ohio","24":"Maryland","10":"Delaware","51":"Virginia","54":"WestVirginia","11":"DC"};
const feats = topojson.feature(us, us.objects.states).features.filter(f=>want[f.id]);
const path = d3.geoPath();
let minX=1e9,minY=1e9,maxX=-1e9,maxY=-1e9;
const out = {};
for (const f of feats){
  const b = path.bounds(f);
  minX=Math.min(minX,b[0][0]);minY=Math.min(minY,b[0][1]);
  maxX=Math.max(maxX,b[1][0]);maxY=Math.max(maxY,b[1][1]);
  out[want[f.id]] = { d: path(f), bounds: b, centroid: path.centroid(f) };
}
// interior borders mesh for the selected states only
const mesh = topojson.mesh(us, us.objects.states, (a,b)=>a!==b && want[a.id] && want[b.id]);
fs.writeFileSync('mapdata.json', JSON.stringify({viewBox:[minX,minY,maxX-minX,maxY-minY], states: out, mesh: path(mesh)}));
console.log('viewBox', [minX,minY,maxX-minX,maxY-minY].map(v=>Math.round(v)).join(' '));
for (const k in out) console.log(k, out[k].centroid.map(v=>Math.round(v)).join(','));
