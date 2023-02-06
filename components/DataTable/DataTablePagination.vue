<script>
export default {
  props: [ 'totalPages' ],
  data () {
    return {};
  },
  computed: {
    items () {
      console.log(this.totalPages);
      return new Array(this.totalPages);
    },
  },
};
</script>

<template>
  <main>
    <div class="d-flex justify-content-end">
      <button v-for="(_, index) in items" :key="index" class="btn btn-outline-primary" @click="$emit('select', index + 1)">
        {{ index + 1 }}
      </button>
    </div>
  </main>
</template>

<style lang="scss" scoped>

</style>
