import React, { useState, useEffect } from 'react';
import { Topic } from '../types';
import { sound } from '../lib/sound';

interface SimProps {
  topic: Topic;
  activeBeat: number;
  onInteract: () => void;
}

export const InteractiveSim: React.FC<SimProps> = ({ topic, activeBeat, onInteract }) => {
  const trigger = () => {
    sound.tick();
    onInteract();
  };

  switch (topic.simKind) {
    case 'scope-onion':
      return <ScopeOnionLab activeBeat={activeBeat} onInteract={trigger} indexNum={topic.indexNum} />;
    case 'system-anatomy':
      return <SystemAnatomyLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'problem-framer':
      return <ProblemFramerLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'vector-space':
      return <VectorSpaceLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'data-pipeline':
      return <DataPipelineLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'learning-signal':
      return <LearningSignalLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'decision-boundary':
      return <DecisionBoundaryLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'neural-net':
      return <NeuralNetLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'token-attention':
      return <TokenAttentionLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'adaptation-dial':
      return <AdaptationDialLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'diffusion-vision':
      return <DiffusionVisionLab activeBeat={activeBeat} onInteract={trigger} indexNum={topic.indexNum} />;
    case 'agent-loop':
      return <AgentLoopLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'rl-grid':
      return <RLGridLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'compression-ops':
      return <CompressionOpsLab activeBeat={activeBeat} onInteract={trigger} />;
    case 'causality-eval':
      return <CausalityEvalLab activeBeat={activeBeat} onInteract={trigger} />;
    default:
      return <ScopeOnionLab activeBeat={activeBeat} onInteract={trigger} indexNum={topic.indexNum} />;
  }
};

