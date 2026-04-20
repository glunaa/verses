import { FC, useState, useEffect, useCallback, useRef } from 'react';
import SevenSorrows from './SevenSorrows';

interface ChapletProps {
  showLatin: boolean;
  onToggleLatin: () => void;
}

// ─── All prayer texts ─────────────────────────────────────────────────────────
const P = {
  openingOurFather: {
    label: 'Our Father',
    latinLabel: 'Pater Noster',
    en: 'Our Father, Who art in heaven, hallowed be Thy Name. Thy Kingdom come. Thy Will be done, on earth as it is in Heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.',
    la: 'Pater Noster, qui es in caelis, sanctificetur Nomen Tuum. Adveniat Regnum Tuum. Fiat voluntas Tua, sicut in caelo, et in terra. Panem nostrum quotidianum da nobis hodie. Et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.',
  },
  openingHailMary: {
    label: 'Hail Mary',
    latinLabel: 'Ave Maria',
    en: 'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
    la: 'Ave Maria, gratia plena, Dominus tecum; benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen.',
  },
  apostlesCreed: {
    label: "Apostles' Creed",
    latinLabel: 'Symbolum Apostolorum',
    en: 'I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ, His only Son Our Lord, Who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried; He descended into Hell; on the third day He rose again from the dead; He ascended into Heaven, and sitteth at the right hand of God, the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
    la: 'Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae; et in Iesum Christum, Filium eius unicum, Dominum nostrum, qui conceptus est de Spiritu Sancto, natus ex Maria Virgine, passus sub Pontio Pilato, crucifixus, mortuus, et sepultus; descendit ad inferos; tertia die resurrexit a mortuis; ascendit ad caelos, sedet ad dexteram Dei Patris omnipotentis; inde venturus est iudicare vivos et mortuos. Credo in Spiritum Sanctum, sanctam Ecclesiam catholicam, communionem sanctorum, remissionem peccatorum, carnis resurrectionem, vitam aeternam. Amen.',
  },
  eternalFather: {
    label: 'Eternal Father',
    latinLabel: 'Pater Aeterne',
    en: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.',
    la: 'Pater Aeterne, offero Tibi Corpus et Sanguinem, Animam et Divinitatem Dilectissimi Filii Tui, Domini Nostri Iesu Christi, in expiatione peccatorum nostrorum et totius mundi.',
  },
  forHisSorrowfulPassion: {
    label: 'For the Sake of His Sorrowful Passion',
    latinLabel: 'Propter Passionem Eius Dolorosam',
    en: 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
    la: 'Propter dolorosam Passionem Eius, miserere nobis et totius mundi.',
  },
  holyGod: {
    label: 'Holy God',
    latinLabel: 'Sanctus Deus',
    en: 'Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world.',
    la: 'Sanctus Deus, Sanctus Fortis, Sanctus Immortalis, miserere nobis et totius mundi.',
  },
  closing: {
    label: 'Closing',
    latinLabel: 'Conclusio',
    en: 'O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in You.\n\nJesus, I trust in You.\nJesus, I trust in You.\nJesus, I trust in You.',
    la: 'O Sanguis et Aqua, quae de Corde Iesu ut fons misericordiae pro nobis eruistis, in Te confido.\n\nIesu, confido in Te.\nIesu, confido in Te.\nIesu, confido in Te.',
  },
};

// ─── Step model ───────────────────────────────────────────────────────────────
type StepKind =
  | 'creed'
  | 'opening-father'
  | 'opening-ave'
  | 'decade-father'    // large bead: Eternal Father
  | 'decade-passion'   // 10 small beads: For His Sorrowful Passion
  | 'holy-god'         // said 3× after 5 decades
  | 'closing';

interface ChapletStep {
  kind: StepKind;
  decade?: number;   // 1–5
  beadIndex?: number; // 1–10
  holyGodIndex?: number; // 1–3
}

function buildSteps(): ChapletStep[] {
  const steps: ChapletStep[] = [];
  steps.push({ kind: 'creed' });
  steps.push({ kind: 'opening-father' });
  steps.push({ kind: 'opening-ave', beadIndex: 1 });
  steps.push({ kind: 'opening-ave', beadIndex: 2 });
  steps.push({ kind: 'opening-ave', beadIndex: 3 });
  for (let d = 1; d <= 5; d++) {
    steps.push({ kind: 'decade-father', decade: d });
    for (let b = 1; b <= 10; b++) {
      steps.push({ kind: 'decade-passion', decade: d, beadIndex: b });
    }
  }
  steps.push({ kind: 'holy-god', holyGodIndex: 1 });
  steps.push({ kind: 'holy-god', holyGodIndex: 2 });
  steps.push({ kind: 'holy-god', holyGodIndex: 3 });
  steps.push({ kind: 'closing' });
  return steps;
}

const STEPS = buildSteps();
const TOTAL = STEPS.length;

