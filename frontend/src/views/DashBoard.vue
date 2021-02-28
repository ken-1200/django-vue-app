<template>
  <v-container>
    <v-card-title style="font-weight: bold;">新しいお店にようこそ！</v-card-title>
    <v-card-subtitle>あなたのお店を登録しましょう。このボタンから登録をすれば簡単にショップのオーナーになれます。ゲストログインもありますので、気軽にお試しください！</v-card-subtitle>

    <v-card-text>
      Welcome to the new store! Register your store. You can easily become a shop owner by registering from this button.There is also a guest login, so feel free to try it!
    </v-card-text>

    <!-- ボタン -->
    <v-card
      width="100%"
      outlined
    >
      <v-btn
        class="ma-10"
        width="80%"
        height="60px"
        color="#79816c"
        style="color: white;"
        @click.stop="goToShop"
      >
        ショップを開設する
      </v-btn>
    </v-card>

    <v-card-title style="font-weight: bold;">好きな商品を購入しましょう！</v-card-title>
    <v-card-subtitle>お気に入りの商品を見つけて購入しましょう。このボタンから登録をすればスムーズに商品を購入できるようになります。ゲストログインもありますので、気軽にお試しください！</v-card-subtitle>
    <v-card-text>
      Find and buy your favorite products. If you register from this button, you will be able to purchase products smoothly. There is also a guest login, so feel free to try it!
    </v-card-text>

    <!-- ボタン -->
    <v-card
      width="100%"
      outlined
    >
      <v-btn
        class="ma-10"
        width="80%"
        height="60px"
        color="#79816c"
        style="color: white;"
        @click.stop="goToUser"
      >
        新規登録する
      </v-btn>
    </v-card>

    <!-- ショップオーナー既に登録している方 -->
    <v-card-title style="font-weight: bold;">既にショップオーナーの方！</v-card-title>
    <v-card-subtitle>こちらからログインしてください。</v-card-subtitle>

    <!-- ボタン -->
    <v-card
      width="100%"
      outlined
    >
      <v-btn
        class="ma-10"
        width="80%"
        height="60px"
        color="#79816c"
        style="color: white;"
        @click.stop="goToStoreLogin"
      >
        ログインする
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goToShop() {
      this.$router.push('/store_register');
    },
    goToUser() {
      this.$router.push('/user_register');
    },
    goToStoreLogin() {
      this.$router.push('/store_login');
    },
  },
  computed: {
    isAuthenticated() {
      // access_tokenがある場合
      return this.$store.getters.access_token != null; 
    },
    isAuthenticatedUser() {
      // access_tokenがある場合
      return this.$store.getters.user_access_token != null; 
    },
  },
}
</script>

<style lang="scss" scoped>
.v-card {
  margin-bottom: 10px;

  &__subtitle {
    text-align: left;
    padding: 16px;
  }
}
</style>