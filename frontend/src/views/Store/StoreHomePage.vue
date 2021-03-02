<template>
  <v-container fluid style="height: 800px">
    <v-col
      style="padding-top: 0px;"
      cols="auto"
      md=auto xl=auto
    >
      <v-card-title style="font-weight: bold;">ストアホーム</v-card-title>

      <!-- ショップ設定 -->
      <v-card
        class="mx-auto"
        max-width="600"
        style="text-align: initial"
        tile
      >
        <v-card-title>ショップ設定<img src="../../../public/image/shop.jpg" alt="" style="width: 1.2rem; margin-left: 2%;"></v-card-title>
        <v-list-item three-line>
          <v-list-item-content style="color: #1c1c1d;">
            <v-list-item-title
              @click="itemRegister"
              style="cursor: pointer; font-weight: 600;"
            >商品登録・作成</v-list-item-title>
            <v-list-item-subtitle>
              新しい商品を登録・作成することができます。あなただけの商品を登録しましょう。
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
    
        <v-list-item three-line>
          <v-list-item-content style="color: #1c1c1d;">
            <v-list-item-title
              @click="itemEdit"
              style="cursor: pointer; font-weight: 600;"
            >商品一覧・編集・削除</v-list-item-title>
            <v-list-item-subtitle>
              あなたの登録中の商品を見ることができます。また、商品の編集・削除が簡単に行えます。
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-divider class="my-4"></v-divider>

      <!-- 会員情報 -->
      <v-card
        class="mx-auto"
        max-width="600"
        style="text-align: initial"
        tile
      >
        <v-card-title>会員情報<img src="../../../public/image/setting.jpg" alt="" style="width: 1.2rem; margin-left: 2%;"></v-card-title>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>会員情報変更</v-list-item-title>
            <v-list-item-subtitle style="color: #gray !important;">
              お客様の会員様情報の変更はこちらから行ってください。
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
    
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>パスワードの変更</v-list-item-title>
            <v-list-item-subtitle style="color: #gray !important;">
              パスワードを忘れた方はこちらからお問い合せください。
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
    
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>退会手続き</v-list-item-title>
            <v-list-item-subtitle style="color: #gray !important;">
              退会手続きはこちらから行ってください。
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  methods: {
    itemRegister() {
      this.$router.push('/item_register');
    },
    itemEdit() {
      this.$router.push({ name: 'item_detail', query: { page: this.$store.getters.store_id } });
    },
  },
}
</script>

<style lang="scss" scoped>
.mx-auto {
  color: #1c1c1d;
}
</style>
