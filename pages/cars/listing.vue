<script lang="tsx">

import { Car } from '~/lib/types';
import { defineDataTableColumns } from '~/components/DataTable/helpers';
import ThreeRows from '~/components/DataTable/cells/ThreeRows.vue';
import DataItemActions from '~/components/DataTable/cells/DataItemActions.vue';

export default defineComponent({
  data () {
    const actions = [
      {
        name: 'delete',
        caption: 'Delete',
        action: car => this.deleteCar(car),
      },
    ];

    return {
      errorMsg: '',
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
        {
          name: 'actions',
          render: car => <DataItemActions car={car} actions={actions} />,
        },
      ]),
    };
  },

  async mounted () {
    const result = await this.$db.search('cars', { brand: 'sk' });
    if (result.ok) {
      this.errorMsg = '';
      this.cars = result.data.list;
    } else {
      this.errorMsg = 'Database cannot be loaded!';
      console.error(result.error);
    }
  },

  methods: {
    deleteCar (car) {
      // TODO
      console.log('Funguju', car);
    },
  },

});
</script>

<template>
  <div class="container">
    <header class="m-3">
      Car Rental
    </header>
    <div v-if="errorMsg" class="alert alert-danger" role="alert">
      {{ errorMsg }}
    </div>
    <main>
      <ListingHeader />
      <DataTable :dataset="cars" :columns="columns" />
    </main>
  </div>
</template>

<style scoped>

</style>
