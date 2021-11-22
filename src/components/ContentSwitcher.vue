<template>
  <button class="btn color-blue" type="button"
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
