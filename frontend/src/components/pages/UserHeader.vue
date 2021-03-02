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
      <img src="../../assets/logo.png" alt="">
    </v-app-bar-nav-icon>

  <!-- タイトル -->
    <v-toolbar-title
      id="toolbar__title"
    >
      <router-link
        to="/user_home"
        class="toolbar__link"
      >
        FURISODE
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
          @click="clickMenu(i)"
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
        <v-tab to="/user_home">
          USER HOME
        </v-tab>
        <v-tab to="/item_list">
          PRODUCT LISTS
        </v-tab>
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-tab
                v-bind="attrs"
                v-on="on"
                style="color: #1c1c1d;"
              >
                USER LOGOUT
              </v-tab>
            </template>
            <v-card style="color: #1c1c1d;">
              <v-card-title class="headline">
                ログアウトしますか？
              </v-card-title>
              <v-card-text style="color: #1c1c1d;">選択してください</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="#1c1c1d"
                  text
                  @click="dialog = false"
                >
                  キャンセル
                </v-btn>
                <v-btn
                  color="#1c1c1d"
                  text
                  @click="dialog = false"
                  @click.stop="logout"
                >
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'UserHeader',
  data() {
    return {
      items: [
        { title: 'ユーザーホーム'},
        { title: '商品をみる' },
        { title: '注文履歴をみる' },
        { title: 'ログアウト' },         
      ],
      dialog: false,
    }
  },
  methods: {
    clickMenu(index) {
      switch (index) {
        case 0:
          this.$router.push('/user_home');
          break;
        case 1:
          this.$router.push('/item_list');
          break;        
        case 2:
          this.$router.push('/member/order/history');
          break;
        case 3:
          this.logout();
          break;
        default:
          this.$router.push('/user_home');
      }
    },
    logout() {
      // ログアウト
      this.$store.dispatch('user_logout');
    },
  }
}
</script>