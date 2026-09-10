const STORAGE_KEY = 'game-space-design-lab-v1';

const phases = ['Understand', 'Define', 'Explore', 'Prototype', 'Feedback', 'Refine'];

const steps = [
  {
    nav: 'Imagine it',
    phase: 'Understand',
    kicker: 'Step 1 · Begin with you',
    title: 'Start with the space, not the screen.',
    lede: 'Before AI offers anything, notice what you already know. Designers begin by understanding the person who will use a space and what that person is trying to do.',
    vocab: {
      term: 'User + need',
      definition: 'The user is the person the design must serve. A need describes what the space should make possible, not what object to buy.'
    },
    mainLabel: 'Your move',
    mainTitle: 'Stand in the room for a few minutes',
    intro: 'Look around without opening Gemini yet. Imagine sitting down to code, make game art, test a game, talk with a mentor, or complete other schoolwork.',
    actions: [
      'Notice what already works and what gets in the way.',
      'Think about what you may need now and later.',
      'Decide how you want the space to feel when you enter it.'
    ],
    fields: [
      { id: 'vision', label: 'Complete this thought', help: 'One or two sentences is enough.', placeholder: 'I want this space to help me… and I want it to feel…', type: 'textarea' },
      { id: 'startingNotes', label: 'Anything you already imagine', help: 'A desk idea, screen arrangement, colors, storage, or something completely different.', placeholder: 'My first thoughts…', type: 'textarea' }
    ],
    side: 'video',
    nudgeTitle: 'No perfect answer',
    nudge: 'These are starting thoughts, not promises. A design changes as you learn more.'
  },
  {
    nav: 'Show the real space',
    phase: 'Understand',
    kicker: 'Step 2 · Add the reality',
    title: 'Context turns a generic idea into your design.',
    lede: 'A chatbot only knows what you share. Measurements, photographs, activities, and household needs give the conversation something real to work with.',
    vocab: {
      term: 'Requirement + constraint',
      definition: 'A requirement is something the design should accomplish. A constraint is something it must work around.'
    },
    mainLabel: 'Go look or measure',
    mainTitle: 'Give the conversation the facts it needs',
    intro: 'Take photographs from more than one direction. Check the room instead of guessing. Before uploading photos, move or cover personal information that does not belong in the conversation.',
    fields: [
      { id: 'measurements', label: 'Room measurements', help: 'Include width, length, ceiling height, entrance, and any useful wall measurements.', placeholder: 'Width:\nLength:\nCeiling:\nEntrance or wall details:', type: 'textarea' },
      { id: 'fixedFeatures', label: 'What must stay, work, or remain visible?', help: 'Doors, trim, switches, outlets, vents, or family preferences.', placeholder: 'The design must work around…', type: 'textarea' },
      { id: 'activities', label: 'What will happen here?', help: 'Describe actions such as coding, drawing, game testing, video calls, or travel setup.', placeholder: 'In this space I will…', type: 'textarea' }
    ],
    prompt: `Here are photographs and measurements of the space, along with what I want to do there. Before suggesting a layout, tell me what you understand and what you still cannot determine. Ask me one useful question at a time. If an answer can be found by looking at or measuring the room, ask me to do that instead of guessing.\n\nMy starting vision:\n[Paste or explain it]\n\nMeasurements and fixed features:\n[Add them here]\n\nWhat I will do in the space:\n[Add the activities here]`,
    nudgeTitle: 'Why this matters',
    nudge: '“Make me a cool gaming space” invites a generic answer. Context lets AI respond to this person, this room, and this design problem.'
  },
  {
    nav: 'Define the challenge',
    phase: 'Define',
    kicker: 'Step 3 · Frame the problem',
    title: 'Decide what you are really designing for.',
    lede: 'A clear design challenge keeps the project focused without deciding the solution too early.',
    vocab: {
      term: 'Design challenge',
      definition: 'A short, open question that names the user, the need, and the important constraints without prescribing the answer.'
    },
    mainLabel: 'Shape the question',
    mainTitle: 'Write a “How might I…” challenge',
    intro: 'Use what you learned from the room and the AI conversation. The question should be broad enough for several ideas, but specific enough to guide this project.',
    fields: [
      { id: 'challenge', label: 'Your design challenge', help: 'Example: How might I turn this narrow space into a flexible game-development workspace that supports coding and creativity while keeping the doors visible?', placeholder: 'How might I…', type: 'textarea' },
      { id: 'mustMatter', label: 'What must the final design do well?', help: 'Keep this short. Three to five priorities is plenty.', placeholder: 'The design needs to…', type: 'textarea' }
    ],
    prompt: `Help me sharpen my design challenge without solving it yet. Ask what feels most important or unclear. Then offer two possible wordings I can react to. A useful design challenge should name what the space needs to make possible and the important constraints, but it should not lock me into one desk, monitor, or layout.`,
    nudgeTitle: 'Watch the difference',
    nudge: '“Buy a floating desk” is a solution. “Create enough work surface without crowding the chair” describes the problem the design must solve.'
  },
  {
    nav: 'Develop the idea',
    phase: 'Explore',
    kicker: 'Step 4 · Think in possibilities',
    title: 'Build possibilities before choosing one.',
    lede: 'Good design rarely appears fully formed. Start with your ideas, let AI extend or question them, and combine the parts that make the space work better.',
    vocab: {
      term: 'Ideate + tradeoff',
      definition: 'To ideate is to explore possibilities. A tradeoff means gaining one benefit may reduce another.'
    },
    mainLabel: 'Co-design conversation',
    mainTitle: 'Give AI an idea to build from',
    intro: 'You do not need dozens of options. Explore enough variation to understand what matters, then stay with the most promising direction.',
    actions: [
      'Start with something you are already considering.',
      'Ask what works, what is uncertain, and what the tradeoffs are.',
      'Keep, combine, change, or reject ideas in ordinary conversation.'
    ],
    fields: [
      { id: 'developingIdea', label: 'The idea you are developing', help: 'Update this as the conversation changes your thinking.', placeholder: 'Right now, I am leaning toward…', type: 'textarea' },
      { id: 'tradeoffs', label: 'Choices or tradeoffs you are considering', help: 'For example: permanent monitor versus portable monitor, work surface versus chair room.', placeholder: 'I am deciding between… because…', type: 'textarea' }
    ],
    prompt: `One idea I have is [describe your idea]. Before creating a complete design, tell me what appears promising about it and ask one question that would help us develop it. Then give me two possible ways to build on the idea, connected to what I said matters. Explain the tradeoff in each direction, and let me decide what to explore next.`,
    nudgeTitle: 'Keep it conversational',
    nudge: 'Try: “Build on this,” “That feels too crowded,” “Combine those two parts,” or “Tell me what I give up with that choice.”'
  },
  {
    nav: 'See the possibilities',
    phase: 'Prototype',
    kicker: 'Step 5 · Make ideas visible',
    title: 'Use images to think, not to prove.',
    lede: 'A generated image is a quick visual prototype. It can help you notice what you like, what feels wrong, and what you want to change.',
    vocab: {
      term: 'Prototype + iteration',
      definition: 'A prototype makes an idea visible enough to react to. Iteration means changing it based on what you learn.'
    },
    mainLabel: 'Create with AI',
    mainTitle: 'Co-write the image request',
    intro: 'Ask Gemini to help turn the design conversation into a precise image prompt before generating anything. Create two or three images that explore your most promising directions.',
    fields: [
      { id: 'imageDirection', label: 'What should the first image show?', help: 'Name the layout, screen approach, material, lighting, and anything that must remain unchanged.', placeholder: 'The image should show…', type: 'textarea' },
      { id: 'imageReaction', label: 'What did the images help you decide?', help: 'You do not need to evaluate every detail. Capture what you want to keep or change.', placeholder: 'The part I want to keep is…\nThe part I want to change is…', type: 'textarea' }
    ],
    prompt: `Help me translate the design we have been developing into an image-generation prompt. Do not generate the image yet. First ask about any visual choice that is still unclear. The finished prompt should include the room’s actual measurements, what architecture must remain unchanged, what should be removed, the desk and screen arrangement, wall features, lighting, style, and common errors to avoid. Keep the concept realistic for the narrow space.`,
    nudgeTitle: 'Images bend reality',
    nudge: 'The room may look wider, furniture may shrink, and mounts may become impossible. Use the image for ideas, then trust measurements over pixels.'
  },
  {
    nav: 'Talk it through',
    phase: 'Feedback',
    kicker: 'Step 6 · Add another person',
    title: 'Explain the design out loud.',
    lede: 'Talking through a design often reveals more than silently reviewing it. Another person can ask about the choices without taking them over.',
    vocab: {
      term: 'Feedback',
      definition: 'Questions and reactions that help a designer see how an idea may work for other people or in the real setting.'
    },
    mainLabel: 'Leave the chatbot for a moment',
    mainTitle: 'Show someone what you are creating and why',
    intro: 'Show your preferred images and explain the design. The listener is not choosing the room. Their job is to ask useful questions.',
    actions: [
      'Explain what you will do in the space and why the layout supports it.',
      'Identify which parts of the AI images are accurate and which are not.',
      'Explain what should happen now and what could be added later.'
    ],
    fields: [
      { id: 'feedback', label: 'A question or comment worth considering', help: 'Only save feedback that may affect the actual design.', placeholder: 'Someone asked or noticed…', type: 'textarea' },
      { id: 'afterFeedback', label: 'What, if anything, do you want to reconsider?', help: 'It is fine to keep the plan unchanged when you have a good reason.', placeholder: 'After talking it through…', type: 'textarea' }
    ],
    nudgeTitle: 'Questions for the listener',
    nudge: 'Ask: “Why that choice?”, “Does the measurement work?”, “What may get annoying?”, “Which part are you excited about?”, or “What still needs checking?”'
  },
  {
    nav: 'Make the plan',
    phase: 'Refine',
    kicker: 'Step 7 · Decide what comes next',
    title: 'Turn the direction into a plan.',
    lede: 'Refining means selecting what belongs, removing what does not, and making the next steps clear enough to act on.',
    vocab: {
      term: 'Refine + implement',
      definition: 'Refine the design by resolving the important choices. Implement it by turning those choices into real actions.'
    },
    mainLabel: 'Your final direction',
    mainTitle: 'Capture the decisions that make the space yours',
    intro: 'This is not an architectural drawing. It is a practical guide for choosing the desk, arranging the equipment, and building the space in stages.',
    fields: [
      { id: 'deskPlan', label: 'Desk and chair', help: 'Type, approximate dimensions, location, and anything important about comfort or mounting.', placeholder: 'Desk:\nChair:', type: 'textarea' },
      { id: 'screenPlan', label: 'Computer and screens', help: 'Laptop, regular monitor, portable monitor, arms, docks, controller, or other equipment.', placeholder: 'The setup will use…', type: 'textarea' },
      { id: 'wallPlan', label: 'Walls, lighting, storage, and personality', help: 'Include only what supports the work or makes the space feel right.', placeholder: 'On the walls…\nFor lighting…\nFor storage…', type: 'textarea' },
      { id: 'nextSteps', label: 'What happens first, and what can wait?', help: 'A short sequence keeps the plan realistic.', placeholder: 'First:\nNext:\nLater:', type: 'textarea' }
    ],
    prompt: `I have decided what I want. Help me organize my choices into a simple workspace plan. Use only the decisions I provide or that we already made together. Do not add new features unless you ask first. Clearly mark anything that still needs a measurement or product check before we buy it.`,
    side: 'summary',
    nudgeTitle: 'Before buying',
    nudge: 'Verify the exact dimensions, mounting requirements, and return policy on the seller’s current product page.'
  }
];

