import { read, utils } from "xlsx";

/**
 * Конвертирует XLSX файл (ArrayBuffer) в массив JSON объектов
 * @param {ArrayBuffer} filePath - ArrayBuffer содержимого XLSX файла
 * @returns {Array<Object>|null} - Массив объектов с данными из таблицы
 */
export function convertXlsxToJson(filePath) {
  try {
    const workbook = read(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = utils.sheet_to_json(worksheet, {
      raw: false,
    });

    return jsonData;
  } catch (error) {
    console.error("Ошибка конвертации XLSX в JSON:", error);
    return null;
  }
}
