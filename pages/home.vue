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
    <div class="d-flex vh-100">
      <main class="d-flex flex-column m-auto align-self-center ">
        <header class="d-flex mb-4 align-self-center">
          Kaplosh's Car Rental
        </header>
        <div class="d-flex align-self-center ">
          <NuxtLink to="/cars/listing" class="btn btn-outline-primary mb-3">
            Car list
          </NuxtLink>
        </div>
        <div class="d-flex align-self-center ">
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
