<template>
    <div class="question">
      <div class="blank"></div>
      <p>{{ content[0] }}</p>
      <button
        @click="closeQuestion(true)"
        class="btn-answer"
        >
        <template v-if="lang === 'ru'">Ответ</template>
        <template v-else>Answer</template>
        <img src="~@/assets/img/ArrowNext.svg" />
      </button>
    </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'Question',
  props: ['content', 'lang', 'hide'],
  emits: ['setAnswer', 'hideElements'],
  mounted () {
    new Promise(function (resolve, reject) {
      gsap.to('.question', { duration: 3, opacity: 1, onComplete: resolve })
    }).then(function () {
      console.log('ok answer')
    })
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
  opacity: 0;
  background-color: var(--bg-white);
  width: 45rem;
  padding: 2.5rem 3.75rem 2.5rem 5rem;
  margin-bottom: 5rem;
}
.blank {
  background-color: var(--bg-black);
  position: absolute;
  top: -.1rem;
  right: -.1rem;
  width: 20rem;
  height: 1.9rem;
}
.btn-answer {
  background-color: var(--bg-blue);
  position: absolute;
  left: 6.5rem;
  bottom: -2.5rem;
  width: 17rem;
  height: 5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: var(--bg-white);
}
</style>
