<script lang="tsx">

import { Car } from '~/lib/types';
import { defineDataTableColumns } from '~/components/DataTable/helpers';
import ThreeRows from '~/components/DataTable/cells/ThreeRows.vue';
import ItemActions from '~/components/DataTable/cells/ItemActions.vue';
import { DataTableItemAction } from '~/components/DataTable/types';

export default defineComponent({
  data () {
    const actions: DataTableItemAction[] = [
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
          render: car => <ThreeRows>{car.brand}</ThreeRows>,
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
          render: car => <ItemActions item={car} actions={actions} />,
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
    // TODO definuj typ pro argumentu `car` jako `Car`
    async deleteCar (car) {
      // TODO BUG
      const result = await this.$db.delete('cars', car.id);
      // TODO dokončit (je potřeba znovu "stáhnout" auta)
      if (result) {
        console.log('Jupí');
      } else {
        console.log('Nefunguju', car);
      }
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
