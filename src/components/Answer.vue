<template>
    <div class="block-answer">
      <div class="blank"></div>
      <p class="answer-question">{{ content[0] }}</p>
      <div class="line"></div>
      <p class="general-answer">{{ content[1] }}</p>
      <p class="answer-info">{{ content[2] }}</p>
      <button class="sign" type="button"
        @click="$emit('setSignLang')"
        >
        <img src="~@/assets/img/SignLang.svg" />
      </button>
      <button class="close" type="button"
        @click="$emit('closeAnswer')"
        >
        <img src="~@/assets/img/Close.svg" />
      </button>
    </div>
</template>

<script>
export default {
  name: 'Answer',
  props: ['content'],
  emits: ['closeAnswer']
}
</script>

<style>
.block-answer {
  background-color: var(--bg-white);
  position: relative;
  width: 45rem;
  padding: 2.5rem 3.75rem 2.5rem 5rem;
}
.blank {
  background-color: var(--bg-black);
  position: absolute;
  top: -.1rem;
  right: -.1rem;
  width: 20rem;
  height: 1.9rem;
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
  background-color: var(--bg-blue);
  position: absolute;
  left: 4.5rem;
  bottom: -2.5rem;
  width: 6.6rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close {
  background-color: var(--bg-blue);
  position: absolute;
  right: -5rem;
  top: 3.3rem;
  width: 6.6rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
