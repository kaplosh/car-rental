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
      deleteErrorMsg: '',
      errorMsg: '',
      error: false,
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
        this.error = false;
        this.cars = result.data.list;
      } else {
        this.errorMsg = 'Database cannot be loaded!';
        this.error = true;
        console.error(result.error);
      }
    },

    async deleteCar (car: Car) {
      const result = await this.$db.delete('cars', car.id);

      if (result.ok) {
        console.log(result);
        await this.fetchData();
        this.deleteErrorMsg = '';
      } else {
        console.log(result.error);
        this.deleteErrorMsg = 'Delete was not succesful!';
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
    <div v-if="deleteErrorMsg" class="alert alert-danger" role="alert">
      {{ deleteErrorMsg }}
    </div>
    <main>
      <ListingHeader :delete-error-msg="deleteErrorMsg" />
      <DataTable :dataset="cars" :columns="columns" :error="error" :error-msg="errorMsg" />
    </main>
  </div>
</template>

<style scoped>

</style>
