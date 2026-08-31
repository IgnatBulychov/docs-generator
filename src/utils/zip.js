import JSZip from "jszip";

/**
 * Создаёт новый пустой ZIP архив
 * @returns {JSZip}
 */
export function createZip() {
  return new JSZip();
}

/**
 * Добавляет файл (blob) в ZIP архив
 * @param {JSZip} zip - Экземпляр ZIP архива
 * @param {string} filename - Имя файла внутри архива
 * @param {Blob} blob - Содержимое файла
 */
export async function addFileToZip(zip, filename, blob) {
  await zip.file(filename, blob);
}

/**
 * Генерирует ZIP архив и возвращает Blob для скачивания
 * @param {JSZip} zip - Экземпляр ZIP архива
 * @returns {Promise<Blob>}
 */
export async function generateZipBlob(zip) {
  return await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: {
      level: 6,
    },
  });
}

/**
 * Скачивает Blob как файл
 * @param {string} filename - Имя файла для скачивания
 * @param {Blob} blob - Содержимое файла
 */
export function downloadBlob(filename, blob) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.download = filename;
  link.href = blobUrl;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }, 100);
}
