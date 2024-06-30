export function getWeekdayNames(
  locale: string = "pt-BR",
  type: "long" | "short" | "narrow" = "long"
) {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: type });
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.UTC(2024, 0, i + 1));
    return { nome: formatter.format(date) };
  });
  return [...days.slice(1), days[0]];
}

export function getTimeIntervals(): string[] {
  return [
    "10:20 - 11:10",
    "11:10 - 12:00",
    "12:00 - 12:50",
    "12:50 - 13:40",
    "15:30 - 16:20",
    "16:20 - 17:10",
    "17:10 - 18:00",
    "18:00 - 18:50",
    "18:50 - 19:40",
  ];
}

export const timeIntervals = [
  { nome: "10:20 - 11:10" },
  { nome: "11:10 - 12:00" },
  { nome: "12:00 - 12:50" },
  { nome: "12:50 - 13:40" },
  { nome: "15:30 - 16:20" },
  { nome: "16:20 - 17:10" },
  { nome: "17:10 - 18:00" },
  { nome: "18:00 - 18:50" },
  { nome: "18:50 - 19:40" },
];
