// TODO: Replace mock data with API-Football call when API key is available
// Endpoint: https://v3.football.api-sports.io/fixtures?league=1&season=2026

export type Team = {
  id: string;
  name: string;
  short: string;
  flag: string; // emoji
  group?: string;
  appearances: number;
  bestFinish: string;
  totalGoals: number;
};

export type Match = {
  id: string;
  home: string; // team id
  away: string;
  homeScore: number;
  awayScore: number;
  status: "LIVE" | "HT" | "FT" | "UPCOMING";
  minute?: number;
  stadium: string;
  date: string;
  stage: string;
};

export type MatchEvent = {
  minute: number;
  type: "goal" | "yellow" | "red" | "sub";
  player: string;
  team: "home" | "away";
};

export type Player = {
  id: string;
  name: string;
  countryId: string;
  position: "GK" | "DF" | "MF" | "FW";
  number: number;
  club: string;
  goals: number;
  assists: number;
  apps: number;
  minutes: number;
  yellows: number;
  reds: number;
  ratings: { pace: number; shooting: number; passing: number; dribbling: number; defending: number; physical: number };
};

export const TEAMS: Team[] = [
  { id: "arg", name: "Argentina", short: "ARG", flag: "🇦🇷", group: "A", appearances: 18, bestFinish: "Winner (1978, 1986, 2022)", totalGoals: 152 },
  { id: "fra", name: "France", short: "FRA", flag: "🇫🇷", group: "A", appearances: 16, bestFinish: "Winner (1998, 2018)", totalGoals: 136 },
  { id: "bra", name: "Brazil", short: "BRA", flag: "🇧🇷", group: "B", appearances: 22, bestFinish: "Winner (5x)", totalGoals: 237 },
  { id: "ger", name: "Germany", short: "GER", flag: "🇩🇪", group: "B", appearances: 20, bestFinish: "Winner (4x)", totalGoals: 232 },
  { id: "esp", name: "Spain", short: "ESP", flag: "🇪🇸", group: "C", appearances: 16, bestFinish: "Winner (2010)", totalGoals: 108 },
  { id: "eng", name: "England", short: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "C", appearances: 16, bestFinish: "Winner (1966)", totalGoals: 91 },
  { id: "por", name: "Portugal", short: "POR", flag: "🇵🇹", group: "D", appearances: 8, bestFinish: "Third (1966)", totalGoals: 49 },
  { id: "ned", name: "Netherlands", short: "NED", flag: "🇳🇱", group: "D", appearances: 11, bestFinish: "Runner-up (3x)", totalGoals: 96 },
  { id: "ita", name: "Italy", short: "ITA", flag: "🇮🇹", group: "E", appearances: 18, bestFinish: "Winner (4x)", totalGoals: 128 },
  { id: "uru", name: "Uruguay", short: "URU", flag: "🇺🇾", group: "E", appearances: 14, bestFinish: "Winner (1930, 1950)", totalGoals: 89 },
  { id: "bel", name: "Belgium", short: "BEL", flag: "🇧🇪", group: "F", appearances: 14, bestFinish: "Third (2018)", totalGoals: 56 },
  { id: "cro", name: "Croatia", short: "CRO", flag: "🇭🇷", group: "F", appearances: 6, bestFinish: "Runner-up (2018)", totalGoals: 30 },
  { id: "mar", name: "Morocco", short: "MAR", flag: "🇲🇦", group: "G", appearances: 6, bestFinish: "Fourth (2022)", totalGoals: 18 },
  { id: "jpn", name: "Japan", short: "JPN", flag: "🇯🇵", group: "G", appearances: 7, bestFinish: "Round of 16", totalGoals: 25 },
  { id: "usa", name: "USA", short: "USA", flag: "🇺🇸", group: "H", appearances: 11, bestFinish: "Third (1930)", totalGoals: 41 },
  { id: "mex", name: "Mexico", short: "MEX", flag: "🇲🇽", group: "H", appearances: 17, bestFinish: "Quarterfinal (2x)", totalGoals: 60 },
  { id: "sen", name: "Senegal", short: "SEN", flag: "🇸🇳", appearances: 3, bestFinish: "Quarterfinal (2002)", totalGoals: 14 },
  { id: "kor", name: "South Korea", short: "KOR", flag: "🇰🇷", appearances: 11, bestFinish: "Fourth (2002)", totalGoals: 35 },
  { id: "aus", name: "Australia", short: "AUS", flag: "🇦🇺", appearances: 6, bestFinish: "Round of 16", totalGoals: 16 },
  { id: "den", name: "Denmark", short: "DEN", flag: "🇩🇰", appearances: 6, bestFinish: "Quarterfinal", totalGoals: 27 },
  { id: "sui", name: "Switzerland", short: "SUI", flag: "🇨🇭", appearances: 12, bestFinish: "Quarterfinal", totalGoals: 47 },
  { id: "pol", name: "Poland", short: "POR", flag: "🇵🇱", appearances: 9, bestFinish: "Third (1974, 1982)", totalGoals: 50 },
  { id: "ksa", name: "Saudi Arabia", short: "KSA", flag: "🇸🇦", appearances: 6, bestFinish: "Round of 16", totalGoals: 11 },
  { id: "qat", name: "Qatar", short: "QAT", flag: "🇶🇦", appearances: 1, bestFinish: "Group", totalGoals: 1 },
  { id: "ecu", name: "Ecuador", short: "ECU", flag: "🇪🇨", appearances: 4, bestFinish: "Round of 16", totalGoals: 12 },
  { id: "tun", name: "Tunisia", short: "TUN", flag: "🇹🇳", appearances: 6, bestFinish: "Group", totalGoals: 9 },
  { id: "crc", name: "Costa Rica", short: "CRC", flag: "🇨🇷", appearances: 6, bestFinish: "Quarterfinal (2014)", totalGoals: 17 },
  { id: "cmr", name: "Cameroon", short: "CMR", flag: "🇨🇲", appearances: 8, bestFinish: "Quarterfinal (1990)", totalGoals: 18 },
  { id: "srb", name: "Serbia", short: "SRB", flag: "🇷🇸", appearances: 13, bestFinish: "Fourth (1930, 1962)", totalGoals: 67 },
  { id: "gha", name: "Ghana", short: "GHA", flag: "🇬🇭", appearances: 4, bestFinish: "Quarterfinal (2010)", totalGoals: 13 },
  { id: "wal", name: "Wales", short: "WAL", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", appearances: 2, bestFinish: "Quarterfinal (1958)", totalGoals: 5 },
  { id: "irn", name: "Iran", short: "IRN", flag: "🇮🇷", appearances: 6, bestFinish: "Group", totalGoals: 10 },
];

export const teamById = (id: string) => TEAMS.find((t) => t.id === id)!;

export const MATCHES: Match[] = [
  { id: "m1", home: "arg", away: "bra", homeScore: 2, awayScore: 1, status: "LIVE", minute: 67, stadium: "MetLife Stadium, NJ", date: "Today", stage: "Group A" },
  { id: "m2", home: "fra", away: "ger", homeScore: 1, awayScore: 1, status: "LIVE", minute: 38, stadium: "Azteca, Mexico City", date: "Today", stage: "Group B" },
  { id: "m3", home: "esp", away: "eng", homeScore: 0, awayScore: 0, status: "HT", minute: 45, stadium: "SoFi, Los Angeles", date: "Today", stage: "Group C" },
  { id: "m4", home: "ned", away: "por", homeScore: 3, awayScore: 2, status: "FT", minute: 90, stadium: "BMO Field, Toronto", date: "Today", stage: "Group D" },
  { id: "m5", home: "ita", away: "uru", homeScore: 0, awayScore: 0, status: "UPCOMING", stadium: "Lumen Field, Seattle", date: "Tomorrow", stage: "Group E" },
  { id: "m6", home: "bel", away: "cro", homeScore: 0, awayScore: 0, status: "UPCOMING", stadium: "Mercedes-Benz, Atlanta", date: "Tomorrow", stage: "Group F" },
];

export const LIVE_EVENTS: Record<string, MatchEvent[]> = {
  m1: [
    { minute: 12, type: "goal", player: "L. Messi", team: "home" },
    { minute: 28, type: "yellow", player: "Casemiro", team: "away" },
    { minute: 41, type: "goal", player: "Vinícius Jr.", team: "away" },
    { minute: 54, type: "sub", player: "Á. Di María", team: "home" },
    { minute: 63, type: "goal", player: "J. Álvarez", team: "home" },
  ],
  m2: [
    { minute: 9, type: "goal", player: "K. Mbappé", team: "home" },
    { minute: 22, type: "goal", player: "J. Musiala", team: "away" },
    { minute: 35, type: "yellow", player: "A. Tchouaméni", team: "home" },
  ],
};

export const MATCH_STATS: Record<string, { label: string; home: number; away: number }[]> = {
  m1: [
    { label: "Possession", home: 58, away: 42 },
    { label: "Shots", home: 14, away: 9 },
    { label: "Shots on Target", home: 6, away: 3 },
    { label: "Corners", home: 7, away: 4 },
    { label: "Fouls", home: 8, away: 12 },
    { label: "Offsides", home: 2, away: 3 },
    { label: "xG", home: 2.3, away: 1.1 },
  ],
};

export const MOMENTUM: Record<string, { min: number; home: number; away: number }[]> = {
  m1: Array.from({ length: 30 }, (_, i) => {
    const min = i * 3;
    return {
      min,
      home: Math.round(40 + 30 * Math.sin(min / 12) + Math.random() * 15),
      away: Math.round(40 + 25 * Math.cos(min / 10) + Math.random() * 15),
    };
  }),
};

// Qatar 2022 group standings
export const STANDINGS: Record<string, { team: string; p: number; w: number; d: number; l: number; gf: number; ga: number; pts: number }[]> = {
  A: [
    { team: "ned", p: 3, w: 2, d: 1, l: 0, gf: 5, ga: 1, pts: 7 },
    { team: "sen", p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 4, pts: 6 },
    { team: "ecu", p: 3, w: 1, d: 1, l: 1, gf: 4, ga: 3, pts: 4 },
    { team: "qat", p: 3, w: 0, d: 0, l: 3, gf: 1, ga: 7, pts: 0 },
  ],
  B: [
    { team: "eng", p: 3, w: 2, d: 1, l: 0, gf: 9, ga: 2, pts: 7 },
    { team: "usa", p: 3, w: 1, d: 2, l: 0, gf: 2, ga: 1, pts: 5 },
    { team: "irn", p: 3, w: 1, d: 0, l: 2, gf: 4, ga: 7, pts: 3 },
    { team: "wal", p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 6, pts: 1 },
  ],
  C: [
    { team: "arg", p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 2, pts: 6 },
    { team: "pol", p: 3, w: 1, d: 1, l: 1, gf: 2, ga: 2, pts: 4 },
    { team: "mex", p: 3, w: 1, d: 1, l: 1, gf: 2, ga: 3, pts: 4 },
    { team: "ksa", p: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3 },
  ],
  D: [
    { team: "fra", p: 3, w: 2, d: 0, l: 1, gf: 6, ga: 3, pts: 6 },
    { team: "aus", p: 3, w: 2, d: 0, l: 1, gf: 3, ga: 4, pts: 6 },
    { team: "tun", p: 3, w: 1, d: 1, l: 1, gf: 1, ga: 1, pts: 4 },
    { team: "den", p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 3, pts: 1 },
  ],
  E: [
    { team: "jpn", p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 3, pts: 6 },
    { team: "esp", p: 3, w: 1, d: 1, l: 1, gf: 9, ga: 3, pts: 4 },
    { team: "ger", p: 3, w: 1, d: 1, l: 1, gf: 6, ga: 5, pts: 4 },
    { team: "crc", p: 3, w: 1, d: 0, l: 2, gf: 3, ga: 11, pts: 3 },
  ],
  F: [
    { team: "mar", p: 3, w: 2, d: 1, l: 0, gf: 4, ga: 1, pts: 7 },
    { team: "cro", p: 3, w: 1, d: 2, l: 0, gf: 4, ga: 1, pts: 5 },
    { team: "bel", p: 3, w: 1, d: 1, l: 1, gf: 1, ga: 2, pts: 4 },
    { team: "cmr", p: 3, w: 1, d: 1, l: 1, gf: 4, ga: 4, pts: 4 },
  ],
  G: [
    { team: "bra", p: 3, w: 2, d: 0, l: 1, gf: 3, ga: 1, pts: 6 },
    { team: "sui", p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 3, pts: 6 },
    { team: "cmr", p: 3, w: 1, d: 1, l: 1, gf: 4, ga: 4, pts: 4 },
    { team: "srb", p: 3, w: 0, d: 1, l: 2, gf: 5, ga: 8, pts: 1 },
  ],
  H: [
    { team: "por", p: 3, w: 2, d: 0, l: 1, gf: 6, ga: 4, pts: 6 },
    { team: "kor", p: 3, w: 1, d: 1, l: 1, gf: 4, ga: 4, pts: 4 },
    { team: "uru", p: 3, w: 1, d: 1, l: 1, gf: 2, ga: 2, pts: 4 },
    { team: "gha", p: 3, w: 1, d: 0, l: 2, gf: 5, ga: 7, pts: 3 },
  ],
};

// Knockout bracket Qatar 2022
export type Knockout = { round: string; matches: { home: string; away: string; hs?: number; as?: number; pen?: string }[] };
export const BRACKET: Knockout[] = [
  {
    round: "Round of 16",
    matches: [
      { home: "ned", away: "usa", hs: 3, as: 1 },
      { home: "arg", away: "aus", hs: 2, as: 1 },
      { home: "fra", away: "pol", hs: 3, as: 1 },
      { home: "eng", away: "sen", hs: 3, as: 0 },
      { home: "jpn", away: "cro", hs: 1, as: 1, pen: "1-3" },
      { home: "bra", away: "kor", hs: 4, as: 1 },
      { home: "mar", away: "esp", hs: 0, as: 0, pen: "3-0" },
      { home: "por", away: "sui", hs: 6, as: 1 },
    ],
  },
  {
    round: "Quarterfinal",
    matches: [
      { home: "cro", away: "bra", hs: 1, as: 1, pen: "4-2" },
      { home: "ned", away: "arg", hs: 2, as: 2, pen: "3-4" },
      { home: "mar", away: "por", hs: 1, as: 0 },
      { home: "eng", away: "fra", hs: 1, as: 2 },
    ],
  },
  {
    round: "Semifinal",
    matches: [
      { home: "arg", away: "cro", hs: 3, as: 0 },
      { home: "fra", away: "mar", hs: 2, as: 0 },
    ],
  },
  {
    round: "Final",
    matches: [{ home: "arg", away: "fra", hs: 3, as: 3, pen: "4-2" }],
  },
];

export const TOP_SCORERS = [
  { name: "Miroslav Klose", country: "ger", goals: 16, tournaments: "2002-2014" },
  { name: "Ronaldo Nazário", country: "bra", goals: 15, tournaments: "1994-2006" },
  { name: "Gerd Müller", country: "ger", goals: 14, tournaments: "1970-1974" },
  { name: "Just Fontaine", country: "fra", goals: 13, tournaments: "1958" },
  { name: "Lionel Messi", country: "arg", goals: 13, tournaments: "2006-2022" },
  { name: "Pelé", country: "bra", goals: 12, tournaments: "1958-1970" },
  { name: "Kylian Mbappé", country: "fra", goals: 12, tournaments: "2018-2022" },
  { name: "Sándor Kocsis", country: "ger", goals: 11, tournaments: "1954" },
  { name: "Jürgen Klinsmann", country: "ger", goals: 11, tournaments: "1990-1998" },
  { name: "Helmut Rahn", country: "ger", goals: 10, tournaments: "1954-1958" },
];

export const TOP_ASSISTERS = [
  { name: "Pelé", country: "bra", value: 10, tournaments: "1958-1970" },
  { name: "Diego Maradona", country: "arg", value: 8, tournaments: "1982-1994" },
  { name: "Lionel Messi", country: "arg", value: 8, tournaments: "2006-2022" },
  { name: "Bruno Conti", country: "ita", value: 7, tournaments: "1982-1986" },
  { name: "Thomas Müller", country: "ger", value: 6, tournaments: "2010-2018" },
];

export const RECORDS = [
  { title: "Fastest Goal", value: "11s", desc: "Hakan Şükür (Turkey vs Korea, 2002)", icon: "⚡" },
  { title: "Biggest Win", value: "10–1", desc: "Hungary vs El Salvador (1982)", icon: "🥅" },
  { title: "Most Appearances", value: "25", desc: "Lothar Matthäus (Germany)", icon: "🎖️" },
  { title: "Most Goals", value: "16", desc: "Miroslav Klose (Germany)", icon: "⚽" },
  { title: "Youngest Scorer", value: "17y", desc: "Pelé (Brazil, 1958)", icon: "🌟" },
  { title: "Oldest Player", value: "45y", desc: "Essam El-Hadary (Egypt, 2018)", icon: "🕰️" },
];

export type Edition = {
  year: number;
  host: string;
  hostFlag: string;
  winner: string;
  runnerUp: string;
  third?: string;
  topScorer: string;
  topScorerGoals: number;
  totalGoals: number;
  matches: number;
};

export const EDITIONS: Edition[] = [
  { year: 1930, host: "Uruguay", hostFlag: "🇺🇾", winner: "uru", runnerUp: "arg", topScorer: "Guillermo Stábile", topScorerGoals: 8, totalGoals: 70, matches: 18 },
  { year: 1934, host: "Italy", hostFlag: "🇮🇹", winner: "ita", runnerUp: "ger", topScorer: "Oldřich Nejedlý", topScorerGoals: 5, totalGoals: 70, matches: 17 },
  { year: 1938, host: "France", hostFlag: "🇫🇷", winner: "ita", runnerUp: "ita", topScorer: "Leônidas", topScorerGoals: 7, totalGoals: 84, matches: 18 },
  { year: 1950, host: "Brazil", hostFlag: "🇧🇷", winner: "uru", runnerUp: "bra", topScorer: "Ademir", topScorerGoals: 8, totalGoals: 88, matches: 22 },
  { year: 1954, host: "Switzerland", hostFlag: "🇨🇭", winner: "ger", runnerUp: "ger", topScorer: "Sándor Kocsis", topScorerGoals: 11, totalGoals: 140, matches: 26 },
  { year: 1958, host: "Sweden", hostFlag: "🇸🇪", winner: "bra", runnerUp: "ger", topScorer: "Just Fontaine", topScorerGoals: 13, totalGoals: 126, matches: 35 },
  { year: 1962, host: "Chile", hostFlag: "🇨🇱", winner: "bra", runnerUp: "ger", topScorer: "Garrincha (and others)", topScorerGoals: 4, totalGoals: 89, matches: 32 },
  { year: 1966, host: "England", hostFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", winner: "eng", runnerUp: "ger", topScorer: "Eusébio", topScorerGoals: 9, totalGoals: 89, matches: 32 },
  { year: 1970, host: "Mexico", hostFlag: "🇲🇽", winner: "bra", runnerUp: "ita", topScorer: "Gerd Müller", topScorerGoals: 10, totalGoals: 95, matches: 32 },
  { year: 1974, host: "Germany", hostFlag: "🇩🇪", winner: "ger", runnerUp: "ned", topScorer: "Grzegorz Lato", topScorerGoals: 7, totalGoals: 97, matches: 38 },
  { year: 1978, host: "Argentina", hostFlag: "🇦🇷", winner: "arg", runnerUp: "ned", topScorer: "Mario Kempes", topScorerGoals: 6, totalGoals: 102, matches: 38 },
  { year: 1982, host: "Spain", hostFlag: "🇪🇸", winner: "ita", runnerUp: "ger", topScorer: "Paolo Rossi", topScorerGoals: 6, totalGoals: 146, matches: 52 },
  { year: 1986, host: "Mexico", hostFlag: "🇲🇽", winner: "arg", runnerUp: "ger", topScorer: "Gary Lineker", topScorerGoals: 6, totalGoals: 132, matches: 52 },
  { year: 1990, host: "Italy", hostFlag: "🇮🇹", winner: "ger", runnerUp: "arg", topScorer: "Salvatore Schillaci", topScorerGoals: 6, totalGoals: 115, matches: 52 },
  { year: 1994, host: "USA", hostFlag: "🇺🇸", winner: "bra", runnerUp: "ita", topScorer: "Stoichkov / Salenko", topScorerGoals: 6, totalGoals: 141, matches: 52 },
  { year: 1998, host: "France", hostFlag: "🇫🇷", winner: "fra", runnerUp: "bra", topScorer: "Davor Šuker", topScorerGoals: 6, totalGoals: 171, matches: 64 },
  { year: 2002, host: "Korea/Japan", hostFlag: "🇰🇷", winner: "bra", runnerUp: "ger", topScorer: "Ronaldo", topScorerGoals: 8, totalGoals: 161, matches: 64 },
  { year: 2006, host: "Germany", hostFlag: "🇩🇪", winner: "ita", runnerUp: "fra", topScorer: "Miroslav Klose", topScorerGoals: 5, totalGoals: 147, matches: 64 },
  { year: 2010, host: "South Africa", hostFlag: "🇿🇦", winner: "esp", runnerUp: "ned", topScorer: "Thomas Müller", topScorerGoals: 5, totalGoals: 145, matches: 64 },
  { year: 2014, host: "Brazil", hostFlag: "🇧🇷", winner: "ger", runnerUp: "arg", topScorer: "James Rodríguez", topScorerGoals: 6, totalGoals: 171, matches: 64 },
  { year: 2018, host: "Russia", hostFlag: "🇷🇺", winner: "fra", runnerUp: "cro", topScorer: "Harry Kane", topScorerGoals: 6, totalGoals: 169, matches: 64 },
  { year: 2022, host: "Qatar", hostFlag: "🇶🇦", winner: "arg", runnerUp: "fra", topScorer: "Kylian Mbappé", topScorerGoals: 8, totalGoals: 172, matches: 64 },
];

export const PLAYERS: Player[] = [
  { id: "p1", name: "Lionel Messi", countryId: "arg", position: "FW", number: 10, club: "Inter Miami", goals: 13, assists: 8, apps: 26, minutes: 2314, yellows: 5, reds: 0, ratings: { pace: 80, shooting: 92, passing: 95, dribbling: 96, defending: 35, physical: 65 } },
  { id: "p2", name: "Kylian Mbappé", countryId: "fra", position: "FW", number: 10, club: "Real Madrid", goals: 12, assists: 5, apps: 14, minutes: 1233, yellows: 1, reds: 0, ratings: { pace: 97, shooting: 90, passing: 80, dribbling: 92, defending: 36, physical: 78 } },
  { id: "p3", name: "Neymar Jr.", countryId: "bra", position: "FW", number: 10, club: "Al-Hilal", goals: 8, assists: 6, apps: 18, minutes: 1568, yellows: 4, reds: 0, ratings: { pace: 87, shooting: 83, passing: 86, dribbling: 94, defending: 37, physical: 60 } },
  { id: "p4", name: "Harry Kane", countryId: "eng", position: "FW", number: 9, club: "Bayern München", goals: 8, assists: 2, apps: 13, minutes: 1170, yellows: 2, reds: 0, ratings: { pace: 70, shooting: 92, passing: 84, dribbling: 80, defending: 45, physical: 84 } },
  { id: "p5", name: "Cristiano Ronaldo", countryId: "por", position: "FW", number: 7, club: "Al-Nassr", goals: 8, assists: 2, apps: 22, minutes: 1989, yellows: 3, reds: 0, ratings: { pace: 85, shooting: 93, passing: 80, dribbling: 85, defending: 35, physical: 80 } },
];

export const NEXT_WC_DATE = new Date("2026-06-11T16:00:00Z");
