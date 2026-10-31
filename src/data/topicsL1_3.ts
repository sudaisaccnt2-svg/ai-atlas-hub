import { Topic } from '../types';

export const TOPICS_L1_3: Topic[] = [
  // ==================== LEVEL 1 ====================
  {
    id: 't01',
    indexNum: 1,
    levelId: 1,
    orderInLevel: 1,
    title: 'The nature and scope of AI',
    friendlyTitle: 'What AI Really Is',
    summaryQuestion: 'How is learning software different from normal step-by-step code?',
    icon: 'compass',
    nextLessonBridge: 'Now you see what an AI brain does—next, open the hood to see all the parts around it.',
    scenes: [
      {
        bridge: 'Start here — zero background needed',
        headline: 'Normal code follows strict rules. AI learns from real examples.',
        plainText: 'Imagine building a phone camera that spots apples. Try testing strict human-written rules vs. AI trained on 1,000 fruit photos:',
        widget: {
          kind: 'tester',
          promptLabel: 'Test both machines on 3 real kitchen apples',
          modes: [
            { name: 'Normal Rule Code', badge: 'IF color == red -> Apple' },
            { name: 'Learned AI', badge: 'Studied 1,000 real apple photos' },
          ],
          cases: [
            {
              name: 'Shiny Red Apple',
              detail: 'Bright red skin, upright on a white plate',
              results: [
                { pass: true, output: '"Apple!" (Color matched red)', why: 'Rules work fine when the world matches your exact rule.' },
                { pass: true, output: '"Apple! (99% sure)"', why: 'Matches shape, stem, and skin texture.' },
              ],
            },
            {
              name: 'Green Granny Smith Apple',
              detail: 'Bright green skin, same round apple shape',
              results: [
                { pass: false, output: '"NOT an apple." (Color is green!)', why: 'Strict red-rule breaks immediately on green or yellow apples!' },
                { pass: true, output: '"Apple! (98% sure)"', why: 'Saw hundreds of green and yellow apples during study.' },
              ],
            },
            {
              name: 'Red Tomato',
              detail: 'Bright red skin, soft tomato stem',
              results: [
                { pass: false, output: '"Apple!" (Fooled by red color!)', why: 'Writing rules for every fruit shape in dim light is impossible.' },
                { pass: true, output: '"Tomato — NOT an apple."', why: 'Spots stem + shine differences humans struggle to type as rules.' },
              ],
            },
          ],
        },
      },
      {
        bridge: 'So AI learns from examples — why do people say AI, Machine Learning, AND Deep Learning?',
        headline: 'Three nested layers: AI -> Machine Learning -> Deep Learning',
        plainText: 'They are not competitors—each sits inside the last. Compare all three trying to block junk emails and voice scams:',
        widget: {
          kind: 'compare',
          scenario: 'Stopping sneaky scammers across text emails and phone voice calls',
          cards: [
            {
              name: '1. Classic Rule AI',
              tag: 'Outer Circle: Hand-written IF rules',
              output: 'Blocks "FREE CASH", misses "FR33 CA$H!!"',
              speed: 'Instant',
              cost: 'Tiny',
              best: false,
              why: 'Any smart-acting code counts as AI—even simple chess or keyword rules—until spammers change one letter.',
            },
            {
              name: '2. Machine Learning',
              tag: 'Middle Circle: Learns from examples',
              output: 'Catches "FR33 CA$H" from 10,000 past spam examples',
              speed: 'Very Fast',
              cost: 'Low',
              best: false,
              why: 'Machine Learning studies past examples to weigh dozens of clues without human-written keyword lists.',
            },
            {
              name: '3. Deep Learning',
              tag: 'Inner Circle: Multi-layer neural nets',
              output: 'Reads messy photos, live voice calls & nuanced text',
              speed: 'Fast on GPU',
              cost: 'Medium',
              best: true,
              why: 'Deep Learning stacks many layers so it can understand raw voice waves, images, and conversation directly.',
            },
          ],
        },
      },
      {
        bridge: 'Deep Learning sounds magical — so can one AI do everything a human can?',
        headline: 'Every AI today is a Narrow Specialist, not a human mind',
        plainText: 'Movies show Artificial General Intelligence (AGI) that masters everything. Real tools today are Narrow AI—test a World-Champion Chess AI on three jobs:',
        widget: {
          kind: 'tester',
          promptLabel: 'Give a Superhuman Chess AI different everyday jobs',
          modes: [
            { name: 'Chess AI (AlphaZero)', badge: 'Narrow Specialist' },
            { name: 'Chat / Vision Assistant', badge: 'Broad but still Narrow' },
          ],
          cases: [
            {
              name: 'Beat the World Chess Champion',
              detail: '64-square board with exact rules',
              results: [
                { pass: true, output: 'Wins 99.9% of games!', why: 'Unbeatable inside the exact 64 squares it practiced.' },
                { pass: false, output: 'Blunders knights against grandmasters', why: 'Chat models predict words, not deep 30-move board trees.' },
              ],
            },
            {
              name: 'Draft a Polite Apology Email',
              detail: 'Customer shipment arrived 2 days late',
              results: [
                { pass: false, output: 'Error: Expects chess move e2-e4!', why: 'Zero language ability—completely blind outside chess.' },
                { pass: true, output: 'Writes warm 3-sentence apology in 1 second', why: 'Trained specifically on human text patterns.' },
              ],
            },
            {
              name: 'Know Your Company’s Secret Wi-Fi Password',
              detail: 'Written on a sticky note on your wall',
              results: [
                { pass: false, output: 'Cannot even read sticky notes', why: 'Pure board-game engine.' },
                { pass: false, output: 'Guesses a fake password if pushed!', why: 'Fluency is not omniscience—AI only knows what it was fed.' },
              ],
            },
          ],
        },
      },
      {
        bridge: 'What kinds of specialist jobs can today’s AI do, and where does the brain live?',
        headline: 'Four AI jobs (Predict, Create, Chat, Act) & Cloud vs. Local',
        plainText: 'Slide across how AI helps plan a real trip—from forecasting ticket prices to acting as an agent—and decide when humans stay in charge:',
        widget: {
          kind: 'slider',
          dialLabel: 'Slide from Passive Prediction -> Full Autonomous Action',
          stops: [
            {
              label: '1. Predict',
              tag: 'Predictive AI',
              sampleInput: 'Flight price history for November',
              sampleOutput: '"82% chance ticket rises +$90 tomorrow."',
              verdict: 'good',
              why: 'Forecasts a number or category from history so YOU decide.',
            },
            {
              label: '2. Generate',
              tag: 'Generative AI',
              sampleInput: '"Plan a 3-day food trip in Istanbul"',
              sampleOutput: 'Creates a fresh day-by-day map & packing list.',
              verdict: 'good',
              why: 'Creates brand-new text, images, code, or audio on demand.',
            },
            {
              label: '3. Assist (Human Decides)',
              tag: 'Decision Support',
              sampleInput: 'Ready to pay $940 for non-refundable flight',
              sampleOutput: 'Highlights best flight -> waits for YOUR click.',
              verdict: 'good',
              why: 'High-cost or irreversible choices keep a human confirmation step.',
            },
            {
              label: '4. Unchecked Auto-Agent',
              tag: 'Autonomous Risk',
              sampleInput: '"Book whatever looks good!" (Zero spending cap)',
              sampleOutput: 'Buys $4,200 non-refundable wrong airport ticket!',
              verdict: 'bad',
              why: 'Autonomy without limits or human approval turns small mistakes into expensive disasters.',
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'AI, Machine Learning & Deep Learning', plain: 'Nested circles: any smart rules (AI) -> learning from examples (ML) -> multi-layer neural brains for voice/photos/text (Deep Learning).', example: 'Keyword filter = AI; spam detector = ML; live voice translator = Deep Learning.' },
      { title: 'Narrow AI vs. General Intelligence (AGI)', plain: 'Every AI today masters scoped tasks (Narrow); human-like adapt-to-anything minds (AGI) do not exist yet.', example: 'A lung X-ray AI cannot drive a car or make coffee.' },
      { title: 'Predictive, Generative, Interactive & Autonomous', plain: 'Guessing a number, creating new media, chatting back-and-forth, or taking multi-step tool actions.', example: 'Rain % forecast vs. writing a poem vs. booking a train.' },
      { title: 'Rule-Based vs. Learned vs. Hybrid Systems', plain: 'Strict human IF/THEN rules vs. example-trained models vs. combining both.', example: 'Self-driving uses learned cameras + hard physics braking rules.' },
      { title: 'Automation vs. Augmentation (Human Assist)', plain: 'AI doing the whole chore alone vs. speeding up a human who makes the final call.', example: 'Auto-sorting junk mail vs. highlighting X-ray spots for a doctor.' },
      { title: 'Open-Source / Open-Weight vs. Hosted Cloud APIs', plain: 'Downloading free model weights to run privately on your own hardware vs. paying per message to an online service.', example: 'Local Llama on your PC vs. OpenAI/Claude cloud API.' },
      { title: 'Research Prototypes vs. Production Systems', plain: 'A cool demo working 80% of the time vs. hardened software safe for 100,000 daily users.', example: 'Weekend demo vs. bank fraud system with fallbacks and logs.' },
    ],
    resources: [
      { title: 'But what is a neural network? (Visual Intro)', type: 'video', source: '3Blue1Brown', duration: '19m video', url: 'https://www.youtube.com/watch?v=aircAruvnKk', why: 'Pure visual intuition for how examples turn into pattern recognition.' },
      { title: 'Machine Learning Explained in 100 Seconds', type: 'video', source: 'Fireship', duration: '2m video', url: 'https://www.youtube.com/watch?v=PeMlggyqz0Y', why: 'Fastest crystal-clear overview for complete beginners.' },
      { title: 'Elements of AI — Chapter 1: What is AI?', type: 'text', source: 'University of Helsinki', duration: '12m read', url: 'https://course.elementsofai.com/1', why: 'World-famous zero-math beginner guide.' },
      { title: 'Intro to ML Framing & Plain Glossary', type: 'text', source: 'Google ML Crash Course', duration: '8m read', url: 'https://developers.google.com/machine-learning/crash-course/framing/ml-terminology', why: 'Simple everyday definitions of AI terms.' },
    ],
  },

  {
    id: 't02',
    indexNum: 2,
    levelId: 1,
    orderInLevel: 2,
    title: 'The parts of an AI system',
    friendlyTitle: 'Inside an AI System',
    summaryQuestion: 'Why is the AI brain only 10% of a real working product?',
    icon: 'cpu',
    nextLessonBridge: 'Now you know every moving part—next, learn how to turn a fuzzy human wish into a clear AI job.',
    scenes: [
      {
        bridge: 'From Lesson 01: An AI brain learns patterns — but a bare brain alone cannot run a business!',
        headline: 'A car engine needs brakes, fuel lines, and a steering wheel',
        plainText: 'Flip any part OFF on this real Online Store Support Bot and watch what immediately breaks:',
        widget: {
          kind: 'pipeline',
          requestText: 'Customer: "My blender arrived cracked! Refund Order #881 ($240)."',
          stations: [
            {
              name: 'Order Lookup (Retrieval)',
              role: 'Fetches real Order #881 from store database',
              defaultOn: true,
              whenOffOutput: '"Sure! Refunding $9,999 for Order #881!" (Hallucinated)',
              whenOffProblem: 'Without database retrieval, the bare brain has zero idea what Order #881 actually cost and invents details!',
            },
            {
              name: 'Calculator / Refund API',
              role: 'Computes exact tax & triggers real store system',
              defaultOn: true,
              whenOffOutput: '"240 + 8.25% tax = $267.11...ish" (Wrong math, nothing saved)',
              whenOffProblem: 'Language brains guess words, not exact accounting math—external tools handle exact numbers and actions.',
            },
            {
              name: 'Human Approval (> $100)',
              role: 'Staff clicks Confirm on big refunds',
              defaultOn: true,
              whenOffOutput: 'Scammer tricks bot into auto-draining $50,000 overnight!',
              whenOffProblem: 'High-dollar irreversible actions always keep a human approval gate.',
            },
          ],
          allOnOutput: 'Verified Order #881 ($240) -> Queued exact $259.80 refund -> Ready for 1-click staff approval!',
          allOnWhy: 'Model + Live Lookup + Exact Tool + Human Gate = a trustworthy real-world AI system.',
        },
      },
      {
        bridge: 'Those parts work live — but how was the brain built beforehand vs. used daily?',
        headline: 'Two completely different phases: Studying (Training) vs. Working (Inference)',
        plainText: 'People mix these two words up constantly. Compare cooking school vs. serving dinner rush:',
        widget: {
          kind: 'compare',
          scenario: 'Building a voice translator vs. using it at an airport',
          cards: [
            {
              name: '1. Training (School Time)',
              tag: 'Happens once or rarely',
              output: 'Reads millions of sentences for weeks on 500 GPUs to tune internal dials (parameters).',
              speed: 'Weeks',
              cost: '$100k–$10M+',
              best: false,
              why: 'Training is slow, heavy studying where the model’s weights actually change.',
            },
            {
              name: '2. Validation (Practice Quiz)',
              tag: 'Before release',
              output: 'Tests on 5,000 unseen travel phrases to prove it didn’t just memorize.',
              speed: 'Minutes',
              cost: 'Low',
              best: false,
              why: 'Catches mistakes before any real traveler uses the app.',
            },
            {
              name: '3. Inference (Daily Work)',
              tag: 'Millions of times a day',
              output: 'Translates "Where is Gate B4?" on your phone in 0.3 seconds using frozen dials.',
              speed: '0.3 sec',
              cost: '$0.0002',
              best: true,
              why: 'Every time you chat with AI, generate an image, or unlock your phone, that is Inference!',
            },
          ],
        },
      },
      {
        bridge: 'Should one giant brain do everything at once, or should small steps team up?',
        headline: 'Composed pipelines beat one giant "do-everything" prompt',
        plainText: 'Test throwing a messy 20-page contract at one single mega-step vs. breaking it into clean, inspectable steps:',
        widget: {
          kind: 'tester',
          promptLabel: 'Process 20-page supplier invoice & update accounting',
          modes: [
            { name: 'Single Giant Model Call', badge: '"Read PDF, check math & pay!"' },
            { name: 'Composed 3-Step System', badge: 'Extract -> Verify Rule -> Draft' },
          ],
          cases: [
            {
              name: 'Clean 1-Page Invoice',
              detail: 'Simple 2-item bill',
              results: [
                { pass: true, output: 'Gets total right most of the time', why: 'Easy inputs hide fragile system design.' },
                { pass: true, output: 'Step 1 extracts -> Step 2 verifies math 100%', why: 'Every step leaves a clean trail you can inspect.' },
              ],
            },
            {
              name: '20-Page Messy Scanned Contract',
              detail: 'Discount buried on page 14',
              results: [
                { pass: false, output: 'Misses page 14 discount; impossible to tell where it failed!', why: 'When one giant black-box step fails, you have no idea which part broke.' },
                { pass: true, output: 'Page chunker finds p.14 -> Python checks discount -> flags mismatch!', why: 'Small focused stages are cheaper, sharper, and easy to fix.' },
              ],
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Architecture, Parameters & Training', plain: 'Blueprint wiring (architecture), learned number dials inside the brain (parameters), and studying examples (training).', example: 'Transformer blueprint with 8 billion tuned dials.' },
      { title: 'Training vs. Validation vs. Inference', plain: 'Studying examples, taking practice quizzes, and doing fast daily work for real users.', example: 'Chatting with an AI app runs Inference.' },
      { title: 'Models, Prompts, Tools, Retrieval & Memory', plain: 'Brain file, instructions, calculator/API plugs, document lookup, and saved chat notes.', example: 'Checking live flight seats before replying.' },
      { title: 'Data Pipelines & Post-Processing', plain: 'Clean conveyor belts preparing raw inputs going in and safety/format filters checking outputs coming out.', example: 'Redacting phone numbers before displaying logs.' },
      { title: 'Evaluation, Monitoring & Human Gates', plain: 'Pre-launch tests, live error alarms, and human Confirm buttons on risky actions.', example: 'Alerting staff if bad answers spike after an update.' },
      { title: 'Single-Model vs. Composed Systems', plain: 'One giant black-box prompt vs. small connected steps you can test separately.', example: 'Transcribe -> Search Policy -> Draft Reply.' },
    ],
    resources: [
      { title: 'Intro to Large Language Models (Visual 1-Hour Map)', type: 'video', source: 'Andrej Karpathy', duration: '60m video', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', why: 'Best beginner-friendly tour of brains, tools, search, and systems.' },
      { title: 'Building Effective Composed Systems & Workflows', type: 'text', source: 'Anthropic Engineering', duration: '10m read', url: 'https://www.anthropic.com/research/building-effective-agents', why: 'Clean visual diagrams showing why small chained steps beat giant prompts.' },
    ],
  },

  {
    id: 't03',
    indexNum: 3,
    levelId: 1,
    orderInLevel: 3,
    title: 'Problem formulation and system design',
    friendlyTitle: 'Turning Wishes into Clear AI Jobs',
    summaryQuestion: 'How do you turn "make our store better" into a clear, safe, testable job?',
    icon: 'target',
    nextLessonBridge: 'Once your goal is crystal clear, how do you pick between Rules, Small ML, RAG, or Fine-Tuning? Next.',
    scenes: [
      {
        bridge: 'From Lesson 02: You have all the parts — now aim them at a sharp target instead of a fuzzy wish.',
        headline: 'Vague wishes fail. Clear Inputs -> Outputs -> Pass Scores win.',
        plainText: 'Test what happens when a bakery owner gives an engineer a vague wish vs. a clearly framed AI problem:',
        widget: {
          kind: 'tester',
          promptLabel: 'Compare Fuzzy Wish vs. Sharp Problem Framing',
          modes: [
            { name: 'Fuzzy Wish', badge: '"Use AI to fix our bakery!"' },
            { name: 'Sharp Framing', badge: 'Exact Input, Output & Goal' },
          ],
          cases: [
            {
              name: 'Leftover Bread Waste',
              detail: 'Throwing away 40 unsold loaves every rainy Tuesday',
              results: [
                { pass: false, output: 'Builds a useless website chatbot nobody asked for!', why: '"Add AI" without naming the user, input, and goal wastes months.' },
                { pass: true, output: 'Input: day + weather + past sales -> Output: loaves to bake -> Goal: cut waste 30%', why: 'Clear input, clear number output, and measurable win!' },
              ],
            },
            {
              name: 'Sorting Invoices by Date',
              detail: 'Accountant wants newest bills at the top',
              results: [
                { pass: false, output: 'Spends $2,000/month calling an AI API to sort dates slowly', why: 'Never use AI when 1 line of normal code is 100% exact and free!' },
                { pass: true, output: 'Uses normal 1-click spreadsheet date sort ($0, 0 mistakes)', why: 'Great framing always checks if conventional software solves it first.' },
              ],
            },
          ],
        },
      },
      {
        bridge: 'Almost every real AI task on earth fits into just 5 simple shapes — meet them:',
        headline: 'The 5 Everyday Shapes of AI Jobs',
        plainText: 'Click across a single Ride-Share App (like Uber/Careem) to see all 5 job shapes working side by side:',
        widget: {
          kind: 'slider',
          dialLabel: 'Inspect 5 AI jobs inside ONE Ride-Share App',
          stops: [
            {
              label: '1. Classify',
              tag: 'Pick a Category',
              sampleInput: 'Selfie uploaded by driver at sign-in',
              sampleOutput: 'Label: "Matches Driver ID" or "Mismatch"',
              verdict: 'good',
              why: 'Classification sorts inputs into clear buckets (Spam/Safe, Cat/Dog, Fraud/Real).',
            },
            {
              label: '2. Predict',
              tag: 'Forecast a Number',
              sampleInput: 'Distance 6 km + 5:30 PM rain traffic',
              sampleOutput: 'Arrival Time: "19 minutes"',
              verdict: 'good',
              why: 'Prediction (Regression) estimates a number like minutes, dollars, or temperature.',
            },
            {
              label: '3. Rank',
              tag: 'Order Best-First',
              sampleInput: '40 restaurants open near hungry rider',
              sampleOutput: 'Puts your top 3 favorite noodle spots at the top',
              verdict: 'good',
              why: 'Ranking powers search engines, YouTube feeds, and shopping results.',
            },
            {
              label: '4. Generate',
              tag: 'Create New Content',
              sampleInput: 'Rider lost phone in back seat',
              sampleOutput: 'Drafts clear translated message to non-English driver',
              verdict: 'good',
              why: 'Generation writes text, audio, code, or images.',
            },
            {
              label: '5. Control',
              tag: 'Steer Actions Over Time',
              sampleInput: '100 drivers & 120 riders across downtown',
              sampleOutput: 'Dispatches closest cars second-by-second to cut wait times',
              verdict: 'good',
              why: 'Control chooses actions where every move changes the world next minute.',
            },
          ],
        },
      },
      {
        bridge: 'What happens when the AI hits a blurry case it isn’t sure about?',
        headline: 'Design safe Fallbacks & Red Lines before launch',
        plainText: 'Inspect 3 real launch plans—tap each to check if it handles mistakes safely or causes a disaster:',
        widget: {
          kind: 'spotter',
          instruction: 'Tap the risky plan (or turn on Safety Audit)',
          xrayLabel: 'Safety Audit',
          items: [
            {
              title: 'Fallback Escalation',
              preview: 'Support bot answers clear tracking questions; if <75% sure, routes straight to a human.',
              hiddenTruth: 'Smart fallback: keeps easy cases fast and hard cases safe.',
              isTrap: false,
            },
            {
              title: 'Small Pilot First',
              preview: 'Test new AI draft tool with 10 internal staff for 2 weeks before 50,000 customers.',
              hiddenTruth: 'Catches surprise edge cases cheaply before public rollout.',
              isTrap: false,
            },
            {
              title: 'Auto-Terminate Accounts',
              preview: 'Fraud AI permanently deletes user accounts with zero undo button or human appeal!',
              hiddenTruth: 'TRAP! Irreversible high-impact penalties with 0% appeal ruin innocent users when AI misjudges.',
              isTrap: true,
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'User, Task & Desired Outcome', plain: 'Naming exactly who uses it, what goes in/out, and how success is measured.', example: 'Cut ticket reply wait from 4h to 10m.' },
      { title: 'Classify, Predict, Rank, Generate & Control', plain: 'The 5 universal job shapes: category label, number forecast, best-first order, new content, or action steering.', example: 'Spam label, ETA minutes, search order, email draft, dispatch.' },
      { title: 'Choosing AI vs. Normal Software / Rules', plain: 'Checking if a normal database query, calculator, or 3 buttons solves it better for $0.', example: 'Date sorting never needs AI.' },
      { title: 'Fallback Paths & Irreversible Decisions', plain: 'Routing low-confidence cases to humans and never auto-executing one-way disasters.', example: 'Drafting wire transfers vs. sending money blind.' },
      { title: 'Latency, Cost & Pilot Progression', plain: 'Checking wait-time (0.2s vs. 10s), cost per click, and testing small pilots before full launch.', example: '10-person internal pilot before 100k users.' },
    ],
    resources: [
      { title: 'How to Scope Practical AI Projects', type: 'video', source: 'DeepLearning.AI (Andrew Ng)', duration: '11m video', url: 'https://www.youtube.com/watch?v=am36dePheDc', why: 'Walks step-by-step through turning business goals into doable AI tasks.' },
      { title: 'Problem Framing for Machine Learning', type: 'text', source: 'Google Developers', duration: '10m read', url: 'https://developers.google.com/machine-learning/problem-framing', why: 'Beginner checklist asking "Should we even use AI here?"' },
    ],
  },

  {
    id: 't39',
    indexNum: 39,
    levelId: 1,
    orderInLevel: 4,
    title: 'Decision frameworks for choosing an approach',
    friendlyTitle: 'Choosing the Right Approach',
    summaryQuestion: 'When do you use Rules vs. Spreadsheet ML vs. Prompting vs. Search vs. Fine-Tuning?',
    icon: 'scale',
    nextLessonBridge: 'You can pick the right tool—one lesson left in Level 01: how to direct AI day-to-day without getting fooled!',
    scenes: [
      {
        bridge: 'From Lesson 03: You framed the job — now pick the simplest rung on the ladder that wins.',
        headline: 'Fresh company facts need Open-Book Search (RAG), NOT retraining',
        plainText: 'Your store changes return rules every Friday. Test 3 ways to make your chatbot answer today’s rules:',
        widget: {
          kind: 'compare',
          scenario: 'Store return rules change every Friday morning — customers ask live questions',
          cards: [
            {
              name: 'Prompt Only',
              tag: 'Paste 2-page rules in prompt',
              output: 'Works for 2 pages; fails when you have 3,000 product manuals!',
              speed: 'Fast',
              cost: '$',
              best: false,
              why: 'Great for short fixed instructions, overflows on huge libraries.',
            },
            {
              name: 'Open-Book Search (RAG)',
              tag: 'Searches live Friday doc first',
              output: 'Finds exact updated Friday paragraph + cites page link instantly!',
              speed: 'Fast',
              cost: '$$',
              best: true,
              why: 'Winner for changing facts! Update the PDF on Friday and the AI knows it 1 second later.',
            },
            {
              name: 'Fine-Tune / Train Scratch',
              tag: 'Rewrite brain weights weekly',
              output: 'Costs thousands, takes hours, and still hallucinates numbers!',
              speed: 'Slow rebuild',
              cost: '$$$$',
              best: false,
              why: 'Fine-tuning teaches consistent tone/style—never use it as a filing cabinet for daily news.',
            },
          ],
        },
      },
      {
        bridge: 'What if your data is an Excel spreadsheet of sales numbers instead of text?',
        headline: 'Spreadsheets love Classic Small ML; Photos & Text love Deep AI',
        plainText: 'Test both tools on real tasks so you never buy a cannon to swat a fly:',
        widget: {
          kind: 'tester',
          promptLabel: 'Match the data type to the right engine',
          modes: [
            { name: 'Small Classic ML (Trees)', badge: 'Trains in 2 seconds on laptop' },
            { name: 'Giant Multimodal LLM', badge: 'Cloud GPUs' },
          ],
          cases: [
            {
              name: '10,000-Row Sales Spreadsheet',
              detail: 'Columns: price, day, rain_mm, past_sold -> Predict units',
              results: [
                { pass: true, output: 'Highest accuracy in 2 seconds for $0.00!', why: 'Decision Tree ensembles (like XGBoost) still beat giant chatbots on neat number tables!' },
                { pass: false, output: '1,000x slower, pricey, and worse at raw spreadsheet math', why: 'Never force a giant chat model to guess spreadsheet trends.' },
              ],
            },
            {
              name: 'Customer Sends Photo of Cracked Mug + Voice Note',
              detail: 'Unstructured pixels + spoken complaint',
              results: [
                { pass: false, output: 'Cannot read raw photos or spoken audio waves', why: 'Classic spreadsheet models need neat number columns.' },
                { pass: true, output: 'Sees crack in photo, transcribes voice, drafts polite replacement', why: 'Deep multimodal models shine on messy images, audio, and language.' },
              ],
            },
          ],
        },
      },
      {
        bridge: 'Every real project balances two competing dials: Cloud Convenience vs. Local Privacy & Speed.',
        headline: 'Trade-off Dial: Cloud API vs. Local Open-Weight Model',
        plainText: 'Slide across three real deployments to see when to rent a giant cloud brain vs. run a small brain locally:',
        widget: {
          kind: 'slider',
          dialLabel: 'Slide from Public Cloud API -> Private On-Device Brain',
          stops: [
            {
              label: '1. Cloud Frontier API',
              tag: 'Max Intelligence · Zero Setup',
              sampleInput: 'Startup prototyping a public marketing writer on Day 1',
              sampleOutput: 'Live in 10 minutes, top reasoning, pays pennies per use.',
              verdict: 'good',
              why: 'Best way to prove an idea works before buying any hardware.',
            },
            {
              label: '2. Small Fast Cloud Model',
              tag: 'Low Latency · Low Cost',
              sampleInput: 'Autocomplete bar needing answers in 0.15 seconds',
              sampleOutput: '10x faster and 15x cheaper than giant slow thinking models!',
              verdict: 'good',
              why: 'Match model size to wait-time budget—nobody waits 12s for autocomplete.',
            },
            {
              label: '3. Local Open-Weight',
              tag: '100% Private · Works Offline',
              sampleInput: 'Hospital summarizing confidential patient notes offline',
              sampleOutput: 'Zero patient words ever leave the hospital building!',
              verdict: 'good',
              why: 'Strict privacy or offline iPads/phones run downloaded open-weight models locally.',
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Rules vs. Classic ML vs. Deep Learning', plain: 'Exact logic = Rules; number spreadsheets = Classic ML; text/photos/audio = Deep Learning.', example: 'Climb only as high up the complexity ladder as needed.' },
      { title: 'Prompting vs. Retrieval (RAG) vs. Fine-Tuning', plain: 'Prompt = instructions; RAG = fresh open-book facts; Fine-Tuning = baked-in style/format speed.', example: 'Weekly price list = RAG; compact medical shorthand = Fine-Tuning.' },
      { title: 'Cloud API vs. Local / Open-Weight', plain: 'Renting giant online models per token vs. running downloadable models privately on your own hardware.', example: 'Day-1 prototype on API; private clinic notes on local GPU.' },
      { title: 'Quality vs. Latency vs. Cost vs. Privacy', plain: 'Every engineering choice trades off smarts, wait-time, server bill, and data control.', example: 'Batching 10k reports overnight costs half as much as live chat.' },
    ],
    resources: [
      { title: 'RAG vs. Fine-Tuning: Which One Should You Choose?', type: 'video', source: 'IBM Technology', duration: '8m video', url: 'https://www.youtube.com/watch?v=00Q0G84kq3M', why: 'Side-by-side beginner whiteboard comparing open-book lookup vs. retraining.' },
      { title: 'Practical LLM Decision Guide', type: 'text', source: 'Applied LLMs', duration: '12m read', url: 'https://applied-llms.org/', why: 'Battle-tested rules on starting simple before fine-tuning.' },
    ],
  },

  {
    id: 't38',
    indexNum: 38,
    levelId: 1,
    orderInLevel: 5,
    title: 'Directing AI-assisted development',
    friendlyTitle: 'Directing AI Without Getting Fooled',
    summaryQuestion: 'How do you steer AI to build fast while staying 100% sure the result actually works?',
    icon: 'sliders',
    nextLessonBridge: 'Level 01 complete! Play the randomized System Architect Trial to clear the fog on Level 02!',
    scenes: [
      {
        bridge: 'Final Lesson of Level 01: How YOU work with AI assistants every single day.',
        headline: 'Polished, confident sentences do NOT mean true facts!',
        plainText: 'AI writes wrong code and fake legal cases in the exact same smooth voice as true ones. Spot the dangerous habit below:',
        widget: {
          kind: 'spotter',
          instruction: 'Tap the risky way of working with AI (or turn on Truth Check)',
          xrayLabel: 'Truth Check',
          items: [
            {
              title: 'Ask for Plan -> Build Small Slice',
              preview: '"First list your 3-step plan. Build Step 1 only so we can test it in browser."',
              hiddenTruth: 'Clean & inspectable: mistakes are caught in 30 seconds instead of buried in 2,000 lines.',
              isTrap: false,
            },
            {
              title: 'Show 1 Good + 1 Bad Example',
              preview: '"Match this minimalist icon card (good); never add colorful 3D emojis (bad)."',
              hiddenTruth: 'Concrete examples + counterexamples steer output 10x better than vague adjectives.',
              isTrap: false,
            },
            {
              title: 'Trust Smooth Tone + Paste Live Passwords',
              preview: 'Pasted real database password into public chat & shipped 800 lines without running 1 test!',
              hiddenTruth: 'TRAP! Leaked private secrets AND trusted confident text without verification.',
              isTrap: true,
            },
          ],
        },
      },
      {
        bridge: 'Watch the difference between a vague 4-word prompt and directing like an architect:',
        headline: 'Goal + Constraints + Verification = Reliable Output',
        plainText: 'Test both ways of directing an AI coding/writing assistant on the same job:',
        widget: {
          kind: 'tester',
          promptLabel: 'Compare Vague Ask vs. Directed Brief',
          modes: [
            { name: 'Vague One-Liner', badge: '"Make me a login page"' },
            { name: 'Clear Architect Brief', badge: 'Goal + Limits + Test' },
          ],
          cases: [
            {
              name: 'Build Customer Login Form',
              detail: 'Needs email check, rate limit, and zero external trackers',
              results: [
                { pass: false, output: 'Generates flashy broken form with fake buttons & zero security!', why: 'AI fills missing requirements with random guesses.' },
                { pass: true, output: 'Lists assumptions -> builds clean form -> writes 4 passing login tests!', why: 'Stating constraints + requiring runnable proof keeps quality high.' },
              ],
            },
            {
              name: 'Research Competitor Pricing',
              detail: 'Need accurate 2026 numbers for a slide deck',
              results: [
                { pass: false, output: 'Invents plausible "$29/mo" from 3-year-old memory!', why: 'Without source links, memory guesses blend with truth.' },
                { pass: true, output: 'Quotes exact live pricing URLs + flags 1 tier it couldn’t verify', why: 'Asking AI to cite sources and state uncertainty exposes blind spots.' },
              ],
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Goal, Context, Constraints & Examples', plain: 'Tell AI what success looks like, what is off-limits, and show 1 good + 1 bad sample.', example: '"3 bullets, under 30 words, using only this PDF."' },
      { title: 'Plans First & Small Inspectable Stages', plain: 'Review a 4-line plan before building, and verify Stage 1 works before Stage 2.', example: 'Test data loading first, then UI.' },
      { title: 'Evidence Over Fluency', plain: 'Never trust smooth tone—require runnable tests, citations, and independent checks.', example: 'Automated test passing beats "I am 100% sure!"' },
      { title: 'Protect Secrets & Keep Human Ownership', plain: 'Never paste passwords/private records, and call real human specialists on legal/medical/security risks.', example: 'Use dummy rows instead of real customer cards.' },
    ],
    resources: [
      { title: 'How I Use LLMs Practically Every Day', type: 'video', source: 'Andrej Karpathy', duration: '35m video', url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw', why: 'Concrete everyday examples of verifying, searching, and directing AI.' },
      { title: 'Clear Prompting & Direction Guide', type: 'text', source: 'Anthropic Docs', duration: '9m read', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', why: 'Short practical habits for clear goals and examples.' },
    ],
  },

  // ==================== LEVEL 2 ====================
  {
    id: 't04',
    indexNum: 4,
    levelId: 2,
    orderInLevel: 1,
    title: 'Conceptual mathematics',
    friendlyTitle: 'Visual Math (Zero Equations)',
    summaryQuestion: 'How do numbers turn words into map coordinates and roll downhill to fix mistakes?',
    icon: 'vector',
    nextLessonBridge: 'Math gives AI coordinates and odds—next, see why spotting two things moving together is NOT knowing the cause!',
    scenes: [
      {
        bridge: 'Welcome to Level 02! Computers only understand numbers—so how can they compare "Puppy" and "Pizza"?',
        headline: 'Vectors are just GPS coordinates for meaning',
        plainText: 'Give every item two simple 0-to-10 scores: [Fluffiness, Edibility]. Watch where everyday words land on the map:',
        widget: {
          kind: 'compare',
          scenario: 'Measuring meaning distance using simple number lists (Vectors)',
          cards: [
            {
              name: '"Puppy" -> [9, 0]',
              tag: 'Fluffy: 9 · Edible: 0',
              output: 'Lands right next to "Kitten" [9, 0] and French "Chien" [8, 0]!',
              speed: 'Close match',
              cost: 'Distance: 0.1',
              best: true,
              why: 'Real AI uses ~1,000 traits instead of 2—that number list IS a Vector! Similar ideas sit close together.',
            },
            {
              name: '"Hot Pizza" -> [0, 10]',
              tag: 'Fluffy: 0 · Edible: 10',
              output: 'Lands far from "Puppy", right next to "Burger" [0, 9]!',
              speed: 'Food corner',
              cost: 'Distance: 13.4',
              best: false,
              why: 'Distance between two number arrows tells AI whether two sentences talk about the same thing.',
            },
            {
              name: 'Grid = Matrix · Cube = Tensor',
              tag: 'Stacking lists together',
              output: '1 number = Scalar · 1 list = Vector · Spreadsheet = Matrix · Color Photo = 3D Tensor',
              speed: 'Clean names',
              cost: 'Zero mystery',
              best: false,
              why: 'Fancy math words just count how many directions numbers are stacked in!',
            },
          ],
        },
      },
      {
        bridge: 'Now you know Vectors store meaning — how does Calculus help AI learn from mistakes?',
        headline: 'Gradients = Feeling which way slopes downhill in the dark',
        plainText: 'Imagine standing blindfolded on a hill where height = Mistake Size. Slide your steps down toward zero error:',
        widget: {
          kind: 'slider',
          dialLabel: 'Step Down the Mistake Hill (Gradient Descent)',
          stops: [
            {
              label: 'Top of Hill (Random Guess)',
              tag: 'Error = 85% wrong',
              sampleInput: 'Guessing house price: "$50,000" (Real: $300,000)',
              sampleOutput: 'Slope under feet tilts steep RIGHT -> step dials up!',
              verdict: 'bad',
              why: 'A Derivative/Gradient simply tells each dial: "turn up or down to shrink the mistake?"',
            },
            {
              label: 'Halfway Down',
              tag: 'Error = 22% wrong',
              sampleInput: 'Updated dials guess: "$265,000"',
              sampleOutput: 'Slope gets gentler -> take smaller, calmer steps.',
              verdict: 'warn',
              why: 'Each batch of examples nudges dials a little closer.',
            },
            {
              label: 'Valley Floor (Optimum)',
              tag: 'Error = 3% (Best Fit)',
              sampleInput: 'Tuned dials guess: "$296,000"',
              sampleOutput: 'Flat ground reached — minimum mistakes achieved!',
              verdict: 'good',
              why: 'That whole "calculus optimization" buzzword is literally just stepping downhill until flat!',
            },
          ],
        },
      },
      {
        bridge: 'What when clues are blurry and two answers are both possible?',
        headline: 'Probability & Bayes = Updating your odds as new clues arrive',
        plainText: 'Instead of rigid Yes/No, smart AI tracks percentage odds and updates smoothly with each new clue:',
        widget: {
          kind: 'slider',
          dialLabel: 'Add Clues One by One (Bayesian Updating)',
          stops: [
            {
              label: 'Clue 1: Morning Sky',
              tag: 'Base Odds: 15% Rain',
              sampleInput: 'Normal October morning in town',
              sampleOutput: 'Rain Probability: 15% (Probably dry)',
              verdict: 'warn',
              why: 'Starts from everyday historical base rates.',
            },
            {
              label: 'Clue 2: Dark Clouds',
              tag: 'Updated: 60% Rain',
              sampleInput: '+ Heavy grey clouds roll in at noon',
              sampleOutput: 'Rain Probability jumps 15% -> 60%!',
              verdict: 'good',
              why: 'Conditional probability updates belief given new evidence.',
            },
            {
              label: 'Clue 3: Barometer Drops + Thunder',
              tag: 'Updated: 94% Rain',
              sampleInput: '+ Thunder heard 2 km away',
              sampleOutput: 'Rain Probability: 94% -> Send umbrella alert!',
              verdict: 'good',
              why: 'Combining odds x cost (Expected Value) tells systems when to act.',
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Scalars, Vectors, Matrices & Tensors', plain: '1 number (scalar), 1 list/arrow (vector), 2D table (matrix), 3D+ block like RGB video (tensor).', example: 'Every word embedding is a vector.' },
      { title: 'Similarity & Distance in Space', plain: 'Checking if two vectors point the same direction to measure shared meaning.', example: '"Reset password" points right next to "Forgot login".' },
      { title: 'Gradients & Optimization (Calculus)', plain: 'Feeling the slope of mistakes so dials step downhill toward fewer errors.', example: 'Stepping opposite the uphill gradient.' },
      { title: 'Probability, Bayes & Expected Value', plain: 'Expressing honest % certainty, updating with new clues, and weighing risk x cost.', example: 'A 1% risk of a $10,000 crash outweighs a $5 shortcut.' },
    ],
    resources: [
      { title: 'Vectors — What Even Are They? (Visual)', type: 'video', source: '3Blue1Brown', duration: '10m video', url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs', why: 'Turns scary lists of numbers into clean visual arrows.' },
      { title: 'Gradient Descent, Step-by-Step', type: 'video', source: 'StatQuest with Josh Starmer', duration: '22m video', url: 'https://www.youtube.com/watch?v=sDv4f4s2SB8', why: 'Friendly visual walk down the mistake hill.' },
      { title: 'Seeing Theory — Interactive Probability', type: 'text', source: 'Brown University', duration: '10m interactive', url: 'https://seeing-theory.brown.edu/', why: 'Playable visual browser sliders for chance and Bayes.' },
    ],
  },

  {
    id: 't27',
    indexNum: 27,
    levelId: 2,
    orderInLevel: 2,
    title: 'Probability, causality and uncertainty',
    friendlyTitle: 'Correlation vs. True Cause',
    summaryQuestion: 'Why do ice-cream sales predict sunburns—and how do hidden causes trick AI?',
    icon: 'scale',
    nextLessonBridge: 'Since AI learns everything from data, how do dirty or leaked datasets ruin a smart brain? Next!',
    scenes: [
      {
        bridge: 'From Lesson 06: AI spots patterns in numbers — but moving together does NOT mean one caused the other!',
        headline: 'Banning ice cream will NOT stop beach sunburns',
        plainText: 'Standard AI sees two numbers rise together and assumes a link. Turn on Hidden Cause X-Ray on these 3 real traps:',
        widget: {
          kind: 'spotter',
          instruction: 'Tap the fake cause-and-effect claim (or turn on Hidden Cause X-Ray)',
          xrayLabel: 'Hidden Cause X-Ray',
          items: [
            {
              title: 'Ice Cream <-> Sunburns',
              preview: 'City AI notices days with high ice-cream sales have 4x more sunburns—recommends taxing cones!',
              hiddenTruth: 'TRAP (Confounder)! Hot July sunshine drives BOTH ice cream AND swimming. Taxing cones changes 0 sunburns!',
              isTrap: true,
            },
            {
              title: 'Top Hospital "Higher Death Rate"',
              preview: 'Raw chart shows helicopter trauma center has more deaths than a suburban skin clinic.',
              hiddenTruth: 'TRAP (Selection Bias)! The trauma center receives the most critical crash victims!',
              isTrap: true,
            },
            {
              title: 'Randomized 50/50 Checkout A/B Test',
              preview: '10,000 random shoppers see 1-page checkout; 10,000 random shoppers see 3-page checkout -> +9% orders.',
              hiddenTruth: 'TRUE CAUSE! Random coin-flip assignment cancels hidden differences and proves the new page caused +9%.',
              isTrap: false,
            },
          ],
        },
      },
      {
        bridge: 'What when AI isn’t sure? Honest uncertainty saves lives.',
        headline: 'A calibrated AI knows when to say "I’m only 55% sure — ask a human"',
        plainText: 'Compare an overconfident bluffer against an honestly calibrated model on blurry medical scans:',
        widget: {
          kind: 'tester',
          promptLabel: 'Feed blurry edge-case scans to both models',
          modes: [
            { name: 'Uncalibrated Bluffer', badge: 'Always shouts 99% sure!' },
            { name: 'Calibrated + Range AI', badge: 'Honest % + Safe Escalation' },
          ],
          cases: [
            {
              name: 'Crystal-Clear Healthy Scan',
              detail: 'Sharp lighting, textbook normal',
              results: [
                { pass: true, output: '"99% Normal" (Happens to be right)', why: 'Easy cases hide overconfidence.' },
                { pass: true, output: '"97% Normal" -> Auto-clears fast', why: 'High true confidence clears routine work safely.' },
              ],
            },
            {
              name: 'Blurry Shadow Behind Rib',
              detail: 'Motion blur hides key detail',
              results: [
                { pass: false, output: '"99% Normal!" -> Sends sick patient home!', why: 'Overconfident wrong guesses are deadly.' },
                { pass: true, output: '"52% Uncertain — Flagged for Radiologist Review"', why: 'Honest uncertainty triggers human review right when needed!' },
              ],
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Correlation vs. Causation & Confounders', plain: 'Moving together vs. actually causing change; hidden third factors (heat) often drive both.', example: 'Umbrellas correlate with wet streets; rain causes both.' },
      { title: 'Selection Bias & Counterfactuals', plain: 'Studying a skewed sample, and asking "what would have happened if we acted differently?"', example: 'Randomized A/B tests prove real treatment effects.' },
      { title: 'Calibration & Conformal Prediction Ranges', plain: 'Ensuring "80% sure" really wins 8/10 times, and outputting guaranteed min–max ranges.', example: 'House estimate "$390k–$420k (90% coverage)".' },
    ],
    resources: [
      { title: 'Correlation vs. Causality Clearly Explained', type: 'video', source: 'StatQuest with Josh Starmer', duration: '9m video', url: 'https://www.youtube.com/watch?v=2py8mks2j6M', why: 'Makes hidden confounders crystal clear in 9 minutes.' },
      { title: 'Introduction to Causality with Everyday Stories', type: 'text', source: 'Causal Inference for the Brave and True', duration: '10m read', url: 'https://matheusfacure.github.io/python-causality-handbook/01-Introduction-To-Causality.html', why: 'Fun beginner stories showing why raw averages lie.' },
    ],
  },

  {
    id: 't05',
    indexNum: 5,
    levelId: 2,
    orderInLevel: 3,
    title: 'Data and datasets',
    friendlyTitle: 'Data: Fuel, Splits & Sneaky Leaks',
    summaryQuestion: 'How does sneaking one future clue into a dataset create a fake 99.9% genius?',
    icon: 'database',
    nextLessonBridge: 'Level 02 complete! Play the Data & Signal Trial to clear the fog on Level 03!',
    scenes: [
      {
        bridge: 'From Lesson 07: Biased clues mislead AI — so let’s inspect the actual dataset table AI studies!',
        headline: 'Never let the student study from tomorrow’s final exam sheet!',
        plainText: 'To test honestly, split examples into 3 locked rooms: Training (study book), Validation (practice quiz), and Test (locked vault exam). Spot the Data Leakage bug below:',
        widget: {
          kind: 'spotter',
          instruction: 'Hospital AI predicts at 9 AM arrival: "Will this patient need the ICU?" Tap the cheating column!',
          xrayLabel: 'Leakage Scanner',
          items: [
            {
              title: 'Column A: Age & Heart Rate',
              preview: 'Recorded by nurse at 9:00 AM front desk.',
              hiddenTruth: 'Clean feature (clue): genuinely available at 9:00 AM prediction time.',
              isTrap: false,
            },
            {
              title: 'Column B: Oxygen %',
              preview: 'Finger clip sensor at 9:02 AM.',
              hiddenTruth: 'Clean feature: real intake signal.',
              isTrap: false,
            },
            {
              title: 'Column C: "ICU Bed Billed"',
              preview: 'Added to spreadsheet 3 days LATER by hospital billing!',
              hiddenTruth: 'DATA LEAKAGE TRAP! The answer snuck into the clues—scores 99.9% on old spreadsheets and 50% at 9 AM live!',
              isTrap: true,
            },
          ],
        },
      },
      {
        bridge: 'Even with zero leakage, what happens 12 months after launch when human habits change?',
        headline: 'Clean 1,000 examples beat 1,000,000 messy ones — and watch for World Drift',
        plainText: 'Slide across three real dataset states to see how dirty labels and changing slang affect live users:',
        widget: {
          kind: 'slider',
          dialLabel: 'Test Dataset Quality & Freshness',
          stops: [
            {
              label: '1. Messy & Biased',
              tag: 'Garbage In -> Garbage Out',
              sampleInput: 'Voice AI trained ONLY on quiet studio American voices',
              sampleOutput: 'Fails 45% of the time on accents or busy cafe noise!',
              verdict: 'bad',
              why: 'Missing real-world groups (Sampling Bias) blinds the model where it counts.',
            },
            {
              label: '2. Clean, Balanced & Split',
              tag: 'Healthy Launch',
              sampleInput: 'Diverse accents + street noise + clean verified labels + locked Test vault',
              sampleOutput: '93% lab score -> 92% real customer score!',
              verdict: 'good',
              why: 'Representative data + strict Train/Val/Test split predicts real life honestly.',
            },
            {
              label: '3. Two Years Later (Drift)',
              tag: 'Distribution Shift',
              sampleInput: '2024 scam detector facing brand-new 2026 scam phrases',
              sampleOutput: 'Accuracy silently rots from 92% -> 64%!',
              verdict: 'warn',
              why: 'World Drift means datasets need ongoing monitoring, versioning, and fresh examples.',
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Features (Clues) & Labels (Target Answers)', plain: 'Input columns/pixels (features) paired with the right answer you want predicted (label).', example: 'House sq-ft = feature; sale price = label.' },
      { title: 'Structured Tables vs. Unstructured Media', plain: 'Neat Excel columns vs. raw text, photos, audio, and live sensor streams.', example: 'Bank CSV vs. call-center recordings.' },
      { title: 'Train / Validation / Test Splits & Leakage', plain: 'Keeping study data strictly separate from the final exam so answers never leak across.', example: 'Deduplicating identical webpages before splitting.' },
      { title: 'Sampling Bias, Synthetic Data & World Drift', plain: 'Ensuring all user groups are represented, adding simulated edge cases, and refreshing stale data.', example: 'Dataset Cards document origin, consent, and limits.' },
    ],
    resources: [
      { title: 'Train, Validation & Test Sets Clearly Explained', type: 'video', source: 'StatQuest with Josh Starmer', duration: '8m video', url: 'https://www.youtube.com/watch?v=fSytzGwwBVw', why: 'Shows visually why keeping 3 separate buckets prevents fake scores.' },
      { title: 'Real-World Datasets, Cleaning & Splits', type: 'text', source: 'Google ML Crash Course', duration: '11m read', url: 'https://developers.google.com/machine-learning/crash-course/numerical-data', why: 'Visual examples of messy outliers, missing rows, and leakage.' },
    ],
  },

  // ==================== LEVEL 3 ====================
  {
    id: 't06',
    indexNum: 6,
    levelId: 3,
    orderInLevel: 1,
    title: 'Learning approaches',
    friendlyTitle: 'Four Ways Machines Learn',
    summaryQuestion: 'How did AI read the whole internet when nobody labeled trillions of words?',
    icon: 'pulse',
    nextLessonBridge: 'Now you know how learning signals work—next, meet the fast classic models that run business tables!',
    scenes: [
      {
        bridge: 'Welcome to Level 03! You have clean data — now how does a machine actually study it?',
        headline: 'Compare the 4 ways to teach a child (or an AI)',
        plainText: 'Slide across the 4 big learning signals using everyday examples:',
        widget: {
          kind: 'slider',
          dialLabel: 'Switch Learning Signal',
          stops: [
            {
              label: '1. Supervised',
              tag: 'Labeled Flashcards',
              sampleInput: '10,000 photos already labeled "Cat" or "Dog" by humans',
              sampleOutput: 'Learns exact mapping from photo -> human label.',
              verdict: 'good',
              why: 'Most direct & reliable whenever clean human labels exist!',
            },
            {
              label: '2. Unsupervised',
              tag: 'Sort Buttons With Zero Labels',
              sampleInput: '50,000 unlabeled store receipts dumped on a table',
              sampleOutput: 'Automatically groups shoppers into "Morning Coffee" vs. "Weekly Family Grocery".',
              verdict: 'good',
              why: 'Discovers natural hidden clusters when nobody gave labels.',
            },
            {
              label: '3. Self-Supervised',
              tag: 'Hide-and-Seek Blank Puzzle!',
              sampleInput: 'Take normal book sentence: "Pour hot water into the [ ____ ]"',
              sampleOutput: 'Guesses "mug/cup", uncovers real word, and teaches itself!',
              verdict: 'good',
              why: 'THE secret behind ChatGPT/Claude: trillions of free fill-in-the-blank puzzles with zero human labelers!',
            },
            {
              label: '4. Reinforcement + Transfer',
              tag: 'Score Treats & Reusing Skills',
              sampleInput: 'Game/Robot gets +10 for winning, -5 for crashing',
              sampleOutput: 'Discovers winning moves by trial—or reuses an existing educated brain (Transfer Learning).',
              verdict: 'good',
              why: 'Transfer Learning lets you adapt a smart pre-educated brain with just 100 examples!',
            },
          ],
        },
      },
      {
        bridge: 'What if labeling 100,000 medical scans costs $500,000—can we be smarter?',
        headline: 'Smart Shortcuts: Transfer, Active & Federated Learning',
        plainText: 'Compare paying doctors to label everything from scratch vs. modern smart shortcuts:',
        widget: {
          kind: 'compare',
          scenario: 'Teaching a phone app to spot rare skin rashes privately with tiny budget',
          cards: [
            {
              name: 'Label 100k From Zero',
              tag: 'Brute-force Supervised',
              output: 'Costs $500,000 and 18 months of doctor time.',
              speed: '18 months',
              cost: '$$$$$',
              best: false,
              why: 'Starting from random noise wastes huge money.',
            },
            {
              name: 'Transfer + Active Learning',
              tag: 'Reuse vision brain + ask only hard cases',
              output: 'AI asks doctors ONLY about the 300 most confusing photos -> 94% accuracy!',
              speed: '1 week',
              cost: '$',
              best: true,
              why: 'Reuse broad vision skills (Transfer) and spend human effort only on borderline cases (Active).',
            },
            {
              name: 'Federated Learning',
              tag: 'Private on-phone updates',
              output: 'Phones learn locally and share tiny math summaries—raw private photos never upload!',
              speed: 'Automatic',
              cost: '$$',
              best: false,
              why: 'How Apple/Google improve phone keyboards without reading your private messages.',
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Supervised vs. Unsupervised Learning', plain: 'Learning from human-labeled answers vs. grouping unlabeled items by similarity.', example: 'Spam flashcards vs. grouping customer segments.' },
      { title: 'Self-Supervised Learning', plain: 'Turning raw text/images into automatic fill-in-the-blank puzzles.', example: 'Predicting the next hidden word across millions of books.' },
      { title: 'Reinforcement & Imitation Learning', plain: 'Learning from reward scores (+1/-1) or copying expert recordings.', example: 'Copying human drivers first, then practicing in a simulator.' },
      { title: 'Transfer, Active & Federated Learning', plain: 'Reusing pre-learned brains, labeling only confusing examples, and training privately on user devices.', example: 'Adapting a vision model with 200 photos instead of 200,000.' },
    ],
    resources: [
      { title: 'Supervised, Unsupervised & RL in 7 Minutes', type: 'video', source: 'Visual AI Intro', duration: '7m video', url: 'https://www.youtube.com/watch?v=1FZ0A1QCMWc', why: 'Everyday visual analogies for the core learning styles.' },
      { title: 'Self-Supervised Learning Explained Visually', type: 'text', source: 'Meta AI Blog', duration: '9m read', url: 'https://ai.meta.com/blog/self-supervised-learning-the-dark-matter-of-intelligence/', why: 'Shows how fill-in-the-blank unlocked modern foundation models.' },
    ],
  },

  {
    id: 't07',
    indexNum: 7,
    levelId: 3,
    orderInLevel: 2,
    title: 'Classical machine learning',
    friendlyTitle: 'Fast Classic Models (No Giant AI)',
    summaryQuestion: 'How does playing "20 Questions" with 500 tiny flowcharts beat giant AI on spreadsheets?',
    icon: 'grid',
    nextLessonBridge: 'You built a fast model—next, uncover the sneaky "99% Accuracy" lie in Model Evaluation!',
    scenes: [
      {
        bridge: 'From Lesson 09: Before touching massive neural nets, meet the fast classic models that quietly run banks and shops.',
        headline: 'Trend Lines, "20 Questions" Trees & Wisdom of Crowds',
        plainText: 'Compare how 3 classic models decide whether a $400 credit card swipe at 3 AM is real or stolen:',
        widget: {
          kind: 'compare',
          scenario: '3:00 AM swipe for $400 electronics in a new city — Fraud or Real?',
          cards: [
            {
              name: '1. Nearest Neighbors',
              tag: 'Look at 5 closest past swipes',
              output: '"4 of the 5 most similar past swipes were stolen -> 80% Fraud!"',
              speed: 'Fast',
              cost: '$',
              best: false,
              why: 'Judges new cases directly by similar past cases (like pricing a house by 5 nearby sales).',
            },
            {
              name: '2. One Decision Tree',
              tag: 'Flowchart of Yes/No splits',
              output: 'Amount > $300? YES -> New city? YES -> 3 AM? YES -> Flag!',
              speed: 'Instant',
              cost: '$',
              best: false,
              why: 'Super easy for humans to read on paper, though 1 lone tree can be jumpy.',
            },
            {
              name: '3. Forest / Boosted Trees',
              tag: '500 trees voting together!',
              output: '460 of 500 specialist trees vote Fraud -> 92% Fraud (0.002 seconds!)',
              speed: '0.002 sec',
              cost: '$',
              best: true,
              why: 'Random Forests & XGBoost combine hundreds of small trees—undefeated king of spreadsheet data!',
            },
          ],
        },
      },
      {
        bridge: 'Why does crafting one smart column ("Feature Engineering") beat fancier math?',
        headline: 'Giving clearer clues beats buying a bigger brain',
        plainText: 'Test raw unhelpful columns vs. one smart human-crafted clue:',
        widget: {
          kind: 'tester',
          promptLabel: 'Predict if a restaurant delivery will run late',
          modes: [
            { name: 'Raw GPS Numbers Only', badge: 'Lat: 31.52, Lon: 74.35, Timestamp' },
            { name: 'Engineered Clues', badge: 'Distance_km + Is_Rush_Hour + Kitchen_Queue' },
          ],
          cases: [
            {
              name: 'Friday 6:15 PM Rainy Dinner Rush',
              detail: '18 orders backed up on grill',
              results: [
                { pass: false, output: 'Guesses "22 min" (misses rush hour & kitchen backlog!)', why: 'Raw timestamps force small models to guess calendar patterns blindly.' },
                { pass: true, output: 'Predicts "44 min" within 2 minutes of truth!', why: 'Turning raw data into meaningful clues (Feature Engineering) is rocket fuel.' },
              ],
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Regression (Guess a Number) vs. Classification (Pick a Bucket)', plain: 'Predicting exact price/minutes vs. labeling Fraud/Safe.', example: '$340k price = regression; Spam/Inbox = classification.' },
      { title: 'Decision Trees, Random Forests & Gradient Boosting', plain: 'Yes/No flowcharts combined into 500-tree voting teams that fix each other’s errors.', example: 'XGBoost/LightGBM win most spreadsheet tasks.' },
      { title: 'Clustering & Anomaly Detection', plain: 'Grouping similar customers automatically, or spotting weird 1-in-10,000 outliers.', example: 'Flagging a sudden server traffic spike.' },
      { title: 'Feature Engineering & Interpretable Models', plain: 'Crafting helpful input columns ("days_since_login") and seeing exact column weights.', example: 'Doctors and regulators can inspect exact reason codes.' },
    ],
    resources: [
      { title: 'Decision Trees & Random Forests Clearly Explained', type: 'video', source: 'StatQuest with Josh Starmer', duration: '17m video', url: 'https://www.youtube.com/watch?v=_L39rN6gz7Y', why: 'Zero-math visual animation of flowchart trees and forests.' },
      { title: 'A Visual Introduction to Machine Learning', type: 'text', source: 'R2D3 Interactive', duration: '8m interactive', url: 'http://www.r2d3.us/visual-intro-to-machine-learning-part-1/', why: 'Scroll through an animated decision tree splitting real homes live.' },
    ],
  },

  {
    id: 't28',
    indexNum: 28,
    levelId: 3,
    orderInLevel: 3,
    title: 'Model evaluation',
    friendlyTitle: 'Testing AI & Spotting Fake 99% Scores',
    summaryQuestion: 'How can a broken machine brag "99% Accurate!" while catching ZERO real threats?',
    icon: 'check',
    nextLessonBridge: 'Level 03 complete! Play the Pattern & Proof Trial to clear the fog on Level 04: Neural Networks!',
    scenes: [
      {
        bridge: 'From Lesson 10: You trained a model — now don’t let a fake "99% Accuracy" headline trick you!',
        headline: 'The 99% Lie: Shouting "EVERYONE IS HEALTHY!" on a 1-in-100 illness scores 99%!',
        plainText: 'Out of 100 airport bags, 99 are safe and 1 hides a weapon. Test a "Broken Lazy Scanner" vs. a real scanner:',
        widget: {
          kind: 'tester',
          promptLabel: 'Test 100 airport bags (99 safe + 1 weapon)',
          modes: [
            { name: 'Lazy Unplugged Box', badge: 'Prints "SAFE" on 100% of bags' },
            { name: 'Real Tuned Scanner', badge: 'Checks Recall & Precision' },
          ],
          cases: [
            {
              name: 'Headline "Overall Accuracy %"',
              detail: 'Count how many of 100 bags got the right label',
              results: [
                { pass: false, output: 'Scores 99% Accuracy — while letting 100% of weapons onto the plane!', why: 'Raw Accuracy is a total lie whenever threats are rare!' },
                { pass: true, output: 'Ignores vanity accuracy; measures Recall (caught 1/1 weapon = 100%)!', why: 'Recall asks: "Of all real threats, how many did we actually catch?"' },
              ],
            },
            {
              name: 'False Alarm Check (Precision)',
              detail: 'How often is a beeping alarm actually a real threat?',
              results: [
                { pass: false, output: 'Never beeps — 0 threats caught', why: 'Useless security.' },
                { pass: true, output: 'Beeps on 2 bags (1 real weapon + 1 metal water bottle = 50% Precision)', why: 'Precision vs. Recall lets you tune exact alarm sensitivity!' },
              ],
            },
          ],
        },
      },
      {
        bridge: 'Even when metrics are honest, overall averages can hide terrible failures on smaller groups!',
        headline: 'Always check Subgroup Slices, Dumb Baselines & Leaderboard Cheats',
        plainText: 'Inspect 3 evaluation reports—tap the hidden testing blunder:',
        widget: {
          kind: 'spotter',
          instruction: 'Tap the flawed evaluation report (or turn on Audit Lens)',
          xrayLabel: 'Audit Lens',
          items: [
            {
              title: 'Beat a Dumb Baseline First',
              preview: 'Before praising our 78% weather AI, checked "tomorrow = today’s weather" (which got 76%).',
              hiddenTruth: 'Smart! Proves the AI actually added +2% real skill instead of obvious inertia.',
              isTrap: false,
            },
            {
              title: 'Slice by Lighting & Accent',
              preview: 'Checked camera score separately on Sunny Noon (97%) vs. Rainy Night (61% -> fixed before launch!).',
              hiddenTruth: 'Smart! Subgroup slicing catches dangerous blind spots hidden inside a 94% average.',
              isTrap: false,
            },
            {
              title: 'Public Leaderboard Brag Only',
              preview: 'Vendor brags "#1 on public internet math test!" — zero test on YOUR private customer tickets.',
              hiddenTruth: 'GOODHART’S LAW TRAP! Models memorize public internet tests (Contamination) and often flop on your real work.',
              isTrap: true,
            },
          ],
        },
      },
    ],
    subTopics: [
      { title: 'Precision (Alarm Trust) vs. Recall (Threat Catch Rate)', plain: 'Precision = when it rings, is it real? Recall = of all real cases, how many did we catch?', example: 'Smoke detectors favor high Recall.' },
      { title: 'Simple Baselines & Ablation Tests', plain: 'Comparing against a 1-line rule first, and removing parts one by one to prove each part earns its keep.', example: 'Delete an extra step if accuracy stays identical!' },
      { title: 'Subgroup Slices & Red Teaming', plain: 'Measuring error separately on tough slices (night, accents, rare cases) and actively trying to break it.', example: 'Stress-testing weird inputs before customers find them.' },
      { title: 'Benchmark Contamination & Goodhart’s Law', plain: 'Public test questions leaking into training sets—always keep a private real-world golden test set.', example: '50 real customer questions locked in your own sheet.' },
    ],
    resources: [
      { title: 'Precision, Recall & Confusion Matrix Visually', type: 'video', source: 'StatQuest with Josh Starmer', duration: '14m video', url: 'https://www.youtube.com/watch?v=Kdsp6soqA7o', why: 'Makes the 99% accuracy trap unforgettable.' },
      { title: 'Interactive Threshold & Metrics Sliders', type: 'text', source: 'Google ML Crash Course', duration: '11m interactive', url: 'https://developers.google.com/machine-learning/crash-course/classification', why: 'Drag the alarm bar and watch false alarms vs. misses live.' },
    ],
  },
];
