<template>
  <div class="main">

      <transition mode="out-in"
        @enter="enter"
        @leave="leave"
        :css="false"
        >
        <div v-if="targetIndex === undefined">
          <transition-group
            @enter="enter"
            @leave="leave"
            :css="false"
            >
            <block-question
              v-for="item in filteredArticles" :key="item"
              @set-answer="setAnswer($event)"
              :isSign="sign"
              :content="item"
              :lang="lang"
              />
          </transition-group>
        </div>

        <block-answer
          v-else
          @close-answer="closeAnswer"
          :content="filteredArticles"
          :lang="lang"
          />
      </transition>

    <sign-lang v-if="sign" />

  </div>
</template>

<script>
import gsap from 'gsap'

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
      return !(this.targetIndex === undefined) ? this.articles[this.targetIndex] : this.articles
    }
  },
  methods: {
    enter (el, done) {
      console.log(el, 'enter')
      gsap.timeline().from(el, {
        duration: 2,
        opacity: 0,
        onComplete: done
      })
    },
    leave (el, done) {
      console.log(el, 'leave')
      gsap.timeline().to(el, {
        duration: 2,
        opacity: 0,
        onComplete: done
      })
    },
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
</style>
