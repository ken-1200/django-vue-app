import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: "#308DC2",
        success: "#4CAF50",
        error: "#FF5252",
        white: "#FFF",
        darkblueshade: "#308DC2",
        background: "#fbfbfb",
      }
    }
  },
});