const defaultState = {
  currentStep: 0,
  answers: {},
  prompts: {},
  updatedAt: null
};

let state = loadState();
let toastTimer;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState, ...saved, answers: saved?.answers || {}, prompts: saved?.prompts || {} };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderField(field) {
  const input = field.type === 'input'
    ? `<input id="${field.id}" data-field="${field.id}" placeholder="${escapeHtml(field.placeholder || '')}" />`
    : `<textarea id="${field.id}" data-field="${field.id}" placeholder="${escapeHtml(field.placeholder || '')}"></textarea>`;
  return `<div class="field">
    <label for="${field.id}">${field.label}</label>
    ${field.help ? `<p class="field-help">${field.help}</p>` : ''}
    ${input}
  </div>`;
}

function renderMainCard(step) {
  const actions = step.actions?.length
    ? `<ul class="action-list">${step.actions.map(action => `<li>${action}</li>`).join('')}</ul>`
    : '';
  const fields = step.fields?.length
    ? `<div class="field-stack">${step.fields.map(renderField).join('')}</div><span class="saved-hint">Notes save automatically on this device</span>`
    : '';
  const prompt = step.prompt
    ? `<div class="prompt-card">
        <label for="step-prompt"><strong>Prompt starter</strong> · Edit it before copying</label>
        <textarea id="step-prompt" data-prompt-index="${state.currentStep}"></textarea>
        <div class="prompt-actions">
          <button class="button" data-copy-prompt>Copy prompt</button>
          <a class="button secondary" href="https://gemini.google.com/" target="_blank" rel="noopener">Open Gemini</a>
        </div>
      </div>`
    : '';

  return `<section class="card accent">
    <p class="card-label">${step.mainLabel}</p>
    <h2>${step.mainTitle}</h2>
    <p>${step.intro}</p>
    ${actions}
    ${fields}
    ${prompt}
  </section>`;
}

