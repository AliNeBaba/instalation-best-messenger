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
          :class="{ 'big': this.state.page + 1 === n }"
          >
        </div>
      </div>

      <button class="btn" type="button"
        @click="$emit('switchPage', 'add')"
        :disabled="isDisabledNext"
        >
        <img src="~@/assets/img/ArrowNext.svg" />
      </button>

      <button class="sign-btn" type="button"
        @click="setSign"
        >
        <img src="~@/assets/img/SignLang.svg"
        :style="buttonOpacity"
        />
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
  data () {
    return {
      buttonOpacity: {
        opacity: '.5'
      }
    }
  },
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
    setSign () {
      this.$emit('setSign')
      this.buttonOpacity.opacity === '.5'
        ? this.buttonOpacity.opacity = '1'
        : this.buttonOpacity.opacity = '.5'
    },
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
  width: 13.5%;
  background-color: var(--bg-white);
}
.sign-btn {
  background-color: var(--bg-black);
  width: 13.5%;
}
.lang-btn {
  background-color: var(--bg-white);
  width: 13.5%;
}
.paging {
  background-color: transparent;
  width: 46%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.page {
  height: 10px;
  width: 10px;
  background-color: var(--bg-white);
  border-radius: 50%;
  margin: 20px 15px auto 15px;
}
.big {
  height: 20px;
  width: 20px;
}
</style>
