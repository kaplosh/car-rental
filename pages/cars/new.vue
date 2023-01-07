<script lang="ts">
import { Cars } from '~/lib/db';

export default {
  methods: {
    onSubmit () {
      const formData = new FormData((this as any).$refs.newCarForm);
      const car: any = Object.fromEntries(formData);
      car.seats = Number(car.seats);
      Cars.add(car);
      navigateTo('/listing');
    },

  },
};

</script>

<template>
  <div class="container">
    <div class="position-absolute top-50 start-50 translate-middle">
      <form ref="newCarForm">
        <input type="text" name="brand" placeholder="Manufacturer">
        <input type="text" name="type" placeholder="Type">
        <select class="form-select" type="number" name="seats" placeholder="Number of seats">
          <option selected>
            Choose a number of seats
          </option>
          <option value="2">
            2
          </option>
          <option value="4">
            4
          </option>
          <option value="5">
            5
          </option>
          <option value="8">
            8
          </option>
        </select>
        <input type="text" name="engine" placeholder="Engine type">
      </form>
      <button @click="onSubmit">
        Create
      </button>
    </div>
  </div>
</template>
