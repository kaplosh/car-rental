<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { DataTableItem, DataTableItemAction } from '~/components/DataTable/types';

export default defineComponent({
  props: {
    item: { type: Object as PropType<DataTableItem>, required: true },
    actions: { type: Object as PropType<DataTableItemAction[]>, required: true },

  },
});

</script>

<template>
  <div>
    <button v-for="action in actions" :key="action.name" class="btn btn-outline-danger" @click="action.action(item)">
      {{ action.caption }}
    </button>
  </div>
</template>
