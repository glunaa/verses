import { FC, useState, useEffect, useCallback, useRef } from 'react';

interface Props {
  showLatin: boolean;
  onToggleLatin: () => void;
  onBack: () => void;
}

// The Chaplet of St. Michael (approved by Pope Pius IX, 1851): nine
// salutations, one for each choir of angels, each followed by one Our Father
// and three Hail Marys; then four Our Fathers in honor of Sts. Michael,
// Gabriel, and Raphael and our Guardian Angel; ending with the antiphon and
// concluding prayer. The salutations have no verified Latin here, so Latin
// mode falls back to English for them.
const CHOIRS = [
  {
    name: 'Seraphim',
    en: 'By the intercession of St. Michael and the celestial Choir of Seraphim, may the Lord make us worthy to burn with the fire of perfect charity. Amen.',
  },
  {
    name: 'Cherubim',
    en: 'By the intercession of St. Michael and the celestial Choir of Cherubim, may the Lord grant us the grace to leave the ways of sin and run in the paths of Christian perfection. Amen.',
  },
  {
    name: 'Thrones',
    en: 'By the intercession of St. Michael and the celestial Choir of Thrones, may the Lord infuse into our hearts a true and sincere spirit of humility. Amen.',
  },
  {
    name: 'Dominions',
    en: 'By the intercession of St. Michael and the celestial Choir of Dominions, may the Lord give us grace to govern our senses and overcome any unruly passions. Amen.',
  },
  {
    name: 'Virtues',
    en: 'By the intercession of St. Michael and the celestial Choir of Virtues, may the Lord preserve us from evil and falling into temptation. Amen.',
  },
  {
    name: 'Powers',
    en: 'By the intercession of St. Michael and the celestial Choir of Powers, may the Lord protect our souls against the snares and temptations of the devil. Amen.',
  },
  {
    name: 'Principalities',
    en: 'By the intercession of St. Michael and the celestial Choir of Principalities, may God fill our souls with a true spirit of obedience. Amen.',
  },
  {
    name: 'Archangels',
    en: 'By the intercession of St. Michael and the celestial Choir of Archangels, may the Lord give us perseverance in faith and in all good works in order that we may attain the glory of Heaven. Amen.',
  },
  {
    name: 'Angels',
    en: 'By the intercession of St. Michael and the celestial Choir of Angels, may the Lord grant us to be protected by them in this mortal life and conducted in the life to come to Heaven. Amen.',
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

const HAIL_MARY = {
  en: 'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
  la: 'Ave Maria, gratia plena, Dominus tecum; benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen.',
};

const FINAL_FATHERS = ['St. Michael', 'St. Gabriel', 'St. Raphael', 'our Guardian Angel'];

const ANTIPHON = {
  en: 'O glorious prince St. Michael, chief and commander of the heavenly hosts, guardian of souls, vanquisher of rebel spirits, servant in the house of the Divine King and our admirable conductor, you who shine with excellence and superhuman virtue: deliver us from all evil, who turn to you with confidence, and enable us by your gracious protection to serve God more and more faithfully every day.\n\nV. Pray for us, O glorious St. Michael, Prince of the Church of Jesus Christ.\nR. That we may be made worthy of his promises.',
};

const CLOSING = {
  en: 'Almighty and Everlasting God, Who, by a prodigy of goodness and a merciful desire for the salvation of all men, has appointed the most glorious Archangel St. Michael Prince of Your Church: make us worthy, we beseech You, to be delivered from all our enemies, that none of them may harass us at the hour of death, but that we may be conducted by him into Your Presence. This we ask through the merits of Jesus Christ Our Lord. Amen.',
};

type StepKind = 'opening' | 'salutation' | 'our-father' | 'hail-mary' | 'final-father' | 'antiphon' | 'closing';

interface Step {
  kind: StepKind;
  choir?: number;       // 1-9
  beadIndex?: number;   // 1-3
  fatherIndex?: number; // 1-4
}

function buildSteps(): Step[] {
  const steps: Step[] = [];
  steps.push({ kind: 'opening' });
  for (let c = 1; c <= 9; c++) {
    steps.push({ kind: 'salutation', choir: c });
    steps.push({ kind: 'our-father', choir: c });
    for (let b = 1; b <= 3; b++) {
      steps.push({ kind: 'hail-mary', choir: c, beadIndex: b });
    }
  }
  for (let f = 1; f <= 4; f++) {
    steps.push({ kind: 'final-father', fatherIndex: f });
  }
  steps.push({ kind: 'antiphon' });
  steps.push({ kind: 'closing' });
  return steps;
}

const STEPS = buildSteps();
const TOTAL = STEPS.length;

function getInfo(step: Step, showLatin: boolean) {
  const t = showLatin ? 'la' : 'en';
  const choir = step.choir ? CHOIRS[step.choir - 1] : null;

  switch (step.kind) {
    case 'opening':
      return { heading: showLatin ? 'Oratio Initialis' : 'Opening', sub: '', body: OPENING[t] };
    case 'salutation':
      return {
        heading: `The ${choir!.name}`,
        sub: `Salutation ${step.choir} of 9`,
        body: choir!.en,
      };
    case 'our-father':
      return {
        heading: showLatin ? 'Pater Noster' : 'Our Father',
        sub: `Choir of ${choir!.name}`,
        body: OUR_FATHER[t],
      };
    case 'hail-mary':
      return {
        heading: showLatin ? 'Ave Maria' : 'Hail Mary',
        sub: `Choir of ${choir!.name} · Bead ${step.beadIndex}/3`,
        body: HAIL_MARY[t],
      };
    case 'final-father':
      return {
        heading: showLatin ? 'Pater Noster' : 'Our Father',
        sub: `In honor of ${FINAL_FATHERS[step.fatherIndex! - 1]} — ${step.fatherIndex}/4`,
        body: OUR_FATHER[t],
      };
    case 'antiphon':
      return { heading: 'Antiphon', sub: '', body: ANTIPHON.en };
    case 'closing':
      return { heading: showLatin ? 'Oratio Finalis' : 'Closing Prayer', sub: '', body: CLOSING.en };
  }
}

const BeadTracker: FC<{ step: Step }> = ({ step }) => {
  const activeChoir = step.choir ?? 0;
  const activeBead = step.kind === 'hail-mary' ? step.beadIndex ?? 0 : 0;
  return (
    <div className="bead-tracker">
      {CHOIRS.map((_, i) => {
        const c = i + 1;
        return (
          <div key={c} className="bead-row">
            <span className={`bead-decade-label${c === activeChoir ? ' active-decade' : ''}`}>{c}</span>
            {[1, 2, 3].map((b) => {
              const isPast = c < activeChoir || (c === activeChoir && b < activeBead);
              const isCurrent = c === activeChoir && b === activeBead;
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

const StMichaelChaplet: FC<Props> = ({ showLatin, onToggleLatin, onBack }) => {
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
  const showBeads = step.kind === 'salutation' || step.kind === 'our-father' || step.kind === 'hail-mary';

  return (
    <div className="rosary-guide">
      <div className="rosary-header">
        <span className="rosary-set-tag">
          {showLatin ? 'Corona Angelica' : 'Chaplet of St. Michael'}
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

export default StMichaelChaplet;
