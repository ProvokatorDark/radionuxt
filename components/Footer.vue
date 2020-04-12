<template>
  <v-footer
    dark
    padless
  >

      <v-card
        class="flex"
        flat
        tile
      >
        <v-container>
        <v-card-title>
          <strong class="subheading">Pro Radio</strong>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
            <strong>© {{ new Date().getFullYear() }} Радио Online Pro — online radio бесплатно</strong>
          <p>Все права на аудио материалы, представленные на нашем сайте принадлежат их законным владельцам.</p>
          <p>Обратная связь: mainbitcoder@gmail.com</p>
        </v-card-text>
        </v-container>
      </v-card>


  </v-footer>
</template>

<script>
  export default {
    data: () => ({
    }),
  }
</script>

