<template>

  <main-content
    @change-input="flags.blockInput = $event"
    @change-show-answer="flags.showAnswer = $event"
    @set-sign="setSign"
    @add-page="state.page++"
    :articles="currentQuestions"
    :flags="flags"
    :lang="lang"
    />

  <state-manager
    @switch-page="switchPage($event)"
    @set-sign="setSign"
    @set-lang="setLang"
    :flags="flags"
    :state="state"
    :total="articles.ru.length"
    :lang="lang"
    />

</template>

<script>
import { getData, idleReload } from '@/service.js'
import MainContent from '@/components/MainContent.vue'
import StateManager from '@/components/StateManager.vue'

export default {
  name: 'App',
  components: {
    'main-content': MainContent,
    'state-manager': StateManager
  },
  data () {
    return {
      articles: {
        ru: [],
        en: []
      },
      state: {
        page: 0,
        items: 4
      },
      flags: {
        showAnswer: false,
        showSignLang: false,
        isAnimation: false
      },
      lang: 'ru'
    }
  },
  created: function () {
    (async () => {
      this.articles = await getData()
    })()
  },
  mounted: function () {
    idleReload()
  },
  computed: {
    startQuestions () {
      return this.state.page * this.state.items
    },
    endQuestions () {
      return this.startQuestions + this.state.items
    },
    currentQuestions () {
      return this.articles[this.lang].slice(this.startQuestions, this.endQuestions)
    }
  },
  methods: {
    switchPage (action) {
      action === 'add'
        ? this.state.page++
        : this.state.page--
    },
    setSign () {
      this.state.items = this.state.items === 4 ? 2 : 4
      this.flags.showSignLang = !this.flags.showSignLang
      this.state.page = this.flags.showSignLang
        ? this.state.page * 2
        : Math.ceil((this.state.page - 1) / 2)
    },
    setLang () {
      this.lang === 'ru' ? this.lang = 'en' : this.lang = 'ru'
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
  background-color: var(--bg-blue);
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
</style>
