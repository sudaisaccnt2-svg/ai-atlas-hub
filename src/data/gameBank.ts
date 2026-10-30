import { GameChallenge } from '../types';

export function shuffle<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const RAW_CHALLENGES: GameChallenge[] = [
  // ==================== LEVEL 1 ====================
  {
    id: 'l1-sort-1',
    levelId: 1,
    mechanic: 'SORT',
    prompt: 'Route each real task to the simplest tool that works',
    buckets: ['Normal Code / Rules', 'Machine Learning'],
    items: [
      { label: 'Calculate 15% sales tax on cart total', bucketIndex: 0, why: 'Exact arithmetic formula—zero learning needed.' },
      { label: 'Spot bruised apples on a moving camera belt', bucketIndex: 1, why: 'Messy pixel shapes break hand-written rules.' },
      { label: 'Sort invoices newest-to-oldest by date', bucketIndex: 0, why: 'A 1-line database sort is 100% exact.' },
      { label: 'Detect fraudulent credit card patterns', bucketIndex: 1, why: 'Fraud patterns shift subtly across clues.' },
      { label: 'Transcribe spoken doctor notes in noise', bucketIndex: 1, why: 'Sound waves need deep pattern recognition.' },
      { label: 'Block passwords shorter than 8 characters', bucketIndex: 0, why: 'Simple length rule.' },
    ],
  },
  {
    id: 'l1-sort-2',
    levelId: 1,
    mechanic: 'SORT',
    prompt: 'Separate School Time vs. Daily Work Time',
    buckets: ['Training Phase', 'Inference Phase'],
    items: [
      { label: 'Tuning billions of internal dials over weeks', bucketIndex: 0, why: 'Weights change during Training.' },
      { label: 'Answering a customer chat in 0.4 seconds', bucketIndex: 1, why: 'Frozen weights serving live requests = Inference.' },
      { label: 'Running live camera face-unlock on your phone', bucketIndex: 1, why: 'Fast daily prediction using a trained model.' },
      { label: 'Studying 10 million labeled X-rays on GPU clusters', bucketIndex: 0, why: 'Heavy upfront learning pass.' },
    ],
  },
  {
    id: 'l1-pipe-1',
    levelId: 1,
    mechanic: 'PIPELINE',
    prompt: 'Wire the safe way to direct AI on a real task',
    steps: ['Define goal & limits', 'Ask for short plan', 'Build one small slice', 'Verify with real test'],
    why: 'Clear constraints -> plan -> small slice -> independent verification keeps humans in charge.',
  },
  {
    id: 'l1-pipe-2',
    levelId: 1,
    mechanic: 'PIPELINE',
    prompt: 'Order the Smart Escalation Ladder (cheapest/simplest first)',
    steps: ['Simple Rules / DB', 'Prompt a Model', 'Add Search (RAG)', 'Fine-Tune Weights'],
    why: 'Never jump to expensive training when rules, prompts, or open-book lookup already solve it.',
  },
  {
    id: 'l1-det-1',
    levelId: 1,
    mechanic: 'DETECTIVE',
    prompt: 'Tap the broken design flaw in this Refund Bot system',
    nodes: [
      { label: 'Ticket Reader', stat: 'Extracts order ID', isBroken: false },
      { label: 'Policy Lookup', stat: 'Reads return window', isBroken: false },
      { label: 'Bank Wire Tool', stat: 'Auto-sends $25,000 unreviewed', isBroken: true },
      { label: 'Audit Logger', stat: 'Saves conversation', isBroken: false },
    ],
    why: 'High-impact irreversible actions ($25k wire!) always require a human approval gate.',
  },
  {
    id: 'l1-det-2',
    levelId: 1,
    mechanic: 'DETECTIVE',
    prompt: 'Spot the hidden mistake in how this team directs AI',
    nodes: [
      { label: 'Prompt Context', stat: 'Clear role & 2 examples', isBroken: false },
      { label: 'Data Input', stat: 'Pasted live customer passwords', isBroken: true },
      { label: 'Output Format', stat: 'Strict JSON check', isBroken: false },
      { label: 'Verification', stat: 'Automated test suite', isBroken: false },
    ],
    why: 'Never paste raw secrets, API keys, or private customer passwords into external prompts.',
  },
  {
    id: 'l1-tune-1',
    levelId: 1,
    mechanic: 'TUNER',
    prompt: 'Set the minimum confidence required before auto-routing WITHOUT human review on a high-risk medical triage queue',
    unitLabel: '% confidence cutoff',
    min: 50,
    max: 99,
    step: 1,
    targetMin: 90,
    targetMax: 99,
    lowStateLabel: 'Danger: reckless guesses skip doctors!',
    sweetStateLabel: 'Safe: only crystal-clear cases auto-route; rest go to doctors',
    highStateLabel: 'Safe: strict human oversight',
    why: 'High-stakes workflows keep strict confidence thresholds and escalate uncertain cases to specialists.',
  },
  {
    id: 'l1-dec-1',
    levelId: 1,
    mechanic: 'DECISION',
    scenario: 'A retail store’s return policy changes every Friday. Customers ask questions about current rules.',
    constraintTag: 'Weekly changing facts · Low budget',
    options: [
      { label: 'Connect a model to search the live policy doc (RAG)', isBest: true, why: 'Open-book retrieval updates instantly every Friday without retraining.' },
      { label: 'Train a brand-new AI model from scratch every weekend', isBest: false, why: 'Costs fortunes and fails on small policy docs.' },
      { label: 'Fine-tune weights weekly with no search', isBest: false, why: 'Fine-tuning teaches style, not reliable weekly facts.' },
    ],
  },
  {
    id: 'l1-dec-2',
    levelId: 1,
    mechanic: 'DECISION',
    scenario: 'An AI assistant writes a legal summary with super smooth grammar and 3 court case names.',
    constraintTag: 'Verification check',
    options: [
      { label: 'Verify every cited case independently in a real legal database', isBest: true, why: 'Fluency never equals factual truth; bare models invent plausible citations.' },
      { label: 'Trust it immediately because the tone is confident and detailed', isBest: false, why: 'Hallucinations sound identical to facts.' },
      { label: 'Ask the same chat session "Are you 100% sure?" and ship if it says Yes', isBest: false, why: 'Models cheerfully double down on invented facts.' },
    ],
  },

  // ==================== LEVEL 2 ====================
  {
    id: 'l2-sort-1',
    levelId: 2,
    mechanic: 'SORT',
    prompt: 'Correlation only, or True Cause?',
    buckets: ['Just Correlation', 'Direct Cause'],
    items: [
      { label: 'Ice cream sales rise on days drownings rise', bucketIndex: 0, why: 'Hidden confounder: hot summer weather drives both!' },
      { label: 'Flipping the wall switch turns off the wired ceiling bulb', bucketIndex: 1, why: 'Breaking the circuit physically cuts current.' },
      { label: 'People wearing raincoats walk on wet sidewalks', bucketIndex: 0, why: 'Rain causes both; coats do not wet concrete.' },
      { label: 'Randomized A/B test shows shorter checkout lifts orders +8%', bucketIndex: 1, why: 'Randomized controlled split isolates real causal effect.' },
    ],
  },
  {
    id: 'l2-pipe-1',
    levelId: 2,
    mechanic: 'PIPELINE',
    prompt: 'Build a leak-free dataset workflow in exact order',
    steps: ['Collect & clean raw rows', 'Lock away untouched Test split', 'Train on Training split', 'Grade once on locked Test'],
    why: 'Locking the Test set away BEFORE training prevents accidental data leakage.',
  },
  {
    id: 'l2-det-1',
    levelId: 2,
    mechanic: 'DETECTIVE',
    prompt: 'Why did this Hospital Predictor get a fake 99.8% lab score and fail live?',
    nodes: [
      { label: 'Blood Pressure Column', stat: 'Measured at intake', isBroken: false },
      { label: 'Age Column', stat: '18–95 balanced', isBroken: false },
      { label: 'ICU Billing Code Column', stat: 'Added AFTER patient got sick!', isBroken: true },
      { label: 'Test Split', stat: '20% held out', isBroken: false },
    ],
    why: 'Data Leakage! Future outcome clues ("ICU billing") leaked into the input features.',
  },
  {
    id: 'l2-det-2',
    levelId: 2,
    mechanic: 'DETECTIVE',
    prompt: 'Spot the hidden data failure hurting real customers',
    nodes: [
      { label: 'Audio Quality', stat: 'Clean 16kHz WAV', isBroken: false },
      { label: 'Speaker Diversity', stat: '100% quiet studio recordings, 0 street noise', isBroken: true },
      { label: 'Label Accuracy', stat: '99% verified text', isBroken: false },
      { label: 'Version Tracking', stat: 'Dataset Card v2.1', isBroken: false },
    ],
    why: 'Sampling bias / distribution mismatch: studio-only audio collapses on noisy real-world phones.',
  },
  {
    id: 'l2-tune-1',
    levelId: 2,
    mechanic: 'TUNER',
    prompt: 'Pick a sane Training % share when splitting 10,000 clean rows (leaving enough for Validation + Test!)',
    unitLabel: '% for Training',
    min: 20,
    max: 100,
    step: 5,
    targetMin: 70,
    targetMax: 85,
    lowStateLabel: 'Starved: model barely sees enough study examples',
    sweetStateLabel: 'Balanced: ~75–80% study + 20–25% for honest Validation & Test',
    highStateLabel: 'Zero exam left: 95–100% leaves no trustworthy Test room!',
    why: 'A classic 75/15/10 or 80/10/10 split balances learning power with honest grading.',
  },
  {
    id: 'l2-dec-1',
    levelId: 2,
    mechanic: 'DECISION',
    scenario: 'Your 2023 shopping recommender slowly lost 25% accuracy this year even though zero code changed.',
    constraintTag: 'Live degradation',
    options: [
      { label: 'Check for Distribution Drift—user tastes & products shifted since 2023', isBest: true, why: 'World drift rots accuracy silently when real-world inputs move away from old training data.' },
      { label: 'Delete the test set so accuracy looks higher', isBest: false, why: 'Hiding the thermometer never cures the fever.' },
      { label: 'Multiply all vectors by 100', isBest: false, why: 'Scaling numbers cannot invent new 2026 shopping trends.' },
    ],
  },
  {
    id: 'l2-dec-2',
    levelId: 2,
    mechanic: 'DECISION',
    scenario: 'On a meaning map (vector space), the gradient arrow points steep UPHILL toward MORE error.',
    constraintTag: 'Conceptual math',
    options: [
      { label: 'Step in the OPPOSITE direction (downhill) to shrink mistakes', isBest: true, why: 'Gradient descent steps opposite the uphill slope to minimize error.' },
      { label: 'Climb uphill to maximize mistakes', isBest: false, why: 'That explodes loss!' },
      { label: 'Freeze all weights at random forever', isBest: false, why: 'No learning happens.' },
    ],
  },

  // ==================== LEVEL 3 ====================
  {
    id: 'l3-sort-1',
    levelId: 3,
    mechanic: 'SORT',
    prompt: 'Match each scenario to its Learning Signal',
    buckets: ['Supervised', 'Unsupervised', 'Self-Supervised'],
    items: [
      { label: '50,000 house listings WITH exact sold prices', bucketIndex: 0, why: 'Clear input -> target price labels = Supervised.' },
      { label: 'Grouping 100k unlabeled shoppers into natural clusters', bucketIndex: 1, why: 'Discovering natural clusters with zero labels = Unsupervised.' },
      { label: 'Hiding the last word of Wikipedia sentences to practice predicting it', bucketIndex: 2, why: 'Auto-generated fill-in-the-blank puzzles = Self-Supervised.' },
      { label: 'Doctors marking "fracture / normal" on 4,000 wrist X-rays', bucketIndex: 0, why: 'Human-annotated categories = Supervised.' },
    ],
  },
  {
    id: 'l3-det-1',
    levelId: 3,
    mechanic: 'DETECTIVE',
    prompt: 'A Fraud Detector brags "99.9% Accuracy!" yet the bank lost $2M. Tap the lie!',
    nodes: [
      { label: 'Dataset Mix', stat: '99.9% normal, 0.1% fraud', isBroken: false },
      { label: 'Overall Accuracy', stat: '99.9% (guesses SAFE every single time!)', isBroken: true },
      { label: 'Latency', stat: '4ms per swipe', isBroken: false },
      { label: 'Model Type', stat: 'Decision Tree', isBroken: false },
    ],
    why: 'On rare events (0.1% fraud), guessing "SAFE" blindly gets 99.9% accuracy while catching 0% of thieves (0% Recall)!',
  },
  {
    id: 'l3-pipe-1',
    levelId: 3,
    mechanic: 'PIPELINE',
    prompt: 'Order a trustworthy evaluation plan before launching a new model',
    steps: ['Measure dumb simple baseline', 'Train candidate model', 'Check overall + subgroup slices', 'Run blind real-world pilot'],
    why: 'Without a simple baseline and subgroup slices, overall averages hide broken edge cases.',
  },
  {
    id: 'l3-tune-1',
    levelId: 3,
    mechanic: 'TUNER',
    prompt: 'Tune spam-filter alarm threshold so almost ZERO important work emails get deleted (high Precision!)',
    unitLabel: '% spam certainty required',
    min: 20,
    max: 98,
    step: 2,
    targetMin: 84,
    targetMax: 98,
    lowStateLabel: 'Too trigger-happy: bosses’ emails land in trash!',
    sweetStateLabel: 'Crisp: only high-certainty junk is blocked; borderline stays safe',
    highStateLabel: 'Safe inbox',
    why: 'When false positives hurt badly (losing real mail), raise the threshold so alarms only fire when very sure.',
  },
  {
    id: 'l3-dec-1',
    levelId: 3,
    mechanic: 'DECISION',
    scenario: 'You have a neat 8,000-row Excel table of store sales, weather, and day-of-week to forecast tomorrow’s bread demand.',
    constraintTag: 'Tabular spreadsheet · Fast & explainable',
    options: [
      { label: 'Gradient Boosted Trees / Random Forest + simple baseline check', isBest: true, why: 'Classical tree ensembles dominate medium tabular data at tiny cost.' },
      { label: 'Rent 64 GPUs to train a 70-billion-parameter chatbot', isBest: false, why: 'Massive overkill and worse on small numeric tables.' },
      { label: '3D Gaussian Splatting', isBest: false, why: '3D rendering has nothing to do with bread tables.' },
    ],
  },
  {
    id: 'l3-dec-2',
    levelId: 3,
    mechanic: 'DECISION',
    scenario: 'Engineers tweak their model 200 times peeking at the same public leaderboard until they hit #1.',
    constraintTag: 'Goodhart’s Law',
    options: [
      { label: 'Test on a fresh, unseen private dataset—they likely overfit the leaderboard!', isBest: true, why: 'When a benchmark becomes the target, repeated peeking games the score.' },
      { label: 'Celebrate—#1 on a public leaderboard guarantees 0 real-world bugs', isBest: false, why: 'Leaderboard contamination fails constantly in production.' },
      { label: 'Remove all error slices', isBest: false, why: 'Slices expose hidden subgroup failures.' },
    ],
  },

  // ==================== LEVEL 4 ====================
  {
    id: 'l4-pipe-1',
    levelId: 4,
    mechanic: 'PIPELINE',
    prompt: 'Wire one complete Neural Network learning step',
    steps: ['Forward Pass (make guess)', 'Loss Function (measure error)', 'Backpropagation (trace blame)', 'Optimizer Step (nudge weights)'],
    why: 'Guess -> measure miss -> trace slopes backward -> nudge dials downhill.',
  },
  {
    id: 'l4-sort-1',
    levelId: 4,
    mechanic: 'SORT',
    prompt: 'Match each task to its natural Neural Blueprint',
    buckets: ['CNN (Grid Scanner)', 'Transformer (Attention)', 'GNN (Node Graph)'],
    items: [
      { label: 'Translating a 20-page legal contract', bucketIndex: 1, why: 'Transformers link distant words across pages in parallel.' },
      { label: 'Ultra-fast edge-camera defect check on tiny chip', bucketIndex: 0, why: 'CNNs scan 2D pixel patches with tiny memory.' },
      { label: 'Predicting how atoms & bonds fold in a drug molecule', bucketIndex: 2, why: 'Atoms + chemical bonds are natural graphs (GNN).' },
    ],
  },
  {
    id: 'l4-det-1',
    levelId: 4,
    mechanic: 'DETECTIVE',
    prompt: 'Inspect this Epoch 50 training dashboard—tap the clear sign of Overfitting!',
    nodes: [
      { label: 'Batch Size', stat: '64 examples', isBroken: false },
      { label: 'Training Error', stat: '0.1% (memorized textbook)', isBroken: false },
      { label: 'Validation Error', stat: 'Climbed from 6% up to 34%!', isBroken: true },
      { label: 'Checkpointing', stat: 'Saved every epoch', isBroken: false },
    ],
    why: 'Shrinking training error while validation error climbs means the model is memorizing quirks instead of generalizing!',
  },
  {
    id: 'l4-det-2',
    levelId: 4,
    mechanic: 'DETECTIVE',
    prompt: 'A pneumonia X-ray AI failed at Hospital B. Saliency maps revealed the culprit—tap it!',
    nodes: [
      { label: 'Lung Rib Contrast', stat: 'Ignored (2% weight)', isBroken: false },
      { label: 'Metal "PORTABLE ICU" Corner Tag', stat: '94% of decision came from tag!', isBroken: true },
      { label: 'Image Resolution', stat: '512x512 grayscale', isBroken: false },
      { label: 'Skip Connections', stat: 'ResNet-50', isBroken: false },
    ],
    why: 'Shortcut learning! The network cheated by reading Hospital A’s metal ICU tag instead of lung tissue.',
  },
  {
    id: 'l4-tune-1',
    levelId: 4,
    mechanic: 'TUNER',
    prompt: 'Pick the Learning Rate sweet spot (1 = microscopic crawl, 5 = steady downhill, 10 = wild cliff overshoot)',
    unitLabel: 'Step scale',
    min: 1,
    max: 10,
    step: 1,
    targetMin: 4,
    targetMax: 6,
    lowStateLabel: 'Frozen snail: takes 100 days to barely move',
    sweetStateLabel: 'Goldilocks step: converges smoothly downhill!',
    highStateLabel: 'Exploded: giant leaps bounce off the valley walls (NaN)!',
    why: 'Too small stalls; too large diverges and explodes loss.',
  },
  {
    id: 'l4-dec-1',
    levelId: 4,
    mechanic: 'DECISION',
    scenario: 'You upgraded to a better embedding model for semantic search, so new documents use Model v2 while old docs still use Model v1 vectors.',
    constraintTag: 'Latent / Embedding space',
    options: [
      { label: 'Re-embed all documents with Model v2 so everything shares ONE map', isBest: true, why: 'Different models place meanings at completely incompatible coordinates.' },
      { label: 'Mix v1 and v2 vectors in one index—numbers are numbers', isBest: false, why: 'Coordinates from two different maps produce nonsense matches.' },
      { label: 'Ask the chatbot why its weights picked coordinate #42', isBest: false, why: 'Chatbots invent stories; they cannot inspect incompatible vector indices.' },
    ],
  },

  // ==================== LEVEL 5 ====================
  {
    id: 'l5-pipe-1',
    levelId: 5,
    mechanic: 'PIPELINE',
    prompt: 'Wire an accurate Open-Book RAG pipeline from user question to answer',
    steps: ['User asks question', 'Hybrid Search + Rerank chunks', 'Inject top chunks into prompt', 'Generate answer with citations'],
    why: 'Retrieve sharp passages first, ground the prompt with them, then generate cited claims.',
  },
  {
    id: 'l5-tune-1',
    levelId: 5,
    mechanic: 'TUNER',
    prompt: 'Set LLM Temperature for extracting strict bank invoice JSON where zero random creativity is wanted',
    unitLabel: 'Temperature',
    min: 0,
    max: 1.5,
    step: 0.1,
    targetMin: 0,
    targetMax: 0.2,
    lowStateLabel: 'Locked & repeatable: picks top deterministic tokens',
    sweetStateLabel: 'Crisp & deterministic: ideal for JSON / data extraction!',
    highStateLabel: 'Wild dice rolls: invents creative keys and breaks JSON!',
    why: 'Low temperature (0.0–0.2) maximizes consistency for structured extraction and code.',
  },
  {
    id: 'l5-sort-1',
    levelId: 5,
    mechanic: 'SORT',
    prompt: 'Prompting alone vs. Needs RAG + Tools',
    buckets: ['Prompting Alone Works', 'Needs RAG / Tools'],
    items: [
      { label: 'Rewrite my rough paragraph in a friendlier tone', bucketIndex: 0, why: 'You already supplied all the text right in the prompt!' },
      { label: 'Check how many blue medium shirts are in warehouse #4 right now', bucketIndex: 1, why: 'Live inventory lives in an external database.' },
      { label: 'Cite exact clauses across 4,000 private company contracts', bucketIndex: 1, why: 'Needs indexed retrieval + permissions.' },
      { label: 'Brainstorm 5 catchy titles for this blog draft', bucketIndex: 0, why: 'Pure language remixing.' },
    ],
  },
  {
    id: 'l5-det-1',
    levelId: 5,
    mechanic: 'DETECTIVE',
    prompt: 'Employees can accidentally ask the company RAG bot for the CEO’s private salary slip! Tap the missing safeguard.',
    nodes: [
      { label: 'Vector Database', stat: 'Fast cosine search', isBroken: false },
      { label: 'Reranker', stat: 'Top-5 passages', isBroken: false },
      { label: 'Access Control Filter', stat: 'OFF (searches all HR folders for everyone)', isBroken: true },
      { label: 'Citation Links', stat: 'Shows PDF page', isBroken: false },
    ],
    why: 'Permission-aware retrieval is mandatory: never fetch chunks the logged-in user isn’t allowed to read!',
  },
  {
    id: 'l5-dec-1',
    levelId: 5,
    mechanic: 'DECISION',
    scenario: 'You have a fixed $1M compute budget to pretrain a base model. Should you build a huge brain on tiny data, or balance both?',
    constraintTag: 'Chinchilla Scaling Law',
    options: [
      { label: 'Scale model size and clean training tokens together in balance', isBest: true, why: 'Compute-optimal scaling beats oversized under-trained brains and serves cheaper.' },
      { label: 'Spend 99% on parameter count and feed it 100 articles', isBest: false, why: 'Massive under-read models fail and waste inference memory.' },
      { label: 'Feed 500 billion uncleaned spam links', isBest: false, why: 'Low-quality data poisons reasoning.' },
    ],
  },
  {
    id: 'l5-dec-2',
    levelId: 5,
    mechanic: 'DECISION',
    scenario: 'Your RAG bot gives wrong answers on pricing tables because naive 200-word chunking sliced table headers off from the rows.',
    constraintTag: 'RAG failure analysis',
    options: [
      { label: 'Keep tables intact per chunk and prepend section context headers', isBest: true, why: 'Fixing broken document chunking solves most "LLM hallucinations" in RAG!' },
      { label: 'Set temperature to 1.5 so it guesses missing headers', isBest: false, why: 'Higher randomness invents fake prices.' },
      { label: 'Remove citations so users don’t notice', isBest: false, why: 'Hiding errors destroys trust.' },
    ],
  },

  // ==================== LEVEL 6 ====================
  {
    id: 'l6-sort-1',
    levelId: 6,
    mechanic: 'SORT',
    prompt: 'Pick the right adaptation or reasoning method',
    buckets: ['LoRA Fine-Tune', 'RLHF / DPO Alignment', 'Exact Symbolic Solver'],
    items: [
      { label: 'Teach an 8B model your exact compact medical shorthand format', bucketIndex: 0, why: 'Snap-on LoRA excels at consistent domain formats on small models.' },
      { label: 'Guarantee 0 shift-rule violations across 800 hospital nurses', bucketIndex: 2, why: 'Hard constraint scheduling belongs to SAT/SMT solvers!' },
      { label: 'Steer a chat assistant to prefer honest, non-toxic replies over rude ones', bucketIndex: 1, why: 'Preference pairs (A > B) shape helpfulness and safety.' },
    ],
  },
  {
    id: 'l6-pipe-1',
    levelId: 6,
    mechanic: 'PIPELINE',
    prompt: 'Order a safe Tool-Using Coding Agent loop',
    steps: ['Decompose task & read files', 'Edit code inside sandbox', 'Run automated test tool', 'Request human review before deploy'],
    why: 'Observe -> act in sandbox -> verify with real tests -> human gate before irreversible deploy.',
  },
  {
    id: 'l6-det-1',
    levelId: 6,
    mechanic: 'DETECTIVE',
    prompt: 'Why did this customer-service model start telling wrong users "Brilliant idea, you are 100% right!"?',
    nodes: [
      { label: 'Base Pretraining', stat: 'Balanced web + books', isBroken: false },
      { label: 'LoRA Rank', stat: 'r = 16', isBroken: false },
      { label: 'RLHF Reward Signal', stat: '100% user thumbs-up with 0 truth check', isBroken: true },
      { label: 'Tokenizer', stat: '100k vocab', isBroken: false },
    ],
    why: 'Reward hacking / sycophancy! Optimizing purely for human applause teaches flattery over honesty.',
  },
  {
    id: 'l6-tune-1',
    levelId: 6,
    mechanic: 'TUNER',
    prompt: 'Set a safe Max Tool-Call Step Cap so a stuck autonomous agent cannot loop all night burning $800',
    unitLabel: 'Max loop steps',
    min: 2,
    max: 200,
    step: 2,
    targetMin: 10,
    targetMax: 30,
    lowStateLabel: 'Too cramped: stops before checking one test result',
    sweetStateLabel: 'Safe guardrail: enough room to work, stops runaway loops early!',
    highStateLabel: 'Runaway wallet drain: spins 150+ times on broken loops!',
    why: 'Bounded step budgets + loop detection stop stuck agents before costs explode.',
  },
  {
    id: 'l6-dec-1',
    levelId: 6,
    mechanic: 'DECISION',
    scenario: 'Every invoice follows the exact same 3 steps: OCR text -> check vendor ID in SQL -> draft Slack alert.',
    constraintTag: 'Workflow vs. Open Agent',
    options: [
      { label: 'Build a fixed 3-step Workflow instead of an unconstrained autonomous agent', isBest: true, why: 'When steps are known up front, fixed workflows are faster, cheaper, and way more reliable.' },
      { label: 'Let 5 autonomous agents debate in a chatroom for 10 minutes per invoice', isBest: false, why: 'Multiplies latency, cost, and compounding error rates.' },
      { label: 'Give an open agent root delete access to production SQL', isBest: false, why: 'Violates least-privilege sandboxing.' },
    ],
  },
  {
    id: 'l6-dec-2',
    levelId: 6,
    mechanic: 'DECISION',
    scenario: 'After fine-tuning an LLM exclusively on 20,000 SQL queries, it suddenly forgot how to summarize English emails.',
    constraintTag: 'Adaptation pitfall',
    options: [
      { label: 'Catastrophic Forgetting—use a swappable LoRA adapter or mix general examples', isBest: true, why: 'Over-drilling all weights on one narrow task overwrites broader capabilities.' },
      { label: 'Delete the SQL dataset and give up', isBest: false, why: 'LoRA keeps the base brain untouched while snapping SQL skill on demand.' },
      { label: 'Double the learning rate to overwrite faster', isBest: false, why: 'Worsens forgetting immediately.' },
    ],
  },

  // ==================== LEVEL 7 ====================
  {
    id: 'l7-sort-1',
    levelId: 7,
    mechanic: 'SORT',
    prompt: 'Match each Multimodal job to the right tool',
    buckets: ['Vision Segmentation', 'Controlled Diffusion', '3D Gaussian Splatting'],
    items: [
      { label: 'Outline every individual cell pixel-by-pixel on a microscope slide', bucketIndex: 0, why: 'Instance segmentation traces exact pixel masks per object.' },
      { label: 'Generate a jacket design locked to a mannequin’s exact elbow pose', bucketIndex: 1, why: 'ControlNet + Diffusion steers generation along pose skeletons.' },
      { label: 'Turn 40 walk-around photos of a real courtyard into a 60fps 3D scene', bucketIndex: 2, why: 'Gaussian Splatting reconstructs real multi-view scenes fast.' },
    ],
  },
  {
    id: 'l7-pipe-1',
    levelId: 7,
    mechanic: 'PIPELINE',
    prompt: 'Order how Latent Diffusion creates a crisp studio image',
    steps: ['Encode prompt + pose guide', 'Start from compressed latent static', 'Denoise step-by-step toward prompt', 'Decode latent back to crisp pixels'],
    why: 'Latent diffusion sculpts meaning out of noise inside compact space before decoding pixels.',
  },
  {
    id: 'l7-det-1',
    levelId: 7,
    mechanic: 'DETECTIVE',
    prompt: 'A marketing team’s AI voiceover dubbing pipeline faces a legal crisis—tap the violation!',
    nodes: [
      { label: 'Noise Cleanup', stat: 'Studio enhancement ON', isBroken: false },
      { label: 'Speaker Diarization', stat: '2 speakers separated', isBroken: false },
      { label: 'Voice Clone Source', stat: 'Scraped famous actor’s 5s clip with ZERO consent', isBroken: true },
      { label: 'Audio Watermark', stat: 'Provenance tag ON', isBroken: false },
    ],
    why: 'Voice likeness requires explicit legal consent and licensing—never clone voices without permission.',
  },
  {
    id: 'l7-tune-1',
    levelId: 7,
    mechanic: 'TUNER',
    prompt: 'Dial Diffusion Classifier-Free Guidance (CFG) so it follows the prompt WITHOUT frying colors into crispy neon',
    unitLabel: 'CFG Guidance',
    min: 1,
    max: 25,
    step: 1,
    targetMin: 4,
    targetMax: 8,
    lowStateLabel: 'Drifty: ignores your prompt and wanders off',
    sweetStateLabel: 'Natural & faithful: crisp lighting + prompt accuracy!',
    highStateLabel: 'Overcooked: burnt contrast, plastic skin, fried edges!',
    why: 'Moderate guidance (4–8) balances prompt obedience against natural lighting and texture.',
  },
  {
    id: 'l7-dec-1',
    levelId: 7,
    mechanic: 'DECISION',
    scenario: 'A film director wants consistent character clothes and exact camera movement in an AI pre-viz video shot.',
    constraintTag: 'Video AI workflow',
    options: [
      { label: 'Lock 1 approved hero still image first, then run Image-to-Video with camera controls', isBest: true, why: 'Image-to-Video anchors identity and lighting way better than rolling dice on text alone.' },
      { label: 'Re-roll a 400-word text prompt 90 times hoping the hat stays identical', isBest: false, why: 'Text alone cannot pin exact pixel identity.' },
      { label: 'Use Speech Diarization', isBest: false, why: 'Diarization separates audio speakers, not video cameras.' },
    ],
  },
  {
    id: 'l7-dec-2',
    levelId: 7,
    mechanic: 'DECISION',
    scenario: 'You need to swap ONLY the coffee mug on a table photo into a tea cup while keeping the person’s face 100% untouched.',
    constraintTag: 'Surgical editing',
    options: [
      { label: 'Mask just the mug and use Inpainting', isBest: true, why: 'Inpainting regenerates only masked pixels while freezing everything outside.' },
      { label: 'Run whole-image Text-to-Image from scratch', isBest: false, why: 'Replaces the entire person and room!' },
      { label: 'Run OCR document scanning', isBest: false, why: 'OCR reads text, not photo retouching.' },
    ],
  },

  // ==================== LEVEL 8 ====================
  {
    id: 'l8-pipe-1',
    levelId: 8,
    mechanic: 'PIPELINE',
    prompt: 'Wire the closed-loop Embodied Robot cycle (50 times per second)',
    steps: ['Sensors fuse camera + force', 'Estimate state & world', 'Policy picks safe action', 'Motors move within torque limits'],
    why: 'Sense -> Estimate -> Decide -> Act within physical hardware limits.',
  },
  {
    id: 'l8-sort-1',
    levelId: 8,
    mechanic: 'SORT',
    prompt: 'Explore (try new unknown moves) vs. Exploit (use best known move)',
    buckets: ['Exploration', 'Exploitation'],
    items: [
      { label: 'Testing an untried alley shortcut in simulation', bucketIndex: 0, why: 'Gathering new knowledge about unknown paths.' },
      { label: 'Taking the proven fastest highway during rush delivery', bucketIndex: 1, why: 'Cashing in your best-known strategy.' },
      { label: 'Trying a weird grip angle on a new slippery bottle in virtual training', bucketIndex: 0, why: 'Discovering better policies via trial.' },
      { label: 'Playing the highest-win-rate chess opening in the final match', bucketIndex: 1, why: 'Using learned value to maximize win odds.' },
    ],
  },
  {
    id: 'l8-det-1',
    levelId: 8,
    mechanic: 'DETECTIVE',
    prompt: 'A warehouse robot trained in 3D simulation keeps dropping boxes on the real floor! Tap the Sim-to-Real mistake.',
    nodes: [
      { label: 'Control Rate', stat: '50 Hz loop', isBroken: false },
      { label: 'Hardware E-Stop', stat: 'Wired & active', isBroken: false },
      { label: 'Simulator Physics', stat: '1 fixed friction & 1 perfect sunny lamp only', isBroken: true },
      { label: 'Wrist Camera', stat: 'Calibrated RGB-D', isBroken: false },
    ],
    why: 'Without Domain Randomization (varying friction, weights, lighting in sim), policies shatter on messy real floors!',
  },
  {
    id: 'l8-tune-1',
    levelId: 8,
    mechanic: 'TUNER',
    prompt: 'Set Exploration % for a live hospital dosing assistant (vs. a safe virtual video game!)',
    unitLabel: '% random exploration live',
    min: 0,
    max: 80,
    step: 5,
    targetMin: 0,
    targetMax: 5,
    lowStateLabel: 'Safe: zero reckless random trials on real patients (uses Offline RL + doctors)',
    sweetStateLabel: 'Safe clinical bounds!',
    highStateLabel: 'Dangerous: never run random trial-and-error on real human bodies!',
    why: 'Physical & medical safety forbids wild live random exploration—learn from offline logs and verified sims!',
  },
  {
    id: 'l8-dec-1',
    levelId: 8,
    mechanic: 'DECISION',
    scenario: 'You reward a cleaning robot +10 points every time it picks up trash. Next morning it dumps the bin out just to pick trash up again!',
    constraintTag: 'RL Reward Design',
    options: [
      { label: 'Reward Hacking! Score clean floor state (and penalize dumping), not raw pickup count', isBest: true, why: 'Agents ruthlessly exploit poorly designed proxy scorecards.' },
      { label: 'Buy a 10x faster GPU so it dumps trash faster', isBest: false, why: 'More compute makes bad objectives fail harder!' },
      { label: 'Remove the emergency stop button', isBest: false, why: 'Never remove hardware safety gates.' },
    ],
  },

  // ==================== LEVEL 9 ====================
  {
    id: 'l9-sort-1',
    levelId: 9,
    mechanic: 'SORT',
    prompt: 'Match each Production Trick to the problem it solves',
    buckets: ['4-Bit Quantization', 'Distillation', 'Schema + Firewall'],
    items: [
      { label: 'Fit a 70B model onto 40GB of GPU VRAM instead of 140GB', bucketIndex: 0, why: 'Quantization rounds weights to fewer bits to slash RAM 3–4x.' },
      { label: 'Train a tiny 3B student model to copy a slow 400B teacher on 1 task', bucketIndex: 1, why: 'Distillation transfers narrow genius into a fast cheap model.' },
      { label: 'Stop untrusted emails from hijacking tool calls or crashing JSON parsers', bucketIndex: 2, why: 'Strict permission walls + output schema validation guard production.' },
    ],
  },
  {
    id: 'l9-det-1',
    levelId: 9,
    mechanic: 'DETECTIVE',
    prompt: 'Tap the "Lethal Trifecta" security hole in this Personal Assistant Agent!',
    nodes: [
      { label: 'Model Quantization', stat: 'INT8 fast serving', isBroken: false },
      { label: 'Inbox + Web Reader', stat: 'Reads untrusted stranger emails', isBroken: false },
      { label: 'Auto-Send & Bank Tool', stat: 'Executes commands from email text with 0 confirmation!', isBroken: true },
      { label: 'Version Pinning', stat: 'Pinned model-2026-10', isBroken: false },
    ],
    why: 'Prompt Injection jackpot: mixing untrusted external text + private data + unconfirmed external actions lets attackers hijack the agent!',
  },
  {
    id: 'l9-pipe-1',
    levelId: 9,
    mechanic: 'PIPELINE',
    prompt: 'Order a safe Production Model Update rollout',
    steps: ['Pin version & run golden evals', 'Security & license check', 'Canary rollout to 5% traffic', 'Monitor live metrics + keep rollback ready'],
    why: 'Test offline -> verify license & security -> small canary flag -> monitor with instant rollback.',
  },
  {
    id: 'l9-tune-1',
    levelId: 9,
    mechanic: 'TUNER',
    prompt: 'Pick a practical Quantization bit-width that cuts memory 2x–4x while preserving ~98%+ model intelligence',
    unitLabel: 'Bits per weight',
    min: 1,
    max: 16,
    step: 1,
    targetMin: 4,
    targetMax: 8,
    lowStateLabel: 'Brain-damaged: 1–2 bit rounding crushes subtle reasoning',
    sweetStateLabel: 'Sweet spot (4-bit to 8-bit): huge memory & speed win, tiny quality drop!',
    highStateLabel: 'Uncompressed: heavy VRAM footprint',
    why: 'INT4 and INT8 are the workhorse sweet spot for fast, affordable serving.',
  },
  {
    id: 'l9-dec-1',
    levelId: 9,
    mechanic: 'DECISION',
    scenario: 'A developer downloads "OpenWeights-70B" labeled "CC-BY-NC-4.0 (Non-Commercial Research Only)" to power a paid SaaS app.',
    constraintTag: 'Governance & Licensing',
    options: [
      { label: 'Stop! Non-Commercial (NC) forbids paid business use—pick Apache 2.0 / MIT or buy a commercial license', isBest: true, why: '"Open-weight" on the internet does NOT automatically permit commercial sales.' },
      { label: 'Ship it—anything downloadable for free is legal to sell', isBest: false, why: 'Violates copyright and license law.' },
      { label: 'Blame the AI if sued', isBest: false, why: 'Deploying companies hold full legal liability.' },
    ],
  },
  {
    id: 'l9-dec-2',
    levelId: 9,
    mechanic: 'DECISION',
    scenario: 'Human reviewers click "Approve" on 600 AI loan flags per hour and miss obvious AI blunders.',
    constraintTag: 'Human-AI Interaction',
    options: [
      { label: 'Automation Bias! Slow volume, highlight uncertainty, and require active evidence checks', isBest: true, why: 'Tired humans rubber-stamp confident screens unless UX demands real engagement.' },
      { label: 'Hide error rates from reviewers', isBest: false, why: 'Worsens blind trust.' },
      { label: 'Put the database password inside the system prompt', isBest: false, why: 'System prompts leak easily via prompt injection.' },
    ],
  },

  // ==================== LEVEL 10 ====================
  {
    id: 'l10-pipe-1',
    levelId: 10,
    mechanic: 'PIPELINE',
    prompt: 'Order the Master Director’s real-world AI project progression',
    steps: ['Inspect raw data & build simple baseline', 'Slice real errors to see what fails', 'Add RAG / Tools / Fine-tune ONLY where needed', 'Pilot safely, monitor & iterate'],
    why: 'Measured error slices—not hype—tell you what to build next.',
  },
  {
    id: 'l10-sort-1',
    levelId: 10,
    mechanic: 'SORT',
    prompt: 'Durable Evidence vs. Marketing Hype?',
    buckets: ['Solid Evidence', 'Hype Red Flag'],
    items: [
      { label: 'Slick 45-second launch video with no live access or code', bucketIndex: 1, why: 'Cherry-picked best 1-of-100 demo.' },
      { label: 'Ablation table + independent replication on unseen user data', bucketIndex: 0, why: 'Isolates what actually worked on uncontaminated data.' },
      { label: 'Comparing our model (8 tries + search) vs. rival (1 bare try)', bucketIndex: 1, why: 'Unfair apples-to-oranges compute trick!' },
      { label: 'Clear Limitations section listing failure slices & costs', bucketIndex: 0, why: 'Honest engineering boundaries.' },
    ],
  },
  {
    id: 'l10-det-1',
    levelId: 10,
    mechanic: 'DETECTIVE',
    prompt: 'A startup claims their Stock-Trading AI turns $1k into $10M! Tap the classic Time-Series flaw in their backtest.',
    nodes: [
      { label: 'Asset Universe', stat: 'S&P 500 stocks', isBroken: false },
      { label: 'Trading Fees', stat: '0.05% included', isBroken: false },
      { label: 'Feature Normalization', stat: 'Used Friday’s closing price to predict Tuesday!', isBroken: true },
      { label: 'Baseline Check', stat: 'Compared vs. Buy & Hold', isBroken: false },
    ],
    why: 'Look-ahead leakage! Peeking at future time-series values makes fake billionaires in backtests and goes broke day 1.',
  },
  {
    id: 'l10-tune-1',
    levelId: 10,
    mechanic: 'TUNER',
    prompt: 'A simple 10-line SQL rule solves 99.4% of a routing job in 1ms for $0. How much budget (%) should go to replacing it with a slow AI agent?',
    unitLabel: '% AI budget needed',
    min: 0,
    max: 100,
    step: 5,
    targetMin: 0,
    targetMax: 5,
    lowStateLabel: 'Mastery! Know confidently when NOT to use AI.',
    sweetStateLabel: 'Mastery! Keep the fast $0 rule and save AI for real fuzzy problems.',
    highStateLabel: 'Over-engineered trap: slower, pricier, and less predictable!',
    why: 'True high-level mastery includes rejecting AI when deterministic software already wins.',
  },
  {
    id: 'l10-dec-1',
    levelId: 10,
    mechanic: 'DECISION',
    scenario: 'A new foundation model drops on Tuesday claiming +1.2% on a public math leaderboard. Your current app works great and passes 96% of your customer evals.',
    constraintTag: 'Research Literacy',
    options: [
      { label: 'Run your own 10-minute private eval suite & cost check before touching production', isBest: true, why: 'Your own task evals, latency, and cost matter infinitely more than leaderboard tweets.' },
      { label: 'Rewrite your entire company codebase overnight every time a leaderboard moves', isBest: false, why: 'Chasing weekly hype burns teams out with zero user value.' },
      { label: 'Assume public leaderboards never have data contamination', isBest: false, why: 'Benchmark leakage is pervasive.' },
    ],
  },
  {
    id: 'l10-dec-2',
    levelId: 10,
    mechanic: 'DECISION',
    scenario: 'A biotech team needs to predict how a 3D protein chain folds and binds to a small drug molecule.',
    constraintTag: 'Specialized Branches',
    options: [
      { label: 'Use specialized Geometric / Graph & Protein folding models (AlphaFold-style) + lab validation', isBest: true, why: '3D molecular symmetry and wet-lab validation beat generic text chatbots.' },
      { label: 'Ask a text chatbot to guess XYZ atom coordinates from memory', isBest: false, why: 'Text tokens lack 3D physical equivariance.' },
      { label: 'Skip lab testing because AI is always right', isBest: false, why: 'Scientific AI proposes candidates; real experiments prove them.' },
    ],
  },
];

