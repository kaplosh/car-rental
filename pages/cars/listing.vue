<script lang="tsx">

import { Car } from '~/lib/types';
import { defineDataTableColumns } from '~/components/DataTable/helpers';
import ThreeRows from '~/components/DataTable/cells/ThreeRows.vue';
import ItemActions from '~/components/DataTable/cells/ItemActions.vue';
import { DataTableItemAction } from '~/components/DataTable/types';
import DataTablePagination from '~/components/DataTable/DataTablePagination.vue';

export default defineComponent({
  components: { DataTablePagination },
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
      filterValue: '',
      customParam: '',
      filterState: false,
      result: null as any,
      totalPages: 0,

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

  watch: {
    async filterValue () {
      const params: any = {
        [this.filterType]: this.filterValue,
      };
      await this.fetchData(params);
    },
  },

  async mounted () {
    await this.fetchData();
  },

  methods: {
    async fetchData (params: any = {}) {
      params.perPage = 10;
      const result = await this.$db.search('cars', params);
      this.result = result;
      console.log(this.result);
      if (result.ok) {
        this.errorMsg = '';
        this.error = false;
        this.cars = result.data.list;
        this.totalPages = Math.ceil(result.data.total / result.data.perPage);
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
    setFilters () {
      this.filterState = !this.filterState;
    },
    async onPageSelect (page) {
      const params: any = {
        [this.filterType]: this.filterValue,
        page,
      };
      await this.fetchData(params);
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
          <input id="customParam" v-model="filterValue" class="form-control" placeholder="Input custom parameter..">
          <div>{{ customParam }}</div>
        </div>
      </div>
      <data-table-pagination :total-pages="totalPages" @select="onPageSelect" />
      <DataTable :dataset="cars" :columns="columns" :error="error" :error-msg="errorMsg" />
    </main>
  </div>
</template>

<style scoped>

</style>
