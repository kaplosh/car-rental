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
      <main class="d-flex flex-column align-items-center">
        <header class="mb-4">
          Kaplosh's Car Rental
        </header>
          <NuxtLink to="/cars/listing" class="btn btn-outline-primary mb-3">
            Car list
          </NuxtLink>
          <NuxtLink to="/rentals/new" class="btn btn-outline-primary mb-3">
            Rentals
          </NuxtLink>
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>
