<template>
    <div class="block-answer">
      <div class="blank"></div>
      <p class="answer-question">{{ content[0] }}</p>
      <div class="line"></div>
      <p class="general-answer">{{ content[3] }}</p>
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
        <img src="~@/assets/img/ArrowBackBig.svg" />
        <template v-if="lang === 'ru'">Назад</template>
        <template v-else>Back</template>
      </button>
    </div>
</template>

<script>
export default {
  name: 'Answer',
  props: ['content', 'lang'],
  emits: ['closeAnswer']
}
</script>

<style>
.block-answer {
  background-color: var(--bg-white);
  position: relative;
  padding: 2.5rem 3.75rem 2.5rem 5rem;
}
.blank {
  background-color: var(--bg-blue);
  position: absolute;
  top: 0;
  right: 0;
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
</style>
