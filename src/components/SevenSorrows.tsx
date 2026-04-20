import { FC, useState, useEffect, useCallback, useRef } from 'react';

interface Props {
  showLatin: boolean;
  onToggleLatin: () => void;
  onBack: () => void;
}

const SORROWS = [
  {
    titleEn: 'The Prophecy of Simeon',
    titleLa: 'Prophetia Simeonis',
    en: 'The First Sorrow: The Prophecy of Simeon\n\n"Behold, this child is set for the fall and rising of many in Israel, and for a sign that is spoken against — and a sword will pierce through your own soul also." (Luke 2:34-35)\n\nMary, we meditate on the grief your heart bore from the very beginning, when holy Simeon foretold the Passion of your Son and the sword of sorrow that would be yours.',
    la: 'Primum Dolor: Prophetia Simeonis\n\n"Ecce positus est hic in ruinam et resurrectionem multorum in Israel, et in signum cui contradicetur — et tuam ipsius animam pertransiet gladius." (Luc 2:34-35)',
  },
  {
    titleEn: 'The Flight into Egypt',
    titleLa: 'Fuga in Aegyptum',
    en: 'The Second Sorrow: The Flight into Egypt\n\n"Rise, take the child and his mother, and flee to Egypt, for Herod is about to search for the child, to destroy him." (Matthew 2:13)\n\nMary, we contemplate your exile and poverty, your flight in the night to a foreign land, bearing the Holy Child while danger pressed on every side.',
    la: 'Secundum Dolor: Fuga in Aegyptum\n\n"Surge, et accipe puerum et matrem eius, et fuge in Aegyptum: erit enim ut Herodes quaerat puerum ad perdendum eum." (Mt 2:13)',
  },
  {
    titleEn: 'The Loss of Jesus in the Temple',
    titleLa: 'Amissio Iesu in Templo',
    en: 'The Third Sorrow: The Loss of the Child Jesus in the Temple\n\n"After three days they found him in the temple, sitting among the teachers, listening to them and asking them questions." (Luke 2:46)\n\nMary, we meditate on the anguish of three days searching for your lost Son, and the joy mingled with sorrow when you found him among the doctors of the law.',
    la: 'Tertium Dolor: Amissio Iesu in Templo\n\n"Et factum est, post triduum invenerunt illum in templo sedentem in medio doctorum, audientem illos et interrogantem eos." (Luc 2:46)',
  },
  {
    titleEn: 'Mary Meets Jesus on the Way of the Cross',
    titleLa: 'Maria Iesum in Via Crucis Obviat',
    en: 'The Fourth Sorrow: Mary Meets Jesus on the Way to Calvary\n\nAs Jesus carried his cross through the streets of Jerusalem, he met his sorrowful Mother. Their eyes met in silence. Mary beheld her Son bruised, crowned with thorns, and crushed beneath the weight of the Cross and the sins of the world.',
    la: 'Quartum Dolor: Maria Iesum in Via Crucis Obviat\n\nMaria, per vias Hierosolymae progrediens, Filium suum crucem baiulantem obviam habuit. Oculi eorum in silentio convenerunt, et cor Mariae gladio doloris denuo transfixit.',
  },
  {
    titleEn: 'The Crucifixion and Death of Jesus',
    titleLa: 'Crucifixio et Mors Iesu',
    en: 'The Fifth Sorrow: The Crucifixion and Death of Jesus\n\n"Standing by the cross of Jesus were his mother, and his mother\'s sister, Mary the wife of Clopas, and Mary Magdalene." (John 19:25)\n\nMary, we contemplate your steadfast love as you stood at the foot of the cross, witnessing the suffering and death of your divine Son, offering him back to the Father for the salvation of all.',
    la: 'Quintum Dolor: Crucifixio et Mors Iesu\n\n"Stabant autem iuxta crucem Iesu mater eius, et soror matris eius, Maria Cleophas, et Maria Magdalene." (Io 19:25)',
  },
  {
    titleEn: 'Jesus Taken Down from the Cross',
    titleLa: 'Depositio Iesu de Cruce',
    en: 'The Sixth Sorrow: Jesus Taken Down from the Cross\n\nWhen the soldiers came and saw that Jesus was already dead, they did not break his legs. But one of the soldiers pierced his side with a spear. Joseph of Arimathea asked Pilate for the body of Jesus. Mary received the lifeless body of her Son into her arms.\n\nMary, we honor your grief as you held Jesus, contemplating each wound, loving him even in death.',
    la: 'Sextum Dolor: Depositio Iesu de Cruce\n\nIoseph ab Arimathaea petiit a Pilato corpus Iesu. Maria corpus Filii sui in ulnas suas recepit, vulnera eius contemplans, eum etiam in morte diligens.',
  },
  {
    titleEn: 'The Burial of Jesus',
    titleLa: 'Sepultura Iesu',
    en: 'The Seventh Sorrow: The Burial of Jesus\n\n"They took the body of Jesus and bound it in linen cloths with the spices, as is the burial custom of the Jews. Now in the place where he was crucified there was a garden, and in the garden a new tomb." (John 19:40-41)\n\nMary, we contemplate your final sorrow as you watched the stone sealed over your Son, walking away from the tomb in darkness, sustained only by faith.',
    la: 'Septimum Dolor: Sepultura Iesu\n\n"Acceperunt ergo corpus Iesu, et ligaverunt illud linteis cum aromatibus, sicut mos est Iudaeis sepelire. Erat autem in loco, ubi crucifixus est, hortus: et in horto monumentum novum." (Io 19:40-41)',
  },
];

