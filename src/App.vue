<script setup>
import { TemplateHandler } from 'easy-template-x'
import JSZip from 'JSZip'
import { onMounted, ref } from 'vue'
import { read, utils } from 'xlsx'
import Benefits from './components/benefits.vue'
import Steps from './components/steps.vue'
import { addAnalytics, addVisit } from './utils/analytics'

onMounted(() => {
  document.title = 'Пакетное редактирование офисных документов'

  addVisit()
})

const templateFile = ref([])
const tableFile = ref([])
const dataList = ref([])

let zip = null

function newZip() {
  zip = new JSZip()
}

async function addFileToZip(filename, blob) {
  // Добавляем blob в архив
  await zip.file(filename, blob)
}

async function saveFileAsZip() {
  // Генерируем ZIP архив
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE', // сжатие
    compressionOptions: {
      level: 6, // уровень сжатия от 1 до 9
    },
  })

  // Скачиваем ZIP архив
  downloadBlob('Документы.zip', zipBlob)
}

// Функция для скачивания любого blob
function downloadBlob(filename, blob) {
  const blobUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.download = filename
  link.href = blobUrl
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()

  setTimeout(() => {
    document.body.removeChild(link)
    URL.revokeObjectURL(blobUrl)
  }, 100)
}

function convertXlsxToJson(filePath) {
  try {
    // Read the workbook

    const workbook = read(filePath)

    // Get the first sheet name
    const sheetName = workbook.SheetNames[0]

    // Get the worksheet
    const worksheet = workbook.Sheets[sheetName]

    console.log(worksheet)

    // Convert the worksheet to JSON
    // { header: 1 } can be used to get an array of arrays instead of objects
    const jsonData = utils.sheet_to_json(worksheet, {
      raw: false,
    })

    return jsonData
  } catch (error) {
    console.error('Ошибка конвертации XLSX в JSON:', error)
    return null
  }
}

const percent = ref(null)
const mask = ref('')

async function setExcelFile(event) {
  const jsonData = convertXlsxToJson(await event.fileList[0].originFileObj.arrayBuffer())
  console.log(jsonData)
  dataList.value = jsonData

  percent.value = null
  mask.value = ''
}

async function setFile(event) {
  percent.value = null
  mask.value = ''
}

const selectedField = ref(null)
function setMask(event, el) {
  selectedField.value = event.target.value
  mask.value = `{${event.target.value}}`
}

const settings = ref({
  delimiters: {
    tagStart: '{',
    tagEnd: '}',
  },
})

const addSettings = ref(false)

async function generateZip() {
  let nameMask = null
  if (mask.value) {
    nameMask = parseTemplateAdvanced(mask.value)
  }

  percent.value = 0

  newZip()

  for (const [key, el] of dataList.value.entries()) {
    const handler = new TemplateHandler(settings.value)
    const doc = await handler.process(templateFile.value[0].originFileObj, el)

    await addFileToZip(
      nameMask
        ? nameMask.reduce(
            (acc, maskItem) => acc + (maskItem.var ? el[maskItem.var] : maskItem.text),
            '',
          ) + '.docx'
        : key + '.docx',
      doc,
    )

    percent.value = ((100 * key) / dataList.value.length).toFixed(2)
  }

  try {
    addAnalytics(dataList.value.length)
  } catch (error) {
    console.log(error)
  }

  // 3. save output
  // saveFile('myTemplate - output.docx', doc)

  percent.value = 100

  await saveFileAsZip()
}

function parseTemplateAdvanced(template) {
  const result = []
  const regex = /{([^}]+)}|([^{]+)/g
  let match
  let lastIndex = 0

  while ((match = regex.exec(template)) !== null) {
    // Если есть текст перед совпадением
    if (match.index > lastIndex) {
      const text = template.substring(lastIndex, match.index)
      if (text) result.push({ text })
    }

    if (match[1] !== undefined) {
      // Переменная
      result.push({ var: match[1].trim() })
    } else if (match[2] !== undefined) {
      // Текст
      result.push({ text: match[2] })
    }

    lastIndex = regex.lastIndex
  }

  // Добавляем остаток текста после последнего совпадения
  if (lastIndex < template.length) {
    const text = template.substring(lastIndex)
    if (text) result.push({ text })
  }

  return result
}
</script>

