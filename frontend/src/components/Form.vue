<template>
  <div id="app">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :counter="30"
        :rules="nameRules"
        :error-messages="errorName"
        label="Name"
        prepend-icon="mdi-account"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="email"
        :rules="emailRules"
        :error-messages="errorEmail"
        label="E-mail"
        prepend-icon="mdi-email"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passRules"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="８文字以上必要です。"
        counter
        prepend-icon="mdi-lock"
        @click:append="show = !show"
        required
      ></v-text-field>

      <v-col style="text-align: center;">
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
          修正する
        </v-btn>

        <v-btn
          :loading="loading"
          color="darkblueshade"
          style="color: #fbfbfb;"
          class="mr-4"
          @click="loginButton"
        >
          登録済みの方はこちらから
        </v-btn>
      </v-col>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
import { formMixins } from '@/formMixins';

export default {
  mixins: [ formMixins ],
  name: 'Form',
  methods: {
    // ショップ登録
    async register(){
      this.loading = true;
      await axios.post('stores/create_store/', {
        // オブジェクトを送る
        store_name: this.name,
        store_email: this.email,
        store_password: this.password,
      })
      .then(response => {
        this.$router.push('/store_login');
        console.log(response.data);
      })
      .catch(error => {
        this.onError(error);
      });
      // ローディング、テキスト解除
      this.loading = false;
      this.name = "";
      this.email = "";
      this.password = "";
    },
    onError(error) {
      // エラー内容を変数に格納
      const name = error.response.data.store_name;
      const email = error.response.data.store_email;

      // ステータス400以外返却時
      if (!(error.response.status == 400)) {
        window.alert(error.message);
      }

      // ステータス400返却時
      else if (Boolean(name) && Boolean(email)) {
        // 両方エラーの場合
        this.errorName = "この名前を持ったショップが既に存在します。";
        this.errorEmail = "このメールアドレスを持ったショップが既に存在します。";
      } else {
        // 片方がエラーの場合
        !name ? this.errorEmail = "このメールアドレスを持ったショップが既に存在します。" : this.errorName = "この名前を持ったショップが既に存在します。";
      }

      // 3.6s後にリセット
      setTimeout(() => {
        this.reset();
      }, 3600);
    },
    loginButton() {
      // login画面に遷移
      this.$router.push('store_login');
    },
  }
};
</script>

<style lang="scss" scoped>
.v-btn {
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  margin: 10px 5px 0 5px;
}
</style>