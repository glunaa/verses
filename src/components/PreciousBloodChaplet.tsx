import { FC, useState, useEffect, useCallback, useRef } from 'react';

interface Props {
  showLatin: boolean;
  onToggleLatin: () => void;
  onBack: () => void;
}

// The Chaplet of the Most Precious Blood (in the tradition of St. Gaspar del
// Bufalo): seven mysteries recalling the seven blood-sheddings of Our Lord,
// with thirty-three Our Fathers — one for each year of His earthly life —
// divided 5+5+5+5+5+5+3, each group closing with a Glory Be and the Te Deum
// verse. Scripture is quoted from the Douay-Rheims (English) and the Vulgate
// (Latin); the closing versicle and collect match the Litany of the Most
// Precious Blood elsewhere in the app.
const MYSTERIES = [
  {
    titleEn: 'The Circumcision',
    titleLa: 'Circumcisio Domini',
    paters: 5,
    en: 'The First Mystery: Jesus shed His Blood in the Circumcision.\n\n"And after eight days were accomplished, that the child should be circumcised, his name was called Jesus." (Luke 2:21)',
    la: 'Mysterium Primum: Circumcisio Domini.\n\n"Et postquam consummati sunt dies octo, ut circumcideretur puer, vocatum est nomen eius Iesus." (Luc 2:21)',
  },
  {
    titleEn: 'The Agony in the Garden',
    titleLa: 'Agonia in Horto',
    paters: 5,
    en: 'The Second Mystery: Jesus shed His Blood in the Agony in the Garden.\n\n"And his sweat became as drops of blood, trickling down upon the ground." (Luke 22:44)',
    la: 'Mysterium Secundum: Agonia in Horto.\n\n"Et factus est sudor eius sicut guttae sanguinis decurrentis in terram." (Luc 22:44)',
  },
  {
    titleEn: 'The Scourging',
    titleLa: 'Flagellatio',
    paters: 5,
    en: 'The Third Mystery: Jesus shed His Blood in the Scourging.\n\n"Then therefore Pilate took Jesus and scourged him." (John 19:1)',
    la: 'Mysterium Tertium: Flagellatio.\n\n"Tunc ergo apprehendit Pilatus Iesum, et flagellavit." (Io 19:1)',
  },
  {
    titleEn: 'The Crowning with Thorns',
    titleLa: 'Coronatio Spinis',
    paters: 5,
    en: 'The Fourth Mystery: Jesus shed His Blood in the Crowning with Thorns.\n\n"And platting a crown of thorns, they put it upon his head." (Matthew 27:29)',
    la: 'Mysterium Quartum: Coronatio Spinis.\n\n"Et plectentes coronam de spinis, posuerunt super caput eius." (Mt 27:29)',
  },
  {
    titleEn: 'The Carrying of the Cross',
    titleLa: 'Baiulatio Crucis',
    paters: 5,
    en: 'The Fifth Mystery: Jesus shed His Blood while carrying His Cross.\n\n"And bearing his own cross, he went forth to that place which is called Calvary." (John 19:17)',
    la: 'Mysterium Quintum: Baiulatio Crucis.\n\n"Et baiulans sibi crucem, exivit in eum, qui dicitur Calvariae, locum." (Io 19:17)',
  },
  {
    titleEn: 'The Crucifixion',
    titleLa: 'Crucifixio',
    paters: 5,
    en: 'The Sixth Mystery: Jesus shed His Blood in the Crucifixion.\n\n"And when they were come to the place which is called Calvary, they crucified him there." (Luke 23:33)',
    la: 'Mysterium Sextum: Crucifixio.\n\n"Et postquam venerunt in locum, qui vocatur Calvariae, ibi crucifixerunt eum." (Luc 23:33)',
  },
  {
    titleEn: 'The Piercing of His Sacred Side',
    titleLa: 'Apertio Lateris',
    paters: 3,
    en: 'The Seventh Mystery: Jesus shed His Blood and Water from His pierced side.\n\n"But one of the soldiers with a spear opened his side, and immediately there came out blood and water." (John 19:34)',
    la: 'Mysterium Septimum: Apertio Lateris.\n\n"Sed unus militum lancea latus eius aperuit, et continuo exivit sanguis et aqua." (Io 19:34)',
  },
];

const OPENING = {
  en: 'O God, come to my assistance.\nO Lord, make haste to help me.\n\nGlory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',
  la: 'Deus, in adiutorium meum intende.\nDomine, ad adiuvandum me festina.\n\nGloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen.',
};

const OUR_FATHER = {
  en: 'Our Father, Who art in heaven, hallowed be Thy Name. Thy Kingdom come. Thy Will be done, on earth as it is in Heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.',
  la: 'Pater Noster, qui es in caelis, sanctificetur Nomen Tuum. Adveniat Regnum Tuum. Fiat voluntas Tua, sicut in caelo, et in terra. Panem nostrum quotidianum da nobis hodie. Et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.',
};

const GLORIA = {
  en: 'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.\n\nV. We beseech Thee, therefore, help Thy servants,\nR. Whom Thou hast redeemed with Thy Precious Blood.',
  la: 'Gloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen.\n\nV. Te ergo quaesumus, tuis famulis subveni,\nR. Quos pretioso sanguine redemisti.',
};

