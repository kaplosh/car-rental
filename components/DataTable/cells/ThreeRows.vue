<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Car } from '~/lib/types';

export default defineComponent({
  props: {
    car: { type: Object as PropType<Car>, required: true },
  },
});

</script>

<template>
  <div class="three-rows">
    {{ car.brand }}
  </div>
</template>

<style scoped>
.three-rows {
  word-wrap: break-word;
  overflow: hidden;
  max-height: 4.5em;
}
</style>
