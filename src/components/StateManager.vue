<template>
  <div class="footer">

    <template v-if="!flagHide">

      <button class="btn" type="button"
        @click="$emit('switchPage', 'sub')"
        :disabled="isDisabledBack"
        >
        <img src="~@/assets/img/ArrowBack.svg" />
      </button>

      <div class="paging">
        <div v-for="n in numberOfPages" :key="n" class="page"
          :class="{ 'bg-blue': this.state.page + 1 === n }"
          >
        </div>
      </div>

      <button class="btn" type="button"
        @click="$emit('switchPage', 'add')"
        :disabled="isDisabledNext"
        >
        <img src="~@/assets/img/ArrowNext.svg" />
      </button>

      <button class="btn" type="button"
        @click="$emit('setSign')"
        >
        <img src="~@/assets/img/SignLang.svg" />
      </button>

    </template>

    <button class="lang-btn" type="button"
      @click="$emit('setLang')"
      >
      <template v-if="lang === 'ru'">Eng</template>
      <template v-else>Ru</template>
    </button>

  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'StateManager',
  props: ['state', 'flagHide', 'flagDisable', 'total', 'lang'],
  computed: {
    numberOfPages () {
      return Math.ceil(this.total / this.state.items)
    },
    isDisabledBack () {
      if (this.state.page === 0 && !this.flagDisable) {
        return true
      } else {
        return false
      }
    },
    isDisabledNext () {
      if (this.state.page === this.numberOfPages - 1 && !this.flagDisable) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    Hide (newValue) {
      if (newValue) {
        gsap.to(['.btn', '.paging'], { duration: 1, opacity: 0 })
      } else {
        gsap.to(['.btn', '.paging'], { duration: 1, opacity: 1 })
      }
    }
  }
}
</script>

<style>
.footer {
  height: 6.25%;
  display: flex;
  justify-content: flex-end;
}
.btn {
  opacity: 1;
  width: 13.5%;
  background-color: var(--bg-blue);
}
.lang-btn {
  background-color: var(--bg-white);
  width: 13.5%;
}
.paging {
  background-color: var(--bg-white);
  width: 46%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page {
  height: 25px;
  width: 25px;
  border: 6px solid var(--bg-blue);
  border-radius: 50%;
  margin: auto 6px;
}
.bg-blue {
  background-color: var(--bg-blue);
}
</style>