/**
 * Generates an unpredictable, randomized 6-round test run for a given level.
 * Draws primarily from the target level plus 1 surprise spiral-review challenge
 * from an unlocked earlier level (for Levels >= 2), shuffling mechanics, options,
 * sort items, and node positions every single time!
 */
export function buildRandomizedGateSession(levelId: number, count = 6): GameChallenge[] {
  const levelPool = shuffle(RAW_CHALLENGES.filter((c) => c.levelId === levelId));
  const reviewPool =
    levelId > 1 ? shuffle(RAW_CHALLENGES.filter((c) => c.levelId < levelId)) : [];

  const chosen: GameChallenge[] = [...levelPool.slice(0, reviewPool.length > 0 ? count - 1 : count)];
  if (reviewPool.length > 0 && chosen.length < count) {
    chosen.push(reviewPool[0]);
  }
  while (chosen.length < count && levelPool.length > 0) {
    chosen.push(levelPool[chosen.length % levelPool.length]);
  }

  return shuffle(chosen).map((ch, idx) => {
    const uid = `${ch.id}-run-${Date.now()}-${idx}`;
    if (ch.mechanic === 'SORT') {
      return {
        ...ch,
        id: uid,
        items: shuffle(ch.items).slice(0, 3),
      };
    }
    if (ch.mechanic === 'DECISION') {
      return {
        ...ch,
        id: uid,
        options: shuffle(ch.options),
      };
    }
    if (ch.mechanic === 'DETECTIVE') {
      return {
        ...ch,
        id: uid,
        nodes: shuffle(ch.nodes),
      };
    }
    return { ...ch, id: uid };
  });
}
