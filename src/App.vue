<template>
  <div class="main">

    <block-question v-for="item in currentQuestions" :key="item"
      @set-answer="setAnswer($event)"
      @hide-elements="hideElements"
      :hide="changeQuestions"
      :content="item"
      :lang="lang"
      />
    <block-answer
      :content="currentAnswer"
      @set-sign-lang="setSignLang()"
      @close-answer="closeAnswer"
      />
    <sign-lang v-if="showSignLang" />

  </div>

  <div class="footer">

    <content-switcher
      @change-content="changeContent('sub')"
      :hide="hideToShowAnswer"
      :disabled="paginationState.currentPage === 0">
      <img src="~@/assets/img/ArrowBack.svg" />
    </content-switcher>
    <pages-info
      :hide="hideToShowAnswer"
      :length="articles.ru.length"
      :page="paginationState.currentPage"
      :items="paginationState.itemsPerPage"
      />
    <content-switcher
      :hide="hideToShowAnswer"
      @change-content="changeContent('add')"
      :disabled="paginationState.currentPage === Math.ceil(articles[lang].length / paginationState.itemsPerPage) - 1">
      <img src="~@/assets/img/ArrowNext.svg" />
    </content-switcher>
    <content-switcher
      :hide="hideToShowAnswer"
      @change-content="setSignLang()">
      <img src="~@/assets/img/SignLang.svg" />
    </content-switcher>
    <button
      class="lang-btn"
      type="button"
      @click="changeLang"
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
      currentAnswer: [],
      currentQuestions: [],
      lang: 'ru',
      hideToShowAnswer: false,
      changeQuestions: false,
      showSignLang: false,
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
        this.setQuestions('')
      })
  },
  mounted: function () {
    document.addEventListener('mousedown', this.loadIdleTimer)
  },
  compuded: {
  },
  methods: {
    changeContent (action) {
      this.changeQuestions = true
      new Promise(function (resolve, reject) {
        setTimeout(() => resolve(action), 1000)
      }).then(function (action) {
        this.changeQuestions = false
        this.setQuestions(action)
      }.bind(this))
    },
    setQuestions (action) {
      if (action) {
        action === 'add'
          ? this.paginationState.currentPage++
          : this.paginationState.currentPage--
      }
      const start = this.paginationState.currentPage * this.paginationState.itemsPerPage
      const end = start + this.paginationState.itemsPerPage
      this.currentQuestions = this.articles[this.lang].slice(start, end)
    },
    setAnswer (target) {
      const index = this.articles[this.lang].findIndex(arr => arr[0] === target)
      this.currentQuestions = []
      this.currentAnswer = this.articles[this.lang][index]
    },
    closeAnswer () {
      new Promise(function (resolve, reject) {
        this.currentAnswer = []
        setTimeout(() => resolve(), 1000)
      }.bind(this)).then(function () {
        this.setQuestions('')
        this.hideToShowAnswer = false
      }.bind(this))
    },
    hideElements () {
      this.hideToShowAnswer = true
    },
    setSignLang () {
      this.paginationState.itemsPerPage = this.paginationState.itemsPerPage === 4 ? 2 : 4
      this.setQuestions('')
      this.showSignLang = !this.showSignLang
      this.paginationState.currentPage = this.showSignLang
        ? this.paginationState.currentPage * 2
        : Math.ceil((this.paginationState.currentPage - 1) / 2)
    },
    changeLang () {
      this.lang === 'ru' ? this.lang = 'en' : this.lang = 'ru'
      this.setQuestions('')
    },
    loadIdleTimer () {
      clearTimeout(this.idleTimer)
      this.idleTimer = setTimeout(this.resetPage, 15000)
    },
    resetPage () {
      this.paginationState.currentPage = 0
      this.showSignLang = false
      this.paginationState.itemsPerPage = 4
      this.lang = 'ru'
      this.closeAnswer()
    }
  }
}
</script>

<style>
@font-face {
    font-family: 'Halvar Breit Rg';
    src: url('~@/assets/fonts/HalvarBreit-Rg.eot');
    src: local('Halvar Breitschrift Regular'), local('HalvarBreit-Rg'),
        url('~@/assets/fonts/HalvarBreit-Rg.eot?#iefix') format('embedded-opentype'),
        url('~@/assets/fonts/HalvarBreit-Rg.woff2') format('woff2'),
        url('~@/assets/fonts/HalvarBreit-Rg.woff') format('woff'),
        url('~@/assets/fonts/HalvarBreit-Rg.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'Atlas Grotesk';
    src: url('~@/assets/fonts/Atlas Grotesk-Regular-Desktop.otf');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

:root {
  --font-halvar: 'Halvar Breit Rg', serif;
  --font-atlas: 'Atlas Grotesk', serif;
  --halvar-medium: 2rem;
  --halvar-big: 3rem;
  --atlas-large: 1.85rem;
  --atlas-medium: 1.3rem;
  --bg-black: #2a2a2a;
  --bg-blue: #124adf;
  --bg-white: #fff;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
}
body {
  margin: 0;
  background-color: var(--bg-black);
}
#app {
  height: 100vh;
}
button {
  border: none;
  font-family: var(--font-halvar);
  font-size: var(--halvar-medium);
}
button > * {
  pointer-events: none;
}
p {
  font-family: var(--font-atlas);
  font-size: var(--atlas-large);
}

.main {
  height: 93.75%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.footer {
  height: 6.25%;
  display: flex;
  justify-content: flex-end;
}
.lang-btn {
  background-color: var(--bg-white);
  width: 13.5%;
}
</style>
