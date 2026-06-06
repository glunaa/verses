// "On this day" feast lookup — fixed-date solemnities/feasts plus a handful of
// movable feasts computed from Easter (no external API; works fully offline).

import { easterDate, addDays } from '../utils/liturgicalSeason';

export interface Feast {
  en: string;
  la: string;
}

function key(month: number, day: number): string {
  return `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const FIXED_FEASTS: Record<string, Feast> = {
  '01-01': { en: 'Mary, Mother of God', la: 'Sollemnitas Sanctae Dei Genetricis Mariae' },
  '01-06': { en: 'The Epiphany of the Lord', la: 'In Epiphania Domini' },
  '01-24': { en: 'St. Francis de Sales', la: 'Sancti Francisci de Sales' },
  '01-28': { en: 'St. Thomas Aquinas', la: 'Sancti Thomae de Aquino' },
  '02-02': { en: 'The Presentation of the Lord', la: 'In Praesentatione Domini' },
  '02-11': { en: 'Our Lady of Lourdes', la: 'Beatae Mariae Virginis a Lourdes' },
  '02-22': { en: 'The Chair of St. Peter the Apostle', la: 'Cathedra Sancti Petri Apostoli' },
  '03-19': { en: 'St. Joseph, Spouse of the Blessed Virgin Mary', la: 'Sancti Ioseph, Sponsi B.M.V.' },
  '03-25': { en: 'The Annunciation of the Lord', la: 'In Annuntiatione Domini' },
  '04-11': { en: 'St. Gemma Galgani', la: 'Sanctae Gemmae Galgani' },
  '04-21': { en: 'St. Anselm of Canterbury', la: 'Sancti Anselmi' },
  '04-23': { en: 'St. George', la: 'Sancti Georgii' },
  '04-25': { en: 'St. Mark the Evangelist', la: 'Sancti Marci Evangelistae' },
  '04-29': { en: 'St. Catherine of Siena', la: 'Sanctae Catharinae Senensis' },
  '04-30': { en: 'St. Pius V', la: 'Sancti Pii Quinti' },
  '05-01': { en: 'St. Joseph the Worker', la: 'Sancti Ioseph Opificis' },
  '05-13': { en: 'Our Lady of Fatima', la: 'Beatae Mariae Virginis a Fatima' },
  '05-31': { en: 'The Visitation of the Blessed Virgin Mary', la: 'Visitatio Beatae Mariae Virginis' },
  '06-13': { en: 'St. Anthony of Padua', la: 'Sancti Antonii de Padua' },
  '06-22': { en: 'St. Thomas More', la: 'Sancti Thomae Mori' },
  '06-24': { en: 'The Nativity of St. John the Baptist', la: 'In Nativitate Sancti Ioannis Baptistae' },
  '06-29': { en: 'Sts. Peter and Paul, Apostles', la: 'Sanctorum Petri et Pauli Apostolorum' },
  '07-03': { en: 'St. Thomas the Apostle', la: 'Sancti Thomae Apostoli' },
  '07-16': { en: 'Our Lady of Mount Carmel', la: 'Beatae Mariae Virginis de Monte Carmelo' },
  '07-22': { en: 'St. Mary Magdalene', la: 'Sanctae Mariae Magdalenae' },
  '07-23': { en: 'St. Bridget of Sweden', la: 'Sanctae Birgittae' },
  '07-25': { en: 'St. James the Apostle', la: 'Sancti Iacobi Apostoli' },
  '07-26': { en: 'Sts. Joachim and Anne', la: 'Sanctorum Ioachim et Annae' },
  '07-29': { en: 'Sts. Martha, Mary, and Lazarus', la: 'Sanctarum Marthae, Mariae et Lazari' },
  '08-04': { en: 'St. John Vianney', la: 'Sancti Ioannis Mariae Vianney' },
  '08-06': { en: 'The Transfiguration of the Lord', la: 'In Transfiguratione Domini' },
  '08-08': { en: 'St. Dominic', la: 'Sancti Dominici' },
  '08-11': { en: 'St. Clare of Assisi', la: 'Sanctae Clarae' },
  '08-14': { en: 'St. Maximilian Kolbe', la: 'Sancti Maximiliani Mariae Kolbe' },
  '08-15': { en: 'The Assumption of the Blessed Virgin Mary', la: 'In Assumptione Beatae Mariae Virginis' },
  '08-20': { en: 'St. Bernard of Clairvaux', la: 'Sancti Bernardi' },
  '08-22': { en: 'The Queenship of the Blessed Virgin Mary', la: 'Beatae Mariae Virginis Reginae' },
  '08-27': { en: 'St. Monica', la: 'Sanctae Monicae' },
  '08-28': { en: 'St. Augustine of Hippo', la: 'Sancti Augustini' },
  '09-08': { en: 'The Nativity of the Blessed Virgin Mary', la: 'In Nativitate Beatae Mariae Virginis' },
  '09-14': { en: 'The Exaltation of the Holy Cross', la: 'In Exaltatione Sanctae Crucis' },
  '09-15': { en: 'Our Lady of Sorrows', la: 'Beatae Mariae Virginis Perdolentis' },
  '09-17': { en: 'The Impression of the Stigmata of St. Francis', la: 'Impressio Sacrorum Stigmatum S. Francisci' },
  '09-21': { en: 'St. Matthew, Apostle and Evangelist', la: 'Sancti Matthaei Apostoli et Evangelistae' },
  '09-23': { en: 'St. Padre Pio of Pietrelcina', la: 'Sancti Pii a Pietrelcina' },
  '09-27': { en: 'St. Vincent de Paul', la: 'Sancti Vincentii a Paulo' },
  '09-29': { en: 'Sts. Michael, Gabriel, and Raphael, Archangels', la: 'Sanctorum Michaelis, Gabrielis et Raphaelis Archangelorum' },
  '09-30': { en: 'St. Jerome', la: 'Sancti Hieronymi' },
  '10-01': { en: 'St. Thérèse of the Child Jesus', la: 'Sanctae Teresiae a Iesu Infante' },
  '10-02': { en: 'The Holy Guardian Angels', la: 'Sanctorum Angelorum Custodum' },
  '10-04': { en: 'St. Francis of Assisi', la: 'Sancti Francisci Assisiensis' },
  '10-05': { en: 'St. Faustina Kowalska', la: 'Sanctae Faustinae Kowalska' },
  '10-07': { en: 'Our Lady of the Rosary', la: 'Beatae Mariae Virginis a Rosario' },
  '10-15': { en: 'St. Teresa of Ávila', la: 'Sanctae Teresiae a Iesu (Avilensis)' },
  '10-22': { en: 'St. John Paul II', la: 'Sancti Ioannis Pauli Secundi' },
  '11-01': { en: 'All Saints', la: 'Omnium Sanctorum' },
  '11-02': { en: 'The Commemoration of All the Faithful Departed', la: 'Commemoratio Omnium Fidelium Defunctorum' },
  '11-09': { en: 'The Dedication of the Lateran Basilica', la: 'In Dedicatione Basilicae Lateranensis' },
  '11-21': { en: 'The Presentation of the Blessed Virgin Mary', la: 'In Praesentatione Beatae Mariae Virginis' },
  '11-22': { en: 'St. Cecilia', la: 'Sanctae Caeciliae' },
  '11-30': { en: 'St. Andrew the Apostle', la: 'Sancti Andreae Apostoli' },
  '12-08': { en: 'The Immaculate Conception of the Blessed Virgin Mary', la: 'In Conceptione Immaculata Beatae Mariae Virginis' },
  '12-12': { en: 'Our Lady of Guadalupe', la: 'Beatae Mariae Virginis de Guadalupe' },
  '12-13': { en: 'St. Lucy', la: 'Sanctae Luciae' },
  '12-14': { en: 'St. John of the Cross', la: 'Sancti Ioannis a Cruce' },
  '12-25': { en: 'The Nativity of the Lord', la: 'In Nativitate Domini' },
  '12-26': { en: 'St. Stephen, the First Martyr', la: 'Sancti Stephani Protomartyris' },
  '12-28': { en: 'The Holy Innocents, Martyrs', la: 'Sanctorum Innocentium Martyrum' },
};

/** Feasts whose date is reckoned from Easter Sunday rather than fixed. */
function movableFeasts(year: number): Array<{ date: Date; feast: Feast }> {
  const easter = easterDate(year);
  return [
    { date: addDays(easter, 7), feast: { en: 'Divine Mercy Sunday', la: 'Dominica Misericordiae Divinae' } },
    { date: addDays(easter, 56), feast: { en: 'The Most Holy Trinity', la: 'Sanctissimae Trinitatis' } },
    { date: addDays(easter, 60), feast: { en: 'The Most Holy Body and Blood of Christ', la: 'Sanctissimi Corporis et Sanguinis Christi' } },
    { date: addDays(easter, 68), feast: { en: 'The Most Sacred Heart of Jesus', la: 'Sacratissimi Cordis Iesu' } },
    { date: addDays(easter, 69), feast: { en: 'The Immaculate Heart of Mary', la: 'Immaculati Cordis Beatae Mariae Virginis' } },
  ];
}

/** Returns the feast (if any) observed on the given date, fixed or movable. */
export function getFeastOfDay(date: Date = new Date()): Feast | null {
  for (const { date: feastDate, feast } of movableFeasts(date.getFullYear())) {
    if (feastDate.getMonth() === date.getMonth() && feastDate.getDate() === date.getDate()) {
      return feast;
    }
  }
  return FIXED_FEASTS[key(date.getMonth() + 1, date.getDate())] ?? null;
}
