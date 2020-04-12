<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-subheader class="
        mt-4
        grey--text
        text--darken-1
        subtitle-1
          "
        >Рубрики
        </v-subheader>
        <v-list>
          <nuxt-link
            :to="`category/${item.ref}`"
            v-for="(item,index) in stateheadings"
            :key="index"

          >
            <v-list-item
                         >
              <v-list-item-avatar>
                <img
                  :src="`${item.picture}`"
                  :alt="`${item.text}`"
                >
              </v-list-item-avatar>
              <v-list-item-title v-text="item.text"/>
            </v-list-item>
          </nuxt-link>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      color="primary"
      dense
    >
      <v-app-bar-nav-icon color="white" @click.stop="drawer=!drawer"/>
      <nuxt-link
        to="/"
      >
        <v-icon
          class="mx-4 hidden-xs-and-down"
          large
          color="white"
        >
          mdi-radio
        </v-icon>
      </nuxt-link>
      <CardInfoPanel @playtrack="play"
                     @stoptrack="stop"
      />
      <v-spacer></v-spacer>
      <button
        @click="changetheme"
        type="button"
        class="mx-2  v-btn v-btn--flat v-btn--icon v-btn--round theme--dark v-size--default"
        aria-label="Invert playground colors">
        <span class="v-btn__content">
          <i aria-hidden="true" color="white" class="v-icon notranslate mdi mdi-invert-colors theme--dark"></i>
        </span>
      </button>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height">
        <Card
          @playtrack="play"
          @stoptrack="stop"
        ></Card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Card from "./Card";
  import CardInfoPanel from "./CardInfoPanel";
  import {mapState, mapGetters} from 'vuex'
  import {playmix} from "../assets/mixins/play";


  export default {
    components: {
      Card,
      CardInfoPanel
    },
    props: {
      source: String,
    },
    data: () => ({

     }),
    methods: {

    },
    created: function () {
    },
    mounted: function () {
    },
    computed: {

    },
    mixins:[playmix]
  }
</script>
<style>
  .title {
    color: white;
  }

  .v-list a {
    text-decoration: none;
  }


</style>
