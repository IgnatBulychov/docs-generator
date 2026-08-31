import { ref } from "vue";
import { TemplateHandler } from "easy-template-x";
import i18n from "@/locales/index.js";
import { convertXlsxToJson } from "../utils/xlsx.js";
import { parseTemplateAdvanced } from "../utils/template.js";
import { createZip, addFileToZip, generateZipBlob, downloadBlob } from "../utils/zip.js";

export function useDocumentGenerator() {
  const templateFile = ref([]);
  const tableFile = ref([]);
  const dataList = ref([]);
  const percent = ref(null);
  const mask = ref("");
  const selectedField = ref(null);
  const addSettings = ref(false);

  const settings = ref({
    delimiters: {
      tagStart: "{",
      tagEnd: "}",
    },
  });

  let zip = null;

  async function setExcelFile(event) {
    const jsonData = convertXlsxToJson(await event.fileList[0].originFileObj.arrayBuffer());
    dataList.value = jsonData;
    percent.value = null;
    mask.value = "";
  }

  function setFile() {
    percent.value = null;
    mask.value = "";
  }

  function setMask(event) {
    selectedField.value = event.target.value;
    mask.value = `{${event.target.value}}`;
  }

  async function generateZip() {
    let nameMask = null;
    if (mask.value) {
      nameMask = parseTemplateAdvanced(mask.value);
    }

    percent.value = 0;
    zip = createZip();

    for (const [key, el] of dataList.value.entries()) {
      const handler = new TemplateHandler(settings.value);
      const doc = await handler.process(templateFile.value[0].originFileObj, el);

      const filename = nameMask
        ? nameMask.reduce(
            (acc, maskItem) => acc + (maskItem.var ? el[maskItem.var] : maskItem.text),
            "",
          ) + ".docx"
        : key + ".docx";

      await addFileToZip(zip, filename, doc);

      percent.value = ((100 * key) / dataList.value.length).toFixed(2);
    }

    percent.value = 100;

    const zipBlob = await generateZipBlob(zip);
    downloadBlob(`${i18n.global.t("zipFilename")}.zip`, zipBlob);
  }

  return {
    templateFile,
    tableFile,
    dataList,
    percent,
    mask,
    selectedField,
    settings,
    addSettings,
    setExcelFile,
    setFile,
    setMask,
    generateZip,
  };
}
