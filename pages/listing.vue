<script lang="ts">
import { allCars } from '~/lib/db';

const cars = allCars;

export default {
  data () {
    return {
      allCars,
    };
  },

};
console.log(cars[0].id);
</script>

<template>
  <div class="m-4">
    <header>Car Rental</header>
    <div>
      <button class="btn btn-outline-primary m-2">
        Add Car
      </button>
      <main>
        <table class="table table-striped table-bordered m-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Manufacturer</th>
              <th>Type</th>
              <th>Engine</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="car in allCars" :key="car.id">
              <td>{{ car.id }}</td>
              <td>{{ car.brand }}</td>
              <td>{{ car.type }}</td>
              <td>{{ car.engine }}</td>
              <td>{{ car.seats }}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>
