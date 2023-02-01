<script lang="ts">
export default {
  data () {
    return {
    };
  },

};
</script>

<template>
  <div class="container">
    <div class="d-flex mt-5 justify-content-center">
      <main class="d-flex flex-column">
        <header class="mb-4 align-self-center">
          Kaplosh's Car Rental
        </header>
        <div class="align-self-center ">
          <NuxtLink to="/cars/listing" class="btn btn-outline-primary mb-3">
            Car list
          </NuxtLink>
        </div>
        <div class="align-self-center ">
          <NuxtLink to="" class="btn btn-outline-primary mb-3">
            Customers
          </NuxtLink>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>
