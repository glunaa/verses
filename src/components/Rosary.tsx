import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { MYSTERY_SETS, ROSARY_PRAYERS, MysterySet } from '../data/rosaryData';

interface RosaryProps {
  showLatin: boolean;
  onToggleLatin: () => void;
}

// ─── Step types ───────────────────────────────────────────────────────────────
type StepKind =
  | 'creed'
  | 'opening-father'
  | 'opening-ave'       // 3 opening Hail Marys
  | 'opening-glory'
  | 'mystery'
  | 'father'
  | 'ave'               // 10 Hail Marys per decade
  | 'glory'
  | 'fatima'
  | 'hail-holy-queen'
  | 'closing';

interface RosaryStep {
  kind: StepKind;
  decade?: number;    // 1–5
  aveIndex?: number;  // 1–10 (decade) or 1–3 (opening)
}

// ─── Build steps array for a given mystery set ───────────────────────────────
function buildSteps(): RosaryStep[] {
  const steps: RosaryStep[] = [];
  steps.push({ kind: 'creed' });
  steps.push({ kind: 'opening-father' });
  steps.push({ kind: 'opening-ave', aveIndex: 1 });
  steps.push({ kind: 'opening-ave', aveIndex: 2 });
  steps.push({ kind: 'opening-ave', aveIndex: 3 });
  steps.push({ kind: 'opening-glory' });
  for (let d = 1; d <= 5; d++) {
    steps.push({ kind: 'mystery', decade: d });
    steps.push({ kind: 'father', decade: d });
    for (let a = 1; a <= 10; a++) {
      steps.push({ kind: 'ave', decade: d, aveIndex: a });
    }
    steps.push({ kind: 'glory', decade: d });
    steps.push({ kind: 'fatima', decade: d });
  }
  steps.push({ kind: 'hail-holy-queen' });
  steps.push({ kind: 'closing' });
  return steps;
}

const STEPS = buildSteps(); // constant — same structure regardless of mystery set
const TOTAL = STEPS.length;

// ─── Derive display info for a step ──────────────────────────────────────────
function getStepInfo(
  step: RosaryStep,
  set: MysterySet,
  showLatin: boolean
): { heading: string; subheading?: string; body: string } {
  const P = ROSARY_PRAYERS;
  const lang = (p: { en: string; la: string }) => (showLatin ? p.la : p.en);
  const lbl = (p: { label: string; latinLabel: string }) =>
    showLatin ? p.latinLabel : p.label;

  switch (step.kind) {
    case 'creed':
      return { heading: lbl(P.apostlesCreed), body: lang(P.apostlesCreed) };

    case 'opening-father':
      return {
        heading: lbl(P.ourFather),
        subheading: 'Opening — for faith, hope & charity',
        body: lang(P.ourFather),
      };

    case 'opening-ave': {
      const intentions = ['faith', 'hope', 'charity'];
      return {
        heading: lbl(P.hailMary),
        subheading: `Opening Hail Mary ${step.aveIndex}/3 — for ${intentions[step.aveIndex! - 1]}`,
        body: lang(P.hailMary),
      };
    }

    case 'opening-glory':
      return {
        heading: lbl(P.gloryBe),
        subheading: 'Opening Glory Be',
        body: lang(P.gloryBe),
      };

    case 'mystery': {
      const m = set.mysteries[step.decade! - 1];
      return {
        heading: showLatin ? m.latinName : m.name,
        subheading: `Decade ${step.decade} · Fruit: ${m.fruit} · ${m.scripture}`,
        body: showLatin ? m.latinMeditation : m.meditation,
      };
    }

    case 'father':
      return {
        heading: lbl(P.ourFather),
        subheading: `Decade ${step.decade} of 5`,
        body: lang(P.ourFather),
      };

    case 'ave':
      return {
        heading: lbl(P.hailMary),
        subheading: `Decade ${step.decade} · Bead ${step.aveIndex}/10`,
        body: lang(P.hailMary),
      };

    case 'glory':
      return {
        heading: lbl(P.gloryBe),
        subheading: `After Decade ${step.decade}`,
        body: lang(P.gloryBe),
      };

    case 'fatima':
      return {
        heading: lbl(P.fatima),
        subheading: `After Decade ${step.decade}`,
        body: lang(P.fatima),
      };

    case 'hail-holy-queen':
      return { heading: lbl(P.hailHolyQueen), body: lang(P.hailHolyQueen) };

    case 'closing':
      return { heading: lbl(P.closingPrayer), body: lang(P.closingPrayer) };
  }
}