const CLOSING = {
  en: 'V. Thou hast redeemed us, O Lord, in Thy Blood.\nR. And made us, for our God, a kingdom.\n\nLet us pray:\nAlmighty and eternal God, Thou hast appointed Thine only-begotten Son the Redeemer of the world and willed to be appeased by his blood. Grant, we beg of Thee, that we may worthily adore this price of our salvation and through its power be safeguarded from the evils of the present life so that we may rejoice in its fruits forever in heaven. Through the same Christ our Lord. Amen.',
  la: 'V. Redemisti nos, Domine, in sanguine tuo.\nR. Et fecisti nos Deo nostro regnum.\n\nOremus:\nOmnipotens sempiterne Deus, qui unigenitum Filium tuum mundi Redemptorem constituisti, ac eius sanguine placari voluisti: concede, quaesumus, salutis nostrae pretium ita venerari, atque a praesentis vitae malis eius virtute defendi in terris, ut fructu perpetuo laetemur in caelis. Per eundem Christum Dominum nostrum. Amen.',
};

type StepKind = 'opening' | 'mystery' | 'our-father' | 'gloria' | 'closing';

interface Step {
  kind: StepKind;
  mystery?: number;   // 1-7
  beadIndex?: number; // 1-5 (or 1-3 in the seventh mystery)
}

function buildSteps(): Step[] {
  const steps: Step[] = [];
  steps.push({ kind: 'opening' });
  MYSTERIES.forEach((m, i) => {
    steps.push({ kind: 'mystery', mystery: i + 1 });
    for (let b = 1; b <= m.paters; b++) {
      steps.push({ kind: 'our-father', mystery: i + 1, beadIndex: b });
    }
    steps.push({ kind: 'gloria', mystery: i + 1 });
  });
  steps.push({ kind: 'closing' });
  return steps;
}

const STEPS = buildSteps();
const TOTAL = STEPS.length;

function getInfo(step: Step, showLatin: boolean) {
  const t = showLatin ? 'la' : 'en';
  const mystery = step.mystery ? MYSTERIES[step.mystery - 1] : null;

  switch (step.kind) {
    case 'opening':
      return { heading: showLatin ? 'Oratio Initialis' : 'Opening', sub: '', body: OPENING[t] };
    case 'mystery':
      return {
        heading: showLatin ? mystery!.titleLa : mystery!.titleEn,
        sub: `Mystery ${step.mystery} of 7`,
        body: mystery![t],
      };
    case 'our-father':
      return {
        heading: showLatin ? 'Pater Noster' : 'Our Father',
        sub: `Mystery ${step.mystery} · Bead ${step.beadIndex}/${mystery!.paters}`,
        body: OUR_FATHER[t],
      };
    case 'gloria':
      return {
        heading: showLatin ? 'Gloria Patri' : 'Glory Be',
        sub: `Mystery ${step.mystery} of 7`,
        body: GLORIA[t],
      };
    case 'closing':
      return { heading: showLatin ? 'Oratio Finalis' : 'Closing Prayer', sub: '', body: CLOSING[t] };
  }
}

const BeadTracker: FC<{ step: Step }> = ({ step }) => {
  const activeMystery = step.mystery ?? 0;
  const activeBead = step.kind === 'our-father' ? step.beadIndex ?? 0 : 0;
  return (
    <div className="bead-tracker">
      {MYSTERIES.map((m, i) => {
        const g = i + 1;
        return (
          <div key={g} className="bead-row">
            <span className={`bead-decade-label${g === activeMystery ? ' active-decade' : ''}`}>{g}</span>
            {Array.from({ length: m.paters }, (_, bi) => {
              const b = bi + 1;
              const isPast = g < activeMystery || (g === activeMystery && b < activeBead);
              const isCurrent = g === activeMystery && b === activeBead;
              return (
                <span
                  key={b}
                  className={`bead${isPast ? ' past' : ''}${isCurrent ? ' current' : ''}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const PreciousBloodChaplet: FC<Props> = ({ showLatin, onToggleLatin, onBack }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => setStepIndex((i) => Math.min(i + 1, TOTAL - 1)), []);
  const goPrev = useCallback(() => setStepIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [stepIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const step = STEPS[stepIndex];
  const { heading, sub, body } = getInfo(step, showLatin);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === TOTAL - 1;
  const progress = Math.round(((stepIndex + 1) / TOTAL) * 100);
  const showBeads = step.kind === 'mystery' || step.kind === 'our-father' || step.kind === 'gloria';

  return (
    <div className="rosary-guide">
      <div className="rosary-header">
        <span className="rosary-set-tag">
          {showLatin ? 'Corona Pretiosissimi Sanguinis' : 'Precious Blood Chaplet'}
        </span>
        <button className="rosary-reset-btn" onClick={onBack}>↩ Back</button>
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
          <button onClick={onBack}>Finish ✓</button>
        ) : (
          <button onClick={goNext}>Next →</button>
        )}
        <button onClick={onToggleLatin}>{showLatin ? 'Show English' : 'Show Latin'}</button>
      </div>
    </div>
  );
};

export default PreciousBloodChaplet;
