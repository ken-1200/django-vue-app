<template>
  <v-container fluid style="height: 1000px">
    <v-col
      cols="auto"
      md=auto xl=auto
    >
      <v-card-title style="font-weight: bold;">決済確定画面</v-card-title>
      <v-card-text style="text-align: left;">購入が完了しました。</v-card-text>

      <!-- 購入情報 -->
      <h2>{{ userName }}さんお買い上げありがとうございました！</h2>
      <v-card-text style="padding-bottom: 0; text-align: left;">注文内容がショップに送信されました。ご登録いただいたアドレスに確認のメールをお送りいたします。</v-card-text>
      <v-card-text style="padding-top: 0; text-align: left;">この度はご購入いただきまして、誠にありがとうございます。商品は発送され次第、ご登録頂いているメールアドレスに改めてご連絡いたします。</v-card-text>

      <v-divider></v-divider>

      <!-- ショップからクーポンなどのお得情報 -->
      <v-card
        class="ma-10"
        height="300px"
      >
        <v-card-subtitle
          class="mb-2"
          style="font-size: 1.12rem"
        >ご購入いただいたあなたへのクーポンをプレゼント!</v-card-subtitle>
        <p>5%OFFのクーポン件です。次回からショップ内でお使いいただけます。</p>
        <img class="coupon__img" src="../../public/image/coupon1.jpg" alt="">
      </v-card>

      <!-- ボタン -->
      <v-btn
        class="ma-10"
        height="60px"
        color="grey"
        to="/item_list"
      >
        商品一覧に戻る
      </v-btn>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
    }
  },
  created() {
    // ログイン情報を取得
    this.userName = this.$store.getters.userInfo.user_name;
  }
}
</script>

<style lang="scss" scoped>
.coupon__img {
  width: 8rem;
}
a {
  color: #fbfbfb !important;
}
</style>