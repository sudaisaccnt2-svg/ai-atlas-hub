import React, { useState, useEffect } from 'react';
import { SceneWidget } from '../types';
import { Icon } from './Icons';
import { sound } from '../lib/sound';

interface SceneStageProps {
  widget: SceneWidget;
  sceneKey: string;
}

export const SceneStage: React.FC<SceneStageProps> = ({ widget, sceneKey }) => {
  switch (widget.kind) {
    case 'tester':
      return <TesterStage key={sceneKey} widget={widget} />;
    case 'slider':
      return <SliderStage key={sceneKey} widget={widget} />;
    case 'pipeline':
      return <PipelineStage key={sceneKey} widget={widget} />;
    case 'compare':
      return <CompareStage key={sceneKey} widget={widget} />;
    case 'spotter':
      return <SpotterStage key={sceneKey} widget={widget} />;
  }
};

/* 1. CONCRETE INPUT TESTER */
const TesterStage: React.FC<{ widget: Extract<SceneWidget, { kind: 'tester' }> }> = ({ widget }) => {
  const [caseIdx, setCaseIdx] = useState(0);
  const [modeIdx, setModeIdx] = useState<0 | 1>(0);

  const activeCase = widget.cases[caseIdx] || widget.cases[0];
  const res = activeCase.results[modeIdx];

  return (
    <div className="stage-box">
      <div className="tester-top-row">
        <span className="stage-step-label">{widget.promptLabel}</span>
        <div className="mode-toggle" role="tablist">
          {widget.modes.map((m, idx) => (
            <button
              key={m.name}
              className={`mode-btn ${modeIdx === idx ? 'active' : ''}`}
              onClick={() => {
                sound.tick();
                setModeIdx(idx as 0 | 1);
              }}
            >
              <strong>{m.name}</strong>
              <span>{m.badge}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tester-split">
        {/* Concrete Test Inputs */}
        <div className="tester-inputs">
          <span className="col-kicker">1. Pick a real test item</span>
          {widget.cases.map((c, idx) => (
            <button
              key={c.name}
              className={`case-card ${caseIdx === idx ? 'selected' : ''}`}
              onClick={() => {
                sound.tick();
                setCaseIdx(idx);
              }}
            >
              <div className="case-radio" />
              <div className="case-copy">
                <strong>{c.name}</strong>
                <span>{c.detail}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Connector Arrow */}
        <div className="tester-arrow" aria-hidden="true">
          <Icon name="arrow-right" size={22} />
        </div>

        {/* Live Output Result */}
        <div className={`tester-result ${res.pass ? 'pass' : 'fail'}`}>
          <div className="result-header">
            <span className="col-kicker">2. What {widget.modes[modeIdx].name} does</span>
            <span className={`verdict-pill ${res.pass ? 'pass' : 'fail'}`}>
              <Icon name={res.pass ? 'check' : 'close'} size={14} />
              {res.pass ? 'Works' : 'Breaks'}
            </span>
          </div>
          <div className="result-output-box">{res.output}</div>
          <p className="result-why">{res.why}</p>
        </div>
      </div>
    </div>
  );
};

/* 2. REAL-OUTPUT DIAL SLIDER */
const SliderStage: React.FC<{ widget: Extract<SceneWidget, { kind: 'slider' }> }> = ({ widget }) => {
  const [idx, setIdx] = useState(Math.min(1, widget.stops.length - 1));
  const stop = widget.stops[idx] || widget.stops[0];

  return (
    <div className="stage-box">
      <div className="slider-header">
        <span className="stage-step-label">{widget.dialLabel}</span>
        <div className="slider-stops-pills">
          {widget.stops.map((s, i) => (
            <button
              key={s.label}
              className={`stop-pill ${idx === i ? 'active' : ''}`}
              onClick={() => {
                sound.tick();
                setIdx(i);
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="big-range-wrap">
        <input
          type="range"
          min={0}
          max={widget.stops.length - 1}
          step={1}
          value={idx}
          onChange={(e) => {
            sound.tick();
            setIdx(Number(e.target.value));
          }}
        />
      </div>

      <div className={`slider-live-display ${stop.verdict}`}>
        <div className="io-pair">
          <div className="io-card">
            <span className="col-kicker">Input / Situation</span>
            <p className="io-text">{stop.sampleInput}</p>
          </div>
          <div className="io-card output">
            <div className="result-header">
              <span className="col-kicker">Live Result ({stop.tag})</span>
              <span
                className={`verdict-pill ${
                  stop.verdict === 'good' ? 'pass' : stop.verdict === 'warn' ? 'warn' : 'fail'
                }`}
              >
                {stop.verdict === 'good' ? 'Sweet Spot' : stop.verdict === 'warn' ? 'Trade-off' : 'Fails'}
              </span>
            </div>
            <p className="io-text strong">{stop.sampleOutput}</p>
          </div>
        </div>
        <p className="result-why">{stop.why}</p>
      </div>
    </div>
  );
};

/* 3. LIVE PIPELINE SWITCHBOARD */
const PipelineStage: React.FC<{ widget: Extract<SceneWidget, { kind: 'pipeline' }> }> = ({
  widget,
}) => {
  const [enabled, setEnabled] = useState<boolean[]>(() =>
    widget.stations.map((s) => s.defaultOn)
  );

  useEffect(() => {
    setEnabled(widget.stations.map((s) => s.defaultOn));
  }, [widget]);

  const firstOffIdx = enabled.findIndex((on) => !on);
  const brokenStation = firstOffIdx >= 0 ? widget.stations[firstOffIdx] : null;

  return (
    <div className="stage-box">
      <div className="pipeline-request">
        <span className="col-kicker">Incoming Real Request</span>
        <strong>{widget.requestText}</strong>
      </div>

      <div className="pipeline-stations">
        {widget.stations.map((st, i) => {
          const isOn = enabled[i];
          return (
            <button
              key={st.name}
              className={`station-card ${isOn ? 'on' : 'off'}`}
              onClick={() => {
                sound.tick();
                setEnabled((prev) => prev.map((v, j) => (j === i ? !v : v)));
              }}
            >
              <div className="station-top">
                <span className="station-num">0{i + 1}</span>
                <span className={`power-tag ${isOn ? 'on' : 'off'}`}>
                  {isOn ? 'ON' : 'OFF'}
                </span>
              </div>
              <strong>{st.name}</strong>
              <span className="station-role">{st.role}</span>
            </button>
          );
        })}
      </div>

      <div className={`pipeline-outcome ${brokenStation ? 'fail' : 'pass'}`}>
        <div className="result-header">
          <span className="col-kicker">
            {brokenStation ? `Missing: ${brokenStation.name}` : 'All Parts Connected'}
          </span>
          <span className={`verdict-pill ${brokenStation ? 'fail' : 'pass'}`}>
            <Icon name={brokenStation ? 'close' : 'check'} size={14} />
            {brokenStation ? 'Unsafe / Broken' : 'Reliable System'}
          </span>
        </div>
        <div className="result-output-box">
          {brokenStation ? brokenStation.whenOffOutput : widget.allOnOutput}
        </div>
        <p className="result-why">
          {brokenStation ? brokenStation.whenOffProblem : widget.allOnWhy}
        </p>
      </div>
    </div>
  );
};

/* 4. SIDE-BY-SIDE COMPARISON BENCH */
const CompareStage: React.FC<{ widget: Extract<SceneWidget, { kind: 'compare' }> }> = ({
  widget,
}) => {
  const [selected, setSelected] = useState<number>(() => {
    const bestIdx = widget.cards.findIndex((c) => c.best);
    return bestIdx >= 0 ? bestIdx : 0;
  });

  const active = widget.cards[selected] || widget.cards[0];

  return (
    <div className="stage-box">
      <div className="pipeline-request">
        <span className="col-kicker">Same Real Scenario Tested Across Approaches</span>
        <strong>{widget.scenario}</strong>
      </div>

      <div className="compare-bench">
        {widget.cards.map((c, i) => (
          <button
            key={c.name}
            className={`compare-card ${selected === i ? 'selected' : ''} ${c.best ? 'best-pick' : ''}`}
            onClick={() => {
              sound.tick();
              setSelected(i);
            }}
          >
            <div className="compare-head">
              <strong>{c.name}</strong>
              {c.best && <span className="best-badge">Best Fit</span>}
            </div>
            <span className="compare-tag">{c.tag}</span>
            <p className="compare-out">{c.output}</p>
            <div className="compare-meters">
              <span>Speed: {c.speed}</span>
              <span>Cost: {c.cost}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="compare-takeaway">
        <Icon name={active.best ? 'check' : 'compass'} size={17} />
        <p>{active.why}</p>
      </div>
    </div>
  );
};

/* 5. INTERACTIVE X-RAY / TRAP SPOTTER */
const SpotterStage: React.FC<{ widget: Extract<SceneWidget, { kind: 'spotter' }> }> = ({
  widget,
}) => {
  const [xray, setXray] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="stage-box">
      <div className="tester-top-row">
        <span className="stage-step-label">{widget.instruction}</span>
        <button
          className={`xray-btn ${xray ? 'on' : ''}`}
          onClick={() => {
            sound.tick();
            setXray(!xray);
          }}
        >
          <Icon name="eye" size={16} />
          <span>{xray ? `${widget.xrayLabel}: ON` : `Turn On ${widget.xrayLabel}`}</span>
        </button>
      </div>

      <div className="spotter-grid">
        {widget.items.map((item, idx) => {
          const revealed = xray || picked === idx;
          return (
            <button
              key={item.title}
              className={`spotter-card ${picked === idx ? 'picked' : ''} ${
                revealed && item.isTrap ? 'trap-revealed' : ''
              }`}
              onClick={() => {
                if (item.isTrap) sound.right(1);
                else sound.tick();
                setPicked(idx);
              }}
            >
              <div className="compare-head">
                <strong>{item.title}</strong>
                {revealed && (
                  <span className={`verdict-pill ${item.isTrap ? 'fail' : 'pass'}`}>
                    {item.isTrap ? 'Hidden Trap!' : 'Clean'}
                  </span>
                )}
              </div>
              <p className="spotter-preview">{item.preview}</p>
              {revealed && <p className="spotter-truth">{item.hiddenTruth}</p>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
