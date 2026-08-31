<script setup>
import { useI18n } from "vue-i18n";
import { useDocumentGenerator } from "@/composables/useDocumentGenerator.js";

const { t } = useI18n();

const {
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
} = useDocumentGenerator();
</script>

<template>
  <div class="generator-section">
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
          <div class="flex justify-center">
            <VIcon name="upload" class="w-12 text-blue-500" />
          </div>
          <p class="ant-upload-text">{{ t("generator.template.uploadText") }}</p>
          <p class="ant-upload-hint">{{ t("generator.template.uploadHint") }}</p>
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
          <div class="flex justify-center">
            <VIcon name="upload" class="w-12 text-blue-500" />
          </div>
          <p class="ant-upload-text">{{ t("generator.table.uploadText") }}</p>
          <p class="ant-upload-hint">{{ t("generator.table.uploadHint") }}</p>
        </a-upload-dragger>

        <div v-if="tableFile?.[0]?.name" class="text-center mt-2">
          {{ tableFile?.[0]?.name }}
        </div>
      </div>
    </div>

    <div>
      <div class="mb-2">
        <a-button @click="addSettings = !addSettings" type="link" size="small">
          {{ t("generator.additionalSettings") }}
        </a-button>
      </div>

      <template v-if="addSettings">
        <template v-if="dataList.length">
          <div class="my-6">
            {{ t("generator.uniqueField") }} <br /><br />

            <a-radio-group :value="selectedField" class="my-4" @change="setMask">
              <a-radio :value="item" v-for="item in Object.keys(dataList.at(0))">{{
                item
              }}</a-radio>
            </a-radio-group>
          </div>

          <div class="mt-6">
            {{ t("generator.manualMask") }} <br />

            <br />
            <a-input v-model:value="mask" :placeholder="t('generator.maskPlaceholder')"></a-input>
            <br />
          </div>

          <div class="italic my-4 text-gray-500 text-sm">
            {{ t("generator.warning") }}
          </div>
        </template>

        <div class="mb-2">{{ t("generator.delimitersLabel") }}</div>

        <div class="mb-4">
          <a-input
            v-model:value="settings.delimiters.tagStart"
            :placeholder="t('generator.tagStartPlaceholder')"
          ></a-input>
        </div>
        <a-input
          v-model:value="settings.delimiters.tagEnd"
          :placeholder="t('generator.tagEndPlaceholder')"
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
        >{{ t("generator.generateButton") }}</a-button
      >
    </div>

    <div>
      <a-progress v-if="percent" :percent="Number(percent)" status="active" />
    </div>
  </div>
</template>

<style scoped>
.generator-section {
  margin-top: 2.5rem;
  border-radius: 1.5rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 2rem;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.06);
}
</style>