<template>
  <div class="container mx-auto mt-6">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl/tight font-bold text-gray-900 sm:text-4xl">
          Пакетное редактирование офисных документов
        </h1>

        <p class="mt-4 text-lg text-pretty text-gray-700">
          Вам нужно создать много документов по шаблону? <br />
          Просто выберите свой шаблон, таблицу с данными и сгенерируйте файлы в один клик!
          <br />Больше никакой ручной работы!
        </p>
      </div>

      <benefits />

      <div class="mx-auto flex justify-center gap-8 flex-col md:flex-row my-12">
        <div class="flex-1">
          <a-upload-dragger
            v-model:fileList="templateFile"
            name="file"
            :showUploadList="false"
            :maxCount="1"
            :customRequest="() => {}"
            @change="setFile"
          >
            <div class="text-blue-500 flex justify-center">
              <svg
                class="w-12"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M518.3 459a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 459z"
                  fill="currentColor"
                ></path>
                <path
                  d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7c-23.5-24.2-36-56.8-34.9-90.6c.9-26.4 9.9-51.2 26.2-72.1c16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9l13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9c15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5l37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 0 1-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <p class="ant-upload-text">Нажмите для выбора или перетащите сюда шаблон</p>
            <p class="ant-upload-hint">Шаблон файла должен быть в форматах .doc, docx</p>
          </a-upload-dragger>

          <div v-if="templateFile?.[0]?.name" class="text-center mt-2">
            {{ templateFile?.[0]?.name }}
          </div>
        </div>

        <div class="flex-1">
          <a-upload-dragger
            v-model:fileList="tableFile"
            name="file"
            :showUploadList="false"
            :maxCount="1"
            :customRequest="() => {}"
            @change="setExcelFile"
          >
            <div class="text-blue-500 flex justify-center">
              <svg
                class="w-12"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M518.3 459a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 459z"
                  fill="currentColor"
                ></path>
                <path
                  d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7c-23.5-24.2-36-56.8-34.9-90.6c.9-26.4 9.9-51.2 26.2-72.1c16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9l13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9c15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5l37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 0 1-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <p class="ant-upload-text">Нажмите для выбора или перетащите сюда таблицу с данными</p>
            <p class="ant-upload-hint">Таблица должна быть в форматах .xls, xlsx</p>
          </a-upload-dragger>

          <div v-if="tableFile?.[0]?.name" class="text-center mt-2">
            {{ tableFile?.[0]?.name }}
          </div>
        </div>
      </div>

      <div>
        <div class="mb-2">
          <a-button @click="addSettings = !addSettings" type="link" size="small">
            Дополнительные настройки
          </a-button>
        </div>

        <template v-if="addSettings">
          <template v-if="dataList.length">
            <div class="my-6">
              Выберите уникальное поле для названий документов: <br /><br />

              <a-radio-group :value="selectedField" class="my-4" @change="setMask">
                <a-radio :value="item" v-for="item in Object.keys(dataList.at(0))">{{
                  item
                }}</a-radio>
              </a-radio-group>
            </div>

            <div class="mt-6">
              Или укажите шаблон названия документов вручную: <br />

              <br />
              <a-input v-model:value="mask"></a-input>
              <br />

              <span class="text-gray-400 text-sm">
                Например: Документ №{Номер Документа} от {Дата}
              </span>
            </div>

            <div class="italic my-4 text-gray-500 text-sm">
              Внимание: если имена документов будут не уникальными, файлы с одинаковыми именами
              будут презаписаны. Если в имени документа будет присутствовать слеш, будут созданы
              соответствующие подпапки.
            </div>
          </template>

          <div class="mb-2">Символы выделения переменных в шаблоне документа:</div>

          <div class="mb-4">
            <a-input
              v-model:value="settings.delimiters.tagStart"
              placeholder="Начальный символ переменной"
            ></a-input>
          </div>
          <a-input
            v-model:value="settings.delimiters.tagEnd"
            placeholder="Конечный символ переменной"
          ></a-input>
        </template>
      </div>

      <div class="mx-auto flex justify-center gap-8 flex-col md:flex-row my-8">
        <a-button
          @click="generateZip"
          type="primary"
          class="w-full"
          size="large"
          :disabled="!tableFile.length || !templateFile.length"
          >Сгенерировать документы</a-button
        >
      </div>

      <div>
        <a-progress v-if="percent" :percent="Number(percent)" status="active" />
      </div>

      <!-- <div v-if="dataList.length" class="my-12 p-8">
        <div class="mb-4">Данные</div>

        <div class="overflow-auto">
          <table>
            <tr>
              <td v-for="item in Object.keys(dataList.at(0))">
                {{ item }}
              </td>
            </tr>

            <tr v-for="item in dataList">
              <td v-for="value in Object.keys(item)">
                {{ item[value] }}
              </td>
            </tr>
          </table>
        </div>
      </div> -->

      <steps />
    </div>
  </div>
</template>

<style scoped></style>