/* 1. SCOPE ONION & RULES VS LEARNED */
const ScopeOnionLab: React.FC<{ activeBeat: number; onInteract: () => void; indexNum: number }> = ({
  activeBeat,
  onInteract,
  indexNum,
}) => {
  const [ring, setRing] = useState<number>(1);
  const [mode, setMode] = useState<'rules' | 'learned'>('learned');

  useEffect(() => {
    setRing(activeBeat);
  }, [activeBeat]);

  const rings =
    indexNum === 36
      ? [
          { name: 'Recommenders & Time-Series', ex: 'Predicts demand, feeds & wear' },
          { name: 'Graph & Protein AI', ex: '3D molecules, AlphaFold & crystals' },
          { name: 'Physics & Scientific ML', ex: 'Global weather & fluid laws' },
        ]
      : [
          { name: 'Artificial Intelligence', ex: 'Any smart system—including strict chess rules' },
          { name: 'Machine Learning', ex: 'Learns patterns directly from past examples' },
          { name: 'Deep Learning & GenAI', ex: 'Multi-layer neural nets for text, sight & sound' },
        ];

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <div className="seg-group">
          <button
            className={mode === 'rules' ? 'on' : ''}
            onClick={() => {
              setMode('rules');
              onInteract();
            }}
          >
            Rule Recipe
          </button>
          <button
            className={mode === 'learned' ? 'on' : ''}
            onClick={() => {
              setMode('learned');
              onInteract();
            }}
          >
            Learned Pattern
          </button>
        </div>
        <span className="sim-stat">
          {mode === 'rules' ? 'Input + Rules -> Output' : 'Input + Output -> Learned Rules'}
        </span>
      </div>

      <svg viewBox="0 0 520 230" className="sim-svg">
        {/* Left: Concentric rings */}
        <g transform="translate(145, 115)">
          {[0, 1, 2].map((i) => {
            const r = 96 - i * 28;
            const active = ring === i;
            return (
              <g
                key={i}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setRing(i);
                  onInteract();
                }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={r}
                  fill={active ? 'var(--accent-soft)' : 'transparent'}
                  stroke={active ? 'var(--fg)' : 'var(--border-strong)'}
                  strokeWidth={active ? 2.2 : 1.2}
                />
                <text
                  x={0}
                  y={-r + 16}
                  textAnchor="middle"
                  className="svg-label"
                  fill={active ? 'var(--fg)' : 'var(--muted)'}
                >
                  {rings[i].name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </g>

        {/* Right: Live Input/Output diagram */}
        <g transform="translate(275, 34)">
          <rect x={0} y={0} width={225} height={162} rx={12} fill="var(--panel)" stroke="var(--border)" />
          <text x={16} y={28} className="svg-title">
            {rings[ring].name}
          </text>
          <text x={16} y={50} className="svg-sub">
            {rings[ring].ex}
          </text>

          <line x1={16} y1={68} x2={209} y2={68} stroke="var(--border)" />

          {mode === 'rules' ? (
            <g transform="translate(16, 84)">
              <rect x={0} y={0} width={76} height={26} rx={6} fill="none" stroke="var(--fg)" />
              <text x={38} y={17} textAnchor="middle" className="svg-mono">
                Data + IF
              </text>
              <line x1={80} y1={13} x2={112} y2={13} stroke="var(--fg)" strokeDasharray="3 3" />
              <rect x={116} y={0} width={76} height={26} rx={6} fill="var(--accent-soft)" stroke="var(--fg)" />
              <text x={154} y={17} textAnchor="middle" className="svg-mono">
                Answer
              </text>
              <text x={0} y={50} className="svg-sub">
                Exact on tax math; breaks on messy photos.
              </text>
            </g>
          ) : (
            <g transform="translate(16, 84)">
              <rect x={0} y={0} width={86} height={26} rx={6} fill="none" stroke="var(--fg)" />
              <text x={43} y={17} textAnchor="middle" className="svg-mono">
                10k Examples
              </text>
              <line x1={90} y1={13} x2={112} y2={13} stroke="var(--fg)" />
              <rect x={116} y={0} width={76} height={26} rx={6} fill="var(--accent-soft)" stroke="var(--fg)" />
              <text x={154} y={17} textAnchor="middle" className="svg-mono">
                Pattern
              </text>
              <text x={0} y={50} className="svg-sub">
                Adapts to messy real inputs; needs testing.
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

/* 2. SYSTEM ANATOMY PIPELINE */
const SystemAnatomyLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [rag, setRag] = useState(true);
  const [tools, setTools] = useState(true);
  const [human, setHuman] = useState(false);

  useEffect(() => {
    if (activeBeat === 0) {
      setRag(false);
      setTools(false);
      setHuman(false);
    } else if (activeBeat === 1) {
      setRag(true);
      setTools(false);
      setHuman(false);
    } else {
      setRag(true);
      setTools(true);
      setHuman(true);
    }
  }, [activeBeat]);

  const trust = 42 + (rag ? 24 : 0) + (tools ? 18 : 0) + (human ? 15 : 0);

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <div className="seg-group">
          <button
            className={rag ? 'on' : ''}
            onClick={() => {
              setRag(!rag);
              onInteract();
            }}
          >
            Retrieval (RAG)
          </button>
          <button
            className={tools ? 'on' : ''}
            onClick={() => {
              setTools(!tools);
              onInteract();
            }}
          >
            Exact Tools
          </button>
          <button
            className={human ? 'on' : ''}
            onClick={() => {
              setHuman(!human);
              onInteract();
            }}
          >
            Human Gate
          </button>
        </div>
        <span className="sim-stat">System Reliability: {trust}%</span>
      </div>

      <svg viewBox="0 0 520 220" className="sim-svg">
        {/* Main horizontal spine */}
        <line x1={65} y1={110} x2={455} y2={110} stroke="var(--fg)" strokeWidth={1.75} strokeDasharray="5 4" />

        {/* Input */}
        <g transform="translate(20, 86)">
          <rect width={78} height={48} rx={10} fill="var(--panel)" stroke="var(--fg)" />
          <text x={39} y={22} textAnchor="middle" className="svg-label">
            User
          </text>
          <text x={39} y={37} textAnchor="middle" className="svg-mono">
            Prompt
          </text>
        </g>

        {/* Core Model */}
        <g transform="translate(195, 78)">
          <rect width={116} height={64} rx={14} fill="var(--accent-soft)" stroke="var(--fg)" strokeWidth={2} />
          <text x={58} y={28} textAnchor="middle" className="svg-title">
            AI Model
          </text>
          <text x={58} y={46} textAnchor="middle" className="svg-mono">
            Weights + Context
          </text>
        </g>

        {/* Top Module: Retrieval */}
        <g
          transform="translate(140, 14)"
          opacity={rag ? 1 : 0.25}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setRag(!rag);
            onInteract();
          }}
        >
          <rect width={104} height={38} rx={8} fill="var(--panel)" stroke="var(--fg)" />
          <text x={52} y={23} textAnchor="middle" className="svg-mono">
            Live Docs DB
          </text>
          {rag && <line x1={82} y1={38} x2={100} y2={64} stroke="var(--fg)" strokeWidth={1.5} />}
        </g>

        {/* Bottom Module: Tools */}
        <g
          transform="translate(262, 168)"
          opacity={tools ? 1 : 0.25}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setTools(!tools);
            onInteract();
          }}
        >
          <rect width={108} height={38} rx={8} fill="var(--panel)" stroke="var(--fg)" />
          <text x={54} y={23} textAnchor="middle" className="svg-mono">
            Calc / SQL API
          </text>
          {tools && <line x1={32} y1={0} x2={15} y2={-26} stroke="var(--fg)" strokeWidth={1.5} />}
        </g>

        {/* Output / Human Gate */}
        <g
          transform="translate(385, 86)"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setHuman(!human);
            onInteract();
          }}
        >
          <rect
            width={114}
            height={48}
            rx={10}
            fill={human ? 'var(--accent-soft)' : 'var(--panel)'}
            stroke="var(--fg)"
            strokeWidth={human ? 2 : 1.3}
          />
          <text x={57} y={22} textAnchor="middle" className="svg-label">
            {human ? 'Human Check' : 'Auto Action'}
          </text>
          <text x={57} y={37} textAnchor="middle" className="svg-mono">
            {human ? 'Safe Confirm' : 'Unchecked'}
          </text>
        </g>
      </svg>
    </div>
  );
};

