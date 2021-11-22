<template>
  <div class="question">
    <div class="blank"></div>
    <p>{{ content }}</p>
    <button
      @click="$emit('setAnswer')"
      class="btn-answer"
      >
      <template v-if="lang === 'ru'">Ответ</template>
      <template v-else>Answer</template>
      <img src="~@/assets/img/ArrowNext.svg" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: ['content', 'lang']
}
</script>

<style>
.question {
  position: relative;
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
