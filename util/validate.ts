export function notBlank(data: object) {
  return Object.values(data).every((key) => {
    if (typeof key === "string") {
      return key.trim() !== "";
    }
    return true;
  });
}

const titleValidator = /^(?=.*[a-zA-Z0-9\s\p{P}]).+$/u;
const nameValidator = /^(?! )[.\sa-zA-Zà-úÀ-Ú]*$/;
const emailValidator = /^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/;

export const validators = { titleValidator, nameValidator, emailValidator };
