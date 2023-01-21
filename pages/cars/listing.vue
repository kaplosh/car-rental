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
        {
          name: 'type',
          caption: 'Type',
          cell: car => car.type,
        },
        {
          name: 'engine',
          caption: 'Engine',
          cell: car => car.engine,
        },
        {
          name: 'seats',
          caption: 'Number of seats',
          cell: car => car.seats,
        },
      ]),
    };
  },

  async mounted () {
    const result = await this.$db.search('cars', { brand: 'sk' });
    if (result.ok) {
      this.cars = result.data.list;
    } else {
      console.log('spadlo to');
      console.error(result.error);
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
