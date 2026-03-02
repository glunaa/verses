// Calculates the current liturgical season from the calendar date alone.
// No external API — works fully offline as a static computation.

export interface LiturgicalInfo {
  season: string;
  color: string;   // CSS color for the banner accent
  latinSeason: string;
}

/** Easter Sunday date for a given year (Anonymous Gregorian algorithm). */
function easterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 1-indexed
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
}

export function getLiturgicalInfo(date: Date = new Date()): LiturgicalInfo {
  const year = date.getFullYear();
  const easter = easterDate(year);

  // Key dates
  const ashWednesday   = addDays(easter, -46);
  const palmSunday     = addDays(easter, -7);
  const holyThursday   = addDays(easter, -3);
  const goodFriday     = addDays(easter, -2);
  const holySaturday   = addDays(easter, -1);
  const ascension      = addDays(easter, 39);
  const pentecost      = addDays(easter, 49);
  const christmasDay   = new Date(year, 11, 25); // Dec 25
  const epiphany       = new Date(year, 0, 6);   // Jan 6

  // Advent: 4 Sundays before Christmas
  // Find the Sunday on or before Nov 30 (St. Andrew's day) closest to Dec 25
  const nov30 = new Date(year, 10, 30);
  const adventStart = addDays(nov30, -(nov30.getDay())); // preceding Sunday

  const doy = dayOfYear(date);

  const between = (a: Date, b: Date) =>
    doy >= dayOfYear(a) && doy <= dayOfYear(b);

  if (between(christmasDay, addDays(christmasDay, 1)) || date.getMonth() === 0 && date.getDate() <= 5) {
    return { season: 'Christmas', latinSeason: 'Tempus Nativitatis', color: '#c9a84c' };
  }
  if (date.getMonth() === 0 && date.getDate() === 6) {
    return { season: 'Epiphany', latinSeason: 'Epiphania Domini', color: '#c9a84c' };
  }
  if (between(ashWednesday, addDays(palmSunday, -1))) {
    return { season: 'Lent', latinSeason: 'Tempus Quadragesimae', color: '#7b4ea0' };
  }
  if (between(palmSunday, addDays(easter, -1))) {
    return { season: 'Holy Week', latinSeason: 'Hebdomada Sancta', color: '#7b4ea0' };
  }
  if (dayOfYear(date) === dayOfYear(goodFriday)) {
    return { season: 'Good Friday', latinSeason: 'Feria VI in Passione Domini', color: '#222' };
  }
  if (dayOfYear(date) === dayOfYear(holySaturday)) {
    return { season: 'Holy Saturday', latinSeason: 'Sabbatum Sanctum', color: '#555' };
  }
  if (between(easter, addDays(pentecost, -1))) {
    if (dayOfYear(date) === dayOfYear(ascension)) {
      return { season: 'Ascension', latinSeason: 'Ascensio Domini', color: '#c9a84c' };
    }
    return { season: 'Easter', latinSeason: 'Tempus Paschale', color: '#c9a84c' };
  }
  if (dayOfYear(date) === dayOfYear(pentecost)) {
    return { season: 'Pentecost', latinSeason: 'Dominica Pentecostes', color: '#c0392b' };
  }
  if (between(adventStart, addDays(christmasDay, -1))) {
    return { season: 'Advent', latinSeason: 'Tempus Adventus', color: '#7b4ea0' };
  }
  if (between(christmasDay, new Date(year, 11, 31))) {
    return { season: 'Christmas', latinSeason: 'Tempus Nativitatis', color: '#c9a84c' };
  }

  return { season: 'Ordinary Time', latinSeason: 'Tempus per Annum', color: '#2e7d32' };
}
