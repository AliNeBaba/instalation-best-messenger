<template>
  <div class="block-answer color-white">
    <div class="blank color-black"></div>
    <p class="answer-question">{{ content[0] }}</p>
    <div class="line color-blue"></div>
    <p class="general-answer">{{ content[1] }}</p>
    <p class="answer-info">{{ content[2] }}</p>
    <button class="sign btn color-blue" type="button">
      <sign-lang />
    </button>
    <button
      @click="$emit('closeAnswer')"
      class="close btn color-blue" type="button">
      <cross-close />
    </button>
  </div>
</template>

<script>
import CrossClose from './SvgCrossClose.vue'
import SignLang from './SvgSignLang.vue'

export default {
  name: 'BlockAnswer',
  components: {
    'cross-close': CrossClose,
    'sign-lang': SignLang
  },
  props: ['content']
}
</script>
