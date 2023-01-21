<script lang="tsx">

import { PropType } from 'vue';
import { DataTableColumn } from '~/components/DataTable/types';

export default {
  components: {
    RenderColumn,
  },
  props: {
    dataset: { type: Array as PropType<any[]>, required: true },
    columns: { type: Array as PropType<DataTableColumn[]>, required: true },
  },
};

function RenderColumn (props) {
  return props.column.render(props['data-item']);
}
</script>

<template>
  <div class="container">
    <header class="m-3">
      Car Rental
    </header>
    <main>
      <table class="table table-striped table-bordered m-2">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.name">
              {{ column.caption ?? column.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in dataset" :key="record.id">
            <td v-for="column in columns" :key="column.name">
              <render-column :column="column" :data-item="record" />
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<style scoped>

</style>
