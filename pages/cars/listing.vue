<script lang="tsx">

import { Car } from '~/lib/types';
import { defineDataTableColumns } from '~/components/DataTable/helpers';
import ThreeRows from '~/components/DataTable/cells/ThreeRows.vue';

export default defineComponent({
  data () {
    return {
      cars: [] as Car[],

      columns: defineDataTableColumns([
        {
          name: 'id',
          render (car) {
            return <div>{car.id}</div>;
          },
        },
        {
          name: 'manufacturer',
          caption: 'Manufacturer',
          render: car => <ThreeRows car={car} />,
        },
        {
          name: 'type',
          caption: 'Type',
          render (car) {
            return <div>{car.type}</div>;
          },
        },
        {
          name: 'engine',
          caption: 'Engine',
          render (car) {
            return <div>{car.engine}</div>;
          },
        },
        {
          name: 'seats',
          caption: 'Number of seats',
          render (car) {
            return <div>{car.seats}</div>;
          },
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
