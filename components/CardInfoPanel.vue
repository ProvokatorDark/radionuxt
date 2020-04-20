<template>
  <div id="inforadio" class="valign-wrapper">
    <div class="controlsplay">
      <v-icon v-if="!playing"
              id="playtop"
              large
              @click="playTrack(selectedTrack)"
              color="white"
      >play_arrow
      </v-icon>
      <v-icon v-else
              @click="stopTrack(selectedTrack)"
              id="pausetop"
              large
              color="white"
      >pause
      </v-icon>
      <v-slider
        class="hidden-xs-only"
        v-model="volume"
        @input="updateVolume(volume)"
        thumb-color="purple"
        track-color="white"
        color="white"
        max="1"
        step="0.1"
      ></v-slider>
    </div>
    <v-avatar>
      <img
        :src="cover"
        @click="mark"
      >
    </v-avatar>
    <span v-if="tombo">{{tminutes}}:{{tseconds}}</span>
    <span v-else-if="timestop">{{Math.floor(((this.timestop*1000) % (1000 * 60 * 60)) / (1000 * 60))}}</span>
    <span>{{title}}</span>

  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'

  export default {
    name: "CardInfoPanel",
    data: () => ({
      volume: 0.5,
      timer: null,
      currentTime: false,
    }),
    props: [],
    methods: {
      playTrack(selectedTrack) {
        this.$emit('playtrack', selectedTrack)
      },
      stopTrack(selectedTrack) {
        this.$emit('stoptrack', selectedTrack)
      },
      updateVolume(volume) {
        Howler.volume(volume)
      },
      mark() {
        this.$store.dispatch('loadTimer', this.$store.getters.gettimestop + 900)
        console.log(this.$store.getters.gettimestop)
      },
      startTimer() {
        this.currentTime = this.$store.getters.gettimestop
        console.log(this.currentTime)
        this.timer = setInterval(() => {
          console.log('currentTime' + this.currentTime)
          this.currentTime--
        }, 1000)
      },
      stopTimer() {
        clearTimeout(this.timer)
        this.$store.commit('SET_TIMESTOP', false)
        this.$store.commit('SET_TOMBO',false)
      },
    },
    computed: {
      ...mapState([
        'statecards',
      ]),
      ...mapGetters({
        selectedTrack: 'getselectedTrack',
        getcover: 'getcover',

      }),
      selectedTrack() {
        return this.$store.getters.getselectedTrack
      },
      cover() {
        return this.$store.getters.getcover
      },
      title() {
        return this.$store.getters.gettitle
      },
      playing() {
        return this.$store.getters.getplaying
      },
      timestop() {
        return (this.$store.getters.gettimestop)
      },
      tombo() {
        return this.$store.getters.gettombo
      },
      thours(){
        return Math.floor(((this.currentTime*1000) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      },
      tminutes(){
        return Math.floor(((this.currentTime*1000) % (1000 * 60 * 60)) / (1000 * 60))
      },
      tseconds(){
        return Math.floor(((this.currentTime*1000) % (1000 * 60)) / 1000)

      }
    },
    watch: {
      currentTime(time, selectedTrack) {
        if (time === 0) {
          this.stopTimer()
          console.log('Timer stopped')
          this.stopTrack(selectedTrack)
          this.currentTime = false;
        }
      },
      tombo(bool) {
        if (bool === true) {
          this.startTimer();
        }
      }
    }
  }
</script>

<style>
  #inforadio {
    display: flex;
    align-items: center;
    justify-content: center;

  }

  #inforadio > span {
    margin-left: 10px;
  }

  #inforadio > .v-avatar {
    margin-left: 10px;
  }

  .controlsplay {
    color: white;
    display: flex;
  }


  #inforadio span {
    color: white;
  }

  .v-slider--horizontal {
    margin-top: 10px;
    min-width: 150px;
  }

  .v-messages {
    display: none;
  }
</style>
