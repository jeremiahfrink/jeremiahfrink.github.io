const STORAGE_KEY = 'game-space-design-lab-v2';

const phases = ['Understand', 'Define', 'Explore', 'Prototype', 'Feedback', 'Refine'];

const steps = [
  {
    nav: 'Start here',
    phase: 'Understand',
    kicker: 'Before anything · Read this part',
    title: 'You are the designer. Nobody is going to hand you a room.',
    lede: 'You are about to design your own workspace, properly, and then actually build it. Not a worksheet about designing. The real room, the one you will sit in every day for the next four years.',
    why: [
      'Two things are happening here at the same time, and only one of them is about furniture.',
      'The first is real and it is yours: you end up with a space set up the way you want it, for the work you actually do. That alone is worth the afternoon.',
      'The second is the one that lasts. You are learning how to make an AI genuinely useful, which is a real skill and one that most adults currently do not have. Most people type "design me a cool gaming room" and get back something generic that could belong to anybody. That is not the AI failing. That is a person handing it nothing to work with and being disappointed by the result.',
      'The difference between those two outcomes is a small set of moves you can learn in an afternoon. This room is just the container for learning them. You will use them on code, on research, on writing, on everything, for years.'
    ],
    vocab: {
      term: 'Design thinking',
      definition: 'A working process used by architects, product teams, and game studios. Understand the problem, define it, explore options, make something you can react to, get reactions, then refine.'
    },
    dictionary: [
      {
        term: 'Why there are phases at all',
        body: 'The phases exist to stop you doing the most natural and most expensive thing, which is picking a solution in the first ten minutes and then defending it for three weeks. Each phase delays that decision a little longer so that when you finally commit, you are committing to something you actually chose.'
      },
      {
        term: 'You will move backwards, and that is correct',
        body: 'The chips along the top look like a straight line. Real projects are not. You will get to the images and realise your measurements were wrong, and go back. That is the process working, not you doing it badly.'
      }
    ],
    mainLabel: 'The bar',
    mainTitle: 'What counts as finished',
    intro: 'Not "a nice room." Here is the actual list. Read it now so you know where you are heading, and come back to it at the end.',
    actions: [
      'A design challenge written in your own words, not the AI\'s.',
      'A direction you chose, with the tradeoffs you know you accepted.',
      'Two or three generated images you can point at and say exactly what is right and what is wrong.',
      'A plan someone could shop from, in stages, with a first thing and a later thing.',
      'A note about which AI suggestions you rejected, and why.'
    ],
    nudgeTitle: 'The one rule',
    nudge: 'You are the designer. It is the assistant. If you cannot say why something is in the plan, it does not go in the plan.'
  },

  {
    nav: 'Imagine it',
    phase: 'Understand',
    kicker: 'Step 1 · Begin with you',
    title: 'Start with the space, not the screen.',
    lede: 'Before AI offers anything, notice what you already know. Designers begin by understanding the person who will use a space and what that person is trying to do.',
    why: [
      'You go first, before the AI, and this is deliberate.',
      'If you ask it first, its answer becomes your starting point, and you will spend the rest of the project reacting to somebody else\'s idea instead of developing your own. This has a name in design and psychology: anchoring. Once you have seen a suggestion, you cannot un-see it, and everything you think of afterwards quietly orbits it.',
      'There is a second reason, and it matters more later. What you write on this screen becomes the thing you measure every AI suggestion against. Without it you have no way to tell a good suggestion from a confident one.'
    ],
    vocab: {
      term: 'User and need',
      definition: 'The user is the person the design must serve. That is you. A need describes what the space should make possible, not what object to buy.'
    },
    dictionary: [
      {
        term: 'Need versus solution',
        body: '"I need a bigger desk" is a solution wearing a need\'s clothing. "I need somewhere to put a drawing tablet without moving the keyboard" is a need, and it has about five possible answers, one of which might be a bigger desk and four of which you have not thought of yet. Try to write needs at this stage. You get to pick solutions later, from a longer list.'
      },
      {
        term: 'Anchoring',
        body: 'The tendency to stay near the first number, idea, or image you encounter, even when you know it was arbitrary. It is why negotiators want to name the first price, and it is why you are writing your version before you open Gemini.'
      }
    ],
    mainLabel: 'Your move',
    mainTitle: 'Stand in the room for a few minutes',
    intro: 'Do not open Gemini yet. Actually go and stand in the space. Imagine sitting down to code, to make game art, to test something, to talk to somebody on a call, to do the parts of school you dislike.',
    actions: [
      'Notice what already works and what gets in the way.',
      'Think about what you may need now and what you may need in two years.',
      'Decide how you want the space to feel when you walk into it.'
    ],
    fields: [
      { id: 'annoyance', label: 'What already annoys you about this space?', help: 'Start here if the blank page is hard. Almost every design in history started as somebody being irritated by something.', placeholder: 'The thing that bugs me is…', type: 'textarea' },
      { id: 'vision', label: 'Complete this thought', help: 'One or two sentences is enough.', placeholder: 'I want this space to help me… and I want it to feel…', type: 'textarea' },
      { id: 'startingNotes', label: 'Anything you already imagine', help: 'A desk idea, screen arrangement, colours, storage, or something completely different.', placeholder: 'My first thoughts…', type: 'textarea' }
    ],
    stuck: [
      '<strong>"I cannot think of anything."</strong> Go and sit in the chair you would actually work in and stay there for three full minutes doing nothing. The annoyances surface on their own. Write down the first one.',
      '<strong>"My ideas feel boring."</strong> They are supposed to at this stage. A first idea that sounds impressive is usually one you borrowed from a picture. Boring and yours beats impressive and generic, because boring and yours can be developed.',
      '<strong>"I want to look at inspiration images first."</strong> Not yet, and for the same reason you are not opening Gemini yet. Fifteen minutes from now, once your version exists on this page, look at anything you like.'
    ],
    side: 'video',
    nudgeTitle: 'No perfect answer',
    nudge: 'These are starting thoughts, not promises. A design changes as you learn more, and the early version being naive is the point.'
  },

  {
    nav: 'Show the real space',
    phase: 'Understand',
    kicker: 'Step 2 · Add the reality',
    title: 'Context turns a generic idea into your design.',
    lede: 'A chatbot only knows what you put in front of it. Measurements, photographs, activities, and household constraints give the conversation something real to work with.',
    why: [
      'This is the single move that separates useful AI from useless AI, and it is worth understanding exactly why it works.',
      'The model has no eyes and no memory of your house. It produces the most likely useful answer given what you gave it. Hand it "a gaming room" and the most likely answer is an average of every gaming room on the internet, which is why it will suggest LED strips and a hexagon on the wall. Hand it nine feet by eleven, one window on the north wall, a door that swings inward and eats the corner, one outlet, and a radiator you cannot move, and suddenly the most likely answer has no choice but to be about your room.',
      'You are not making the AI smarter. You are removing its room to be generic. That is the whole trick, and it works on every task you will ever give one.'
    ],
    vocab: {
      term: 'Requirement and constraint',
      definition: 'A requirement is something the design should accomplish. A constraint is something it must work around. Constraints are not the enemy. They are what make a design specific.'
    },
    dictionary: [
      {
        term: 'Context',
        body: 'Everything you give a model to work from. More relevant context almost always beats a cleverer question. If a response feels generic, the fix is nearly never better wording, it is more facts.'
      },
      {
        term: 'Constraints are a gift',
        body: 'Designers say this constantly and it sounds like coping. It is not. Unlimited options produce paralysis and averages. A narrow room with one outlet and a door that swings in is a puzzle with a small number of good answers, and finding one of them is what makes a design feel designed instead of ordered.'
      }
    ],
    mainLabel: 'Go and look, or measure',
    mainTitle: 'Give the conversation the facts it needs',
    intro: 'Photograph from more than one direction. Measure instead of guessing, because you will be buying furniture against these numbers later. Before uploading photos, move or cover anything personal that does not belong in a chat window.',
    examples: {
      title: 'What weak and strong context actually look like',
      weak: 'I want to turn my bedroom into a gaming and coding setup. Give me some ideas.',
      strong: 'The room is 9\'2" by 11\'4", ceiling 8\'. One window centred on the long wall, 3\' wide, sill at 30". Door swings inward from the corner and blocks about 3\' of the short wall. Two outlets, both on the window wall. A radiator runs under the window and cannot be covered. I code on a laptop with one external monitor, draw with a tablet, and take video calls twice a week. The bed stays.',
      note: 'The second one is not better writing. It is the same request with facts attached, and it makes a generic answer impossible.'
    },
    fields: [
      { id: 'measurements', label: 'Room measurements', help: 'Width, length, ceiling height, and the position of the door, window, and any wall you plan to use.', placeholder: 'Width:\nLength:\nCeiling:\nDoor and window positions:', type: 'textarea' },
      { id: 'fixedFeatures', label: 'What must stay, work, or remain reachable?', help: 'Doors and which way they swing, outlets, vents, radiators, light switches, windows, and anything the household needs left alone.', placeholder: 'The design must work around…', type: 'textarea' },
      { id: 'activities', label: 'What will actually happen here?', help: 'Be specific about the work. Coding, drawing, game testing, video calls, and the school things you would rather not do but still have to.', placeholder: 'In this space I will…', type: 'textarea' }
    ],
    prompt: `Here are photographs and measurements of a room, along with what I want to do there. Before suggesting any layout, tell me what you understand and what you still cannot determine from what I gave you. Then ask me one useful question at a time. If an answer could be found by looking at or measuring the room, tell me to go and do that rather than guessing at it.\n\nMy starting vision:\n[Paste it here]\n\nMeasurements and fixed features:\n[Paste them here]\n\nWhat I will do in the space:\n[Paste it here]`,
    stuck: [
      '<strong>How to measure a room without getting it wrong.</strong> Measure at floor level, not at chest height, because walls are not straight. Write down which way the door swings and how much floor it eats when open. Count the outlets and note which wall each is on. Note where the light comes from and roughly what time of day it stops.',
      '<strong>No tape measure?</strong> Use your own foot, heel to toe, along the floor and count. Measure your foot once and multiply. It is not precise enough to buy against, but it is enough for today, and you can check the real numbers before you spend money.',
      '<strong>It asked me a question I do not know the answer to.</strong> Good. That is the prompt working. Go and find out, or tell it you do not know and ask whether it matters.'
    ],
    nudgeTitle: 'Why this matters',
    nudge: '"Make me a cool gaming space" invites a generic answer. Context is what lets an AI respond to this person, this room, and this problem.'
  },

  {
    nav: 'Define the challenge',
    phase: 'Define',
    kicker: 'Step 3 · Frame the problem',
    title: 'Decide what you are really designing for.',
    lede: 'A clear design challenge keeps the project focused without deciding the solution too early.',
    why: [
      'A design challenge exists to stop you solving the wrong problem confidently.',
      '"I need a bigger desk" is an answer pretending to be a question. It has already decided that the answer is a desk, that the desk is too small, and that buying is the move. Ask it that way and you will get desks.',
      '"How might I get enough work surface without losing floor space?" is the actual problem, and it has answers you have not considered: a fold-down surface, a shallower desk with a keyboard tray, a monitor arm that frees the whole back third, a shelf at standing height for the tablet. One of those might be better than a bigger desk and you will never meet it if you asked for desks.',
      'Writing the challenge well is the difference between a project that discovers something and a project that confirms what you already assumed.'
    ],
    vocab: {
      term: 'Design challenge',
      definition: 'A short, open question naming the user, the need, and the constraints that matter, without prescribing the answer.'
    },
    dictionary: [
      {
        term: 'How might I',
        body: 'The phrasing is not decoration. "How" assumes there is a way. "Might" makes it safe to be wrong, so you generate more options. "I" names who has to live with it. Design teams have used this exact construction for decades and it is worth using literally rather than paraphrasing.'
      },
      {
        term: 'Solutioning too early',
        body: 'Jumping to an answer before the problem is understood. It feels productive and it is the most common failure in every design field. The tell is that you are already discussing brands.'
      }
    ],
    mainLabel: 'Shape the question',
    mainTitle: 'Write a "How might I" challenge',
    intro: 'Use what you learned from the room and from the conversation. It should be broad enough to allow several different answers, and specific enough that it could only be about your room.',
    examples: {
      title: 'Three that work, three that do not',
      good: [
        'How might I fit a full coding setup into a narrow room without the door being blocked when it opens?',
        'How might I make one surface work for both typing and drawing, so I do not have to clear it every time I switch?',
        'How might I make this space feel like mine when the walls have to stay the colour they are?'
      ],
      bad: [
        { text: 'How might I buy a good gaming desk?', why: 'Already decided the answer is a desk, and that it gets bought.' },
        { text: 'How might I make my room better?', why: 'True of every room on earth. Nothing in it could guide a decision.' },
        { text: 'How might I fit an L-shaped desk with a triple monitor mount in the corner?', why: 'That is a plan, not a question. Nothing can be discovered by asking it.' }
      ]
    },
    fields: [
      { id: 'challenge', label: 'Your design challenge', help: 'One sentence. It should name what the space needs to make possible, and the constraint that makes it hard.', placeholder: 'How might I…', type: 'textarea' },
      { id: 'mustMatter', label: 'What must the final design do well?', help: 'Three to five priorities. This is the list you will judge every later idea against, so be honest about the order.', placeholder: 'The design needs to…', type: 'textarea' }
    ],
    prompt: `Help me sharpen my design challenge, and do not solve it yet. Here is my draft: [paste it]. Ask me what feels most important or unclear about it. Then offer two possible rewordings I can react to. A good design challenge names what the space needs to make possible and the constraints that matter, but does not lock me into a particular desk, monitor, or layout. Tell me if my draft has already decided the answer.`,
    stuck: [
      '<strong>Use the template.</strong> How might I ___ (what needs to be possible) without ___ (the constraint that makes it hard)? Fill in the second blank first, because the constraint is the part that makes it your room.',
      '<strong>Your draft keeps naming furniture.</strong> Ask yourself what that furniture would do for you, and put that in instead. A desk gives you surface. A shelf gives you reach. A lamp gives you light at night. Design for the verb.',
      '<strong>You have four challenges and cannot choose.</strong> Pick the one that would annoy you most if it stayed unsolved. Put the others in the notes. They are probably sub-problems of the one you picked.'
    ],
    nudgeTitle: 'Watch the difference',
    nudge: '"Buy a floating desk" is a solution. "Create enough work surface without crowding the chair" is the problem the design has to solve.'
  },

  {
    nav: 'Develop the idea',
    phase: 'Explore',
    kicker: 'Step 4 · Think in possibilities',
    title: 'Build possibilities before choosing one.',
    lede: 'Good design rarely arrives fully formed. Start with your idea, let AI extend or question it, and combine the parts that make the space work better.',
    why: [
      'Notice the order here: you hand it your idea, rather than asking it for ideas. That is on purpose and it is the difference between a co-designer and a vending machine.',
      'Ask an AI for ideas cold and you get the average of everything on the internet, which is competent and belongs to nobody. Give it yours and ask what is promising, what is risky, and what you are giving up, and you get something that builds on you.',
      'The tradeoff question is the highest-value thing you can ask any AI, and here is the uncomfortable reason. These models lean towards agreeing with you. Say "I am thinking of a corner desk" and the likely reply is a warm explanation of why corner desks are great. Say "what do I give up with a corner desk" and you get the real answer, which is that corners waste the deepest part of the surface and put your back to the door.',
      'Learn to ask the second question by reflex. It works on every model, forever, on every topic.'
    ],
    vocab: {
      term: 'Ideate and tradeoff',
      definition: 'To ideate is to generate possibilities without judging them yet. A tradeoff means gaining one thing costs you another. Every real design decision is a tradeoff, and pretending otherwise is how you end up surprised.'
    },
    dictionary: [
      {
        term: 'Models tend to agree with you',
        body: 'They are trained partly on human ratings, and humans rate agreeable answers higher. The result is a system that drifts towards telling you your idea is good. This is not a conspiracy and it is not fixable by being polite. Counter it directly: ask what you are giving up, ask what would have to be true for this to be a bad idea, and ask it to argue the opposite case.'
      },
      {
        term: 'Divergent and convergent',
        body: 'Divergent thinking widens the list. Convergent thinking narrows it. The classic mistake is doing both at once, which means judging every idea as it appears and therefore never generating a strange one. Widen first, on purpose, then narrow.'
      }
    ],
    mainLabel: 'Co-design conversation',
    mainTitle: 'Give it an idea to build from',
    intro: 'You do not need dozens of options. Explore enough variation to understand what actually matters here, then commit to the most promising direction and develop it properly.',
    actions: [
      'Start with something you are already considering, however rough.',
      'Ask what works, what is uncertain, and what the tradeoffs are.',
      'Keep, combine, change, or reject in ordinary conversation. You do not have to be formal about it.'
    ],
    fields: [
      { id: 'developingIdea', label: 'The idea you are developing', help: 'Update this as the conversation changes your thinking. It is meant to be edited.', placeholder: 'Right now I am leaning towards…', type: 'textarea' },
      { id: 'tradeoffs', label: 'Choices and tradeoffs you are weighing', help: 'For example: permanent monitor against portable monitor, work surface against chair room, storage against floor space.', placeholder: 'I am deciding between… because…', type: 'textarea' },
      { id: 'rejected', label: 'Something the AI suggested that you turned down', help: 'And why. This field matters more than it looks. Being able to say why you rejected something is the proof that you were designing rather than accepting.', placeholder: 'It suggested… and I said no because…', type: 'textarea' }
    ],
    prompt: `One idea I have is [describe your idea]. Before you create a complete design, tell me what looks promising about it and ask one question that would help develop it further. Then give me two different ways to build on the idea, connected to what I said matters most. Explain clearly what I give up in each direction. Do not tell me which to pick. I will decide what to explore next.`,
    stuck: [
      '<strong>It just agreed with everything.</strong> Expected. Say this: "Argue against my idea. What would have to be true for this to be the wrong choice?" The answer is usually far more useful than the agreement was.',
      '<strong>It gave you five options and you like none of them.</strong> Tell it exactly that, and say what is wrong with each. Rejecting things out loud is not rudeness and it is not wasted effort. It is the fastest way to communicate taste, which is the thing it cannot guess.',
      '<strong>The conversation has drifted somewhere strange.</strong> Paste your design challenge back in and ask it to evaluate the current direction against it. Drift is normal in a long chat. Re-anchoring is the fix.',
      '<strong>You are stuck between two directions.</strong> Stop trying to decide in your head. Take both into the next step and generate an image of each. Reacting to a picture is enormously easier than reasoning about a description.'
    ],
    nudgeTitle: 'Keep it conversational',
    nudge: 'Try: "build on this", "that feels too crowded", "combine those two", "what do I give up there", "argue against it".'
  },

  {
    nav: 'See the possibilities',
    phase: 'Prototype',
    kicker: 'Step 5 · Make ideas visible',
    title: 'Use images to think, not to prove.',
    lede: 'A generated image is a quick visual prototype. It helps you notice what you like, what feels wrong, and what you want to change.',
    why: [
      'Reacting is much easier than imagining. You may not be able to say what you want, but you will know instantly when a picture is wrong, and knowing what is wrong is information you can design with.',
      'Now the part you have to hold on to: a generated image is not a plan and it is not evidence. It is a picture of something that looks plausible. It does not know your measurements even when you gave them. It will widen the room because wide rooms photograph better. It will float a desk with no legs, put a lamp where there is no outlet, and draw a monitor arm clamped to thin air.',
      'This is worth meeting now, on something low stakes like a desk, because you will meet the same problem for the rest of your life in far more serious places. AI output is generated to be plausible. Plausible and true are different things, and telling them apart is on you.',
      'So: use the images to find out what you like. Then trust the tape measure over the picture, every single time.'
    ],
    vocab: {
      term: 'Prototype and iteration',
      definition: 'A prototype makes an idea visible enough to react to. Iteration means changing it based on what the reaction taught you. Prototypes are meant to be thrown away.'
    },
    dictionary: [
      {
        term: 'Fidelity',
        body: 'How finished a prototype looks. Low fidelity means a sketch on paper. High fidelity means a polished render. The trap is that high fidelity earns more trust than it deserves: a glossy image of an impossible room looks more credible than an accurate scribble, and people believe the render.'
      },
      {
        term: 'Plausible is not true',
        body: 'Image models produce what a room like yours usually looks like, not what your room can hold. The same is true of text models producing what an answer usually sounds like. Both are generating likelihood. Neither is checking reality. That is your job, and it is the single most important idea on this page.'
      }
    ],
    mainLabel: 'Create with AI',
    mainTitle: 'Co-write the image request first',
    intro: 'Ask Gemini to help you turn the design conversation into a precise image prompt before it generates anything. Then make two or three images that explore your most promising directions.',
    examples: {
      title: 'Read every image with these five questions',
      checklist: [
        'Does that furniture actually fit the measurements I gave, or did the room get wider?',
        'Is there an outlet where that lamp or monitor is plugged in?',
        'Could a real person get into and out of that chair?',
        'Does the door still open?',
        'Is anything in this picture holding itself up by magic?'
      ]
    },
    fields: [
      { id: 'imageDirection', label: 'What should the first image show?', help: 'Name the layout, the screen arrangement, materials, lighting, and anything that must stay exactly as it is.', placeholder: 'The image should show…', type: 'textarea' },
      { id: 'imageReaction', label: 'What did the images help you decide?', help: 'You do not have to evaluate everything. Capture what you want to keep and what you want to change.', placeholder: 'The part I want to keep is…\nThe part I want to change is…', type: 'textarea' },
      { id: 'imageWrong', label: 'What did the images get impossible or wrong?', help: 'Run the five questions. Listing the errors is a skill, and it is the point of this step as much as the pretty picture is.', placeholder: 'It showed… which cannot actually exist because…', type: 'textarea' }
    ],
    prompt: `Help me turn the design we have been developing into an image-generation prompt. Do not generate anything yet. First ask me about any visual choice that is still unclear. The finished prompt should include the room's real measurements, what architecture has to stay unchanged, what should be removed, the desk and screen arrangement, wall features, lighting, and the style. Also list the common mistakes an image model makes with small rooms so I know what to watch for. Keep the concept realistic for a space this size.`,
    stuck: [
      '<strong>Every image looks the same.</strong> Your prompt is describing a category rather than a room. Put the measurements and the fixed features back in, and name one thing that must be unusual about it.',
      '<strong>The room looks nothing like yours.</strong> Normal. Image models widen rooms and lengthen walls. Tell it the dimensions again and say explicitly that the space is narrow and cramped, then judge only the layout idea rather than the proportions.',
      '<strong>You like the image but cannot tell if it is possible.</strong> That is exactly the right instinct. Take the measurement, mark the floor with tape, and stand in it.',
      '<strong>You like nothing at all.</strong> Useful result, not a failed step. Write down what is wrong with each one, and you will find you have just described what you actually want.'
    ],
    nudgeTitle: 'Images bend reality',
    nudge: 'The room will look wider, the furniture will shrink, and the mounts may be impossible. Use the picture for ideas and the tape measure for decisions.'
  },

  {
    nav: 'Talk it through',
    phase: 'Feedback',
    kicker: 'Step 6 · Add another person',
    title: 'Explain the design out loud.',
    lede: 'Talking a design through reveals more than reviewing it silently. Another person can ask about your choices without taking them over.',
    why: [
      'You already know this move from the game challenge. You hand the thing to somebody and find out what they do with it, rather than what you assumed they would.',
      'The reason it works is that you cannot see your own design clearly any more. You know why every choice is there, so nothing looks confusing to you. Somebody who was not in the conversation will ask "why is the desk facing the wall?" and you will either have a real answer or discover you never decided.',
      'There is a second thing happening. Explaining out loud is a test of whether you understand your own design. If you find yourself saying "the AI suggested that", you have found a piece of the plan that is not yours yet. Either work out why it is right, or take it out.'
    ],
    vocab: {
      term: 'Feedback',
      definition: 'Questions and reactions that help a designer see how an idea might work for other people or in the real setting. Feedback is information, not a verdict.'
    },
    dictionary: [
      {
        term: 'The curse of knowledge',
        body: 'Once you know something, you cannot imagine not knowing it. It is why you cannot see what is confusing about your own work, and it is not a flaw you can train away. Every creative field has some version of the same fix: show it to somebody who was not there, and listen.'
      },
      {
        term: 'Feedback is not instruction',
        body: 'The listener is not choosing your room. Their job is to ask questions and notice things. Your job is to decide what to do about it. Keeping a design after good feedback is a legitimate outcome as long as you can say why.'
      }
    ],
    mainLabel: 'Leave the chatbot for a moment',
    mainTitle: 'Show somebody what you are making, and why',
    intro: 'Show your preferred images and explain the design. They are not choosing the room. Their job is to ask useful questions.',
    actions: [
      'Explain what you will do in the space and why the layout supports it.',
      'Point out which parts of the AI images are accurate and which are fiction.',
      'Say what should happen first and what could be added later.'
    ],
    fields: [
      { id: 'feedback', label: 'A question or comment worth taking seriously', help: 'Only record the ones that might actually change something.', placeholder: 'Someone asked or noticed…', type: 'textarea' },
      { id: 'afterFeedback', label: 'What, if anything, do you want to reconsider?', help: 'Keeping the plan unchanged is fine when you have a reason. Write the reason.', placeholder: 'After talking it through…', type: 'textarea' }
    ],
    stuck: [
      '<strong>Nobody is around.</strong> Record yourself explaining the design for three minutes as if to somebody who has never heard about it, then watch it back the next day. The gap between what you meant and what you said will be visible and slightly painful, which is how you know it worked.',
      '<strong>Nobody is around and you want to do it now.</strong> Second best: paste your plan into Gemini and tell it to ask you five hard questions about it and give no suggestions whatsoever. Less good than a person, because it will not be confused in the ways a person would be, but not nothing.',
      '<strong>They said something you disagree with.</strong> Excellent, write down why. That disagreement is you having a design opinion, which is the thing this whole exercise is trying to grow.'
    ],
    nudgeTitle: 'Questions for your listener',
    nudge: 'Ask them: why that choice, does the measurement work, what might get annoying after a month, which part looks best, what still needs checking.'
  },

  {
    nav: 'Make the plan',
    phase: 'Refine',
    kicker: 'Step 7 · Decide what comes next',
    title: 'Turn the direction into a plan.',
    lede: 'Refining means keeping what belongs, removing what does not, and making the next steps concrete enough to act on.',
    why: [
      'A design that stays a conversation is a design that never happens. This step turns it into something a person could shop from, in an order, with money.',
      'Two things matter here more than they look. The first is staging: a first thing, a next thing, and a later thing. Everything at once is how projects stall, because the expensive item blocks the cheap items that would have made the room usable this month.',
      'The second is verification. Anything an AI told you about a product, a dimension, or whether two things fit together is a claim, not a fact. Every one of those has to be checked against a real product page or a real tape measure before money moves. Mark them so you know which is which.'
    ],
    vocab: {
      term: 'Refine and implement',
      definition: 'Refining resolves the choices that are still open. Implementing turns those choices into actions with an order and a cost.'
    },
    dictionary: [
      {
        term: 'Staging',
        body: 'Doing a project in deliberate phases so that each phase leaves you something usable. A room that is eighty percent finished and functional beats a room waiting on one perfect desk that has not shipped.'
      },
      {
        term: 'Verify before you spend',
        body: 'Check the actual dimensions on the seller\'s current page, not a summary of it. Check the mount fits your monitor\'s pattern. Check the return policy. This is boring, it takes four minutes, and it is the difference between a plan and an expensive surprise.'
      }
    ],
    mainLabel: 'Your final direction',
    mainTitle: 'Capture the decisions that make the space yours',
    intro: 'This is not an architectural drawing. It is a practical guide for choosing the desk, arranging the equipment, and building the space in stages you can actually afford and finish.',
    fields: [
      { id: 'deskPlan', label: 'Desk and chair', help: 'Type, approximate dimensions, where it goes, and anything that matters about comfort or mounting.', placeholder: 'Desk:\nChair:', type: 'textarea' },
      { id: 'screenPlan', label: 'Computer and screens', help: 'Laptop, monitor, portable monitor, arms, docks, controller, cable routing.', placeholder: 'The setup will use…', type: 'textarea' },
      { id: 'wallPlan', label: 'Walls, lighting, storage, personality', help: 'Only what supports the work or genuinely makes it feel like yours.', placeholder: 'On the walls…\nFor lighting…\nFor storage…', type: 'textarea' },
      { id: 'nextSteps', label: 'What happens first, and what can wait?', help: 'First, next, later. Each stage should leave the room more usable than it was.', placeholder: 'First:\nNext:\nLater:', type: 'textarea' },
      { id: 'toVerify', label: 'What still has to be checked before anything is bought?', help: 'Every dimension, mount pattern, and "these two things fit together" claim goes here.', placeholder: 'Before buying I need to confirm…', type: 'textarea' }
    ],
    prompt: `I have decided what I want. Help me organise my choices into a simple workspace plan. Use only the decisions I gave you or that we made together. Do not add new features unless you ask me first. Clearly mark anything that still needs a measurement or a product check before I buy it, and separate the plan into a first stage, a next stage, and a later stage.`,
    stuck: [
      '<strong>The plan is more expensive than what you have.</strong> Then the staging is the plan. Ask what the cheapest version that still solves the design challenge is, and make that stage one.',
      '<strong>You cannot decide between two products.</strong> Go back to your priorities list from step 3 and check both against it in order. If they tie on every priority, they are the same product and you should buy the cheaper one.',
      '<strong>It keeps adding things you did not ask for.</strong> Say so, plainly: "remove anything I did not decide on, and list what you removed." Then look at that list, because occasionally one of them was a good idea.'
    ],
    side: 'summary',
    nudgeTitle: 'Before buying',
    nudge: 'Verify the exact dimensions, the mounting requirements, and the return policy on the seller\'s current page. Not on a summary of it.'
  }
];

