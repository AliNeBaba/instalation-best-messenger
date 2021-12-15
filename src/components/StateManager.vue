<template>

  <div class="footer">

    <transition
      @enter="enter"
      @leave="leave"
      :css="false"
      >
      <button class="btn" type="button"
        v-if="!flags.showAnswer"
        @click="$emit('switchPage', 'sub')"
        :disabled="isDisabledBack"
        >
        <img src="~@/assets/img/ArrowBack.svg" />
      </button>
    </transition>

    <transition
      @enter="enter"
      @leave="leave"
      :css="false"
      >
      <div class="paging"
        v-if="!flags.showAnswer"
        >
        <div v-for="n in numberOfPages" :key="n" class="page"
          :class="{ 'big': this.state.page + 1 === n }"
          >
        </div>
      </div>
    </transition>

    <transition
      @enter="enter"
      @leave="leave"
      :css="false"
      >
      <button class="btn" type="button"
        v-if="!flags.showAnswer"
        @click="$emit('switchPage', 'add')"
        :disabled="isDisabledNext"
        >
        <img src="~@/assets/img/ArrowNext.svg" />
      </button>
    </transition>

    <transition
      @enter="enter"
      @leave="leave"
      :css="false"
      >
      <button class="sign-btn" type="button"
        v-if="!flags.showAnswer"
        @click="$emit('setSign')"
        :disabled="flags.blockInput"
        >
        <img src="~@/assets/img/SignLang.svg"
             :style="{opacity: signOpacity}"
        />
      </button>
    </transition>

    <button class="lang-btn" type="button"
      @click="$emit('setLang')"
      :disabled="flags.blockInput"
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
  props: ['state', 'flags', 'total', 'lang'],
  computed: {
    numberOfPages () {
      return Math.ceil(this.total / this.state.items)
    },
    isDisabledBack () {
      if (this.state.page === 0 && !this.flags.isAnimation) {
        return true
      } else {
        return false
      }
    },
    isDisabledNext () {
      if (this.state.page === this.numberOfPages - 1 && !this.flags.isAnimation) {
        return true
      } else {
        return false
      }
    },
    signOpacity () {
      return this.flags.showSignLang ? 1 : 0.4
    }
  },
  methods: {
    enter (el, done) {
      gsap.timeline().from(el, {
        duration: 0.2,
        opacity: 0,
        onComplete: done
      })
    },
    leave (el, done) {
      gsap.timeline().to(el, {
        duration: 0.2,
        opacity: 0,
        onComplete: done
      })
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
  width: 13.4%;
  background-color: var(--bg-white);
}
.sign-btn {
  background-color: var(--bg-black);
  width: 13.4%;
}
.lang-btn {
  background-color: var(--bg-white);
  width: 13.4%;
}
.paging {
  background-color: transparent;
  width: 47%;
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
  transition: all .6s;
}
.big {
  height: 20px;
  width: 20px;
}
</style>
