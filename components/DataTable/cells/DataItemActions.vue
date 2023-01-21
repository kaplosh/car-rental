<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Car } from '~/lib/types';

export default defineComponent({
  props: {
    car: { type: Object as PropType<Car>, required: true },
    actions: { type: Object as PropType<any[]>, required: true },

  },
});

</script>

<template>
  <div>
    <button v-for="action in actions" :key="action.name" class="btn btn-outline-danger" @click="action.action(car)">
      {{ action.caption }}
    </button>
  </div>
</template>
