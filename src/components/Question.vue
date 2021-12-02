<template>
    <div class="question">
      <p>{{ content[0] }}</p>
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
import gsap from 'gsap'

export default {
  name: 'Question',
  props: ['content', 'lang', 'isSign'],
  emits: ['setAnswer', 'hideElements'],
  mounted () {
    gsap.to('.question', { duration: 3, opacity: 1 })
  },
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
      new Promise(function (resolve, reject) {
        gsap.to('.question', { duration: 1, opacity: 0, onComplete: resolve })
      }).then(function () {
        if (action) {
          this.$emit('setAnswer', this.content[0])
        }
      }.bind(this))
    }
  }
}
</script>

<style>
.question {
  position: relative;
  min-height: 13rem;
  opacity: 0;
  border: 3px solid var(--bg-black);
  background-color: var(--bg-white);
  width: 41rem;
  padding: 2rem 10rem 3rem 2.5rem;
  margin-left: 2.5rem;
  margin-top: 2.5rem;
}
.question > p {
  margin-top: 0;
}
.btn-answer {
  background-color: var(--bg-black);
  position: absolute;
  right: -8rem;
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
