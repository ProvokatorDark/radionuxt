import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    statecards: [],
    stateheadings: [],
    rubrika: 'background',
    mainrubrika: 'background',
    seorubrika: 'test',
    selectedTrack: 0,
    cover: 'http://radio-online.pro/wp-content/uploads/2018/09/cover.jpg',
    title: '',
    playing: false,
    lasttrack: null,
    song:0,
    theme:true,
    timestop:false,
    tombo:false,
    timer: null,

  },
  getters: {
    getselectedTrack: state => {
      return state.selectedTrack
    },
    getcover: state => {
      return state.cover
    },
    gettitle: state => {
      return state.title
    },
    getseorubrika: state => {
      return state.seorubrika
    },
    getplaying:state => {
      return state.playing
    },
    getlasttrack:state => {
      return state.lasttrack
    },
    getsong:state => {
      return state.song
    },
    gettheme:state => {
      return state.theme
    },
    gettimestop:state => {
      return state.timestop
    },
    gettombo:state => {
      return state.tombo
    },
    gettimer:state => {
      return state.timer
    }

  },
  mutations: {
    SET_CARDS(state, cards) {
      state.statecards = cards
    },
    SET_HOWLER(state, cards) {
      cards.forEach((card) => {
        card.howl = new Howl({
          src: card.url,
          html5: true,
          format: ['mp3', 'aac'],
          volume: 0.5,
          preload: false,
          onloaderror: function () {
            console.log('Недостуепен')
          }
        })
        card.plays =false

      })
    },
    SET_HEADINGS(state, headings) {
      state.stateheadings = headings
    },
    SET_RUBRIKA(state, index) {
      if (Object.keys(index).length == 0) {
        state.rubrika = state.mainrubrika
      } else {
        state.rubrika = index.id
      }
    },
    SET_SELECTED_TRACK(state, track) {
      state.selectedTrack = track
    },
    SET_COVER(state, url) {
      state.cover = url
    },
    SET_TITLE(state, title) {
      state.title = title
    },
    SET_SEO(state, params) {
      switch (params.id) {
        case 'news':
          state.seorubrika = 'Новостное';
          break;
        case 'pop':
          state.seorubrika = 'Поп-музыка';
          break;
        case 'chillout':
          state.seorubrika = 'Чиллаут';
          break;
        case 'club':
          state.seorubrika = 'Клубная';
          break;
        case 'classic':
          state.seorubrika = 'Классическая';
          break;
        case 'rap':
          state.seorubrika = 'Рэп';
          break;
        case 'rock':
          state.seorubrika = 'Рок';
          break;
        case 'retro':
          state.seorubrika = 'Ретро';
          break;
        case 'jazz':
          state.seorubrika = 'Джаз';
          break;
        case 'childrens':
          state.seorubrika = 'Детские';
          break;
        case 'background':
          state.seorubrika = 'Фоновая';
          break;
        default:
          state.seorubrika='главная'
      }
    },
    SET_PLAYING(state,playing){
      state.playing=playing
    },
    SET_LASTTRACK(state,last){
      state.lasttrack=last
    },
    SET_SONG(state,song){
      state.song=song
    },
    SET_PLAYS(state,{index,boolean}){
      state.statecards[index].plays=boolean
    },
    SET_THEME(state,boolean){
      state.theme = boolean
    },
    SET_TIMESTOP(state,time){
      state.timestop=time
    },
    SET_TOMBO(state,bool){
      state.tombo=bool
    },
    SET_TIMER(state,timer){
      state.timer=timer
    }
  },
  actions: {
    loadCards({commit, state}) {
      this.$axios
        .get('../json/category/' + state.rubrika + '.json')
        .then(response => response.data)
        .then(cards => {
          commit('SET_HOWLER', cards)
          commit('SET_CARDS', cards)
        })
    },
    loadHeadings({commit}) {
      this.$axios
        .get('../json/headings.json')
        .then(response => response.data.items)
        .then(headings => {
          commit('SET_HEADINGS', headings)
        })
    },
    loadTimer ({commit},time) {
      commit('SET_TIMESTOP',time)
      setTimeout(() => {
        commit('SET_TOMBO',true)
      }, 4000)
    }
  }
})

export default store
