<script>
export default {
  name: 'New',
};
</script>

<template>
  <div class="container">
    <div class="position-absolute top-50 start-50 translate-middle">
      <form ref="newCustomerForm">
        <div class="mb-3">
          <label for="firstNameInput" class="form-label">First name</label>
          <input id="firstNameInput" type="text" name="firstName" class="form-control">
        </div>
        <div class="mb-3">
          <label for="lastNameInput" class="form-label">Last name</label>
          <input id="lastNameInput" type="text" name="firstName" class="form-control">
        </div>
        <div class="mb-3">
          <label for="emailInput" class="form-label">Email</label>
          <input id="emailInput" type="email" name="email" class="form-control">
        </div>
        <div class="mb-3">
          <label for="phoneInput" class="form-label">Phone number</label>
          <input id="phoneNumberInput" type="text" name="phone" class="form-control">
        </div>
        <div class="mb-3">
          <label for="addressInput" class="form-label">Address</label>
          <input id="addressInput" type="text" name="address" class="form-control">
        </div>
        <div class="mb-3">
          <label for="cityInput" class="form-label">City</label>
          <input id="cityInput" type="text" name="city" class="form-control">
        </div>
        <div class="mb-3">
          <label for="countryInput" class="form-label">Country</label>
          <input id="countryInput" type="text" name="country" class="form-control">
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

<style scoped>

</style>
