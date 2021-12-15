<template>

  <transition
    name="sign"
    @before-enter="$emit('changeInput', true)"
    @enter="enter"
    @after-enter="$emit('changeInput', false)"
    @before-leave="$emit('changeInput', true)"
    @leave="leave"
    @after-leave="$emit('changeInput', false)"
    :css="false"
    >

      <div class="sign-block" v-if="content">
        <img :src="content" />
      </div>

  </transition>

</template>

<script>
import gsap from 'gsap'

export default {
  name: 'SignLang',
  props: ['content'],
  methods: {
    enter (el, done) {
      gsap.from(el, {
        duration: 0.2,
        opacity: 0,
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

<style>
.sign-block {
  position: fixed;
  right: 0;
  top: 51.8rem;
}
</style>
