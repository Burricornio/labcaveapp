import Vue from 'vue'
import App from './App'
import axios from 'axios'

import {
  transitions,
  VApp,
  VBtn,
  VCard,
  VDataTable,
  VDatePicker,
  VDialog,
  VForm,
  VGrid,
  VIcon,
  VMenu,
  VPagination,
  VSelect,
  VSlider,
  VTextField,
  VToolbar,
  VTooltip,
  Vuetify
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    transitions,
    VApp,
    VBtn,
    VCard,
    VDataTable,
    VDatePicker,
    VDialog,
    VGrid,
    VForm,
    VIcon,
    VMenu,
    VPagination,
    VSelect,
    VSlider,
    VTextField,
    VToolbar,
    VTooltip,
    Vuetify
  }
})

Vue.config.productionTip = false

export const HTTP = axios.create({
  baseURL: `https://api.themoviedb.org/3/discover/movie?api_key=90a3dbdf690804ca0b920d49aa1107fc&primary_release_year=2018`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
