<script lang="ts">
import { Cars } from '~/lib/db';
import { usedCarIds } from '~/lib/id';

export default {
  data () {
    return {
      allCars: Cars.list,
      usedCarIds,
    };
  },
  methods: {
    onDelete (id) {
      Cars.delete(id);
    },
  },
};
</script>

<template>
  <div class="container">
    <header class="m-3">
      Car Rental
    </header>
    <main>
      <table class="table table-striped table-bordered m-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Manufacturer</th>
            <th>Type</th>
            <th>Engine</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in allCars" :key="car.id">
            <td>{{ car.id }}</td>
            <td>{{ car.brand }}</td>
            <td>{{ car.type }}</td>
            <td>{{ car.engine }}</td>
            <td>{{ car.seats }}</td>
            <td>
              <button class="btn btn-outline-danger" @click="onDelete(car.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<style scoped>

</style>