function getInfo(step: ChapletStep, showLatin: boolean) {
  const lang = (p: { en: string; la: string }) => (showLatin ? p.la : p.en);
  const lbl = (p: { label: string; latinLabel: string }) => (showLatin ? p.latinLabel : p.label);

  switch (step.kind) {
    case 'creed':
      return { heading: lbl(P.apostlesCreed), sub: '', body: lang(P.apostlesCreed) };
    case 'opening-father':
      return { heading: lbl(P.openingOurFather), sub: 'Opening', body: lang(P.openingOurFather) };
    case 'opening-ave':
      return {
        heading: lbl(P.openingHailMary),
        sub: `Opening Hail Mary ${step.beadIndex}/3`,
        body: lang(P.openingHailMary),
      };
    case 'decade-father':
      return {
        heading: lbl(P.eternalFather),
        sub: `Decade ${step.decade} of 5 — large bead`,
        body: lang(P.eternalFather),
      };
    case 'decade-passion':
      return {
        heading: lbl(P.forHisSorrowfulPassion),
        sub: `Decade ${step.decade} · Bead ${step.beadIndex}/10`,
        body: lang(P.forHisSorrowfulPassion),
      };
    case 'holy-god':
      return {
        heading: lbl(P.holyGod),
        sub: `${step.holyGodIndex}/3`,
        body: lang(P.holyGod),
      };
    case 'closing':
      return { heading: lbl(P.closing), sub: '', body: lang(P.closing) };
  }
}

// ─── Bead tracker (5 rows of 10, same layout as Rosary) ──────────────────────
const BeadTracker: FC<{ step: ChapletStep }> = ({ step }) => {
  const currentDecade = step.decade ?? 0;
  const currentBead = step.kind === 'decade-passion' ? step.beadIndex ?? 0 : 0;
  return (
    <div className="bead-tracker">
      {[1, 2, 3, 4, 5].map((d) => (
        <div key={d} className="bead-row">
          <span className={`bead-decade-label${d === currentDecade ? ' active-decade' : ''}`}>{d}</span>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((b) => {
            const isPast = d < currentDecade || (d === currentDecade && b < currentBead);
            const isCurrent = d === currentDecade && b === currentBead;
            return (
              <span
                key={b}
                className={`bead${isPast ? ' past' : ''}${isCurrent ? ' current' : ''}`}
                title={`Decade ${d}, Bead ${b}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Chaplet: FC<ChapletProps> = ({ showLatin, onToggleLatin }) => {
  const [chapletType, setChapletType] = useState<'divine-mercy' | 'seven-sorrows' | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => setStepIndex((i) => Math.min(i + 1, TOTAL - 1)), []);
  const goPrev = useCallback(() => setStepIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [stepIndex]);

  useEffect(() => {
    if (!chapletType || chapletType === 'seven-sorrows') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [chapletType, goNext, goPrev]);

  if (chapletType === 'seven-sorrows') {
    return (
      <SevenSorrows
        showLatin={showLatin}
        onToggleLatin={onToggleLatin}
        onBack={() => setChapletType(null)}
      />
    );
  }

  if (!chapletType) {
    return (
      <div className="rosary-selector" style={{ textAlign: 'center' }}>
        <p className="rosary-intro">
          Chaplets
          <br />
          <span className="rosary-intro-sub">Choose a chaplet to pray. Use ← → arrows or buttons to advance.</span>
        </p>
        <div className="mystery-set-grid">
          <button className="mystery-set-btn" onClick={() => { setStepIndex(0); setChapletType('divine-mercy'); }}>
            <span className="mystery-set-name">Divine Mercy</span>
            <span className="mystery-set-days">Chaplet of St. Faustina</span>
          </button>
          <button className="mystery-set-btn" onClick={() => setChapletType('seven-sorrows')}>
            <span className="mystery-set-name">Seven Sorrows</span>
            <span className="mystery-set-days">Chaplet of Our Lady</span>
          </button>
        </div>
      </div>
    );
  }

  const step = STEPS[stepIndex];
  const { heading, sub, body } = getInfo(step, showLatin);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === TOTAL - 1;
  const progress = Math.round(((stepIndex + 1) / TOTAL) * 100);
  const showBeads = step.kind === 'decade-father' || step.kind === 'decade-passion';

  return (
    <div className="rosary-guide">
      <div className="rosary-header">
        <span className="rosary-set-tag">
          {showLatin ? 'Coronilla Misericordiae Divinae' : 'Divine Mercy Chaplet'}
        </span>
        <button className="rosary-reset-btn" onClick={() => { setChapletType(null); setStepIndex(0); }}>
          ↩ Back
        </button>
      </div>

      <div className="rosary-progress-bar">
        <div className="rosary-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="rosary-step-count">{stepIndex + 1} / {TOTAL}</p>

      {showBeads && <BeadTracker step={step} />}

      <div ref={bodyRef} className="verse rosary-body">
        <h2>{heading}</h2>
        {sub && <p className="rosary-subheading">{sub}</p>}
        <p>{body}</p>
      </div>

      <div className="buttons">
        <button onClick={goPrev} disabled={isFirst}>← Previous</button>
        {isLast ? (
          <button onClick={() => { setChapletType(null); setStepIndex(0); }}>Finish ✓</button>
        ) : (
          <button onClick={goNext}>Next →</button>
        )}
        <button onClick={onToggleLatin}>{showLatin ? 'Show English' : 'Show Latin'}</button>
      </div>
    </div>
  );
};

export default Chaplet;