const OPENING = {
  en: 'O Most Holy Virgin, Mother of our Lord Jesus Christ: by the overwhelming grief you experienced when you witnessed the Passion and Death of your divine Son, and by the anguish which pierced your soul at His Death, despise not my petitions; but in your clemency, hear and answer me. Amen.',
  la: 'O Virgo Sanctissima, Mater Domini nostri Iesu Christi: per immensum dolorem quo Passionem ac Mortem Filii tui divini vidisti, et per angustiam quae animam tuam in eius Morte transfixit, preces meas ne spernas; sed in clementia tua, exaudi me. Amen.',
};

const OUR_FATHER = {
  en: 'Our Father, Who art in heaven, hallowed be Thy Name. Thy Kingdom come. Thy Will be done, on earth as it is in Heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.',
  la: 'Pater Noster, qui es in caelis, sanctificetur Nomen Tuum. Adveniat Regnum Tuum. Fiat voluntas Tua, sicut in caelo, et in terra. Panem nostrum quotidianum da nobis hodie. Et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.',
};

const HAIL_MARY = {
  en: 'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
  la: 'Ave Maria, gratia plena, Dominus tecum; benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen.',
};

const CLOSING = {
  en: 'Most Holy Virgin and Queen of Martyrs, accept the humble homage of our compassion for your sorrows. May the memory of your Seven Sorrows keep us ever mindful of our sins, which were their cause, and of the infinite mercy of God who so loved us. Obtain for us true contrition, amendment of life, and final perseverance. Amen.\n\n(Three Hail Marys in honor of Our Lady\'s tears)',
  la: 'Virgo Sanctissima et Regina Martyrum, suscipe humilem compassionis nostrae tributum pro doloribus tuis. Memoria Septem Dolorum tuorum nos semper memores faciat peccatorum nostrorum et infinitae misericordiae Dei. Obtine nobis veram contritionem, emendationem vitae, et finalem perseverantiam. Amen.\n\n(Tres Ave Maria in honorem lacrimarum Beatae Mariae Virginis)',
};

type StepKind = 'opening' | 'sorrow' | 'our-father' | 'hail-mary' | 'closing-ave' | 'closing';

interface Step {
  kind: StepKind;
  sorrow?: number;   // 1-7
  beadIndex?: number;
  closeAveIndex?: number; // 1-3
}

function buildSteps(): Step[] {
  const steps: Step[] = [];
  steps.push({ kind: 'opening' });
  for (let s = 1; s <= 7; s++) {
    steps.push({ kind: 'sorrow', sorrow: s });
    steps.push({ kind: 'our-father', sorrow: s });
    for (let b = 1; b <= 7; b++) {
      steps.push({ kind: 'hail-mary', sorrow: s, beadIndex: b });
    }
  }
  steps.push({ kind: 'closing-ave', closeAveIndex: 1 });
  steps.push({ kind: 'closing-ave', closeAveIndex: 2 });
  steps.push({ kind: 'closing-ave', closeAveIndex: 3 });
  steps.push({ kind: 'closing' });
  return steps;
}

const STEPS = buildSteps();
const TOTAL = STEPS.length;

function getInfo(step: Step, showLatin: boolean) {
  const t = showLatin ? 'la' : 'en';
  const sorrow = step.sorrow ? SORROWS[step.sorrow - 1] : null;

  switch (step.kind) {
    case 'opening':
      return { heading: showLatin ? 'Oratio Initialis' : 'Opening Prayer', sub: '', body: OPENING[t] };
    case 'sorrow':
      return {
        heading: showLatin ? sorrow!.titleLa : sorrow!.titleEn,
        sub: `Sorrow ${step.sorrow} of 7`,
        body: sorrow![t],
      };
    case 'our-father':
      return {
        heading: showLatin ? 'Pater Noster' : 'Our Father',
        sub: `Sorrow ${step.sorrow} of 7`,
        body: OUR_FATHER[t],
      };
    case 'hail-mary':
      return {
        heading: showLatin ? 'Ave Maria' : 'Hail Mary',
        sub: `Sorrow ${step.sorrow} · Bead ${step.beadIndex}/7`,
        body: HAIL_MARY[t],
      };
    case 'closing-ave':
      return {
        heading: showLatin ? 'Ave Maria' : 'Hail Mary',
        sub: `Closing — ${step.closeAveIndex}/3`,
        body: HAIL_MARY[t],
      };
    case 'closing':
      return { heading: showLatin ? 'Oratio Finalis' : 'Closing Prayer', sub: '', body: CLOSING[t] };
  }
}

const BeadTracker: FC<{ step: Step }> = ({ step }) => {
  const activeSorrow = step.sorrow ?? 0;
  const activeBead = step.kind === 'hail-mary' ? step.beadIndex ?? 0 : 0;
  return (
    <div className="bead-tracker">
      {[1, 2, 3, 4, 5, 6, 7].map((s) => (
        <div key={s} className="bead-row">
          <span className={`bead-decade-label${s === activeSorrow ? ' active-decade' : ''}`}>{s}</span>
          {[1, 2, 3, 4, 5, 6, 7].map((b) => {
            const isPast = s < activeSorrow || (s === activeSorrow && b < activeBead);
            const isCurrent = s === activeSorrow && b === activeBead;
            return (
              <span
                key={b}
                className={`bead${isPast ? ' past' : ''}${isCurrent ? ' current' : ''}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const SevenSorrows: FC<Props> = ({ showLatin, onToggleLatin, onBack }) => {
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
  const showBeads = step.kind === 'hail-mary' || step.kind === 'our-father' || step.kind === 'sorrow';

  return (
    <div className="rosary-guide">
      <div className="rosary-header">
        <span className="rosary-set-tag">
          {showLatin ? 'Septem Dolorum BMV' : 'Seven Sorrows of Mary'}
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

export default SevenSorrows;
