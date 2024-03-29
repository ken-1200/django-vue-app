<template>
  <v-container style="height: 800px;">
    <v-col
      cols="auto"
      md=auto xl=auto
    >
      <!-- 商品投稿 -->
      <v-card-title id="titleInfo__title">商品を登録する</v-card-title>
      <v-card-subtitle id="titleInfo__subtitle">あなただけの商品を登録しましょう</v-card-subtitle>

      <!-- アラート -->
      <v-alert
        prominent
        type="error"
        :value="alert"
      >
        <v-row align="center">
          <v-col class="grow">
            商品が登録できませんでした。もう一度やり直してください。
          </v-col>
        </v-row>
      </v-alert>

      <!-- フォーム -->
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="createItems.name"
          :counter="30"
          :rules="nameRules"
          label="商品名"
          prepend-icon="mdi-shopping"
          required
        ></v-text-field>

        <v-file-input
          @change="onImageUploaded"
          show-size
          placeholder="クリックしてください。"
          prepend-icon="mdi-camera"
        ></v-file-input>

        <v-textarea
          v-model="createItems.detail"
          :rules="detailRules"
          :placeholder="detailPlaceholder"
          hint="詳細は500文字以下である必要があります。"
          counter
          label="詳細"
          prepend-icon="mdi-form-textarea"
        ></v-textarea>

        <v-text-field
          v-model.number="createItems.price"
          :rules="priceRules"
          name="input-10-1"
          label="値段"
          type="number"
          max="10000000"
          min="100"
          prepend-icon="mdi-currency-jpy"
          counter
          required
        ></v-text-field>

        <v-text-field
          v-model.number="createItems.total"
          :rules="totalRules"
          name="input-10-1"
          label="品数"
          type="number"
          prepend-icon="mdi-paper-cut-vertical"
          max="100"
          min="1"
          counter
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          :loading="loading"
          color="success"
          class="mr-4"
          @click="validate"
        >
          登録する
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          登録内容をリセットする
        </v-btn>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      createItems: {
        name: "",
        detail: "",
        price: null,
        total: null,
        image: "",
      },
      alert: false,
      detailPlaceholder: "ちょうど良いウエイトの裏起毛生地、クラシックシルエットのフーディに、都会的なグラフィックがシルクスクリーンで施されたアイテム。厳選された生地色とプリントカラーはデザイン性に優れ、一年を通し、トレーニングウェアから、街着まで、様々なシーンで重宝する。",
      valid: true,
      loading: false,
      nameRules: [
        v => Boolean(v) || '商品名は必須です。',
        v => (v && v.length <= 30) || '商品名は30文字以下である必要があります。',
      ],
      detailRules: [
        v => Boolean(v) || '詳細は必須です。',
        v => (v && v.length <= 500) || '詳細は500文字以下である必要があります。'
      ],
      priceRules: [
        v => Boolean(v) || '値段は必須です。',
        v => v >= 100 || '100円から登録可能です',
        v => v <= 10000000 || '1000万円まで登録可能です',
      ],
      totalRules: [
        v => Boolean(v) || '品数は必須です。',
        v => v != 0 || '1個から登録可能です',
        v => v <= 100 || '100個まで登録可能です',
      ],
    }
  },
  computed: {
    accessToken() {
      return this.$store.getters.access_token;
    },
  },
  methods: {
    onImageUploaded(event) {
      this.createImage(event);
    },
    createImage(data) {
      // ファイルを読み取る
      const render = new FileReader();

      // undefinedでない時にデータを読み込む
      if (!(data == undefined)) {
        // FileData読み込む
        render.readAsDataURL(data);

        // readAdDataURLが完了したあと実行される処理
        render.onload = () => {
          // ファイルの内容を格納
          this.createItems.image = render.result;
        }
      }
    },
    // 商品作成
    async postItems() {
      await axios.post('/item_list/', {
        item_name: this.createItems.name,
        item_detail: this.createItems.detail,
        item_price: this.createItems.price,
        item_total: this.createItems.total,
        item_img: this.createItems.image,
      }, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        }
      })
      .then(() => {
        this.$router.push({ name: 'item_detail', query: { page: this.$store.getters.store_id }});

        // 初期化
        this.init();
      })
      .catch(error => {
        // ステータス400以外返却時
        if (!(error.response.status == 400)) {
          window.alert(error.message);
        }

        // アラート判定
        if (error) {
          this.alert = true;

          // 5s後にリセット
          setTimeout(() => {
            this.reset();
          }, 3600);
        } else {
          this.alert = false;
        }
      })
    },
    // ボタン
    validate() {
      // 空文字の場合
      if (this.createItems.name == "" || this.createItems.name == undefined) return;

      // 入力値の検証と商品の登録
      this.$refs.form.validate();
      this.postItems();
    },
    reset() {
      // リセット、エラー文字を削除
      this.$refs.form.reset();

      // アラートリセット
      this.alert = false;
    },
    // 初期化
    init() {
      this.createItems = {
        name: "",
        detail: "",
        price: null,
        total: null,
        image: "",
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.v-card {
  &__title {
    align-items: center;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    font-size: .701rem;
    letter-spacing: .0125em;
    line-height: 2rem;
    word-break: break-all;
    font-weight: bold;
  }

  &__subtitle {
    text-align: left;
    padding: 16px;
    font-size: .669rem;
    line-height: 1.375rem;
    letter-spacing: .0071428571em;
  }
}
#titleInfo {
  &__title {
    font-size: 1.25rem;
  }

  &__subtitle {
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.375rem;
    letter-spacing: .0071428571em;
  }
}
</style>