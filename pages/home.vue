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
    <main class="d-flex flex-column position-absolute top-50 start-50 translate-middle">
      <header class="mb-4">
        Kaplosh's Car Rental
      </header>
      <div>
        <NuxtLink to="/cars/listing" class="btn btn-outline-primary mb-3">
          Car list
        </NuxtLink>
      </div>
      <div>
        <NuxtLink to="" class="btn btn-outline-primary mb-3">
          Customers
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
