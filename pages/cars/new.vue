<script lang="ts">
import { Cars } from '~/lib/db';

export default {
  data () {
    return {
      errorMessage: null,
    };
  },

  methods: {
    onSubmit () {
      const c = this as any;
      c.errorMessage = null;

      const formData = new FormData((this as any).$refs.newCarForm);
      const car: any = Object.fromEntries(formData);
      car.seats = Number(car.seats);

      console.log(!car.brand);
      if (!car.brand) {
        (this as any).errorMessage = 'Brand is empty!';
      } else if (!car.type) {
        c.errorMessage = 'Type is empty!';
      } else if (!car.seats) {
        c.errorMessage = 'Seats are not set!';
      }

      if ((this as any).errorMessage) return;

      Cars.add(car);
      console.log(car);
      navigateTo('/listing');
    },

  },
};

</script>

<template>
  <div class="container">
    <div class="position-absolute top-50 start-50 translate-middle">
      <form ref="newCarForm">
        <div class="input-group mb-3">
          <span class="input-group-text">Set car manufacturer and type</span>
          <input id="brandInpuut" type="text" name="brand" placeholder="Manufacturer">
          <input id="typeInput" type="text" name="type" placeholder="Type">
        </div>
        <div class="mb-3">
          <label for="seatSelect">Set a number of seats</label>
          <select id="seatSelect" class="form-select" type="number" name="seats">
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
        </div>
        <div class="form-check form-check-inline mb-2">
          <input id="flexRadioEngineNafta" class="form-check-input" type="radio" name="engine" value="N">
          <label class="form-check-label" for="flexRadioEngine">Nafta</label>
        </div>
        <div class="form-check form-check-inline mb-2">
          <input id="flexRadioEngineBenzin" class="form-check-input" type="radio" name="engine" value="B">
          <label class="form-check-label" for="flexRadioEngine">Benzin</label>
        </div>
        <div class="form-check form-check-inline mb-2">
          <input id="flexRadioEngineElectric" class="form-check-input" type="radio" name="engine" value="E">
          <label class="form-check-label" for="flexRadioEngine">Electric</label>
        </div>
      </form>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        Form is not completed!
        {{ errorMessage }}
      </div>
      <button type="button" class="btn btn-outline-success mt-3" @click="onSubmit">
        Create
      </button>
    </div>
  </div>
</template>
