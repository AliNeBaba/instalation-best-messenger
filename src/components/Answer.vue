<template>
  <div class="block-answer color-white">
    <div class="blank color-black"></div>
    <p class="answer-question">{{ content[0] }}</p>
    <div class="line color-blue"></div>
    <p class="general-answer">{{ content[1] }}</p>
    <p class="answer-info">{{ content[2] }}</p>
    <button class="sign btn color-blue" type="button"
      @click="$emit('setSignLang')"
      >
      <img src="~@/assets/img/SignLang.svg" />
    </button>
    <button class="close btn color-blue" type="button"
      @click="$emit('closeAnswer')"
      >
      <img src="~@/assets/img/Close.svg" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Answer',
  props: ['content']
}
</script>
