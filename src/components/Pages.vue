<template>
  <div class="paging color-white">
    <div v-for="n in getPages" :key="n" class="page"
      :class="{ 'bg-blue': this.page + 1 === n }">
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'Pages',
  props: ['length', 'page', 'items', 'hide'],
  computed: {
    getPages () {
      return Math.ceil(this.length / this.items)
    }
  },
  watch: {
    hide (newValue) {
      if (newValue) {
        gsap.to('.paging', { duration: 1, opacity: 0 })
      } else {
        gsap.to('.paging', { duration: 1, opacity: 1 })
      }
    }
  }
}
</script>

<style>
.paging {
  background-color: var(--bg-white);
  width: 46%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page {
  height: 25px;
  width: 25px;
  border: 6px solid var(--bg-blue);
  border-radius: 50%;
  margin: auto 6px;
}
.bg-blue {
  background-color: var(--bg-blue);
}
</style>
