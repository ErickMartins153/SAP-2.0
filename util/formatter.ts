export function formatText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex === -1) return truncated + "...";

  return truncated.substring(0, lastSpaceIndex) + "...";
}
