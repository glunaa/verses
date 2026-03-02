import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { STATIONS, STATIONS_PRAYERS } from '../data/stationsData';

interface StationsProps {
  showLatin: boolean;
  onToggleLatin: () => void;
}

type StepKind = 'opening' | 'station' | 'closing';

interface StationsStep {
  kind: StepKind;
  stationIndex?: number; // 0–13
}

function buildSteps(): StationsStep[] {
  const steps: StationsStep[] = [{ kind: 'opening' }];
  for (let i = 0; i < 14; i++) steps.push({ kind: 'station', stationIndex: i });
  steps.push({ kind: 'closing' });
  return steps;
}

const STEPS = buildSteps();
const TOTAL = STEPS.length;

const Stations: FC<StationsProps> = ({ showLatin, onToggleLatin }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => setStepIndex((i) => Math.min(i + 1, TOTAL - 1)), []);
  const goPrev = useCallback(() => setStepIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [stepIndex]);

  useEffect(() => {
    if (!started) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [started, goNext, goPrev]);

  // ── Intro screen ─────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="rosary-selector" style={{ textAlign: 'center' }}>
        <p className="rosary-intro">
          The Stations of the Cross
          <br />
          <span className="rosary-intro-sub">
            14 stations meditating on the Passion of Christ.
            <br />Use ← → arrows or buttons to move between stations.
          </span>
        </p>
        <button
          className="rosary-start-btn"
          onClick={() => { setStepIndex(0); setStarted(true); }}
        >
          Begin the Stations
        </button>
      </div>
    );
  }

  // ── Render current step ───────────────────────────────────────────────────
  const step = STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === TOTAL - 1;
  const progress = Math.round(((stepIndex + 1) / TOTAL) * 100);

  let heading = '';
  let subheading = '';
  let body = '';

  if (step.kind === 'opening') {
    heading = showLatin ? 'Initium' : 'Opening';
    body = showLatin ? STATIONS_PRAYERS.opening.la : STATIONS_PRAYERS.opening.en;
  } else if (step.kind === 'closing') {
    heading = showLatin ? 'Conclusio' : 'Closing Prayer';
    body = showLatin ? STATIONS_PRAYERS.closing.la : STATIONS_PRAYERS.closing.en;
  } else {
    const s = STATIONS[step.stationIndex!];
    heading = showLatin
      ? `Statio ${s.number}: ${s.latinName}`
      : `Station ${s.number}: ${s.name}`;
    subheading = s.scripture;
    body = showLatin ? s.latinMeditation : s.meditation;
  }

  return (
    <div className="rosary-guide">
      {/* Header */}
      <div className="rosary-header">
        <span className="rosary-set-tag">
          {showLatin ? 'Via Crucis' : 'Stations of the Cross'}
        </span>
        <button
          className="rosary-reset-btn"
          onClick={() => { setStarted(false); setStepIndex(0); }}
        >
          ↩ Back
        </button>
      </div>

      {/* Progress */}
      <div className="rosary-progress-bar">
        <div className="rosary-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="rosary-step-count">{stepIndex + 1} / {TOTAL}</p>

      {/* Station pip track */}
      {step.kind === 'station' && (
        <div className="stations-pip-row">
          {STATIONS.map((_, i) => (
            <span
              key={i}
              className={`station-pip${i < step.stationIndex! ? ' past' : ''}${i === step.stationIndex ? ' current' : ''}`}
              title={`Station ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Prayer text */}
      <div ref={bodyRef} className="verse rosary-body">
        <h2>{heading}</h2>
        {subheading && <p className="rosary-subheading">{subheading}</p>}
        <p>{body}</p>
        {step.kind === 'station' && (
          <p className="station-prayer-note">
            {showLatin
              ? '† Pater Noster · Ave Maria · Gloria Patri'
              : '† Our Father · Hail Mary · Glory Be'}
          </p>
        )}
      </div>

      {/* Nav */}
      <div className="buttons">
        <button onClick={goPrev} disabled={isFirst}>← Previous</button>
        {isLast ? (
          <button onClick={() => { setStarted(false); setStepIndex(0); }}>
            Finish ✓
          </button>
        ) : (
          <button onClick={goNext}>Next →</button>
        )}
        <button onClick={onToggleLatin}>
          {showLatin ? 'Show English' : 'Show Latin'}
        </button>
      </div>
    </div>
  );
};

export default Stations;
