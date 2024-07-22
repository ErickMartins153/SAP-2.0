import ptBR from "date-fns/locale/pt-BR";
import { addDays, format, getDate } from "date-fns";

export function getWeekDays(date: Date) {
  const final = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(date, i);
    final.push({
      // @ts-expect-error
      formatted: format(currentDate, "EEE", { locale: ptBR }),
      date: currentDate,
      day: getDate(currentDate),
    });
  }
  return final;
}

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

export function stringToDate(dataString: string) {
  let partes = dataString.split("/");
  let dia = parseInt(partes[0], 10);
  let mes = parseInt(partes[1], 10) - 1;
  let ano = parseInt(partes[2], 10);
  return new Date(ano, mes, dia);
}

export function getDayName(dateString: string) {
  const date = stringToDate(dateString);
  // @ts-expect-error
  return format(date, "EEE", { locale: ptBR });
}

export function createTimestamps(data: string, horario: string) {
  const [dia, mes, ano] = data.split("/").map(Number);
  const dataFormatada = new Date(ano, mes - 1, dia);

  const [horaInicio, horaFim] = horario.split(" - ");

  const [horaInicioHoras, horaInicioMinutos] = horaInicio
    .split(":")
    .map(Number);
  const [horaFimHoras, horaFimMinutos] = horaFim.split(":").map(Number);

  const tempoInicio = new Date(dataFormatada);
  tempoInicio.setHours(horaInicioHoras, horaInicioMinutos);

  const tempoFim = new Date(dataFormatada);
  tempoFim.setHours(horaFimHoras, horaFimMinutos);

  const tempoInicioISO = tempoInicio.toISOString();
  const tempoFimISO = tempoFim.toISOString();

  return {
    tempoInicio: tempoInicioISO,
    tempoFim: tempoFimISO,
  };
}