// ─── Bead progress bar ────────────────────────────────────────────────────────
// Shows 5 rows of 10 beads; current decade/bead highlighted.
const BeadTracker: FC<{ step: RosaryStep }> = ({ step }) => {
  const currentDecade = step.decade ?? 0;
  const currentAve = step.kind === 'ave' ? step.aveIndex ?? 0 : 0;

  return (
    <div className="bead-tracker">
      {[1, 2, 3, 4, 5].map((d) => (
        <div key={d} className="bead-row">
          <span className={`bead-decade-label${d === currentDecade ? ' active-decade' : ''}`}>
            {d}
          </span>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a) => {
            const isPast = d < currentDecade || (d === currentDecade && a < currentAve);
            const isCurrent = d === currentDecade && a === currentAve;
            return (
              <span
                key={a}
                className={`bead${isPast ? ' past' : ''}${isCurrent ? ' current' : ''}`}
                title={`Decade ${d}, Hail Mary ${a}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ─── Main Rosary component ────────────────────────────────────────────────────
const Rosary: FC<RosaryProps> = ({ showLatin, onToggleLatin }) => {
  const [setIndex, setSetIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const set = MYSTERY_SETS[setIndex];
  const step = STEPS[stepIndex];
  const info = getStepInfo(step, set, showLatin);

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, TOTAL - 1));
  }, []);

  const goPrev = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  // Scroll body to top when step changes
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [stepIndex]);

  // Arrow keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!started) return;
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [started, goNext, goPrev]);

  // ── Mystery selector screen ──────────────────────────────────────────────
  if (!started) {
    return (
      <div className="rosary-selector">
        <p className="rosary-intro">
          Select the mysteries you wish to pray, then begin.
          <br />
          <span className="rosary-intro-sub">
            Use ← → arrow keys or the buttons to advance through each bead.
          </span>
        </p>
        <div className="mystery-set-grid">
          {MYSTERY_SETS.map((ms, i) => (
            <button
              key={i}
              className={`mystery-set-btn${i === setIndex ? ' active' : ''}`}
              onClick={() => setSetIndex(i)}
            >
              <span className="mystery-set-name">{ms.name}</span>
              <span className="mystery-set-latin">{ms.latinName}</span>
              <span className="mystery-set-days">{ms.days}</span>
            </button>
          ))}
        </div>
        <button
          className="rosary-start-btn"
          onClick={() => {
            setStepIndex(0);
            setStarted(true);
          }}
        >
          Begin the Rosary
        </button>
      </div>
    );
  }

  // ── Step-by-step rosary ───────────────────────────────────────────────────
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === TOTAL - 1;
  const progress = Math.round(((stepIndex + 1) / TOTAL) * 100);

  return (
    <div className="rosary-guide">
      {/* Header row: mystery set name + reset button */}
      <div className="rosary-header">
        <span className="rosary-set-tag">
          {showLatin ? set.latinName : set.name}
        </span>
        <button className="rosary-reset-btn" onClick={() => { setStarted(false); setStepIndex(0); }}>
          ↩ Change
        </button>
      </div>

      {/* Progress bar */}
      <div className="rosary-progress-bar">
        <div className="rosary-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="rosary-step-count">{stepIndex + 1} / {TOTAL}</p>

      {/* Bead tracker (only during decades) */}
      {(step.kind === 'ave' || step.kind === 'mystery' || step.kind === 'father' ||
        step.kind === 'glory' || step.kind === 'fatima') && (
        <BeadTracker step={step} />
      )}

      {/* Prayer content */}
      <div ref={bodyRef} className="verse rosary-body">
        <h2>{info.heading}</h2>
        {info.subheading && <p className="rosary-subheading">{info.subheading}</p>}
        <p>{info.body}</p>
      </div>

      {/* Navigation */}
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

export default Rosary;