/* 3. PROBLEM FRAMER & DECISION LADDER */
const ProblemFramerLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [messiness, setMessiness] = useState(70);
  const [risk, setRisk] = useState(35);

  useEffect(() => {
    if (activeBeat === 0) {
      setMessiness(20);
      setRisk(25);
    } else if (activeBeat === 1) {
      setMessiness(65);
      setRisk(40);
    } else {
      setMessiness(80);
      setRisk(85);
    }
  }, [activeBeat]);

  const pick =
    messiness < 35
      ? { tool: '1. Deterministic Rules / SQL', note: 'Fastest, $0 per call, 100% predictable.' }
      : messiness < 68
      ? { tool: '2. Classical ML / Prompt + RAG', note: 'Handles variation cleanly at low cost.' }
      : { tool: '3. Deep / Multimodal AI', note: 'Understands raw pixels, audio, and nuance.' };

  const oversight =
    risk >= 65 ? 'Mandatory Human-in-the-Loop Gate' : 'Automated + Confidence Fallback';

  return (
    <div className="sim-shell">
      <div className="sim-sliders">
        <label>
          <span>Input Messiness: {messiness}%</span>
          <input
            type="range"
            min={0}
            max={100}
            value={messiness}
            onChange={(e) => {
              setMessiness(Number(e.target.value));
              onInteract();
            }}
          />
        </label>
        <label>
          <span>Mistake Risk: {risk}%</span>
          <input
            type="range"
            min={0}
            max={100}
            value={risk}
            onChange={(e) => {
              setRisk(Number(e.target.value));
              onInteract();
            }}
          />
        </label>
      </div>

      <div className="sim-readout-grid">
        <div className="sim-card-box active">
          <span className="sim-kicker">Recommended Rung</span>
          <strong>{pick.tool}</strong>
          <p>{pick.note}</p>
        </div>
        <div className="sim-card-box">
          <span className="sim-kicker">Safety Operating Mode</span>
          <strong>{oversight}</strong>
          <p>{risk >= 65 ? 'High-impact errors blocked before action.' : 'Low-stakes speed with fallback.'}</p>
        </div>
      </div>
    </div>
  );
};

/* 4. VECTOR SPACE & GRADIENT SLOPE */
const VectorSpaceLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [tab, setTab] = useState<'map' | 'hill'>('map');
  const [probeX, setProbeX] = useState(145);
  const [ballX, setBallX] = useState(40);

  useEffect(() => {
    setTab(activeBeat === 1 ? 'hill' : 'map');
  }, [activeBeat]);

  const distCat = Math.hypot(probeX - 130, 0);
  const simScore = Math.max(-1, 1 - distCat / 160).toFixed(2);

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <div className="seg-group">
          <button
            className={tab === 'map' ? 'on' : ''}
            onClick={() => {
              setTab('map');
              onInteract();
            }}
          >
            Meaning Map (Vectors)
          </button>
          <button
            className={tab === 'hill' ? 'on' : ''}
            onClick={() => {
              setTab('hill');
              onInteract();
            }}
          >
            Error Hill (Gradient)
          </button>
        </div>
        <span className="sim-stat">
          {tab === 'map' ? `Similarity to "Cat": ${simScore}` : `Error Loss: ${((ballX - 260) ** 2 / 1200).toFixed(1)}`}
        </span>
      </div>

      {tab === 'map' ? (
        <>
          <div className="sim-sliders single">
            <label>
              <span>Slide Your Word Vector Across Space</span>
              <input
                type="range"
                min={70}
                max={440}
                value={probeX}
                onChange={(e) => {
                  setProbeX(Number(e.target.value));
                  onInteract();
                }}
              />
            </label>
          </div>
          <svg viewBox="0 0 520 175" className="sim-svg">
            <line x1={40} y1={145} x2={480} y2={145} stroke="var(--border-strong)" />
            <line x1={40} y1={20} x2={40} y2={145} stroke="var(--border-strong)" />

            {/* Fixed concept clusters */}
            <circle cx={130} cy={65} r={6} fill="var(--fg)" />
            <text x={130} y={50} textAnchor="middle" className="svg-label">
              Cat
            </text>
            <circle cx={162} cy={78} r={5} fill="var(--muted)" />
            <text x={166} y={96} textAnchor="middle" className="svg-mono">
              Kitten
            </text>

            <circle cx={410} cy={68} r={6} fill="var(--fg)" />
            <text x={410} y={52} textAnchor="middle" className="svg-label">
              Toaster
            </text>

            {/* User probe vector arrow */}
            <line x1={40} y1={145} x2={probeX} y2={70} stroke="var(--fg)" strokeWidth={2} />
            <circle cx={probeX} cy={70} r={9} fill="var(--accent-soft)" stroke="var(--fg)" strokeWidth={2} />
            <text x={probeX} y={112} textAnchor="middle" className="svg-title">
              Your Query
            </text>
          </svg>
        </>
      ) : (
        <>
          <div className="sim-sliders single">
            <label>
              <span>Step Down the Error Valley</span>
              <input
                type="range"
                min={60}
                max={460}
                value={ballX}
                onChange={(e) => {
                  setBallX(Number(e.target.value));
                  onInteract();
                }}
              />
            </label>
          </div>
          <svg viewBox="0 0 520 175" className="sim-svg">
            <path
              d="M 50 25 Q 260 255 470 25"
              fill="none"
              stroke="var(--fg)"
              strokeWidth={2}
            />
            {(() => {
              const t = (ballX - 50) / 420;
              const y = (1 - t) * (1 - t) * 25 + 2 * (1 - t) * t * 255 + t * t * 25;
              return (
                <g>
                  <circle cx={ballX} cy={y} r={10} fill="var(--fg)" />
                  <text x={260} y={162} textAnchor="middle" className="svg-mono">
                    Lowest Mistake Point (Optimum)
                  </text>
                </g>
              );
            })()}
          </svg>
        </>
      )}
    </div>
  );
};

