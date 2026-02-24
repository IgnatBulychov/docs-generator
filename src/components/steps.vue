<script setup lang="ts">
import Excel from './icons/excel.vue'
import Result from './icons/result.vue'
import Template from './icons/template.vue'
</script>

<template>
  <div class="mb-6 mt-12 text-center">Как это сделать:</div>

  <div class="mt-8 flex flex-col gap-6">
    <div
      class="rounded-lg border border-gray-200 p-6 overflow-hidden bg-gray-50 flex flex-col md:flex-row items-center justify-center"
    >
      <div class="font-semibold text-5xl text-gray-200">1</div>

      <div class="mb-6 p-4 md:w-1/2 flex justify-center">
        <Template />
      </div>

      <p class="mt-2 text-pretty text-gray-700 flex-1">
        Укажите в вашем шаблоне данные, которые хотите вставить в документ автоматически. Вставьте в
        нужные места документа пременные в виде {Имя}, {Номер}, {Дата} и так далее.
      </p>
    </div>

    <div
      class="rounded-lg border border-gray-200 p-6 overflow-hidden bg-gray-50 flex flex-col md:flex-row items-center justify-center"
    >
      <div class="font-semibold text-5xl text-gray-200">2</div>

      <div class="mb-6 p-4 md:w-1/2 flex justify-center">
        <Excel />
      </div>

      <p class="mt-2 text-pretty text-gray-700 flex-1">
        Сформируйте Excel таблицу в котрой будет список данных для будущих документов, назовите
        заголовки точно так же как переменные в шаблоне. Внимание: все поля в файле должны быть
        текстовыми.
      </p>
    </div>

    <div
      class="rounded-lg border border-gray-200 p-6 overflow-hidden bg-gray-50 flex flex-col md:flex-row items-center justify-center"
    >
      <div class="font-semibold text-5xl text-gray-200">3</div>

      <div class="mb-6 p-4 md:w-1/2 flex justify-center">
        <Result />
      </div>

      <p class="mt-2 text-pretty text-gray-700 flex-1">
        Укажите по какому принципу следует сформировать названия для файлов, нажмите "Сгенерировать
        документы" и сохраните Zip-папку себе на компьютер.
      </p>
    </div>
  </div>
</template>
