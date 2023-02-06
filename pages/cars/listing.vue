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
      filterType: '',
      customParam: '',
      filterState: false,

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
    async fetchData (params = {}) {
      const result = await this.$db.search('cars', params);
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
        await this.fetchData();
        this.deleteErrorMsg = '';
      } else {
        this.deleteErrorMsg = 'Delete was not succesful!';
      }
    },
    async filterCars (event) {
      const customParam = event.target.value;
      const params: any = {
        [this.filterType]: customParam,
      };
      await this.fetchData(params);
    },
    setFilters () {
      this.filterState = !this.filterState;
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
      <ListingHeader @show="setFilters" />
      <div v-if="filterState" class="mb-3">
        <div class="form-check form-check-inline row">
          <label for="exampleFormControlInput1" class="form-label">Filter in</label>
          <div class="form-check col-12">
            <input
              id="brandCheck"
              v-model="filterType"
              class="form-check-input"
              type="radio"
              value="brand"
              name="groupOfDefaultRadios"
            >
            <label class="form-check-label" for="brandCheck">
              Brand
            </label>
          </div>
          <div class="form-check col-12">
            <input
              id="typeCheck"
              v-model="filterType"
              class="form-check-input"
              type="radio"
              value="type"
              name="groupOfDefaultRadios"
            >
            <label class="form-check-label" for="typeCheck">
              Type
            </label>
          </div>
          <div class="form-check col-12">
            <input
              id="engineCheck"
              v-model="filterType"
              class="form-check-input"
              type="radio"
              value="engine"
              name="groupOfDefaultRadios"
            >
            <label class="form-check-label" for="engineCheck">
              Engine
            </label>
          </div>
        </div>
        <div class="form-check col-12">
          <label for="customParam" class="form-check-label mb-1">by</label>
          <input id="customParam" class="form-control" placeholder="Input custom parameter.." @input="filterCars">
          <div>{{ customParam }}</div>
        </div>
      </div>
      <DataTable :dataset="cars" :columns="columns" :error="error" :error-msg="errorMsg" />
    </main>
  </div>
</template>

<style scoped>

</style>
