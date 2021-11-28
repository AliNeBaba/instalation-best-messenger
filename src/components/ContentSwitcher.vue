<template>
  <button class="btn" type="button"
    @click="$emit('changeContent')"
    >
    <slot></slot>
  </button>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'ContentSwitcher',
  props: ['hide'],
  watch: {
    hide (newValue) {
      if (newValue) {
        gsap.to('.btn', { duration: 1, opacity: 0 })
      } else {
        gsap.to('.btn', { duration: 1, opacity: 1 })
      }
    }
  }
}
</script>

<style>
.btn {
  opacity: 1;
  width: 13.5%;
  background-color: var(--bg-blue);
}
</style>
