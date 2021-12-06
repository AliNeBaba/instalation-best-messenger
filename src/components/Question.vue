<template>
  <div class="question">
    <p>{{ content.title }}</p>
    <button
      @click="closeQuestion(true)"
      class="btn-answer"
      >
      <template v-if="lang === 'ru'">Ответ</template>
      <template v-else>Answer</template>
      <img src="~@/assets/img/ArrowNextBig.svg" />
    </button>
    <button class="sign-question" type="button"
      v-if="isSign"
      >
      <img src="~@/assets/img/SignLang.svg" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: ['content', 'lang', 'isSign'],
  emits: ['setAnswer', 'hideElements'],
  watch: {
    hide (newValue) {
      if (newValue) this.closeQuestion(false)
    }
  },
  methods: {
    closeQuestion (action) {
      if (action) {
        this.$emit('hideElements')
      }
      if (action) {
        this.$emit('setAnswer', this.content[0])
      }
    }
  }
}
</script>

<style>
.question {
  position: relative;
  top: .3rem;
  min-height: 13rem;
  border: 3px solid var(--bg-black);
  background-color: var(--bg-white);
  width: 41rem;
  padding: 2rem 8rem 3rem 2.5rem;
}
.question > p {
  margin-top: 0;
}
.btn-answer {
  background-color: var(--bg-black);
  position: absolute;
  right: -6.5rem;
  bottom: -.2rem;
  width: 20rem;
  height: 5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: var(--bg-white);
}
.sign-question {
  background-color: var(--bg-black);
  width: 6.7rem;
  height: 5rem;
  position: absolute;
  top: -.2rem;
  right: -.2rem;
}
</style>
