export function notBlank(data: object) {
  return Object.values(data).every((key) => {
    if (typeof key === "string") {
      return key.trim() !== "";
    }
    return true;
  });
}
