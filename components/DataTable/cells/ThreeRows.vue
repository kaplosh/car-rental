<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});

</script>

<template>
  <div class="three-rows">
    <slot />
  </div>
</template>

<style scoped>
.three-rows {
  word-wrap: break-word;
  overflow: hidden;
  max-height: 4.5em;
}
</style>
