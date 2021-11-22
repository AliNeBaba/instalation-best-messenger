<template>

  <div class="container color-black">

    <block-question v-show="showAnswer === false"
      v-for="item in currentQuestions" :key="item"
      @set-answer="setAnswer(item[0])"
      :content="item[0]"
      :lang="lang"
      />
    <block-answer v-if="showAnswer === true"
        :content="getAnswer"
        @set-sign-lang="setSignLang()"
        @close-answer="showAnswer = false"
        />

    <sign-lang v-if="showSignLang" />

  </div>

  <div class="footer color-black">

    <content-switcher v-show="showAnswer === false"
      @change-content="paginationState.currentPage--"
      :disabled="paginationState.currentPage === 0">
      <img src="~@/assets/img/ArrowBack.svg" />
    </content-switcher>

    <pages-info v-show="showAnswer === false"
      :length="articles.ru.length"
      :page="paginationState.currentPage"
      :items="paginationState.itemsPerPage"
      />

    <content-switcher v-show="showAnswer === false"
      @change-content="paginationState.currentPage++"
      :disabled="paginationState.currentPage === Math.ceil(articles[lang].length / paginationState.itemsPerPage) - 1">
      <img src="~@/assets/img/ArrowNext.svg" />
    </content-switcher>

    <content-switcher v-show="showAnswer === false"
      @change-content="setSignLang()">
      <img src="~@/assets/img/SignLang.svg" />
    </content-switcher>

    <button
      class="btn color-white"
      type="button"
      @click="lang === 'ru' ? lang = 'en' : lang = 'ru'"
      >
      <template v-if="lang === 'ru'">Eng</template>
      <template v-else>Ru</template>
    </button>
  </div>
</template>

<script>
import Answer from '@/components/Answer.vue'
import Question from '@/components/Question.vue'
import Sign from '@/components/SignLang.vue'
import ContentSwitcher from '@/components/ContentSwitcher.vue'
import Pages from '@/components/Pages.vue'

export default {
  name: 'App',
  components: {
    'block-answer': Answer,
    'block-question': Question,
    'sign-lang': Sign,
    'content-switcher': ContentSwitcher,
    'pages-info': Pages
  },
  data () {
    return {
      articles: {
        ru: [],
        eng: []
      },
      paginationState: {
        currentPage: 0,
        itemsPerPage: 4
      },
      lang: 'ru',
      showAnswer: false,
      showSignLang: false,
      currentIndex: null,
      idleTimer: null
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
  mounted: function () {
    document.addEventListener('mousedown', this.loadIdleTimer)
  },
  computed: {
    currentQuestions () {
      const start = this.paginationState.currentPage * this.paginationState.itemsPerPage
      const end = start + this.paginationState.itemsPerPage
      return this.articles[this.lang].slice(start, end)
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
      this.paginationState.itemsPerPage = this.paginationState.itemsPerPage === 4 ? 2 : 4
      this.showSignLang = !this.showSignLang
      this.paginationState.currentPage = this.showSignLang
        ? this.paginationState.currentPage * 2
        : Math.ceil((this.paginationState.currentPage - 1) / 2)
    },
    loadIdleTimer () {
      clearTimeout(this.idleTimer)
      this.idleTimer = setTimeout(this.resetPage, 15000)
    },
    resetPage () {
      this.paginationState.currentPage = 0
      this.showAnswer = false
      this.showSignLang = false
      this.paginationState.itemsPerPage = 4
      this.lang = 'ru'
    }
  }
}
</script>
