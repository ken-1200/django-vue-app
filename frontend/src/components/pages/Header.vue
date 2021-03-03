<template>
<!-- バー -->
  <v-app-bar
    app
    fixed
    max-height="112"
    elevate-on-scroll
  >

  <!-- 左のアイコン -->
    <v-app-bar-nav-icon>
      <img src="../../assets/logo.png" alt="" @click="goToHome">
    </v-app-bar-nav-icon>

  <!-- タイトル -->
    <v-toolbar-title
      id="toolbar__title"
    >
      <router-link
        to="/"
        class="toolbar__link"
      >
        FURRISODE
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

  <!-- ３点ドットリスト -->
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
          style="color: #1c1c1d;"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click.stop="clickMenu(i)"
        >
          <v-list-item-title style="overflow: initial;">
            <v-row
              align="center"
              justify="space-around"
            >
              <v-btn
                class="ma-2"
                color="background"
                depressed
                style="color: #1c1c1d;"
              >
                {{ item.title }}
              </v-btn>
            </v-row>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

<!-- タブバー -->
    <template v-slot:extension>
      <v-tabs
        center-active
        grow
      >
        <v-tab to="/">
            HOME
          </v-tab>
          <v-tab to="/item_list">
            SHOP LISTS
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      items: [
        { title: 'ショップオーナー'},
        { title: 'ユーザーログイン' },
      ],
    }
  },
  methods: {
    clickMenu(index) {
      switch (index) {
        case 0:
          this.$router.push('/store_login');
          break;
        case 1:
          this.$router.push('/user_login');
          break;
        default:
          this.$router.push('/');
      }
    },
    goToHome() {
      // ホーム画面遷移時コールバック関数を呼びエラー回避
      this.$router.push('/', () => {});
    }
  }
}
</script>

<style lang="scss">
#toolbar {
  &__title {
    padding-left: 7px;
    padding-top: 0px;
    padding-bottom: 0px;
    display: flex;
  }
}
.toolbar {
  &__link {
    font-size: 1.8rem;
  }
}
img {
  width: 4.1rem;
}
</style>