const defaultState = { currentStep: 0, answers: {}, prompts: {}, updatedAt: null };

let state = loadState();
let toastTimer;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState, ...saved, answers: saved?.answers || {}, prompts: saved?.prompts || {} };
  } catch {
    return { ...defaultState, answers: {}, prompts: {} };
  }
}

function saveState() {
  state.updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable; notes stay for this session only */
  }
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
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

function renderWhy(step) {
  if (!step.why?.length) return '';
  return `<section class="why-block">
    <p class="why-label">Why you are doing this</p>
    ${step.why.map(paragraph => `<p>${paragraph}</p>`).join('')}
  </section>`;
}

function renderDictionary(step) {
  if (!step.dictionary?.length) return '';
  return step.dictionary.map(entry => `<details class="expander dict">
    <summary>${entry.term}</summary>
    <div class="expander-body"><p>${entry.body}</p></div>
  </details>`).join('');
}

function renderExamples(step) {
  const ex = step.examples;
  if (!ex) return '';
  let body = '';

  if (ex.weak || ex.strong) {
    body += `<p class="example-tag weak">Weak</p><blockquote class="example weak">${ex.weak}</blockquote>
      <p class="example-tag strong">Strong</p><blockquote class="example strong">${ex.strong}</blockquote>
      ${ex.note ? `<p class="example-note">${ex.note}</p>` : ''}`;
  }
  if (ex.good) {
    body += `<p class="example-tag strong">These work</p><ul class="example-list good">${ex.good.map(item => `<li>${item}</li>`).join('')}</ul>`;
  }
  if (ex.bad) {
    body += `<p class="example-tag weak">These do not</p><ul class="example-list bad">${ex.bad.map(item => `<li>${item.text}<span>${item.why}</span></li>`).join('')}</ul>`;
  }
  if (ex.checklist) {
    body += `<ol class="example-list checklist">${ex.checklist.map(item => `<li>${item}</li>`).join('')}</ol>`;
  }

  return `<details class="expander examples">
    <summary>${ex.title}</summary>
    <div class="expander-body">${body}</div>
  </details>`;
}