function renderVideoCard() {
  return `<a class="micro-card video-link" href="https://www.youtube.com/watch?v=ldYzbV0NDp8" target="_blank" rel="noopener">
    <div class="video-thumb" aria-hidden="true"><span class="play-button">▶</span></div>
    <h3>Optional quick watch</h3>
    <p><strong>What is Design Thinking?</strong><br />A brief introduction from IDEO U.</p>
  </a>`;
}

function getSummaryItems() {
  const ids = [
    ['vision', 'The space should help me'],
    ['challenge', 'Design challenge'],
    ['mustMatter', 'What matters most'],
    ['developingIdea', 'Chosen direction'],
    ['deskPlan', 'Desk and chair'],
    ['screenPlan', 'Computer and screens'],
    ['wallPlan', 'Walls, lighting, and storage'],
    ['nextSteps', 'Next steps']
  ];
  return ids.map(([id, label]) => ({ label, value: state.answers[id] || 'Not decided yet' }));
}

function renderSummaryCard() {
  return `<section class="micro-card">
    <h3>Your design at a glance</h3>
    <p>This updates from the choices you save throughout the studio.</p>
    <div class="final-summary">
      ${getSummaryItems().map(item => `<div class="summary-item"><strong>${item.label}</strong><span>${escapeHtml(item.value)}</span></div>`).join('')}
    </div>
    <div class="button-row" style="margin-top: 1rem;">
      <button class="button secondary" data-print>Print or save the plan</button>
    </div>
  </section>`;
}

