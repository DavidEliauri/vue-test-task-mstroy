<script setup lang="ts">
  import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community'
  import { TreeDataModule, RowNumbersModule } from 'ag-grid-enterprise'

  import { AgGridVue } from 'ag-grid-vue3'

  // Register all Community features
  ModuleRegistry.registerModules([AllCommunityModule, TreeDataModule, RowNumbersModule])

  const props = defineProps<{
    items: {
      id: string
      label: string
      parent: string | null
    }[]
  }>()

  const customTheme = themeQuartz.withParams({
    headerColumnBorder: true,
    headerBackgroundColor: 'transparent',
  })
</script>

<template>
  <AgGridVue
    :theme="customTheme"
    :row-numbers="true"
    :row-data="props.items"
    :column-defs="[
      { field: 'label', headerName: 'Наименование', resizable: false, sortable: false },
    ]"
    :tree-data="true"
    :tree-data-parent-id-field="'parent'"
    :get-row-id="
      (params) => {
        return params.data.id
      }
    "
    :auto-group-column-def="{
      flex: 0.3333,
      headerName: 'Категория',
      cellRendererParams: {
        suppressCount: true,
      },
      valueGetter: (params) => {
        if (params.node?.allChildrenCount) {
          return 'Группа'
        }

        return 'Элемент'
      },
      resizable: false,
      sortable: false,
    }"
    :default-col-def="{
      flex: 1,
    }"
    :dom-layout="'autoHeight'"
  />
</template>

<style lang="scss" scoped>
  :deep {
    .ag-center-cols-viewport {
      min-height: unset !important;
    }
  }
</style>
