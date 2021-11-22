<template>
  <button class="btn" type="button"
    @click="$emit('changeContent')"
    >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ContentSwitcher'
}
</script>

<style>
.btn {
  width: 13.5%;
  background-color: var(--bg-blue);
}
</style>
