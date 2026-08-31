/**
 * Парсит шаблон строки с переменными в формате {ИмяПеременной}
 * Возвращает массив объектов { text: string } | { var: string }
 * @param {string} template - Шаблон строки, например "Документ №{Номер} от {Дата}"
 * @returns {Array<{text?: string, var?: string}>}
 */
export function parseTemplateAdvanced(template) {
  const result = [];
  const regex = /{([^}]+)}|([^{]+)/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      const text = template.substring(lastIndex, match.index);
      if (text) result.push({ text });
    }

    if (match[1] !== undefined) {
      result.push({ var: match[1].trim() });
    } else if (match[2] !== undefined) {
      result.push({ text: match[2] });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < template.length) {
    const text = template.substring(lastIndex);
    if (text) result.push({ text });
  }

  return result;
}
