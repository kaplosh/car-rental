<script lang="ts">

import { Car } from '~/lib/types';
import { defineDataTableColumns } from '~/components/DataTable/helpers';

export default defineComponent({
  data () {
    return {
      cars: [] as Car[],

      columns: defineDataTableColumns([
        {
          name: 'id',
          cell: car => car.id,
        },
        {
          name: 'manufacturer',
          caption: 'Manufacturer',
          cell: car => car.brand,
        },
      ]),
    };
  },

  async mounted () {
    const result = await this.$db.query('cars');
    console.log(result);
    if (result.ok) {
      this.cars = result.data.list;
    } else {
      console.log('spadlo to');
    }
  },

});
</script>

<template>
  <div class="container">
    <header class="m-3">
      Car Rental
    </header>
    <main>
      <ListingHeader />
      <DataTable :dataset="cars" :columns="columns" />
    </main>
  </div>
</template>

<style scoped>

</style>
