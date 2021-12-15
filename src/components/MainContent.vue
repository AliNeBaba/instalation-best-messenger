<template>
  <div class="main">

    <block-question
      @set-answer="setAnswer($event)"
      @questions-hidden="isReadyToNext = true"
      @change-input="$emit('changeInput', $event)"
      @set-sign-question="setSignQuestion"
      :flag-block-input="flags.blockInput"
      :isSign="flags.showSignLang"
      :content="showArticles"
      :lang="lang"
      />

    <block-answer
      @answer-hidden="$emit('changeShowAnswer', $event)"
      @change-input="$emit('changeInput', $event)"
      @close-answer="closeAnswer"
      @set-local-sign="flagSignLocalAnswer = !this.flagSignLocalAnswer"
      :flag-block-input="flags.blockInput"
      :isSign="flags.showSignLang"
      :content="filteredArticle"
      :lang="lang"
      />

    <sign-lang
      :content="showSign"
      />

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
  props: ['articles', 'flags', 'lang', 'changePage'],
  emits: ['addPage', 'changeShowAnswer', 'changeInput', 'questionsHidden', 'setSign'],
  data () {
    return {
      answerTarget: undefined,
      isReadyToNext: false,
      flagSignLocalAnswer: false,
      signLocalQuestion: undefined
    }
  },
  computed: {
    filteredArticle () {
      return this.isReadyToNext ? this.articles[this.answerTarget] : undefined
    },
    showArticles () {
      return !this.flags.showAnswer && this.isReadyToNext ? this.articles : {}
    },
    showSign () {
      return this.flags.showSignLang ? this.signDefault : this.showSignAnswer
    },
    signDefault () {
      return this.flags.showAnswer ? this.showSignAnswer : this.showSignLocalQuestion
    },
    showSignAnswer () {
      return this.flagSignLocalAnswer ? this.articles[this.answerTarget].RZY : undefined
    },
    showSignLocalQuestion () {
      return this.signLocalQuestion ? this.signLocalQuestion : 'http://localhost:24567/video.jpg'
    }
  },
  watch: {
    articles: {
      handler: function () {
        this.isReadyToNext = !this.isReadyToNext
      },
      deep: true
    },
    lang () {
      this.isReadyToNext = false
    }
  },
  methods: {
    setAnswer (target) {
      this.isReadyToNext = false
      this.$emit('changeShowAnswer', true)
      this.answerTarget = this.articles.findIndex(art => art.title === target)
      if (this.flags.showSignLang) {
        this.flagSignLocalAnswer = true
        this.signLocalQuestion = undefined
      }
    },
    closeAnswer () {
      if (this.flagSignLocalAnswer && this.flags.showSignLang) {
        this.flagSignLocalAnswer = false
      } else if (this.flagSignLocalAnswer) {
        this.isReadyToNext = false
        this.$emit('setSign')
        this.flagSignLocalAnswer = false
        if (this.answerTarget > 1) {
          this.$emit('addPage')
        }
      } else if (this.flags.showSignLang) {
        this.isReadyToNext = false
        this.$emit('setSign')
      }
      this.answerTarget = undefined
      this.signLocalQuestion = undefined
    },
    setSignQuestion (target) {
      this.signLocalQuestion = target
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
  transform: translateX(50px);
  visibility: hidden;
}
</style>