function renderAside(step) {
  const primary = step.side === 'video' ? renderVideoCard() : step.side === 'summary' ? renderSummaryCard() : '';
  return `<aside class="aside-stack">
    ${primary}
    <section class="micro-card">
      <h3>${step.nudgeTitle}</h3>
      <p>${step.nudge}</p>
    </section>
    ${state.currentStep > 0 && state.currentStep < 6 ? `<section class="micro-card"><h3>Choose the next useful move</h3><p>Continue with AI, pause to think, go inspect the room, or talk with someone. The tool should follow the design need.</p></section>` : ''}
  </aside>`;
}

function render() {
  const step = steps[state.currentStep];
  const progress = ((state.currentStep + 1) / steps.length) * 100;
  document.querySelector('#app').innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand-mark">
          <div class="brand-pixel" aria-hidden="true"></div>
          <div><p class="brand-title"><strong>Game Space</strong></p><p class="brand-subtitle">Design Lab</p></div>
        </div>
        <div class="progress-label"><span>Your path</span><span>${state.currentStep + 1} of ${steps.length}</span></div>
        <div class="progress-track" aria-label="Design progress"><div class="progress-fill" style="width:${progress}%"></div></div>
        <nav class="stage-nav" aria-label="Design stages">
          ${steps.map((item, index) => `<button class="stage-button ${index === state.currentStep ? 'active' : ''}" data-step="${index}" ${index === state.currentStep ? 'aria-current="step"' : ''}><span class="stage-number">${index + 1}</span><span class="stage-name">${item.nav}</span></button>`).join('')}
        </nav>
        <div class="sidebar-tools">
          <a class="button secondary" href="https://gemini.google.com/" target="_blank" rel="noopener">Open Gemini</a>
          <button class="button ghost" data-open-reset>Start over</button>
        </div>
        <p class="sidebar-note">Your notes stay in this browser. The chatbot conversation remains separate.</p>
      </aside>

      <main id="workspace" class="main" tabindex="-1">
        <div class="step-wrap">
          <div class="topbar">
            <div class="phase-map" aria-label="Design process">
              ${phases.map(phase => `<span class="phase-chip ${phase === step.phase ? 'active' : ''}">${phase}</span>`).join('')}
            </div>
          </div>

          <header class="step-header">
            <div>
              <p class="step-kicker">${step.kicker}</p>
              <h1 class="step-title">${step.title}</h1>
              <p class="step-lede">${step.lede}</p>
            </div>
            <section class="vocab-card" aria-label="Design vocabulary">
              <p class="vocab-label">Design language, right now</p>
              <h2 class="vocab-term">${step.vocab.term}</h2>
              <p class="vocab-definition">${step.vocab.definition}</p>
            </section>
          </header>

          <div class="workspace-grid">
            ${renderMainCard(step)}
            ${renderAside(step)}
          </div>

          <footer class="step-footer">
            <span class="footer-status">Move at the pace of the design, not the page.</span>
            <div class="button-row">
              <button class="button secondary" data-prev ${state.currentStep === 0 ? 'disabled' : ''}>Back</button>
              <button class="button" data-next>${state.currentStep === steps.length - 1 ? 'Review my plan' : 'Continue'}</button>
            </div>
          </footer>
        </div>
      </main>
    </div>`;

  document.querySelectorAll('[data-field]').forEach(element => {
    element.value = state.answers[element.dataset.field] || '';
  });

  const promptElement = document.querySelector('[data-prompt-index]');
  if (promptElement) {
    promptElement.value = state.prompts[state.currentStep] ?? step.prompt;
  }

  bindPageEvents();
}

function bindPageEvents() {
  document.querySelectorAll('[data-step]').forEach(button => {
    button.addEventListener('click', () => goToStep(Number(button.dataset.step)));
  });

  document.querySelector('[data-prev]')?.addEventListener('click', () => goToStep(Math.max(0, state.currentStep - 1)));
  document.querySelector('[data-next]')?.addEventListener('click', () => {
    if (state.currentStep === steps.length - 1) {
      document.querySelector('[data-print]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('Your plan is ready to review or print.');
      return;
    }
    goToStep(state.currentStep + 1);
  });

  document.querySelectorAll('[data-field]').forEach(element => {
    element.addEventListener('input', () => {
      state.answers[element.dataset.field] = element.value;
      saveState();
    });
  });

  document.querySelector('[data-prompt-index]')?.addEventListener('input', event => {
    state.prompts[state.currentStep] = event.target.value;
    saveState();
  });

  document.querySelector('[data-copy-prompt]')?.addEventListener('click', () => {
    copyText(document.querySelector('[data-prompt-index]').value, 'Prompt copied. Change anything you want before using it.');
  });

  document.querySelector('[data-open-reset]')?.addEventListener('click', () => document.querySelector('#reset-dialog').showModal());
  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
}

function goToStep(index) {
  state.currentStep = Math.min(Math.max(index, 0), steps.length - 1);
  saveState();
  render();
  document.querySelector('#workspace')?.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;

  const lifecycle = new AbortController();
  const fieldIds = [...new Set(steps.flatMap(step => (step.fields || []).map(field => field.id)))];

  const reportError = error => console.warn('Design tool registration failed.', error);

  try {
    void Promise.resolve(context.registerTool({
      name: 'read_design_progress',
      title: 'Read design progress',
      description: 'Read the student’s current stage and saved workspace-design notes without changing them.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute() {
        return {
          currentStage: state.currentStep + 1,
          stageName: steps[state.currentStep].nav,
          notes: { ...state.answers }
        };
      }
    }, { signal: lifecycle.signal })).catch(reportError);

    void Promise.resolve(context.registerTool({
      name: 'update_design_notes',
      title: 'Update design notes',
      description: 'Save one or more student-approved notes into the same fields shown in the Game Space Design Lab.',
      inputSchema: {
        type: 'object',
        properties: {
          updates: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', enum: fieldIds },
                value: { type: 'string' }
              },
              required: ['field', 'value'],
              additionalProperties: false
            }
          }
        },
        required: ['updates'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: true },
      execute(input) {
        if (!input || !Array.isArray(input.updates) || input.updates.length === 0) {
          throw new Error('Provide at least one design-note update.');
        }
        const changed = [];
        input.updates.forEach(update => {
          if (!fieldIds.includes(update.field) || typeof update.value !== 'string') {
            throw new Error('A design-note field or value is invalid.');
          }
          state.answers[update.field] = update.value;
          changed.push(update.field);
        });
        saveState();
        render();
        return { updatedFields: changed, currentStage: state.currentStep + 1 };
      }
    }, { signal: lifecycle.signal })).catch(reportError);
  } catch (error) {
    reportError(error);
  }
}

async function copyText(value, message = 'Copied') {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const temporary = document.createElement('textarea');
    temporary.value = value;
    temporary.style.position = 'fixed';
    temporary.style.opacity = '0';
    document.body.appendChild(temporary);
    temporary.select();
    document.execCommand('copy');
    temporary.remove();
  }
  showToast(message);
}

document.querySelector('[data-close-reset]')?.addEventListener('click', () => document.querySelector('#reset-dialog').close());
document.querySelector('[data-confirm-reset]')?.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  state = { ...defaultState, answers: {}, prompts: {} };
  document.querySelector('#reset-dialog').close();
  render();
  showToast('Your saved notes were cleared.');
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
});

render();
registerWebMcpTools();
