<template>
  <div class="main">

    <block-question
      @set-answer="setAnswer($event)"
      @questions-hidden="readyToNextQuestions = true"
      @change-input="$emit('changeInput', $event)"
      :flag-block-input="flagBlockInput"
      :isSign="sign"
      :content="showArticles"
      :lang="lang"
      />

    <block-answer
      @answer-hidden="$emit('changeShowAnswer', $event)"
      @change-input="$emit('changeInput', $event)"
      @close-answer="closeAnswer"
      :flag-block-input="flagBlockInput"
      :isSign="sign"
      :content="filteredArticles"
      :lang="lang"
      />

    <sign-lang v-if="sign" />

  </div>
</template>

<script>
import Answer from '@/components/Answer.vue'
import Question from '@/components/Question.vue'
import Sign from '@/components/SignLang.vue'

export default {
  name: 'MainContent',
  components: {
    'block-question': Question,
    'block-answer': Answer,
    'sign-lang': Sign
  },
  props: ['articles', 'sign', 'lang', 'flagBlockInput', 'changePage'],
  emits: ['changeShowAnswer', 'changeInput', 'questionsHidden'],
  data () {
    return {
      answerIndex: undefined,
      readyToNextQuestions: true,
      answerHidden: true,
      readyToShowAnswer: false
    }
  },
  computed: {
    filteredArticles () {
      return this.readyToShowAnswer ? this.articles[this.answerIndex] : undefined
    },
    showArticles () {
      return this.flagToShowAnswers ? this.articles : {}
    },
    flagToShowAnswers () {
      return (this.answerIndex === undefined) && this.readyToNextQuestions
    }
  },
  watch: {
    answerHidden (newValue) {
      if (newValue) {
        this.$emit('changeShowAnswer')
      }
    },
    changePage () {
      this.readyToNextQuestions = false
    },
    lang () {
      this.readyToNextQuestions = false
    }
  },
  methods: {
    setAnswer (target) {
      this.$emit('changeShowAnswer', true)
      this.answerIndex = this.articles.findIndex(arr => arr.title === target)
      new Promise(function (resolve, reject) {
        setTimeout(() => resolve(), 500)
      }).then(function () {
        this.readyToShowAnswer = true
      }.bind(this))
    },
    closeAnswer () {
      this.readyToShowAnswer = false
      new Promise(function (resolve, reject) {
        setTimeout(() => resolve(), 500)
      }).then(function () {
        this.answerIndex = undefined
      }.bind(this))
    }
  }
}
</script>

<style>
.main {
  height: 93.75%;
  width: 100%;
}
span {
  display: inline-block;
  transform: translateX(200px);
  visibility: hidden;
}
</style>
