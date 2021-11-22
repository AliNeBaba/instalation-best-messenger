<template>
  <div class="block-question color-white">
    <div class="blank color-black"></div>
    <p>{{ content }}</p>
    <button
      @click="$emit('setAnswer')"
      class="btn-answer color-blue"
      >
      <template v-if="lang === 'ru'">Ответ</template>
      <template v-else>Answer</template>
      <img src="~@/assets/img/ArrowNext.svg" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: ['content', 'lang']
}
</script>
