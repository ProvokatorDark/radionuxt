<template>
  <v-container fluid>
    <v-row
      dense
    >
      <v-col
        v-for="(card, index) in statecards"
        :key="index"
        :cols="6"
        :sm=3
        :md=3
        :lg=2
        :xl=2
      >
        <v-card
          hover
          ripple
          @click="playtrack(index)"
          shaped
          :class="{ active: card.plays,selected:index===selectedTrack }"

        >
          <v-img
            :src="card.cover_art_url"
            height="200px"
          >

          </v-img>
          <div
            class="bottom-card"
                    >
            <v-card-text v-text="card.album"></v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data: () => ({
    }),
    methods: {
      playtrack(index) {
        this.$emit('playtrack', index)
        },
      stoptrack(index){
        this.$emit('stoptrack',index)
      }
    },
    props:[

    ],
    mounted: function() {

    },
    computed:{
      ...mapState([
        'statecards',
      ]),
      selectedTrack() {
        return this.$store.getters.getselectedTrack
      },
    }

  }
</script>
<style>
  .v-card__actions {
    padding: 0;
  }

  .bottom-card {
    height: 87px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .selected.theme--dark .v-card__text{
    color: #ffffd2;
  }
  .selected.theme--light .v-card__text{
    color: #1829af;
  }
  .selected.active.theme--light .v-card__text{
    color: #ffffff;
  }
  .active.theme--dark  .bottom-card{
    background-color: #292527;
    border-bottom: #ffffd2 1px solid;
  }
  .active.theme--light  .bottom-card{
    background-color: #292527;
  }


</style>
