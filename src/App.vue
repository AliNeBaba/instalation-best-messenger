<template>

<!--   Основное содержание (вопросы и ответы)   -->
  <div class="container color-black">
    <div v-for="item in currentQuestions" :key="item">
      <div v-show="showAnswer == false"
      class="block-question color-white">
        <div class="blank color-black"></div>
        <p>{{ item[0] }}</p>
        <button
          @click="setAnswer(item[0])"
          class="btn-answer color-blue"
          >
          <template v-if="lang == 'ru'">Ответ</template>
          <template v-else>Answer</template>
          <img src="~@/assets/img/ArrowNext.svg" />
        </button>
      </div>
    </div>
    <div v-if="showAnswer == true">
      <div class="block-answer color-white">
        <div class="blank color-black"></div>
        <p class="answer-question">{{ getAnswer[0] }}</p>
        <div class="line color-blue"></div>
        <p class="general-answer">{{ getAnswer[1] }} </p>
        <p class="answer-info">{{ getAnswer[2] }} </p>
        <button
          @click="setSignLang()"
          class="sign btn color-blue" type="button">
          <img src="~@/assets/img/SignLang.svg" />
        </button>
        <button
          @click="showAnswer = false"
          class="close btn color-blue" type="button">
          <img src="~@/assets/img/Close.svg" />
        </button>
      </div>
    </div>
    <img v-if="showSignLang" class="sign-block" src="~@/assets/img/sign-lang.png" />
  </div>

<!--   Футер   -->
  <div class="footer color-black">
      <button
        v-show="showAnswer == false"
        class="btn color-blue"
        type="button"
        @click="currentPage--"
        :disabled="currentPage == 0"
        >
        <img src="~@/assets/img/ArrowBack.svg" />
      </button>
      <div
        v-show="showAnswer == false"
        class="paging color-white"
        >
        <div v-for="n in getTotalPages" :key="n"
          class="page"
          :class="{ 'color-blue': this.currentPage + 1 == n }"
          >
        </div>
      </div>
      <button
        v-show="showAnswer == false"
        class="btn color-blue"
        type="button"
        @click="currentPage++"
        :disabled="currentPage == Math.ceil(articles[lang].length / itemsPerPage) - 1"
        >
        <img src="~@/assets/img/ArrowNext.svg" />
      </button>
    <button
      v-show="showAnswer == false"
      @click="setSignLang()"
      class="btn color-blue"
      type="button"
      >
      <img src="~@/assets/img/SignLang.svg" />
    </button>
    <button
      class="btn color-white"
      type="button"
      @click="lang == 'ru' ? lang = 'en' : lang = 'ru'"
      >
      <template v-if="lang == 'ru'">Eng</template>
      <template v-else>Ru</template>
    </button>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      articles: {
        ru: [],
        eng: []
      },
      currentPage: 0,
      itemsPerPage: 4,
      lang: 'ru',
      showAnswer: false,
      showSignLang: false,
      currentIndex: null
    }
  },
  created: function () {
    fetch('http://localhost:24567/getData')
      .then(response => response.json())
      .then(data => {
        for (const key in data.forms.messenger.articles) {
          this.articles[key] = Object.values(data.forms.messenger.articles[key])
        }
      })
  },
  computed: {
    currentQuestions () {
      const start = this.currentPage * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.articles[this.lang].slice(start, end)
    },
    getTotalPages () {
      return Math.ceil(this.articles.ru.length / this.itemsPerPage)
    },
    getAnswer () {
      return this.articles[this.lang][this.currentIndex]
    }
  },
  methods: {
    setAnswer (target) {
      this.currentIndex = this.articles[this.lang].findIndex(arr => arr[0] === target)
      this.showAnswer = true
    },
    setSignLang () {
      this.itemsPerPage = this.itemsPerPage === 4 ? 2 : 4
      this.showSignLang = !this.showSignLang
      this.currentPage = this.showSignLang ? this.currentPage * 2 : Math.ceil((this.currentPage - 1) / 2)
    }
  }
}
</script>
