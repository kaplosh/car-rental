<script lang="tsx">
import { Car } from '~/lib/types';

export default defineComponent({
  data () {
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
    };
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
        console.log(this.cars);
        this.totalPages = Math.ceil(result.data.total / result.data.perPage);
      } else {
        this.errorMsg = 'Database cannot be loaded!';
        this.error = true;
        console.error(result.error);
      }
    },
  },
});
</script>

<template>
  <div class="container">
    <div>
      <form ref="newCustomerForm">
        <div class="mb-3">
          <label for="customerNameInput" class="form-label">Customer name</label>
          <input id="customerNameInput" type="text" name="customerName" class="form-control">
        </div>
        <div>
          <select class="form-select" aria-label="Default select example">
            <option v-for="car in cars" :key="car.id">
              {{car.id}} -- {{car.brand}}  {{car.type}} -- {{car.seats}} seats
            </option>
          </select>
        </div>
      </form>
      <button type="button" class="btn btn-outline-success mt-3" @click="onSubmit">
        Create
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
