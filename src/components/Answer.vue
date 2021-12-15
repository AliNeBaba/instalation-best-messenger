<template>

  <transition
    name="answer"
    @enter="enter"
    @after-enter="$emit('changeInput', false)"
    @before-leave="$emit('changeInput', true)"
    @leave="leave"
    @after-leave="$emit('answerHidden', false)"
    :css="false"
    >

    <div class="block-answer" v-if="!(content === undefined)">

      <div class="blank"></div>
      <p class="answer-question" v-html="content.title"></p>
      <div class="line"></div>
      <p v-html="content.shortAnswer"></p>
      <p class="margin" v-html="correctFirstResponse"></p>
      <p class="margin correct" v-html="correctSecondResponse"></p>
      <p class="answer-info correct" v-html="content.agenda"></p>

      <button class="sign" type="button"
        @click="$emit('setLocalSign')"
        :disabled="flagBlockInput"
        >
        <img src="~@/assets/img/SignLang.svg" />
      </button>

      <button class="close" type="button"
        @click="$emit('closeAnswer')"
        :disabled="flagBlockInput"
        >
        <img src="~@/assets/img/ArrowBackBig.svg" />
        <template v-if="lang === 'ru'">Назад</template>
        <template v-else>Back</template>
      </button>

    </div>

  </transition>

</template>

<script>
import gsap from 'gsap'

export default {
  name: 'Answer',
  props: ['content', 'lang', 'isSign', 'flagBlockInput'],
  emits: ['changeInput', 'answerHidden', 'closeAnswer', 'setLocalSign'],
  computed: {
    splitRZY () {
      return this.content.RZY_text.split('|')
    },
    correctFirstResponse () {
      return this.isSign ? this.splitRZY[0] : this.content.response
    },
    correctSecondResponse () {
      return this.isSign ? this.splitRZY[1] : undefined
    }
  },
  methods: {
    enter (el, done) {
      gsap.timeline().from(el, {
        duration: 0.2,
        opacity: 0
      }).to('span', {
        visibility: 'visible',
        x: 0,
        stagger: {
          amount: 0.4,
          ease: 'none'
        },
        onComplete: done
      })
    },
    leave (el, done) {
      gsap.to(el, {
        duration: 0.2,
        opacity: 0,
        onComplete: done
      })
    }
  }
}
</script>

//  Styles for spans are into MainContent.vue
<style>
.block-answer {
  margin-left: 2.5rem;
  background-color: var(--bg-white);
  position: relative;
  padding: 2.5rem 3.75rem 2.5rem 5rem;
}
.blank {
  background-color: var(--bg-blue);
  position: absolute;
  top: 1px;
  right: 1px;
  width: 20rem;
  height: 4rem;
}
.line {
  background-color: var(--bg-blue);
  width: 30%;
  height: .6rem;
}
.answer-question {
  font-family: var(--font-halvar);
  font-size: var(--halvar-big);
}
.answer-info {
  font-size: var(--atlas-medium);
}
.sign {
  background-color: var(--bg-black);
  position: absolute;
  left: 41.1rem;
  top: 46.67rem;
  width: 6.4rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close {
  background-color: var(--bg-black);
  position: absolute;
  left: -2.4rem;
  bottom: -5rem;
  width: 20rem;
  height: 5rem;
  display: flex;
  justify-content: space-evenly;
  color: var(--bg-white);
  align-items: center;
}
.margin {
  margin-top: 0;
  margin-bottom: 0;
}
.correct {
  margin-right: 10rem;
}
</style>
