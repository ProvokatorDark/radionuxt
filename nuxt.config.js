
module.exports = {
  mode: 'universal',
  head: {
    title: 'Radio Pro',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Радио Про'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [{
    }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  plugins: [
    // '~/plugins/vuetify.js'
  ],
  router: {
    prefetchLinks: false,
    middleware: 'rubrika'
  },
  splitChunks: {
    layouts: true,
    pages: true,
    commons: true
  },
  generate:{
    routes:[
      '/category/news',
      '/category/pop',
      '/category/chillout',
      '/category/club',
      '/category/classic',
      '/category/rap',
      '/category/rock',
      '/category/retro',
      '/category/jazz',
      '/category/childrens',
      '/category/background'
    ]
  },
  css: [
    '~/assets/css/main.css'
  ]
}


