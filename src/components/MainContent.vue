<template>
  <div class="main">

    <section v-for="item in filteredArticles" :key="item">

      <div v-if="targetIndex === undefined">
        <block-question class="q-position"
          @set-answer="setAnswer($event)"
          @set-sign="setSign($event)"
          :isSign="sign"
          :content="item"
          :lang="lang"
          />
      </div>

      <block-answer
        v-else
        @set-sign-lang="setSignLang()"
        @close-answer="closeAnswer"
        :content="item"
        :lang="lang"
        />

    </section>

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
  props: ['articles', 'sign', 'lang'],
  data () {
    return {
      targetIndex: undefined
    }
  },
  computed: {
    filteredArticles () {
      return !(this.targetIndex === undefined) ? this.articles.slice(this.targetIndex, this.targetIndex + 1) : this.articles
    }
  },
  methods: {
    setAnswer (target) {
      this.targetIndex = this.articles.findIndex(arr => arr[0] === target)
      this.$emit('hideElements')
    },
    closeAnswer () {
      this.targetIndex = undefined
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
section {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
section > div {
  margin-left: 2.5rem;
}
section:nth-child(1) .q-position {
  margin-top: 6rem;
}
section:nth-child(2) .q-position {
  top: 1.3rem;
  left: -1.4rem;
}
section:nth-child(2) > div {
  width: 41rem;
  border: 3px solid var(--bg-black);
  background-color: var(--bg-white);
  margin-left: 3.8rem;
  margin-top: 2.5rem;
  margin-bottom: 2.7rem;
}
section:nth-child(4) .q-position {
  top: -1.3rem;
  left: -1.4rem;
}
section:nth-child(4) > div {
  width: 41rem;
  border: 3px solid var(--bg-black);
  background-color: var(--bg-white);
  margin-left: 3.8rem;
  margin-top: 3.8rem;
}
</style>
