import Vue from 'vue'
import Vuex from 'vuex'
import { SCENE } from '../pages/scene'
import { sysInfo, AppIntallInfo } from './utils'
import { getSetting, setSetting, APP_SETTING } from './app-setting'
import { THEME_COLORS } from './constant'

Vue.use(Vuex)

const FirstScene = SCENE.Start

const store = new Vuex.Store({
  state: {
    themeColor: getSetting(APP_SETTING.CurrentTheme),
    fromScene: FirstScene,
    activeScene: FirstScene,
    isSliding: false,
    isMuted: getSetting(APP_SETTING.Muted),
    sysInfo: sysInfo
  },
  getters: {
    uniMenuPos() {
      const systemInfo = uni.getSystemInfoSync()
      const res = uni.getMenuButtonBoundingClientRect()
      res.marginSide = systemInfo.windowWidth - res.right
      return res
    }
  },
  mutations: {
    setThemeColor(state, payload) {
      state.themeColor = payload
      uni.vibrateShort()
      setSetting(APP_SETTING.CurrentTheme, payload)
    },
    slideToScene(state, scene) {
      uni.vibrateShort()
      state.fromScene = state.activeScene
      state.activeScene = scene
      state.isSliding = true
    },
    setIsSliding(state, payload) {
      state.isSliding = payload
    },
    toggleMuted(state) {
      state.isMuted = !state.isMuted
      uni.vibrateShort()
      setSetting(APP_SETTING.Muted, state.isMuted)
    }
  },
  actions: {
    randomChangeTheme(context) {
      const index = Math.floor(Math.random() * THEME_COLORS.length)
      context.commit('setThemeColor', THEME_COLORS[index])
    }
  }
})

export default store