function renderStuck(step) {
  if (!step.stuck?.length) return '';
  return `<details class="expander stuck">
    <summary>Stuck on this step?</summary>
    <div class="expander-body">
      <ul class="stuck-list">${step.stuck.map(item => `<li>${item}</li>`).join('')}</ul>
    </div>
  </details>`;
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
        <label for="step-prompt"><strong>Prompt starter</strong> · this is a draft, change it before you use it</label>
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
    ${renderExamples(step)}
    ${fields}
    ${prompt}
    ${renderStuck(step)}
  </section>`;
}

function renderVideoCard() {
  return `<a class="micro-card video-link" href="https://www.youtube.com/watch?v=ldYzbV0NDp8" target="_blank" rel="noopener">
    <div class="video-thumb" aria-hidden="true"><span class="play-button">&#9654;</span></div>
    <h3>Optional quick watch</h3>
    <p><strong>What is Design Thinking?</strong><br />A short introduction from IDEO U. Useful, not required.</p>
  </a>`;
}

function getSummaryItems() {
  const ids = [
    ['vision', 'The space should help me'],
    ['challenge', 'Design challenge'],
    ['mustMatter', 'What matters most'],
    ['developingIdea', 'Chosen direction'],
    ['tradeoffs', 'Tradeoffs I accepted'],
    ['rejected', 'What I turned down, and why'],
    ['imageWrong', 'What the images got wrong'],
    ['afterFeedback', 'What feedback changed'],
    ['deskPlan', 'Desk and chair'],
    ['screenPlan', 'Computer and screens'],
    ['wallPlan', 'Walls, lighting, storage'],
    ['nextSteps', 'Next steps'],
    ['toVerify', 'To verify before buying']
  ];
  return ids.map(([id, label]) => ({ label, value: state.answers[id]?.trim() || 'Not decided yet' }));
}

function renderSummaryCard() {
  return `<section class="micro-card">
    <h3>Your design at a glance</h3>
    <p>This builds itself from what you saved as you went.</p>
    <div class="final-summary">
      ${getSummaryItems().map(item => `<div class="summary-item"><strong>${item.label}</strong><span>${escapeHtml(item.value)}</span></div>`).join('')}
    </div>
    <div class="button-row" style="margin-top: 1rem;">
      <button class="button" data-export>Download the plan</button>
      <button class="button secondary" data-print>Print</button>
    </div>
    <p class="sidebar-note" style="margin-top:.6rem">Download gives you a text file. Put it in Drive so it is not stuck on this device.</p>
  </section>`;
}

function renderAside(step) {
  const primary = step.side === 'video' ? renderVideoCard() : step.side === 'summary' ? renderSummaryCard() : '';
  const dictionary = renderDictionary(step);
  return `<aside class="aside-stack">
    ${primary}
    <section class="micro-card">
      <h3>${step.nudgeTitle}</h3>
      <p>${step.nudge}</p>
    </section>
    ${dictionary ? `<section class="micro-card"><h3>Worth knowing</h3>${dictionary}</section>` : ''}
    ${state.currentStep > 0 && state.currentStep < steps.length - 1
      ? `<section class="micro-card"><h3>Pick the next useful move</h3><p>Keep talking to the AI, stop and think, go and look at the room, or find a person. The tool should follow the need, not the other way round.</p></section>`
      : ''}
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
          ${steps.map((item, index) => `<button class="stage-button ${index === state.currentStep ? 'active' : ''}" data-step="${index}" ${index === state.currentStep ? 'aria-current="step"' : ''}><span class="stage-number">${index === 0 ? '&#9733;' : index}</span><span class="stage-name">${item.nav}</span></button>`).join('')}
        </nav>
        <div class="sidebar-tools">
          <button class="button" data-open-help>How to work with the AI</button>
          <a class="button secondary" href="https://gemini.google.com/" target="_blank" rel="noopener">Open Gemini</a>
          <button class="button ghost" data-open-reset>Start over</button>
        </div>
        <p class="sidebar-note">Your notes stay in this browser on this device. The Gemini conversation is separate. Download the plan at the end so it is not trapped here.</p>
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

          ${renderWhy(step)}

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

function buildExport() {
  const lines = ['# Game Space Design Lab', `Exported ${new Date().toLocaleString()}`, ''];
  getSummaryItems().forEach(item => {
    lines.push(`## ${item.label}`, item.value, '');
  });
  const extras = [
    ['annoyance', 'What annoyed me about the space to begin with'],
    ['startingNotes', 'First thoughts, before any AI'],
    ['measurements', 'Room measurements'],
    ['fixedFeatures', 'Fixed features'],
    ['activities', 'What happens in the space'],
    ['imageDirection', 'Image direction'],
    ['imageReaction', 'What the images helped me decide'],
    ['feedback', 'Feedback worth taking seriously']
  ];
  lines.push('---', '', '## Working notes', '');
  extras.forEach(([id, label]) => {
    const value = state.answers[id]?.trim();
    if (value) lines.push(`### ${label}`, value, '');
  });
  return lines.join('\n');
}

function downloadPlan() {
  const blob = new Blob([buildExport()], { type: 'text/markdown' });
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = 'game-space-design-plan.md';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(anchor.href), 2000);
  showToast('Downloaded. Put it in Drive so it is not stuck on this device.');
}

