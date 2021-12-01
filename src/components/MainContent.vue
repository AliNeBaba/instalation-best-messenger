<template>
  <div class="main">

    <div class="container"
         v-for="item in filteredArticles" :key="item">

      <block-question
        v-if="!target"
        @set-answer="setAnswer($event)"
        :content="item"
        :lang="lang"
        />
      <block-answer
        v-else
        :content="item"
        @set-sign-lang="setSignLang()"
        @close-answer="closeAnswer"
        />
      <sign-lang v-if="sign" />

    </div>

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
  props: ['articles', 'sign', 'lang'],
  data () {
    return {
      target: undefined
    }
  },
  computed: {
    filteredArticles () {
      return this.target ? this.articles.filter(arr => arr[0] === this.target) : this.articles
    }
  },
  methods: {
    setAnswer (target) {
      this.target = target
      this.$emit('hideElements')
    },
    closeAnswer () {
      this.target = undefined
      this.$emit('hideElements')
    }
  }
}
</script>

<style>
.main {
  height: 93.75%;
  width: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
