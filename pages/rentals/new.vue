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
      rentals: [] as any,
      rental: {} as any,
      totalPages: 0,
      selected: '' as any,
      customerName: '' as any,
      firstDate: '' as any,
      secondDate: '' as any,
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

    onFirstDaySet () {
      const firstParseDate = this.firstDate.split('-');

      const newFirstMonth = Number(firstParseDate[1]);
      const newFirstDay = Number(firstParseDate[2]);

      const secondParseDate = this.secondDate.split('-');

      const newSecondMonth = Number(secondParseDate[1]);
      const newSecondDay = Number(secondParseDate[2]);

      const selectedCar = this.selected;

      const isCar = this.rentals.some(rental => rental.car);

      if (selectedCar && isCar) {
        console.log('Matching cars');

        if (newFirstMonth === newSecondMonth && this.rentals.rental.firstMonth === this.rentals.rental.secondMonth) {
          for (const item of this.rentals) {
            if (newFirstDay >= item.firstDay && newFirstDay <= item.secondDay) {
              this.errorMsg = 'Junda';
              return;
            } else if (newSecondDay >= item.firstDay && newSecondDay <= item.secondDay) {
              this.errorMsg = 'Junda';
              return;
            } else if (newFirstDay === item.firstDay && newSecondDay === item.secondDay) {
              this.errorMsg = 'Junda';
              return;
            }
          }
        }
      }

      this.rental = {
        firstDay: newFirstDay,
        firstMonth: newFirstMonth,
        secondMonth: newSecondMonth,
        secondDay: newSecondDay,
        name: this.customerName,
        car: selectedCar,
      };
      console.log(this.rental);
      this.rentals.push(this.rental);
      console.log(this.rentals);
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
          <input id="customerNameInput" v-model="customerName" type="text" class="form-control">
        </div>
        <div>
          <label for="carSelect" class="form-label">Select car</label>
          <select id="carSelect" v-model="selected" class="form-select" aria-label="Default select example">
            <option v-for="car in cars" :key="car.id" @click="logValue">
              {{ car.id }} -- {{ car.brand }}  {{ car.type }} -- {{ car.engine }} -- {{ car.seats }} seats
            </option>
          </select>
        </div>
        <div class="d-flex justify-content-center d-inline">
          <div class="card m-2" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">
                Rental start
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">
                Select a starting day of a rental
              </h6>
              <label class="m-1" for="start">Start date:</label>
              <input
                id="start"
                v-model="firstDate"
                type="date"
                name="trip-start"
                min="2018-01-01"
                max="2023-12-31"
              >
            </div>
          </div>
          <div class="card m-2" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">
                Rental end
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">
                Select a ending day of a rental
              </h6>
              <label class="m-1" for="start">End date:</label>
              <input
                id="start"
                v-model="secondDate"
                type="date"
                name="trip-end"
                min="2018-01-01"
                max="2018-12-31"
              >
            </div>
          </div>
          <button class="btn btn-outline-primary" @click="onFirstDaySet">
            Check date
          </button>
        </div>
      </form>
      <div v-if="errorMsg">{{errorMsg}}</div>
      <button type="button" class="btn btn-outline-success mt-3" @click="onSubmit">
        Create
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
