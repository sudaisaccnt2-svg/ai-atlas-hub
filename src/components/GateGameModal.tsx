import React, { useState, useEffect, useMemo } from 'react';
import {
  GameChallenge,
  SortChallenge,
  PipelineChallenge,
  DetectiveChallenge,
  TunerChallenge,
  DecisionChallenge,
} from '../types';
import { buildRandomizedGateSession, shuffle } from '../data/gameBank';
import { LEVELS } from '../data/curriculum';
import { Icon } from './Icons';
import { sound } from '../lib/sound';

interface GateGameModalProps {
  levelId: number;
  onClose: () => void;
  onFinishSession: (levelId: number, accuracy: number, passed: boolean, bestStreak: number) => void;
}

const PASS_THRESHOLD = 80; // 5/6 (83%) or 6/6 (100%) unlocks the next level

export const GateGameModal: React.FC<GateGameModalProps> = ({
  levelId,
  onClose,
  onFinishSession,
}) => {
  const level = LEVELS.find((l) => l.id === levelId)!;
  const [seed, setSeed] = useState(0);
  const session = useMemo(() => buildRandomizedGateSession(levelId, 6), [levelId, seed]);

  const [roundIdx, setRoundIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; why: string } | null>(null);
  const [done, setDone] = useState(false);

  const challenge: GameChallenge | undefined = session[roundIdx];

  const handleRoundResult = (ok: boolean, why: string) => {
    if (feedback) return;
    const nextCorrect = ok ? correctCount + 1 : correctCount;
    const nextStreak = ok ? streak + 1 : 0;
    const nextBest = Math.max(bestStreak, nextStreak);

    setCorrectCount(nextCorrect);
    setStreak(nextStreak);
    setBestStreak(nextBest);
    setFeedback({ ok, why });

    if (ok) sound.right(nextStreak);
    else sound.miss();
  };

  const advanceRound = () => {
    sound.tick();
    if (roundIdx + 1 >= session.length) {
      const acc = Math.round((correctCount / session.length) * 100);
      const passed = acc >= PASS_THRESHOLD;
      if (passed) sound.unlock();
      setDone(true);
      onFinishSession(levelId, acc, passed, bestStreak);
    } else {
      setFeedback(null);
      setRoundIdx(roundIdx + 1);
    }
  };

  const restartWithNewSeed = () => {
    sound.tick();
    setRoundIdx(0);
    setCorrectCount(0);
    setStreak(0);
    setBestStreak(0);
    setFeedback(null);
    setDone(false);
    setSeed((s) => s + 1);
  };

  const accuracy = Math.round((correctCount / session.length) * 100);
  const passed = accuracy >= PASS_THRESHOLD;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="game-modal">
        {/* Top Arcade HUD */}
        <header className="game-hud">
          <div className="hud-left">
            <span className="hud-tag">L{String(levelId).padStart(2, '0')} GATE TRIAL</span>
            <strong>{level.gateTitle}</strong>
          </div>

          {!done && (
            <div className="hud-stats">
              <div className="round-dots">
                {session.map((c, idx) => (
                  <span
                    key={c.id}
                    className={`r-dot ${idx < roundIdx ? 'past' : idx === roundIdx ? 'now' : ''}`}
                  />
                ))}
              </div>
              <span className="streak-pill">
                <Icon name="zap" size={14} /> x{Math.max(1, streak)}
              </span>
            </div>
          )}

          <button className="icon-btn" onClick={onClose} aria-label="Close game">
            <Icon name="close" size={18} />
          </button>
        </header>

        {done ? (
          <div className="game-summary">
            <div className={`summary-badge ${passed ? 'pass' : 'retry'}`}>
              <Icon name={passed ? 'unlock' : 'refresh'} size={28} />
            </div>
            <h2>
              {passed
                ? levelId < 10
                  ? `Level ${String(levelId + 1).padStart(2, '0')} Fog Cleared`
                  : 'All 10 Levels Mastered'
                : 'Almost There — Try a Fresh Seed'}
            </h2>
            <p className="summary-score-line">
              Score: <strong>{accuracy}%</strong> ({correctCount}/{session.length}) · Best Streak:{' '}
              <strong>x{bestStreak}</strong> · Need {PASS_THRESHOLD}% to unlock
            </p>
            <div className="summary-actions">
              <button className="ghost-btn" onClick={restartWithNewSeed}>
                <Icon name="shuffle" size={16} />
                <span>New Random Seed</span>
              </button>
              <button className="primary-step-btn" onClick={onClose}>
                <span>{passed ? 'Enter New Horizon' : 'Back to Lessons'}</span>
                <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="game-arena">
            <div className="mechanic-kicker">
              <Icon name="shuffle" size={13} />
              <span>
                Round {roundIdx + 1}/{session.length} · Random Mechanic: {challenge.mechanic}
              </span>
            </div>

            {challenge.mechanic === 'SORT' && (
              <SortArena
                key={challenge.id}
                challenge={challenge}
                locked={Boolean(feedback)}
                onDone={handleRoundResult}
              />
            )}
            {challenge.mechanic === 'PIPELINE' && (
              <PipelineArena
                key={challenge.id}
                challenge={challenge}
                locked={Boolean(feedback)}
                onDone={handleRoundResult}
              />
            )}
            {challenge.mechanic === 'DETECTIVE' && (
              <DetectiveArena
                key={challenge.id}
                challenge={challenge}
                locked={Boolean(feedback)}
                onDone={handleRoundResult}
              />
            )}
            {challenge.mechanic === 'TUNER' && (
              <TunerArena
                key={challenge.id}
                challenge={challenge}
                locked={Boolean(feedback)}
                onDone={handleRoundResult}
              />
            )}
            {challenge.mechanic === 'DECISION' && (
              <DecisionArena
                key={challenge.id}
                challenge={challenge}
                locked={Boolean(feedback)}
                onDone={handleRoundResult}
              />
            )}

            {feedback && (
              <div className={`feedback-banner ${feedback.ok ? 'ok' : 'miss'}`}>
                <div className="fb-icon">
                  <Icon name={feedback.ok ? 'check' : 'close'} size={18} />
                </div>
                <div className="fb-copy">
                  <strong>{feedback.ok ? 'Sharp Call' : 'Trap Triggered'}</strong>
                  <p>{feedback.why}</p>
                </div>
                <button className="primary-step-btn" onClick={advanceRound}>
                  <span>{roundIdx + 1 >= session.length ? 'See Verdict' : 'Next'}</span>
                  <Icon name="arrow-right" size={15} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* MECHANIC 1: RAPID TRIAGE SORT */
const SortArena: React.FC<{
  challenge: SortChallenge;
  locked: boolean;
  onDone: (ok: boolean, why: string) => void;
}> = ({ challenge, locked, onDone }) => {
  const [itemIdx, setItemIdx] = useState(0);
  const current = challenge.items[itemIdx];

  const chooseBucket = (bIdx: number) => {
    if (locked || !current) return;
    if (bIdx !== current.bucketIndex) {
      onDone(false, `${current.label} -> ${challenge.buckets[current.bucketIndex]}. ${current.why}`);
      return;
    }
    if (itemIdx + 1 >= challenge.items.length) {
      onDone(true, current.why);
    } else {
      sound.tick();
      setItemIdx(itemIdx + 1);
    }
  };

  return (
    <div className="arena-block">
      <h3>{challenge.prompt}</h3>
      <div className="sort-card-spotlight">
        <span className="mini-counter">
          Card {itemIdx + 1} of {challenge.items.length}
        </span>
        <strong>{current?.label}</strong>
      </div>
      <div className="buckets-row">
        {challenge.buckets.map((b, idx) => (
          <button
            key={b}
            className="bucket-btn"
            disabled={locked}
            onClick={() => chooseBucket(idx)}
          >
            <span>Route to</span>
            <strong>{b}</strong>
          </button>
        ))}
      </div>
    </div>
  );
};

/* MECHANIC 2: WIRE THE PIPELINE IN ORDER */
const PipelineArena: React.FC<{
  challenge: PipelineChallenge;
  locked: boolean;
  onDone: (ok: boolean, why: string) => void;
}> = ({ challenge, locked, onDone }) => {
  const [pool, setPool] = useState<string[]>(() => {
    let s = shuffle(challenge.steps);
    if (s.every((v, i) => v === challenge.steps[i])) s = [...s].reverse();
    return s;
  });
  const [picked, setPicked] = useState<string[]>([]);

  useEffect(() => {
    let s = shuffle(challenge.steps);
    if (s.every((v, i) => v === challenge.steps[i])) s = [...s].reverse();
    setPool(s);
    setPicked([]);
  }, [challenge]);

  const pickStep = (step: string) => {
    if (locked || picked.includes(step)) return;
    const expected = challenge.steps[picked.length];
    const next = [...picked, step];
    setPicked(next);

    if (step !== expected) {
      onDone(false, `Right order: ${challenge.steps.join(' -> ')}. ${challenge.why}`);
      return;
    }
    if (next.length === challenge.steps.length) {
      onDone(true, challenge.why);
    } else {
      sound.tick();
    }
  };

  return (
    <div className="arena-block">
      <h3>{challenge.prompt}</h3>
      <p className="arena-sub">Tap steps in exact order (1 -&gt; {challenge.steps.length}):</p>
      <div className="pipeline-slots">
        {challenge.steps.map((_, i) => (
          <div key={i} className={`pipe-slot ${picked[i] ? 'filled' : ''}`}>
            <span>0{i + 1}</span>
            <strong>{picked[i] || '...'}</strong>
          </div>
        ))}
      </div>
      <div className="choice-grid">
        {pool.map((s) => (
          <button
            key={s}
            className={`choice-btn ${picked.includes(s) ? 'used' : ''}`}
            disabled={locked || picked.includes(s)}
            onClick={() => pickStep(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

/* MECHANIC 3: SPOT THE BROKEN SYSTEM COMPONENT */
const DetectiveArena: React.FC<{
  challenge: DetectiveChallenge;
  locked: boolean;
  onDone: (ok: boolean, why: string) => void;
}> = ({ challenge, locked, onDone }) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="arena-block">
      <h3>{challenge.prompt}</h3>
      <div className="detective-grid">
        {challenge.nodes.map((n, idx) => (
          <button
            key={n.label}
            className={`detective-node ${selected === idx ? (n.isBroken ? 'hit' : 'wrong') : ''}`}
            disabled={locked}
            onClick={() => {
              setSelected(idx);
              onDone(n.isBroken, challenge.why);
            }}
          >
            <span className="det-title">{n.label}</span>
            <strong className="det-stat">{n.stat}</strong>
          </button>
        ))}
      </div>
    </div>
  );
};

/* MECHANIC 4: INTERACTIVE PARAMETER TUNER */
const TunerArena: React.FC<{
  challenge: TunerChallenge;
  locked: boolean;
  onDone: (ok: boolean, why: string) => void;
}> = ({ challenge, locked, onDone }) => {
  const [val, setVal] = useState<number>(() => {
    // Always start outside the sweet spot so the player actually has to tune!
    const midTarget = (challenge.targetMin + challenge.targetMax) / 2;
    const midRange = (challenge.min + challenge.max) / 2;
    return midTarget > midRange ? challenge.min : challenge.max;
  });

  const liveHint =
    val < challenge.targetMin
      ? 'Dial position: Low zone'
      : val > challenge.targetMax
      ? 'Dial position: High zone'
      : 'Dial position: Target sweet-spot candidate';

  return (
    <div className="arena-block">
      <h3>{challenge.prompt}</h3>
      <div className="tuner-box">
        <div className="tuner-readout">
          <strong>
            {val} {challenge.unitLabel}
          </strong>
          <span>{locked ? (val >= challenge.targetMin && val <= challenge.targetMax ? challenge.sweetStateLabel : val < challenge.targetMin ? challenge.lowStateLabel : challenge.highStateLabel) : liveHint}</span>
        </div>
        <input
          type="range"
          min={challenge.min}
          max={challenge.max}
          step={challenge.step}
          value={val}
          disabled={locked}
          onChange={(e) => {
            setVal(Number(e.target.value));
          }}
        />
        <div className="tuner-ends">
          <span>Min: {challenge.min}</span>
          <span>Max: {challenge.max}</span>
        </div>
        {!locked && (
          <button
            className="primary-step-btn"
            onClick={() => {
              const ok = val >= challenge.targetMin && val <= challenge.targetMax;
              onDone(
                ok,
                `Sweet spot: ${challenge.targetMin}–${challenge.targetMax} ${challenge.unitLabel}. ${challenge.why}`
              );
            }}
          >
            <Icon name="check" size={15} />
            <span>Lock Dial Setting</span>
          </button>
        )}
      </div>
    </div>
  );
};

/* MECHANIC 5: REAL-WORLD SCENARIO DECISION */
const DecisionArena: React.FC<{
  challenge: DecisionChallenge;
  locked: boolean;
  onDone: (ok: boolean, why: string) => void;
}> = ({ challenge, locked, onDone }) => {
  const [pickedIdx, setPickedIdx] = useState<number | null>(null);

  return (
    <div className="arena-block">
      <span className="constraint-pill">{challenge.constraintTag}</span>
      <h3>{challenge.scenario}</h3>
      <div className="decision-options">
        {challenge.options.map((opt, idx) => (
          <button
            key={opt.label}
            className={`decision-opt ${pickedIdx === idx ? (opt.isBest ? 'hit' : 'wrong') : ''}`}
            disabled={locked}
            onClick={() => {
              setPickedIdx(idx);
              onDone(opt.isBest, opt.why);
            }}
          >
            <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
