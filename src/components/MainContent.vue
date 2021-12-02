<template>
  <div class="main">

    <section v-for="item in filteredArticles" :key="item">

      <block-question
        v-if="!target"
        @set-answer="setAnswer($event)"
        @set-sign="setSign($event)"
        :isSign="sign"
        :content="item"
        :lang="lang"
        >
      </block-question>

      <block-answer
        v-else
        @set-sign-lang="setSignLang()"
        @close-answer="closeAnswer"
        :content="item"
        :lang="lang"
        />
      <sign-lang v-if="sign" />

    </section>

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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
