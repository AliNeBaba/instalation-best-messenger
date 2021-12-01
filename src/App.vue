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

  <state-manager
    @switch-page="switchPage($event)"
    @set-lang="setLang($event)"
    :state="state"
    :total="articles.ru.length"
    :flag-hide="flags.hideToShowAnswer"
    :flag-disable="flags.blockInput"
    :lang="lang"
    />

</template>

<script>
import { getData } from '@/service.js'
import Answer from '@/components/Answer.vue'
import Question from '@/components/Question.vue'
import Sign from '@/components/SignLang.vue'
import StateManager from '@/components/StateManager.vue'

export default {
  name: 'App',
  components: {
    'block-answer': Answer,
    'block-question': Question,
    'sign-lang': Sign,
    'state-manager': StateManager
  },
  data () {
    return {
      articles: {
        ru: [],
        eng: []
      },
      state: {
        page: 0,
        items: 4
      },
      flags: {
        hideToShowAnswer: false,
        blockInput: false
      },
      currentAnswer: [],
      currentQuestions: [],
      lang: 'ru',
      changeQuestions: false,
      showSignLang: false,
      idleTimer: null
    }
  },
  created: function () {
    (async () => {
      const data = await getData()
      console.log(data)
      for (const key in data.forms.messenger.articles) {
        this.articles[key] = Object.values(data.forms.messenger.articles[key])
      }
      this.setQuestions('')
    })()
  },
  mounted: function () {
    document.addEventListener('mousedown', this.loadIdleTimer)
  },
  computed: {
  },
  methods: {
    switchPage (action) {
      this.changeQuestions = true
      this.buttonsDisable()
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
          ? this.state.page++
          : this.state.page--
      }
      const start = this.state.page * this.state.items
      const end = start + this.state.items
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
        this.flags.hideToShowAnswer = false
      }.bind(this))
    },
    hideElements () {
      this.flags.hideToShowAnswer = true
    },
    setLang (target) {
      target === 'sign' ? this.setSignLang() : this.changeLang()
    },
    setSignLang () {
      this.state.items = this.state.items === 4 ? 2 : 4
      this.setQuestions('')
      this.showSignLang = !this.showSignLang
      this.state.page = this.showSignLang
        ? this.state.page * 2
        : Math.ceil((this.state.page - 1) / 2)
    },
    changeLang () {
      this.lang === 'ru' ? this.lang = 'en' : this.lang = 'ru'
      this.setQuestions('')
    },
    buttonsDisable () {
      document.querySelectorAll('button').forEach(btn => btn.setAttribute('disabled', 'disabled'))
      this.flags.blockInput = true
      new Promise((resolve) => setTimeout(resolve, 2000))
        .then(() => {
          document.querySelectorAll('button').forEach(btn => btn.removeAttribute('disabled', 'disabled'))
          this.flags.blockInput = false
        })
    },
    loadIdleTimer () {
      clearTimeout(this.idleTimer)
      this.idleTimer = setTimeout(this.resetPage, 15000)
    },
    resetPage () {
      this.state.page = 0
      this.showSignLang = false
      this.state.items = 4
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
</style>
