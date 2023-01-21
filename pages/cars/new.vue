<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  data () {
    return {
      errorMessage: null as null | string,
    };
  },

  methods: {
    async onSubmit () {
      this.errorMessage = null;

      const formData = new FormData((this as any).$refs.newCarForm);
      const car: any = Object.fromEntries(formData);
      car.seats = Number(car.seats);

      if (!car.brand) {
        this.errorMessage = 'Brand is empty!';
      } else if (!car.type) {
        this.errorMessage = 'Type is empty!';
      } else if (!car.seats) {
        this.errorMessage = 'Seats are not set!';
      } else if (!car.engine) {
        this.errorMessage = 'Engine type is not set!';
      }

      if (this.errorMessage) return;

      const result = await this.$db.create('cars', car);
      if (result.ok) {
        navigateTo('/cars/listing')
      } else {
        this.errorMessage = result.error.message
      }
      // TODO if not OK, then set errorMessage
    },

  },
});
</script>

<template>
  <div class="container">
    <div class="position-absolute top-50 start-50 translate-middle">
      <form ref="newCarForm">
        <div class="input-group mb-3">
          <span class="input-group-text">Set car manufacturer and type</span>
          <input id="brandInput" type="text" name="brand" placeholder="Manufacturer">
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
          <label class="form-check-label" for="flexRadioEngineNafta">Nafta</label>
        </div>
        <div class="form-check form-check-inline mb-2">
          <!-- TODO id inputu musi odpovidat label "for", aby klinuti na lebla byl klik na input-->
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
      <div class="mt-2 ">
        <button type="button" class="btn btn-outline-success" @click="onSubmit">
          Create
        </button>
        <NuxtLink
          to="/cars/listing"
          class="ms-2 btn btn-outline-primary"
        >
          Cancel
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
