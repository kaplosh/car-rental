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
      msg: 'Testing msg',
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
    await this.fetchData();
  },

  methods: {
    async fetchData () {
      const result = await this.$db.search('cars');
      if (result.ok) {
        this.errorMsg = '';
        this.cars = result.data.list;
      } else {
        this.errorMsg = 'Database cannot be loaded!';
        console.error(result.error);
      }
    },

    async deleteCar (car: Car) {
      const result = await this.$db.delete('cars', car.id);
      // TODO dokončit (je potřeba znovu "stáhnout" auta)
      if (result.ok) {
        console.log('Jupí');
        await this.fetchData();
      } else {
        console.log('Nefunguju', car);
        this.errorMsg = 'Delete was not succesful!';
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
    <div v-if="msg" class="alert alert-danger" role="alert">
      {{ msg }}
    </div>
    <main>
      <ListingHeader />
      <DataTable :dataset="cars" :columns="columns" />
    </main>
  </div>
</template>

<style scoped>

</style>
