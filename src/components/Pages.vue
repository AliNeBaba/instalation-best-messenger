<template>
  <div class="paging color-white">
    <div v-for="n in getPages" :key="n" class="page"
      :class="{ 'color-blue': this.page + 1 === n }">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pages',
  props: ['length', 'page', 'items'],
  computed: {
    getPages () {
      return Math.ceil(this.length / this.items)
    }
  }
}
</script>
