<script>
export default {
  methods: {
    getFilter () {
      this.$emit('getFilter');
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <NuxtLink
        to="/cars/new"
        class="btn btn-outline-primary m-2"
      >
        Add Car
      </NuxtLink>
      <NuxtLink
        to="/home"
        class="btn btn-outline-warning ms-3"
      >
        Home
      </NuxtLink>
      <button class="btn btn-outline-primary ms-3" @click="getFilter">
        Filter
      </button>
    </div>
  </div>
</template>
