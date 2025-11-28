<script setup lang="ts">
  import TreeStore from '@/utils/TreeStore'

  import TheGrid from '@/components/TheGrid.vue'

  const treeStore = new TreeStore([
    {
      id: 1,
      label: 'Item 1',
      parent: null,
    },
    {
      id: '91064ce',
      label: 'Item 2',
      parent: 1,
    },
    {
      id: 3,
      label: 'Item 3',
      parent: 1,
    },
    {
      id: 4,
      label: 'Item 4',
      parent: '91064ce',
    },
    {
      id: 5,
      label: 'Item 5',
      parent: '91064ce',
    },
    {
      id: 6,
      label: 'Item 6',
      parent: '91064ce',
    },
    {
      id: 7,
      label: 'Item 7',
      parent: 4,
    },
    {
      id: 8,
      label: 'Item 8',
      parent: 4,
    },
  ])
</script>

<template>
  <div>
    <TheGrid
      :items="
        treeStore.getAll().map((item) => {
          return {
            ...item,
            id: String(item.id),
            parent: item.parent ? String(item.parent) : null,
          }
        })
      "
    />
  </div>
</template>