function bindPageEvents() {
  document.querySelectorAll('[data-step]').forEach(button => {
    button.addEventListener('click', () => goToStep(Number(button.dataset.step)));
  });

  document.querySelector('[data-prev]')?.addEventListener('click', () => goToStep(Math.max(0, state.currentStep - 1)));
  document.querySelector('[data-next]')?.addEventListener('click', () => {
    if (state.currentStep === steps.length - 1) {
      document.querySelector('[data-export]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('Your plan is ready to download or print.');
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
    copyText(document.querySelector('[data-prompt-index]').value, 'Copied. Change anything you want before you send it.');
  });

  document.querySelector('[data-open-reset]')?.addEventListener('click', () => document.querySelector('#reset-dialog').showModal());
  document.querySelector('[data-open-help]')?.addEventListener('click', () => document.querySelector('#help-dialog').showModal());
  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
  document.querySelector('[data-export]')?.addEventListener('click', downloadPlan);
}

function goToStep(index) {
  state.currentStep = Math.min(Math.max(index, 0), steps.length - 1);
  saveState();
  render();
  document.querySelector('#workspace')?.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
document.querySelector('[data-close-help]')?.addEventListener('click', () => document.querySelector('#help-dialog').close());
document.querySelector('[data-confirm-reset]')?.addEventListener('click', () => {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
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
