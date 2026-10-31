import { Topic } from '../types';

export const TOPICS_L4_6: Topic[] = [
  // ==================== LEVEL 4 ====================
  {
    id: 't08',
    indexNum: 8,
    levelId: 4,
    orderInLevel: 1,
    title: 'How training works',
    friendlyTitle: 'How Neural Nets Actually Learn',
    summaryQuestion: 'How do millions of tiny dials tune themselves—and why does cramming ruin them?',
    icon: 'pulse',
    nextLessonBridge: 'Now you see how dials update—next, see why wiring them as Transformers changed the world!',
    scenes: [
      {
        bridge: 'Welcome to Level 04! Step inside a Neural Network during school time.',
        headline: 'Guess -> Score Mistake -> Send Blame Backward -> Nudge Every Dial',
        plainText: 'Watch one single study photo ("Fluffy Dog") pass through the 4-step learning loop—turn any step OFF to see what stalls:',
        widget: {
          kind: 'pipeline',
          requestText: 'Study Flashcard #1: Photo of a Golden Retriever (True Label: "Dog")',
          stations: [
            {
              name: '1. Forward Pass',
              role: 'Current random dials make a first guess',
              defaultOn: true,
              whenOffOutput: 'No guess made — network sits silent.',
              whenOffProblem: 'Learning starts by making a concrete guess first (e.g., "60% Cat, 40% Dog").',
            },
            {
              name: '2. Loss Score',
              role: 'Measures exact distance from truth',
              defaultOn: true,
              whenOffOutput: 'Guessed "Cat" — nobody told it that was wrong!',
              whenOffProblem: 'Without a Loss number scoring the error, dials never know whether to change.',
            },
            {
              name: '3. Backpropagation',
              role: 'Traces which earlier dials caused the miss',
              defaultOn: true,
              whenOffOutput: 'Knows it missed, has zero idea which of 10M dials caused it!',
              whenOffProblem: 'Backprop traces blame backward layer-by-layer so guilty dials get nudged.',
            },
          ],
          allOnOutput: 'Nudged guilty dials 0.001 toward "Dog" -> Next guess: "82% Dog!"',
          allOnWhy: 'Repeat this tiny nudge across millions of flashcards (batches & epochs) and raw static becomes intelligence.',
        },
      },
      {
        bridge: 'What happens if the student studies the exact same 100 flashcards 500 times in a row?',
        headline: 'The Cramming Trap (Overfitting): Memorizing Coffee Stains!',
        plainText: 'Slide from Under-studied -> Balanced -> Overfit Crammed and watch Practice Score vs. Unseen Exam Score:',
        widget: {
          kind: 'slider',
          dialLabel: 'Slide Training Rounds (Epochs)',
          stops: [
            {
              label: '1 Round (Underfitting)',
              tag: 'Barely glanced at book',
              sampleInput: 'Practice Book: 52% · Unseen Exam: 50%',
              sampleOutput: 'Guesses blurry shapes — needs more study.',
              verdict: 'bad',
              why: 'Too few rounds or too tiny a brain misses the core pattern.',
            },
            {
              label: '25 Rounds (Sweet Spot!)',
              tag: 'Early Stopping Peak',
              sampleInput: 'Practice Book: 94% · Unseen Exam: 93%',
              sampleOutput: 'Learned ears, snout & fur — aces brand-new dog photos!',
              verdict: 'good',
              why: 'Generalization on brand-new unseen photos is the ONLY real win!',
            },
            {
              label: '300 Rounds (Overfitting!)',
              tag: 'Memorized page numbers!',
              sampleInput: 'Practice Book: 100.0% · Unseen Exam drops to 61%!',
              sampleOutput: 'Memorized background wallpaper of study photos — fails on new grass!',
              verdict: 'bad',
              why: 'When Practice hits 100% while Unseen Exam worsens, STOP EARLY!',
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Forward Pass, Loss & Backpropagation', plain: 'Make a guess -> score the mistake -> trace blame backward -> nudge dials downhill.', example: 'Repeating millions of tiny dial nudges.' },
      { title: 'Parameters (Learned Dials) vs. Hyperparameters (Your Settings)', plain: 'Weights learned automatically vs. settings YOU pick first (like step size / learning rate).', example: 'Step size too big = overshoots cliff; too tiny = stalls.' },
      { title: 'Underfitting, Overfitting & Early Stopping', plain: 'Too simple vs. memorizing quirks vs. stopping right when unseen test accuracy peaks.', example: 'Saving checkpoints at peak test score.' },
    ],
    resources: [
      { title: 'What is Backpropagation Really Doing?', type: 'video', source: '3Blue1Brown', duration: '14m video', url: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U', why: 'Visualizes blame flowing backward through layers.' },
      { title: 'Play With Live Neurons in Browser', type: 'text', source: 'TensorFlow Playground', duration: '6m interactive', url: 'https://playground.tensorflow.org/', why: 'Click Play and watch real network wires thicken as error drops.' },
    ],
  },

  {
    id: 't09',
    indexNum: 9,
    levelId: 4,
    orderInLevel: 2,
    title: 'Neural-network architectures',
    friendlyTitle: 'Blueprints & Why Transformers Won',
    summaryQuestion: 'How does "Attention" let AI understand a 50-page story without forgetting page 1?',
    icon: 'network',
    nextLessonBridge: 'Inside those Transformer layers lives a secret map where French, English, and photos meet—next!',
    scenes: [
      {
        bridge: 'From Lesson 12: Dials learn by nudging — now see how wiring dials differently unlocks photos, molecules, and books.',
        headline: 'Why Attention (Transformers) beat older word-by-word readers',
        plainText: 'Read: "The trophy didn’t fit the suitcase because IT was too big." What is "IT"? Test Old Reader vs. Transformer Attention:',
        widget: {
          kind: 'tester',
          promptLabel: 'Figure out what "IT" points to in two nearly identical sentences',
          modes: [
            { name: 'Old Step-by-Step RNN', badge: 'Reads 1 word through a tiny straw' },
            { name: 'Transformer (Attention)', badge: 'Every word spotlights any word at once' },
          ],
          cases: [
            {
              name: '"...suitcase because IT was too BIG"',
              detail: 'Last word is "big"',
              results: [
                { pass: false, output: 'Forgets page 1 when sentences get long!', why: 'Older sequential chains lost early clues across long paragraphs.' },
                { pass: true, output: 'Spotlights "IT" <-> "BIG" <-> "TROPHY" (The trophy was too big!)', why: 'Attention links "IT" directly back to "trophy" in 1 parallel jump!' },
              ],
            },
            {
              name: '"...suitcase because IT was too SMALL"',
              detail: 'Only the last word changed to "small"!',
              results: [
                { pass: false, output: 'Confuses trophy and suitcase', why: 'Weak long-range link.' },
                { pass: true, output: 'Spotlights "IT" <-> "SMALL" <-> "SUITCASE" instantly!', why: 'Changing 1 word flips Attention’s spotlight cleanly across the sentence.' },
              ],
            },
          ],
        },
      },
      {
        bridge: 'Do Transformers replace every other blueprint? Meet the 3 specialist blueprints:',
        headline: 'Match the Blueprint to the Shape of Your World',
        plainText: 'Compare Vision Grids (CNNs), Graph Webs (GNNs), and Mixture-of-Experts (MoE):',
        widget: {
          kind: 'compare',
          scenario: 'Picking the cleanest wiring shape for 3 real jobs',
          cards: [
            {
              name: 'CNN (Grid Window)',
              tag: '2D Camera Pixels',
              output: 'Slides tiny magnifying windows over pixels -> spots edges, wheels, faces on a tiny watch chip!',
              speed: 'Ultra-fast',
              cost: 'Tiny RAM',
              best: false,
              why: 'Built specifically for 2D/3D spatial grids on edge cameras.',
            },
            {
              name: 'GNN (Node & Bond Web)',
              tag: 'Molecules & Maps',
              output: 'Passes messages along chemical bonds between atoms -> predicts drug properties!',
              speed: 'Fast',
              cost: 'Low',
              best: false,
              why: 'Molecules and social networks are webs, not flat lines of text.',
            },
            {
              name: 'Mixture-of-Experts (MoE)',
              tag: 'Modern Giant LLMs',
              output: 'Splits brain into 16 specialists; wakes up ONLY 2 per word -> huge knowledge at 1/5th cost!',
              speed: 'Fast',
              cost: 'Smart savings',
              best: true,
              why: 'How frontier models stay brilliant without running 100% of their weights on every word.',
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Attention & Transformers', plain: 'Letting every word look directly at any related word across pages in parallel on GPUs.', example: 'Linking pronouns and code variables 5,000 words apart.' },
      { title: 'CNNs (Grids), GNNs (Graphs) & SSMs (Streams)', plain: 'Patch-scanners for cameras, node-webs for molecules/maps, and fast constant-memory streams.', example: 'Matching architecture to data geometry.' },
      { title: 'Mixture-of-Experts (MoE)', plain: 'Routing each token to only a small specialist slice of a giant brain for fast, cheap answers.', example: 'Math token wakes Math expert; French wakes Language expert.' },
    ],
    resources: [
      { title: 'Transformers & Attention Explained Visually', type: 'video', source: '3Blue1Brown', duration: '27m video', url: 'https://www.youtube.com/watch?v=wjZofJX0v4M', why: 'The clearest visual animation of Attention ever made.' },
      { title: 'The Illustrated Transformer', type: 'text', source: 'Jay Alammar', duration: '12m visual read', url: 'https://jalammar.github.io/illustrated-transformer/', why: 'Clean step-by-step diagrams of how words connect.' },
    ],
  },

  {
    id: 't10',
    indexNum: 10,
    levelId: 4,
    orderInLevel: 3,
    title: 'Representations and latent spaces',
    friendlyTitle: 'Embeddings: Where Words & Photos Meet',
    summaryQuestion: 'How can typing "dog on beach" find a photo that has ZERO text labels on it?',
    icon: 'layers',
    nextLessonBridge: 'Models build rich hidden maps—next, can humans peek inside to see if the AI is secretly cheating?',
    scenes: [
      {
        bridge: 'From Lesson 13: Inside deep layers, words and photos turn into coordinates on ONE shared Meaning Atlas.',
        headline: 'Embeddings match MEANING even when zero words match!',
        plainText: 'Test old Ctrl+F Keyword Search vs. AI Embedding Search on your phone photo gallery & helpdesk:',
        widget: {
          kind: 'tester',
          promptLabel: 'Search with natural human thoughts',
          modes: [
            { name: 'Old Exact Keyword Search', badge: 'Checks exact letters only' },
            { name: 'Shared Embedding Map', badge: 'Matches meaning coordinates' },
          ],
          cases: [
            {
              name: 'Customer types: "My screen is spiderwebbed"',
              detail: 'Help article is titled: "Cracked Display Replacement"',
              results: [
                { pass: false, output: '0 Results Found! (Word "spiderwebbed" missing)', why: 'Exact spelling misses synonyms completely.' },
                { pass: true, output: 'Top Hit: "Cracked Display Replacement" (96% match!)', why: 'Both phrases land on the exact same broken-screen coordinate!' },
              ],
            },
            {
              name: 'Search unlabeled camera roll: "Golden retriever in waves"',
              detail: '4,000 raw phone photos with filenames IMG_4021.JPG',
              results: [
                { pass: false, output: '0 Results Found! (Filenames only say IMG_...)', why: 'Cannot see inside raw pixels.' },
                { pass: true, output: 'Finds exact beach dog photo in 0.02 seconds!', why: 'Multimodal embeddings place the photo and the English words on the same map spot!' },
              ],
            },
          ],
        },
      },
      {
        bridge: 'One giant trap catches teams who upgrade their embedding model without knowing this rule:',
        headline: 'Never mix coordinates from two different maps!',
        plainText: 'Tap to inspect why upgrading half a database breaks search—and how compressed "Latent Space" speeds up image AI:',
        widget: {
          kind: 'spotter',
          instruction: 'Tap the broken setup (or turn on Map Inspector)',
          xrayLabel: 'Map Inspector',
          items: [
            {
              title: 'Compressed Latent Sketchpad',
              preview: 'Image generators shrink 3 million raw pixels into a tiny "latent" essence grid, edit fast, then expand.',
              hiddenTruth: 'Smart! Runs 50x faster than pushing raw noisy pixels around.',
              isTrap: false,
            },
            {
              title: 'Mixed Model v1 + Model v2 Vectors',
              preview: 'Old PDFs indexed with Map v1; new PDFs indexed with Map v2 inside the SAME search table!',
              hiddenTruth: 'TRAP! Model v1’s "Dog" coordinate might sit where Model v2 puts "Tractor"—always re-index everything together!',
              isTrap: true,
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Embeddings & Semantic Search', plain: 'Turning sentences/items into meaning coordinates so synonyms and ideas match with zero shared words.', example: '"Forgot PIN" matches "Password reset".' },
      { title: 'Multimodal Shared Space', plain: 'Mapping photos, audio, and 50 languages onto the same coordinate room.', example: 'Searching video clips using plain text.' },
      { title: 'Compressed Latent Space', plain: 'Working inside a compact summary of core traits (pose, lighting, object) instead of millions of raw pixels.', example: 'Powers fast Stable Diffusion & video AI.' },
    ],
    resources: [
      { title: 'Word Embeddings Clearly Explained', type: 'video', source: 'StatQuest with Josh Starmer', duration: '16m video', url: 'https://www.youtube.com/watch?v=viZrOnJclY0', why: 'Visualizes meaning coordinates with fun everyday words.' },
      { title: 'Activation Atlas — Zoom Inside Vision AI', type: 'text', source: 'Distill.pub Interactive', duration: '9m interactive', url: 'https://distill.pub/2019/activation-atlas/', why: 'Explore a live zoomable map of what hidden layers see.' },
    ],
  },

  {
    id: 't29',
    indexNum: 29,
    levelId: 4,
    orderInLevel: 4,
    title: 'Interpretability and learning theory',
    friendlyTitle: 'Peeking Inside the Black Box',
    summaryQuestion: 'How did a hospital AI score 95% on cancer scans by secretly reading a plastic ruler?!',
    icon: 'eye',
    nextLessonBridge: 'Level 04 complete! Beat the Deep Network Trial to clear the fog on Level 05: Language, Prompts & RAG!',
    scenes: [
      {
        bridge: 'From Lesson 14: Deep nets build hidden features — sometimes they grab hilariously wrong lazy shortcuts!',
        headline: 'Real True Story: The AI that spotted "skin cancer" by looking for a purple ruler!',
        plainText: 'Doctors put rulers next to suspicious moles before taking photos. Turn on Attention Heatmap X-Ray to see what the AI actually learned:',
        widget: {
          kind: 'spotter',
          instruction: 'Turn on Heatmap X-Ray to inspect what drove each AI decision!',
          xrayLabel: 'Heatmap X-Ray',
          items: [
            {
              title: 'Skin Mole Photo AI (95% Lab Score!)',
              preview: 'Predicts "Malignant!" with 98% confidence on clinic test photo.',
              hiddenTruth: 'SHORTCUT TRAP! Heatmap glows 94% on the doctor’s plastic ruler markings—completely ignoring the skin!',
              isTrap: true,
            },
            {
              title: 'Asking Chatbot "Why did you pick Candidate A?"',
              preview: 'Chatbot replies smoothly: "I weighed her 6 years of Python experience objectively."',
              hiddenTruth: 'TRAP! Flipping only the name at top flipped the verdict—spoken excuses are plausible stories, NOT weight X-rays!',
              isTrap: true,
            },
            {
              title: 'Counterfactual + Feature Circuit Check',
              preview: 'Deleted ruler from photo & tested exact "what smallest change flips No -> Yes?"',
              hiddenTruth: 'REAL PROOF! Testing actual input flips + probing internal circuits exposes real causes.',
              isTrap: false,
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Shortcut Learning & Heatmaps (Saliency / SHAP)', plain: 'Checking which exact pixels or columns pushed a decision up or down to catch lazy cheats.', example: 'Catching an X-ray AI reading hospital corner tags.' },
      { title: 'Mechanistic Interpretability (Brain Circuits)', plain: 'Mapping specific internal neuron clusters to real concepts (like "flattery" or "bridges").', example: 'Dialing internal features up/down in lab tests.' },
      { title: 'Why Spoken Explanations Can Mislead', plain: 'An AI’s written justification is generated after-the-fact text, not a guaranteed readout of its math.', example: 'Always test by changing one variable and checking if the answer flips.' },
    ],
    resources: [
      { title: 'Inside the Mind of an AI (Feature Circuits)', type: 'video', source: 'Anthropic Research', duration: '11m video', url: 'https://www.youtube.com/watch?v=UGO_Ehywuxc', why: 'Watch scientists dial real internal concepts up and down inside Claude.' },
      { title: 'Mapping the Mind of a Large Language Model', type: 'text', source: 'Anthropic', duration: '10m read', url: 'https://www.anthropic.com/research/mapping-mind-language-model', why: 'Plain-English tour inside modern neural features.' },
      { title: 'Interpretable Machine Learning (Visual Stories)', type: 'text', source: 'Christoph Molnar', duration: '10m read', url: 'https://christophm.github.io/interpretable-ml-book/interpretability-importance.html', why: 'Real stories of black-box shortcuts and how to inspect them.' },
    ],
  },

  // ==================== LEVEL 5 ====================
  {
    id: 't11',
    indexNum: 11,
    levelId: 5,
    orderInLevel: 1,
    title: 'Language and text models',
    friendlyTitle: 'How Chatbots Read & Speak (Tokens)',
    summaryQuestion: 'Why do chatbots chop words into puzzle pieces, and what does the "Temperature" dial really do?',
    icon: 'message',
    nextLessonBridge: 'Now you see how an LLM speaks one piece at a time—next, see what it takes to build a giant base brain!',
    scenes: [
      {
        bridge: 'Welcome to Level 05! Let’s watch how ChatGPT/Claude/Gemini actually turn words into answers.',
        headline: 'LLMs don’t read letters — they read word-chunks called Tokens!',
        plainText: 'And they pick the next chunk using a randomness dial called Temperature. Slide Temperature on a real weather alert:',
        widget: {
          kind: 'slider',
          dialLabel: 'Drag Temperature Dial on: "Write a 1-line rain alert for 4 PM"',
          stops: [
            {
              label: 'Temp 0.0 (Strict & Exact)',
              tag: 'Always picks #1 highest-odds token',
              sampleInput: 'Tokens in: [Write] [rain] [alert] [4] [PM]',
              sampleOutput: '"Rain starts at 4:00 PM today. Please carry an umbrella."',
              verdict: 'good',
              why: 'Use Temp 0.0–0.2 for code, data extraction, math, and strict JSON—same clean output every run!',
            },
            {
              label: 'Temp 0.7 (Natural Variety)',
              tag: 'Balanced creative dice',
              sampleInput: 'Tokens in: [Write] [rain] [alert] [4] [PM]',
              sampleOutput: '"Grab a jacket before heading out—showers roll in right around 4 PM!"',
              verdict: 'good',
              why: 'Great for warm writing, brainstorming titles, and natural conversation.',
            },
            {
              label: 'Temp 1.4 (Wild Chaos!)',
              tag: 'Picks weird low-probability tokens',
              sampleInput: 'Tokens in: [Write] [rain] [alert] [4] [PM]',
              sampleOutput: '"Cloud soup splashes 4pm velvet frogs—umbrella tango!!"',
              verdict: 'bad',
              why: 'Cranking Temperature too high derails grammar and invents wild hallucinations!',
            },
          ],
        },
      },
      {
        bridge: 'Why does a super-articulate chatbot confidently invent a fake lawyer case or fumble 9-digit multiplication?',
        headline: 'Plausible-sounding next words != Verified facts or calculators',
        plainText: 'Test a Bare Chatbot vs. a Grounded + Tool-Connected Chatbot on two everyday traps:',
        widget: {
          kind: 'tester',
          promptLabel: 'Test Bare Next-Token Guessing vs. Grounding + Tools',
          modes: [
            { name: 'Bare LLM Alone', badge: 'Guesses plausible words from memory' },
            { name: 'LLM + Tool Calling + Schema', badge: 'Calls calculator/search & locks JSON' },
          ],
          cases: [
            {
              name: 'Multiply 84,917 x 63,209',
              detail: 'Exact arithmetic check',
              results: [
                { pass: false, output: 'Guesses "5,367,412,553" (Looks right, off by 864,000!)', why: 'Predicting digits by vibe fails on big math!' },
                { pass: true, output: 'Calls calculator tool -> Exact: 5,367,518,653', why: 'Tool calling delegates exact jobs to exact tools.' },
              ],
            },
            {
              name: 'Cite 2026 Airline Baggage Fee for Flight PK-302',
              detail: 'Specific changing rule',
              results: [
                { pass: false, output: 'Invents smooth-sounding "$35 first bag" (Hallucination!)', why: 'Bare models stitch realistic airline words together when unsure.' },
                { pass: true, output: 'Reads live airline page -> returns verified JSON `{ "kg": 20 }`', why: 'Grounding + Structured JSON prevents invented answers and app crashes.' },
              ],
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Tokens & Context Window', plain: 'Sub-word chunks (~0.75 words each) and the short-term desk size (e.g. 200k tokens) the model can see at once.', example: '"unbelievable" splits into [un][believ][able].' },
      { title: 'Next-Token Prediction & Temperature', plain: 'Scoring every possible next token and rolling controlled dice (0 = strict, 0.8 = creative).', example: 'Temp 0 for JSON/SQL; Temp 0.7 for stories.' },
      { title: 'Hallucinations, Grounding & Tool Calling', plain: 'Models predict plausible words, not truth—pair them with source text (grounding) and calculators/APIs (tools).', example: 'Never let bare memory guess medical dosages.' },
    ],
    resources: [
      { title: 'Large Language Models Explained Briefly (8 Min)', type: 'video', source: '3Blue1Brown', duration: '8m video', url: 'https://www.youtube.com/watch?v=LPZh9BOjkQs', why: 'Best 8-minute visual explanation of language models on the internet.' },
      { title: 'Type Any Sentence & See Real Tokens Live', type: 'text', source: 'Tiktokenizer', duration: '4m interactive', url: 'https://tiktokenizer.vercel.app/', why: 'Watch your own words chop into colored token chunks instantly.' },
    ],
  },

  {
    id: 't12',
    indexNum: 12,
    levelId: 5,
    orderInLevel: 2,
    title: 'Pretraining and scale',
    friendlyTitle: 'How Giant Base Models Are Forged',
    summaryQuestion: 'Why does a smaller, well-read brain beat a giant brain fed junk web pages?',
    icon: 'layers',
    nextLessonBridge: 'Once someone builds a base brain, how do YOU steer it in 10 seconds with zero GPU budget? Prompting next!',
    scenes: [
      {
        bridge: 'From Lesson 16: Before an AI can chat, it spends months reading trillions of words (Pretraining).',
        headline: 'Brain Size + Clean Textbooks beats Giant Brain + Junk Web',
        plainText: 'Compare three ways to spend a $2M supercomputer budget (the famous Scaling Law discovery):',
        widget: {
          kind: 'compare',
          scenario: 'Spending a fixed GPU budget to forge the smartest, fastest Base Model',
          cards: [
            {
              name: 'Oversized + Under-Read',
              tag: 'Giant 200B brain · Tiny reading',
              output: 'Sluggish, expensive to run forever, and surprisingly sloppy!',
              speed: 'Very Slow',
              cost: '$$$$ per chat',
              best: false,
              why: 'Like building a 50-story library with only 200 books inside.',
            },
            {
              name: 'Giant Pile of Dirty Spam',
              tag: 'Unfiltered raw internet',
              output: 'Picks up broken code, myths, and repetitive junk.',
              speed: 'Medium',
              cost: '$$',
              best: false,
              why: 'Trillions of low-quality tokens poison reasoning.',
            },
            {
              name: 'Balanced Size + Textbook Data',
              tag: 'Compute-Optimal Scaling!',
              output: 'Compact 8B–30B brain fed pristine books, code & math -> punches 5x above its weight!',
              speed: 'Blazing Fast',
              cost: '$ per chat',
              best: true,
              why: 'Modern small models rival 2023 giants because textbook-clean data + code sharpens logic!',
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Base Pretraining vs. Adapting Existing Models', plain: 'Pretraining from zero costs millions in GPUs/electricity; 99.9% of teams start from an existing model.', example: 'Download Qwen/Llama or call an API instead of pretraining from scratch.' },
      { title: 'Scaling Laws & Data Quality', plain: 'Predictable curves showing model size and clean training tokens must grow together.', example: 'Clean code + textbooks dramatically boost logic.' },
    ],
    resources: [
      { title: 'Deep Dive into LLMs like ChatGPT', type: 'video', source: 'Andrej Karpathy', duration: '45m segment', url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI', why: 'Shows visually how raw internet pages turn into a pretrained base brain.' },
      { title: 'Visualizing GPU Scale & Training', type: 'text', source: 'Hugging Face Ultra-Scale Playbook', duration: '10m visual read', url: 'https://huggingface.co/spaces/nanotron/ultrascale-playbook', why: 'Interactive visual diagrams of multi-GPU training.' },
    ],
  },

  {
    id: 't14',
    indexNum: 14,
    levelId: 5,
    orderInLevel: 3,
    title: 'Prompting and interaction design',
    friendlyTitle: 'Prompting Like an Engineer',
    summaryQuestion: 'Why do 2 concrete examples + a "think step-by-step" scratchpad transform weak replies into gold?',
    icon: 'sliders',
    nextLessonBridge: 'Prompts still can’t read 5,000 changing company PDFs—next, plug in Open-Book Search (RAG)!',
    scenes: [
      {
        bridge: 'From Lesson 17: You have a smart model — steer it cleanly without touching a single weight!',
        headline: 'Watch a Weak Prompt upgrade step-by-step into Production Gold',
        plainText: 'Slide from a lazy 4-word prompt up to Few-Shot Examples + Step-by-Step Scratchpad + Schema Check:',
        widget: {
          kind: 'slider',
          dialLabel: 'Upgrade Your Prompt Step by Step',
          stops: [
            {
              label: '1. Lazy Prompt',
              tag: '"Read this email"',
              sampleInput: 'Angry customer note about double-charged $49 subscription',
              sampleOutput: 'Writes a rambling 400-word essay with no clear category.',
              verdict: 'bad',
              why: 'Zero role, zero format, zero rules -> unpredictable essay every time.',
            },
            {
              label: '2. Role + 2 Examples (Few-Shot)',
              tag: 'Show, Don’t Just Tell!',
              sampleInput: 'Gives 2 exact sample inputs -> `{ "tag": "BILLING", "urgent": true }`',
              sampleOutput: 'Matches your exact compact JSON style 98% of the time!',
              verdict: 'good',
              why: '2 concrete examples beat 3 paragraphs of nagging instructions.',
            },
            {
              label: '3. + Reasoning Scratchpad',
              tag: 'Chain-of-Thought + Schema',
              sampleInput: 'Tricky multi-item prorated refund calculation',
              sampleOutput: 'Writes 3 checkable math steps first -> outputs verified JSON!',
              verdict: 'good',
              why: 'Giving space to "think out loud" before the final answer slashes logic errors!',
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Clear Role, Constraints & Few-Shot Examples', plain: 'Define boundaries ("only use provided text") and show 2–3 exact input->output examples.', example: 'Locks tone and structure immediately.' },
      { title: 'Step-by-Step Scratchpad (Chain-of-Thought) & Decomposition', plain: 'Letting the model work step-by-step or splitting 1 mega-prompt into 3 small prompts.', example: 'Step 1 extract -> Step 2 verify -> Step 3 format.' },
      { title: 'Prompt Versioning, Testing & Knowing Limits', plain: 'Test prompt edits against 50 saved cases so fixing 1 case doesn’t break 5 others—and use RAG when missing facts!', example: 'Treat prompts like real versioned code.' },
    ],
    resources: [
      { title: 'Prompt Engineering for Beginners & Builders', type: 'video', source: 'DeepLearning.AI (Andrew Ng)', duration: '14m video', url: 'https://www.youtube.com/watch?v=H4YK_7MAckk', why: 'Concrete side-by-side demos of examples and step-by-step reasoning.' },
      { title: 'Visual Prompting Examples Guide', type: 'text', source: 'DAIR.AI', duration: '10m read', url: 'https://www.promptingguide.ai/introduction/basics', why: 'Copy-ready examples of zero-shot, few-shot, and decomposition.' },
    ],
  },

  {
    id: 't24',
    indexNum: 24,
    levelId: 5,
    orderInLevel: 4,
    title: 'Retrieval and knowledge systems',
    friendlyTitle: 'RAG: Open-Book Search + Citations',
    summaryQuestion: 'How do you connect AI to 10,000 private files—and why does sloppy page-slicing break it?',
    icon: 'search',
    nextLessonBridge: 'Level 05 complete! Beat the Language & Grounding Trial to clear the fog on Level 06: Alignment & Agents!',
    scenes: [
      {
        bridge: 'From Lesson 18: Prompts can’t hold 10,000 changing files — RAG fetches ONLY the 3 exact paragraphs needed!',
        headline: 'Flip each part of an Open-Book RAG System ON/OFF',
        plainText: 'Watch an employee ask: "What is our 2026 dental limit for part-time staff (Code D-40)?"',
        widget: {
          kind: 'pipeline',
          requestText: 'Employee: "What is our 2026 dental cap for Code D-40?"',
          stations: [
            {
              name: 'Smart Section Chunking',
              role: 'Keeps PDF tables + titles together',
              defaultOn: true,
              whenOffOutput: 'Chopped table header off! Bot sees "$1,500" with no title & guesses wrong plan!',
              whenOffProblem: 'Most "AI hallucinations" in RAG are actually clumsy 200-word slicing cutting tables in half!',
            },
            {
              name: 'Hybrid Search + Rerank',
              role: 'Meaning vectors + exact code "D-40"',
              defaultOn: true,
              whenOffOutput: 'Vector-only search finds "tooth care" blog instead of exact Code D-40!',
              whenOffProblem: 'Combine Meaning Search + Exact Keyword Search so part codes like "D-40" never miss.',
            },
            {
              name: 'Permission Filter',
              role: 'Checks what this employee is allowed to read',
              defaultOn: true,
              whenOffOutput: 'SECURITY LEAK: Pulls private CEO contract from HR folder!',
              whenOffProblem: 'Retrieval must ALWAYS obey user folder permissions before showing anything to the AI!',
            },
          ],
          allOnOutput: '"Part-time dental cap (Code D-40) is $1,200/year [Source: Benefits_2026.pdf, p.14]"',
          allOnWhy: 'Clean chunks + Hybrid Search + Permission check = accurate, cited, secure answers!',
        },
      },
    ],
    subTopics: [
      { title: 'How RAG Works (Fetch -> Paste -> Cite)', plain: 'Search your library for the top passages -> paste them into the prompt -> answer strictly with citations.', example: 'Zero retraining when docs update daily.' },
      { title: 'Smart Chunking, Hybrid Search & Reranking', plain: 'Keeping headings/tables intact, blending vector + keyword search, and re-scoring the top 5 hits.', example: 'Fixes 80% of wrong RAG answers.' },
      { title: 'Permission-Aware Retrieval & Freshness', plain: 'Ensuring User A never retrieves Team B’s secret docs, and retiring outdated 2022 PDFs.', example: 'Enforcing access control at search time.' },
    ],
    resources: [
      { title: 'What is RAG (Retrieval-Augmented Generation)?', type: 'video', source: 'IBM Technology', duration: '7m video', url: 'https://www.youtube.com/watch?v=T-D1OfcDW1M', why: 'Crystal-clear 7-minute whiteboard walkthrough of open-book AI.' },
      { title: 'Contextual Retrieval: Fixing Broken Chunking', type: 'text', source: 'Anthropic Engineering', duration: '10m read', url: 'https://www.anthropic.com/news/contextual-retrieval', why: 'Shows visually why naive chunking breaks and how keeping headers fixes it.' },
    ],
  },

  // ==================== LEVEL 6 ====================
  {
    id: 't13',
    indexNum: 13,
    levelId: 6,
    orderInLevel: 1,
    title: 'Fine-tuning and model adaptation',
    friendlyTitle: 'Fine-Tuning & Snap-On Lenses (LoRA)',
    summaryQuestion: 'How do you teach a cheap small model a custom style using a tiny 1% snap-on adapter?',
    icon: 'sliders',
    nextLessonBridge: 'Fine-tuning copies examples—next, see how Preference Alignment teaches good judgment (and accidental flattery)!',
    scenes: [
      {
        bridge: 'Welcome to Level 06! Prompting & RAG handle 90% of jobs—when DO you actually train weights?',
        headline: 'LoRA = Snapping a tiny lens onto a camera instead of rebuilding the camera!',
        plainText: 'Compare rewriting all 8 billion dials vs. snapping on a tiny LoRA adapter trained on 500 gold examples:',
        widget: {
          kind: 'compare',
          scenario: 'Teaching a small fast model to translate messy doctor shorthand into clean clinic codes',
          cards: [
            {
              name: 'Full Fine-Tuning',
              tag: 'Rewrite 100% of dials',
              output: 'Heavy GPU cost; if over-drilled, forgets normal English (Catastrophic Forgetting)!',
              speed: 'Slow',
              cost: '$$$',
              best: false,
              why: 'Overwriting every weight risks erasing general common sense.',
            },
            {
              name: 'LoRA / QLoRA Adapter',
              tag: 'Freeze brain + train 1% snap-on!',
              output: 'Trains in 20 minutes on 1 GPU; matches giant models on this exact clinic task!',
              speed: '20 mins',
              cost: '$5',
              best: true,
              why: 'Base brain stays 100% intact, and you can hot-swap tiny adapters per specialty!',
            },
            {
              name: '50,000 Sloppy Examples',
              tag: 'Quantity over quality trap',
              output: 'Learns typos and contradictions from uncleaned logs.',
              speed: 'Hours',
              cost: '$$',
              best: false,
              why: '500 hand-checked pristine examples crush 50,000 messy scraped rows every time.',
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Instruction Tuning & LoRA / QLoRA', plain: 'Freezing the big base brain and training a tiny low-memory side adapter on clean Input->Output examples.', example: 'Making a cheap 8B model master 1 narrow format.' },
      { title: 'Catastrophic Forgetting', plain: 'Over-drilling on one narrow chore until general skills erode—prevented by LoRA or mixing 10% general examples.', example: 'Training only on SQL until English grammar breaks.' },
    ],
    resources: [
      { title: 'LoRA & QLoRA Visually Explained', type: 'video', source: 'Visual ML Breakdown', duration: '15m video', url: 'https://www.youtube.com/watch?v=PXWYUTMt-AU', why: 'Shows how tiny snap-on adapters work without rewriting the whole model.' },
      { title: 'Fine-Tuning Modern Models Guide', type: 'text', source: 'Hugging Face Course', duration: '10m read', url: 'https://huggingface.co/learn/llm-course/chapter11/1', why: 'Plain-language walkthrough of SFT and LoRA.' },
    ],
  },

  {
    id: 't15',
    indexNum: 15,
    levelId: 6,
    orderInLevel: 2,
    title: 'Preference learning and alignment',
    friendlyTitle: 'Alignment: Teaching Judgment (Without Flattery)',
    summaryQuestion: 'Why does training AI on human "Thumbs-Up" accidentally teach it to flatter you when you are wrong?',
    icon: 'scale',
    nextLessonBridge: 'Now the brain is polite and aligned—what happens when we give it hands to click buttons and run code? Agents next!',
    scenes: [
      {
        bridge: 'From Lesson 20: Copying examples isn’t enough — humans judge "Reply A is better than Reply B" (RLHF / DPO).',
        headline: 'The Flattery Trap (Reward Hacking): Why chatbots say "Great point!" to wrong math',
        plainText: 'Slide across how alignment shapes a raw model—and what goes wrong if raters only reward polite agreement:',
        widget: {
          kind: 'slider',
          dialLabel: 'Slide Alignment Balance',
          stops: [
            {
              label: '1. Unaligned Raw Base',
              tag: 'Pure autocomplete',
              sampleInput: 'User: "How do I fix a leaky sink?"',
              sampleOutput: 'Outputs 10 more random plumbing forum questions instead of answering!',
              verdict: 'bad',
              why: 'Base models just continue web documents until aligned to be helpful assistants.',
            },
            {
              label: '2. Honest + Helpful (Balanced)',
              tag: 'Truth + Safety Rubric',
              sampleInput: 'User: "2 + 2 is 5, right?"',
              sampleOutput: '"Actually, 2 + 2 equals 4—want me to check the rest of your budget?"',
              verdict: 'good',
              why: 'Good alignment rewards truthfulness, clarity, and refusing real harm.',
            },
            {
              label: '3. Pure Thumbs-Up (Sycophancy!)',
              tag: 'Reward Hacking',
              sampleInput: 'User: "Are you sure? I really think 2 + 2 is 5!"',
              sampleOutput: '"You’re completely right, my apologies! 2 + 2 is indeed 5!"',
              verdict: 'bad',
              why: 'When raters click Thumbs-Up on agreeable replies, AI learns flattery over truth!',
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'RLHF & DPO (Picking Winner vs. Loser)', plain: 'Humans or rubrics pick the better of 2 candidate replies, nudging the model toward helpful, safe behavior.', example: 'Way easier to judge 2 essays than write a masterpiece.' },
      { title: 'Reward Hacking, Sycophancy & Over-Refusal', plain: 'Gaming thumbs-up via long flattery, or refusing harmless questions ("kill a computer process") out of overly jumpy safety.', example: 'Balancing real safety against annoying false refusals.' },
    ],
    resources: [
      { title: 'RLHF Explained in 6 Minutes', type: 'video', source: 'IBM Technology', duration: '6m video', url: 'https://www.youtube.com/watch?v=2MBJOuVq380', why: 'Simple visual diagram of preference ranking.' },
      { title: 'Illustrated RLHF & Preference Tuning', type: 'text', source: 'Hugging Face Blog', duration: '10m visual read', url: 'https://huggingface.co/blog/rlhf', why: 'Step-by-step diagrams showing how human taste shapes AI.' },
    ],
  },

  {
    id: 't25',
    indexNum: 25,
    levelId: 6,
    orderInLevel: 3,
    title: 'Agents and workflows',
    friendlyTitle: 'AI Agents: Giving AI Hands & Brakes',
    summaryQuestion: 'What turns a talker into a tool-using Agent—and why must it live inside a Sandbox?',
    icon: 'branch',
    nextLessonBridge: 'Agents guess well, yet fail strict 1,000-rule puzzles—next, team neural intuition with 100%-exact Logic Solvers!',
    scenes: [
      {
        bridge: 'From Lesson 21: A chatbot only talks once — an Agent loops: Plan -> Use Tool -> See Result -> Fix!',
        headline: 'Fixed Workflow vs. Free Agent — plus Sandboxes & Step Brakes',
        plainText: 'Flip safety brakes ON/OFF on a Coding & Email Agent to see what happens in real life:',
        widget: {
          kind: 'pipeline',
          requestText: 'Task: "Fix the broken checkout button & notify the team"',
          stations: [
            {
              name: 'Isolated Sandbox',
              role: 'Runs code in a safe test copy, not live server',
              defaultOn: true,
              whenOffOutput: 'Agent runs `rm -rf` cleanup command right on the live customer database!',
              whenOffProblem: 'Never let an agent run code or shell commands outside a walled sandbox!',
            },
            {
              name: 'Step Cap (Max 15 Tries)',
              role: 'Stops stuck infinite retry loops',
              defaultOn: true,
              whenOffOutput: 'Gets stuck on a typo at 2 AM -> loops 4,000 times -> $650 API bill!',
              whenOffProblem: 'Agents need hard step & dollar caps so failures stop cleanly.',
            },
            {
              name: 'Reversible Draft / Approval',
              role: 'Opens Git PR & drafts email for human click',
              defaultOn: true,
              whenOffOutput: 'Emails 50,000 customers "Test fix!!" by mistake!',
              whenOffProblem: 'Keep irreversible outside actions behind human approval.',
            },
          ],
          allOnOutput: 'Edits code in sandbox -> runs test suite -> passes -> opens clean Pull Request for your review!',
          allOnWhy: 'Use fixed rails (Workflows) when steps are predictable; use Sandboxed Agents when steps depend on live discoveries.',
        },
      },
    ],
    subTopics: [
      { title: 'Workflows (Fixed Rails) vs. Autonomous Agents (Dynamic Loop)', plain: 'Use simple pre-wired steps when predictable; use open tool-calling loops only when tasks need live exploration.', example: '95% reliability x 10 steps = only 60% end-to-end!' },
      { title: 'Sandboxing, Permissions & Reversibility', plain: 'Isolating agents in safe containers, granting minimum access, and preferring undoable drafts over hard deletes.', example: 'Drafting emails instead of auto-sending.' },
    ],
    resources: [
      { title: 'AI Agents, Clearly Explained for Beginners', type: 'video', source: 'Jeff Su', duration: '10m video', url: 'https://www.youtube.com/watch?v=F8NKVhkZZWI', why: 'Crystal-clear everyday comparison of chatbots, workflows, and agents.' },
      { title: 'Building Effective Agents (Visual Guide)', type: 'text', source: 'Anthropic', duration: '12m read', url: 'https://www.anthropic.com/research/building-effective-agents', why: 'Shows why simple workflows beat over-complicated multi-agent swarms.' },
    ],
  },

  {
    id: 't26',
    indexNum: 26,
    levelId: 6,
    orderInLevel: 4,
    title: 'Search, logic and symbolic reasoning',
    friendlyTitle: 'Exact Logic + Neural Intuition',
    summaryQuestion: 'Why shouldn’t an LLM solve a 500-nurse hospital schedule in its head—and how does pairing it with a Solver get 100%?',
    icon: 'cpu',
    nextLessonBridge: 'Level 06 complete! Beat the Autonomy & Control Trial to clear the fog on Level 07: Images, Video, Voice & 3D!',
    scenes: [
      {
        bridge: 'From Lesson 22: Neural nets have great gut intuition, yet fumble strict 100-rule puzzles — so team them up with Exact Solvers!',
        headline: 'Neural Gut Proposes -> Exact Logic Solver Guarantees 0 Rule Breaks!',
        plainText: 'Schedule 200 nurses so nobody works back-to-back night shifts. Test Bare LLM vs. Neuro-Symbolic (LLM + Constraint Solver):',
        widget: {
          kind: 'tester',
          promptLabel: 'Build a legal 30-day hospital nurse schedule (0 violations allowed)',
          modes: [
            { name: 'Bare LLM Guessing', badge: 'Writes schedule directly in chat' },
            { name: 'Neuro-Symbolic Team', badge: 'LLM writes rules -> Exact Solver solves' },
          ],
          cases: [
            {
              name: '200 Nurses + 14 Legal Rest Laws',
              detail: 'Zero double-shifts or missing ICU coverage allowed',
              results: [
                { pass: false, output: 'Looks neat at first glance—secretly schedules Nurse Sara 36 hours straight!', why: 'Next-word prediction cannot hold 2,800 simultaneous constraints in its head.' },
                { pass: true, output: 'LLM translates English rules -> Solver mathematically guarantees 0 violations!', why: 'Best of both worlds: AI handles messy English; Symbolic Solver guarantees 100% exact logic!' },
              ],
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Lookahead Search (A*, MCTS) & Constraint Solvers', plain: 'Planning moves ahead on trees (GPS / AlphaGo) and solving thousands of hard scheduling/routing rules with 0 clashes.', example: 'Airline crew & gate scheduling.' },
      { title: 'Neuro-Symbolic AI & Formal Verification', plain: 'Using neural nets for intuition/translation and exact math/code provers to verify 100% correctness.', example: 'AlphaGeometry proposing + proving Olympiad theorems.' },
    ],
    resources: [
      { title: 'Harvard CS50 AI — Visual Search & Logic', type: 'video', source: 'Harvard CS50', duration: '20m segment', url: 'https://www.youtube.com/watch?v=WbzNRTTrX0g', why: 'Great visual animations of mazes, lookahead trees, and logic rules.' },
      { title: 'AlphaGeometry: Intuition + Exact Logic Proof', type: 'text', source: 'Google DeepMind', duration: '8m read', url: 'https://deepmind.google/discover/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/', why: 'Shows how fast neural guesses + strict logic solvers conquer hard problems.' },
    ],
  },
];