/* 5. DATA PIPELINE & LEAKAGE LAB */
const DataPipelineLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [noise, setNoise] = useState(false);
  const [leak, setLeak] = useState(false);
  const [drift, setDrift] = useState(false);

  useEffect(() => {
    setNoise(activeBeat === 0);
    setLeak(activeBeat === 1);
    setDrift(activeBeat === 2);
  }, [activeBeat]);

  const labScore = leak ? 99 : noise ? 68 : 91;
  const realScore = leak ? 51 : drift ? 62 : noise ? 66 : 89;

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <div className="seg-group">
          <button
            className={noise ? 'on' : ''}
            onClick={() => {
              setNoise(!noise);
              onInteract();
            }}
          >
            Dirty Labels
          </button>
          <button
            className={leak ? 'on' : ''}
            onClick={() => {
              setLeak(!leak);
              onInteract();
            }}
          >
            Test Leakage
          </button>
          <button
            className={drift ? 'on' : ''}
            onClick={() => {
              setDrift(!drift);
              onInteract();
            }}
          >
            World Drift
          </button>
        </div>
      </div>

      <div className="sim-bars">
        <div className="bar-row">
          <span>Lab Exam Score</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${labScore}%` }} />
          </div>
          <strong>{labScore}%</strong>
        </div>
        <div className="bar-row">
          <span>Real Users Score</span>
          <div className="bar-track">
            <div className="bar-fill strong" style={{ width: `${realScore}%` }} />
          </div>
          <strong>{realScore}%</strong>
        </div>
        <p className="sim-caption-note">
          {leak
            ? 'Trap! Test answers leaked into Training—99% lab brag collapses to 51% in real life!'
            : drift
            ? 'World shifted since training—fresh data collection needed.'
            : noise
            ? 'Misspelled/wrong labels drag both scores down.'
            : 'Clean 80/10/10 split: lab score honestly predicts real-world quality!'}
        </p>
      </div>
    </div>
  );
};

/* 6. LEARNING SIGNALS */
const LearningSignalLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [kind, setKind] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    setKind((activeBeat % 3) as 0 | 1 | 2);
  }, [activeBeat]);

  const modes = [
    { name: 'Supervised', desc: 'Human teacher marks every dot Square or Circle.' },
    { name: 'Unsupervised', desc: 'Zero labels—groups nearby dots into natural clusters.' },
    { name: 'Self-Supervised', desc: 'Covers 1 word in existing text and practices guessing it!' },
    { name: 'Reinforcement', desc: 'Tries moves and chases +1 Reward signals.' },
  ];

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <div className="seg-group">
          {modes.map((m, idx) => (
            <button
              key={m.name}
              className={kind === idx ? 'on' : ''}
              onClick={() => {
                setKind(idx as 0 | 1 | 2 | 3);
                onInteract();
              }}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 520 185" className="sim-svg">
        {kind === 0 && (
          <g>
            <circle cx={140} cy={70} r={12} fill="none" stroke="var(--fg)" strokeWidth={2} />
            <circle cx={175} cy={105} r={12} fill="none" stroke="var(--fg)" strokeWidth={2} />
            <line x1={255} y1={25} x2={255} y2={155} stroke="var(--fg)" strokeDasharray="5 5" />
            <rect x={330} y={58} width={22} height={22} fill="none" stroke="var(--fg)" strokeWidth={2} />
            <rect x={370} y={96} width={22} height={22} fill="none" stroke="var(--fg)" strokeWidth={2} />
            <text x={260} y={175} textAnchor="middle" className="svg-sub">
              {modes[0].desc}
            </text>
          </g>
        )}
        {kind === 1 && (
          <g>
            <circle cx={155} cy={88} r={46} fill="var(--accent-soft)" stroke="var(--fg)" strokeDasharray="4 3" />
            <circle cx={142} cy={78} r={5} fill="var(--fg)" />
            <circle cx={166} cy={95} r={5} fill="var(--fg)" />
            <circle cx={150} cy={104} r={5} fill="var(--fg)" />

            <circle cx={365} cy={88} r={46} fill="var(--accent-soft)" stroke="var(--fg)" strokeDasharray="4 3" />
            <circle cx={352} cy={82} r={5} fill="var(--fg)" />
            <circle cx={378} cy={94} r={5} fill="var(--fg)" />
            <text x={260} y={175} textAnchor="middle" className="svg-sub">
              {modes[1].desc}
            </text>
          </g>
        )}
        {kind === 2 && (
          <g transform="translate(75, 62)">
            <rect width={370} height={54} rx={10} fill="var(--panel)" stroke="var(--fg)" />
            <text x={24} y={33} className="svg-title">
              "The warm cup of [ _____ ] smelled..."
            </text>
            <text x={185} y={88} textAnchor="middle" className="svg-mono">
              Guess: coffee (88%) · tea (10%)
            </text>
          </g>
        )}
        {kind === 3 && (
          <g transform="translate(95, 52)">
            <rect x={0} y={12} width={85} height={44} rx={8} fill="var(--panel)" stroke="var(--fg)" />
            <text x={42} y={39} textAnchor="middle" className="svg-mono">
              Agent
            </text>
            <line x1={90} y1={34} x2={225} y2={34} stroke="var(--fg)" strokeWidth={2} />
            <rect x={230} y={12} width={100} height={44} rx={8} fill="var(--accent-soft)" stroke="var(--fg)" />
            <text x={280} y={39} textAnchor="middle" className="svg-title">
              +10 Score
            </text>
            <text x={165} y={96} textAnchor="middle" className="svg-sub">
              {modes[3].desc}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

/* 7. CLASSICAL ML DECISION BOUNDARIES */
const DecisionBoundaryLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [style, setStyle] = useState<'line' | 'tree' | 'overfit'>('line');

  useEffect(() => {
    setStyle(activeBeat === 0 ? 'line' : activeBeat === 1 ? 'tree' : 'overfit');
  }, [activeBeat]);

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <div className="seg-group">
          <button
            className={style === 'line' ? 'on' : ''}
            onClick={() => {
              setStyle('line');
              onInteract();
            }}
          >
            Linear Split
          </button>
          <button
            className={style === 'tree' ? 'on' : ''}
            onClick={() => {
              setStyle('tree');
              onInteract();
            }}
          >
            Tree Boxes (Forest)
          </button>
          <button
            className={style === 'overfit' ? 'on' : ''}
            onClick={() => {
              setStyle('overfit');
              onInteract();
            }}
          >
            Overfit Squiggle
          </button>
        </div>
      </div>
      <svg viewBox="0 0 520 190" className="sim-svg">
        {/* Points */}
        {[
          [110, 55],
          [145, 85],
          [130, 130],
          [185, 65],
          [245, 135], // noisy outlier!
        ].map(([x, y], i) => (
          <circle key={`a-${i}`} cx={x} cy={y} r={6} fill="var(--fg)" />
        ))}
        {[
          [310, 60],
          [355, 95],
          [335, 140],
          [395, 75],
          [285, 115],
        ].map(([x, y], i) => (
          <rect key={`b-${i}`} x={x - 6} y={y - 6} width={12} height={12} fill="none" stroke="var(--fg)" strokeWidth={2} />
        ))}

        {style === 'line' && (
          <line x1={250} y1={18} x2={220} y2={172} stroke="var(--fg)" strokeWidth={2.2} />
        )}
        {style === 'tree' && (
          <polyline
            points="235,18 235,98 270,98 270,172"
            fill="none"
            stroke="var(--fg)"
            strokeWidth={2.2}
          />
        )}
        {style === 'overfit' && (
          <path
            d="M 245 18 C 210 65, 310 120, 255 150 C 215 165, 275 170, 250 175"
            fill="none"
            stroke="var(--fg)"
            strokeWidth={2}
            strokeDasharray="4 3"
          />
        )}
      </svg>
    </div>
  );
};

/* 8. NEURAL NETWORK & TRAINING EPOCHS */
const NeuralNetLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [epochs, setEpochs] = useState(25);

  useEffect(() => {
    setEpochs(activeBeat === 0 ? 15 : activeBeat === 1 ? 40 : 90);
  }, [activeBeat]);

  const trainErr = Math.max(2, Math.round(65 - epochs * 0.65));
  const valErr = epochs <= 50 ? Math.max(8, Math.round(68 - epochs * 1.15)) : Math.round(10 + (epochs - 50) * 0.55);

  return (
    <div className="sim-shell">
      <div className="sim-sliders single">
        <label>
          <span>Training Epochs: {epochs} {epochs > 60 ? '(Overfitting!)' : '(Healthy)'}</span>
          <input
            type="range"
            min={5}
            max={100}
            value={epochs}
            onChange={(e) => {
              setEpochs(Number(e.target.value));
              onInteract();
            }}
          />
        </label>
      </div>

      <svg viewBox="0 0 520 180" className="sim-svg">
        {/* 3-layer network */}
        {[45, 90, 135].map((y1, i) =>
          [35, 72, 108, 145].map((y2, j) => (
            <line
              key={`l1-${i}-${j}`}
              x1={65}
              y1={y1}
              x2={165}
              y2={y2}
              stroke="var(--border-strong)"
              strokeWidth={1 + ((i + j + Math.floor(epochs / 15)) % 2)}
            />
          ))
        )}
        {[35, 72, 108, 145].map((y1, i) =>
          [65, 115].map((y2, j) => (
            <line
              key={`l2-${i}-${j}`}
              x1={165}
              y1={y1}
              x2={265}
              y2={y2}
              stroke="var(--fg)"
              strokeOpacity={0.45}
              strokeWidth={1.4}
            />
          ))
        )}
        {[45, 90, 135].map((y, i) => (
          <circle key={`n1-${i}`} cx={65} cy={y} r={8} fill="var(--panel)" stroke="var(--fg)" strokeWidth={1.8} />
        ))}
        {[35, 72, 108, 145].map((y, i) => (
          <circle key={`n2-${i}`} cx={165} cy={y} r={8} fill="var(--accent-soft)" stroke="var(--fg)" strokeWidth={1.8} />
        ))}
        {[65, 115].map((y, i) => (
          <circle key={`n3-${i}`} cx={265} cy={y} r={9} fill="var(--fg)" />
        ))}

        {/* Live Loss Readout */}
        <g transform="translate(310, 28)">
          <rect width={190} height={124} rx={12} fill="var(--panel)" stroke="var(--border)" />
          <text x={16} y={30} className="svg-mono">
            Train Error: {trainErr}%
          </text>
          <rect x={16} y={38} width={Math.max(6, trainErr * 1.8)} height={8} rx={4} fill="var(--muted)" />

          <text x={16} y={76} className="svg-mono">
            Unseen Test Error: {valErr}%
          </text>
          <rect x={16} y={84} width={Math.max(6, valErr * 1.8)} height={8} rx={4} fill="var(--fg)" />

          <text x={16} y={112} className="svg-sub">
            {epochs > 60 ? 'Stop early! Memorizing quirks.' : 'Weights generalizing cleanly.'}
          </text>
        </g>
      </svg>
    </div>
  );
};

/* 9. TOKEN ATTENTION & TEMPERATURE */
const TokenAttentionLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const tokens = ['The', 'trophy', 'missed', 'the', 'bag', 'as', 'it', 'was', 'huge'];
  const [focusIdx, setFocusIdx] = useState(6); // "it"
  const [temp, setTemp] = useState(0.2);

  useEffect(() => {
    setTemp(activeBeat === 1 ? 1.1 : 0.1);
  }, [activeBeat]);

  const nextWord =
    temp < 0.4
      ? 'Next token: "." (94% deterministic)'
      : temp < 0.9
      ? 'Next token: "—too" (creative & coherent)'
      : 'Next token: "sparkles?!" (wild high-temp dice!)';

  return (
    <div className="sim-shell">
      <div className="sim-sliders single">
        <label>
          <span>Temperature: {temp.toFixed(1)} · {nextWord}</span>
          <input
            type="range"
            min={0}
            max={1.4}
            step={0.1}
            value={temp}
            onChange={(e) => {
              setTemp(Number(e.target.value));
              onInteract();
            }}
          />
        </label>
      </div>

      <div className="token-strip">
        {tokens.map((tok, i) => {
          const isFocus = i === focusIdx;
          const isLinked = focusIdx === 6 && (i === 1 || i === 8);
          return (
            <button
              key={i}
              className={`tok-chip ${isFocus ? 'focus' : isLinked ? 'linked' : ''}`}
              onClick={() => {
                setFocusIdx(i);
                onInteract();
              }}
            >
              {tok}
            </button>
          );
        })}
      </div>
      <p className="sim-caption-note">
        Tap any token chip: when "it" is selected, Attention spotlights "trophy" + "huge" simultaneously!
      </p>
    </div>
  );
};

/* 10. ADAPTATION DIAL (PROMPT VS RAG VS LORA VS RLHF) */
const AdaptationDialLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [method, setMethod] = useState<number>(1);

  useEffect(() => {
    setMethod(activeBeat);
  }, [activeBeat]);

  const rows = [
    {
      name: 'Prompting',
      cost: '$',
      facts: 'Only what fits in prompt',
      best: 'Fast instructions, tone & 3-shot examples',
    },
    {
      name: 'RAG Search',
      cost: '$$',
      facts: 'Live updating library + citations',
      best: 'Changing company docs & user permissions',
    },
    {
      name: 'LoRA / RLHF',
      cost: '$$$',
      facts: 'Weights frozen in time',
      best: 'Consistent habit, strict format & aligned safety',
    },
  ];

  const cur = rows[method % rows.length];

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <div className="seg-group">
          {rows.map((r, i) => (
            <button
              key={r.name}
              className={method === i ? 'on' : ''}
              onClick={() => {
                setMethod(i);
                onInteract();
              }}
            >
              {r.name}
            </button>
          ))}
        </div>
        <span className="sim-stat">Upfront Effort: {cur.cost}</span>
      </div>

      <div className="sim-readout-grid">
        <div className="sim-card-box active">
          <span className="sim-kicker">Fresh Knowledge</span>
          <strong>{cur.facts}</strong>
        </div>
        <div className="sim-card-box">
          <span className="sim-kicker">Sweet Spot</span>
          <strong>{cur.best}</strong>
        </div>
      </div>
    </div>
  );
};

/* 11. DIFFUSION, VISION & 3D LAB */
const DiffusionVisionLab: React.FC<{ activeBeat: number; onInteract: () => void; indexNum: number }> = ({
  activeBeat,
  onInteract,
  indexNum,
}) => {
  const [step, setStep] = useState(16);
  const [visionOverlay, setVisionOverlay] = useState<'none' | 'box' | 'depth'>('none');

  useEffect(() => {
    if (indexNum === 19) {
      setStep(20);
      setVisionOverlay(activeBeat === 0 ? 'box' : 'depth');
    } else {
      setStep(activeBeat === 0 ? 4 : activeBeat === 1 ? 14 : 20);
      setVisionOverlay(activeBeat === 1 ? 'box' : 'none');
    }
  }, [activeBeat, indexNum]);

  const clarity = step / 20;

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <label className="inline-slider">
          <span>Denoise Step {step}/20</span>
          <input
            type="range"
            min={0}
            max={20}
            value={step}
            onChange={(e) => {
              setStep(Number(e.target.value));
              onInteract();
            }}
          />
        </label>
        <div className="seg-group">
          <button
            className={visionOverlay === 'none' ? 'on' : ''}
            onClick={() => {
              setVisionOverlay('none');
              onInteract();
            }}
          >
            Clean
          </button>
          <button
            className={visionOverlay === 'box' ? 'on' : ''}
            onClick={() => {
              setVisionOverlay('box');
              onInteract();
            }}
          >
            Pose / Box
          </button>
          <button
            className={visionOverlay === 'depth' ? 'on' : ''}
            onClick={() => {
              setVisionOverlay('depth');
              onInteract();
            }}
          >
            3D Depth
          </button>
        </div>
      </div>

      <svg viewBox="0 0 520 180" className="sim-svg">
        <rect x={90} y={14} width={340} height={152} rx={12} fill="var(--panel)" stroke="var(--border)" />

        {/* Sculpted geometric mountain + sun emerging from noise */}
        <g opacity={Math.max(0.08, clarity)}>
          <circle cx={345} cy={56} r={20} fill="none" stroke="var(--fg)" strokeWidth={2} />
          <polygon
            points="130,152 225,58 310,152"
            fill={visionOverlay === 'depth' ? 'var(--accent-soft)' : 'none'}
            stroke="var(--fg)"
            strokeWidth={2}
          />
          <polygon
            points="245,152 325,78 395,152"
            fill="none"
            stroke="var(--fg)"
            strokeWidth={1.7}
          />
        </g>

        {/* Static noise particles fading out as step -> 20 */}
        {Array.from({ length: Math.round((1 - clarity) * 48) }).map((_, i) => (
          <circle
            key={i}
            cx={110 + ((i * 67) % 300)}
            cy={26 + ((i * 43) % 128)}
            r={2}
            fill="var(--fg)"
            opacity={0.65}
          />
        ))}

        {visionOverlay === 'box' && (
          <g>
            <rect
              x={126}
              y={52}
              width={190}
              height={102}
              fill="none"
              stroke="var(--fg)"
              strokeDasharray="4 3"
            />
            <text x={132} y={46} className="svg-mono">
              Object 0.98
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

/* 12. AGENT LOOP & SANDBOX */
const AgentLoopLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [sandbox, setSandbox] = useState(true);
  const stages = ['1. Plan Goal', '2. Call Tool', '3. Read Output', '4. Verify / Human Check'];

  useEffect(() => {
    setStepIdx(activeBeat % stages.length);
  }, [activeBeat]);

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <button
          className="action-pill"
          onClick={() => {
            setStepIdx((stepIdx + 1) % stages.length);
            onInteract();
          }}
        >
          Step Agent Loop -&gt;
        </button>
        <button
          className={`action-pill ${sandbox ? 'on' : ''}`}
          onClick={() => {
            setSandbox(!sandbox);
            onInteract();
          }}
        >
          Sandbox + Approval: {sandbox ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="agent-steps-grid">
        {stages.map((s, idx) => (
          <div
            key={s}
            className={`sim-card-box ${stepIdx === idx ? 'active' : ''}`}
            onClick={() => {
              setStepIdx(idx);
              onInteract();
            }}
            style={{ cursor: 'pointer' }}
          >
            <strong>{s}</strong>
            <p>
              {idx === 0 && 'Breaks big request into checkable sub-steps.'}
              {idx === 1 && (sandbox ? 'Runs inside isolated read/draft container.' : 'Danger: unrestricted write access!')}
              {idx === 2 && 'Inspects real compiler/search evidence.'}
              {idx === 3 && (sandbox ? 'Asks human before irreversible action.' : 'Ships unreviewed!')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 13. RL GRID & ROBOTICS LOOP */
const RLGridLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [explore, setExplore] = useState(30);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    setExplore(activeBeat === 1 ? 65 : 20);
  }, [activeBeat]);

  const cells = ['Start', 'Safe', 'Trap -10', 'Safe', 'Goal +50'];

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <label className="inline-slider">
          <span>Exploration: {explore}%</span>
          <input
            type="range"
            min={0}
            max={100}
            value={explore}
            onChange={(e) => {
              setExplore(Number(e.target.value));
              onInteract();
            }}
          />
        </label>
        <button
          className="action-pill"
          onClick={() => {
            const next = explore > 75 && pos === 1 ? 2 : pos === 2 ? 3 : (pos + 1) % 5;
            setPos(next);
            onInteract();
          }}
        >
          Move Robot
        </button>
      </div>

      <div className="rl-track">
        {cells.map((label, idx) => (
          <div key={idx} className={`rl-cell ${pos === idx ? 'bot-here' : ''} ${idx === 2 ? 'hazard' : ''}`}>
            <span className="rl-idx">0{idx + 1}</span>
            <strong>{pos === idx ? '[ ROBOT ]' : label}</strong>
          </div>
        ))}
      </div>
      <p className="sim-caption-note">
        {pos === 2
          ? 'Hit Trap (-10)! In simulation that teaches avoidance safely; on real robots hardware limits block it.'
          : pos === 4
          ? 'Reached Goal (+50)! Value propagates backward so earlier states learn the winning path.'
          : 'Click "Move Robot" to test policy steps.'}
      </p>
    </div>
  );
};

/* 14. COMPRESSION, HARDWARE & SECURITY OPS */
const CompressionOpsLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [bits, setBits] = useState(8);
  const [firewall, setFirewall] = useState(true);

  useEffect(() => {
    setBits(activeBeat === 0 ? 4 : 8);
  }, [activeBeat]);

  const vramGb = Math.round((70 * bits) / 8);
  const quality = bits >= 8 ? 99 : bits >= 4 ? 97 : 74;

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <label className="inline-slider">
          <span>Precision: {bits}-bit</span>
          <input
            type="range"
            min={2}
            max={16}
            step={2}
            value={bits}
            onChange={(e) => {
              setBits(Number(e.target.value));
              onInteract();
            }}
          />
        </label>
        <button
          className={`action-pill ${firewall ? 'on' : ''}`}
          onClick={() => {
            setFirewall(!firewall);
            onInteract();
          }}
        >
          Injection Shield: {firewall ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="sim-bars">
        <div className="bar-row">
          <span>70B Model VRAM</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${Math.min(100, (vramGb / 140) * 100)}%` }} />
          </div>
          <strong>{vramGb} GB</strong>
        </div>
        <div className="bar-row">
          <span>Task Quality</span>
          <div className="bar-track">
            <div className="bar-fill strong" style={{ width: `${quality}%` }} />
          </div>
          <strong>{quality}%</strong>
        </div>
        <p className="sim-caption-note">
          {firewall
            ? '4–8 bit slashes GPU RAM up to 4x while tool permissions block untrusted prompt injections.'
            : 'Warning: Untrusted web/email text can trigger unguarded tool actions!'}
        </p>
      </div>
    </div>
  );
};

