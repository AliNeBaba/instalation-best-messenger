<template>

  <div class="main">

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

  <div class="footer">

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
      class="lang-btn"
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
  background-color: var(--bg-black);
  height: 93.75%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.footer {
  background-color: var(--bg-black);
  height: 6.25%;
  display: flex;
  justify-content: flex-end;
}
.lang-btn {
  background-color: var(--bg-white);
  width: 13.5%;
}
</style>
