import {mapGetters, mapState} from "vuex";

export const playmix = {
  data: () => ({
    drawer: null,
    baseurl:'http://radio-online.pro/wp-content/uploads/2018/09/cover.jpg'
  }),
  methods: {
    play(index) {
      let track = this.statecards[index].howl;

      if (this.song != index) {
        this.statecards[this.song].howl.unload()
        this.statecards[this.song].plays=false
      }
      if (track.playing()) {
        this.statecards[index].howl.unload()
        this.statecards[index].plays=false
        this.$store.commit('SET_TITLE', '')
        this.$store.commit('SET_COVER', this.baseurl)
        this.$store.commit('SET_PLAYING', false)
      } else {
        if (this.lasttrack) {
          this.lasttrack.unload()
        }
        track.play()
        this.statecards[index].plays=true
        this.$store.commit('SET_LASTTRACK',track)
        this.$store.commit('SET_TITLE', this.statecards[index].album)
        this.$store.commit('SET_COVER', this.statecards[index].cover_art_url)
        this.$store.commit('SET_PLAYING', true)
      }
      this.$store.commit('SET_SELECTED_TRACK', index)
      this.$store.commit('SET_SONG', index)
    },
    stop(index) {
      if (this.lasttrack) {
        this.lasttrack.unload()
        this.lasttrack.plays=false
      }
      this.statecards[index].howl.unload()
      this.statecards[index].plays=false
      this.$store.commit('SET_PLAYING', false)
      this.$store.commit('SET_TITLE', '')
      this.$store.commit('SET_COVER', this.baseurl)
    },
    changetheme() {
      if (this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = false
        this.$store.commit('SET_THEME',false)
      } else {
        this.$vuetify.theme.dark = true
        this.$store.commit('SET_THEME',true)
      }
    },
  },
  created: function () {
    // this.$vuetify.theme.themes.light.primary = '#ee6e73'
    this.$vuetify.theme.dark = this.$store.getters.gettheme
  },
  mounted: function () {
    this.$store.dispatch(
      'loadHeadings'
    )
    this.$store.dispatch('loadCards')
  },
  computed: {
    ...mapState([
      'statecards',
      'stateheadings'
    ]),
    ...mapGetters([

    ]),
    selectedTrack() {
      return this.$store.getters.getselectedTrack
    },
    cover(){
      return this.$store.getters.getcover
    },
    title(){
      return this.$store.getters.gettitle
    },
    playing(){
      return this.$store.getters.getplaying
    },
    lasttrack(){
      return this.$store.getters.getlasttrack
    },
    song(){
      return this.$store.getters.getsong
    },
    theme(){
      return this.$store.getters.gettheme
    }
  },
}