/* 15. CAUSALITY & EVALUATION THRESHOLD LAB */
const CausalityEvalLab: React.FC<{ activeBeat: number; onInteract: () => void }> = ({
  activeBeat,
  onInteract,
}) => {
  const [showCause, setShowCause] = useState(false);
  const [cutoff, setCutoff] = useState(65);

  useEffect(() => {
    setShowCause(activeBeat >= 1);
  }, [activeBeat]);

  const recall = Math.min(99, Math.round(115 - cutoff * 0.65));
  const precision = Math.min(99, Math.round(35 + cutoff * 0.62));

  return (
    <div className="sim-shell">
      <div className="sim-toolbar">
        <button
          className={`action-pill ${showCause ? 'on' : ''}`}
          onClick={() => {
            setShowCause(!showCause);
            onInteract();
          }}
        >
          {showCause ? 'Hidden Confounder: REVEALED' : 'Reveal Hidden Cause'}
        </button>
        <label className="inline-slider">
          <span>Alarm Cutoff: {cutoff}%</span>
          <input
            type="range"
            min={25}
            max={95}
            value={cutoff}
            onChange={(e) => {
              setCutoff(Number(e.target.value));
              onInteract();
            }}
          />
        </label>
      </div>

      <div className="sim-readout-grid">
        <div className="sim-card-box active">
          <span className="sim-kicker">Cause vs. Correlation</span>
          <strong>
            {showCause
              ? 'Summer Heat -> boosts BOTH Ice Cream & Swimming!'
              : 'Naive AI sees: Ice Cream <-> Shark Bites'}
          </strong>
        </div>
        <div className="sim-card-box">
          <span className="sim-kicker">Precision / Recall Trade-Off</span>
          <strong>
            Precision {precision}% · Recall {recall}%
          </strong>
        </div>
      </div>
    </div>
  );
};
