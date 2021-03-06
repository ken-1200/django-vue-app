<template>
  <v-container>
    <!-- スライド -->
    <v-carousel
      :continuous="true"
      :cycle="cycle"
      :show-arrows="true"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="430"
      style="opacity: 0.9; z-index: 10;"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
      >
      </v-carousel-item>
    </v-carousel>

    <!-- サイト紹介 -->
    <v-col
      cols="auto"
      md=auto xl=auto
    >
      <v-card
        width="100%"
        outlined
      >
        <v-card-title style="font-weight: bold; font-size: 34px; letter-spacing: 1px;">
          Welcome to the furrisode sample site!
        </v-card-title>

        <v-card-subtitle>
          Infomation
        </v-card-subtitle>

        <v-card-text style="padding: 10px 16px 0 16px; text-align: left;">
          <p>・このサイトではショップのオーナーとしてあなたのオリジナルの振袖から使わなくなった振袖まで世界中の人に販売することができます。</p>
        </v-card-text>
        <v-card-text style="padding: 10px 16px 0 16px; text-align: left;">
          <p>・あなたのお店をここで作成しましょう！アカウント作成から商品販売まで簡単でスピーディーに対応していただけます。</p>
        </v-card-text>
        <v-card-text style="padding: 10px 16px 0 16px; text-align: left;">
          <p>・欲しかった振袖やオリジナリティ溢れる商品が見つかるかもしれません！会員登録は簡単でスピーディーに登録することができます。</p>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- JavaScriptをつかってアニメーション -->
    <v-lazy
      v-model="isActiveCircleRed"
    >
      <transition
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div class="circle-red"></div>
      </transition>
    </v-lazy>

    <!-- ストアログイン -->
    <v-col
      style="padding-top: 200px;"
      cols="auto"
      md=auto xl=auto
    >
      <v-lazy
        v-model="isActiveStore"
        :options="{
          threshold: .5
        }"
        min-height="400"
        transition="slide-x-transition"
      >
        <v-card>
          <v-card-title style="font-weight: bold; letter-spacing: 1px;">ショップのオーナーとして登録しましょう！</v-card-title>
          <v-card-subtitle>
            Infomation
          </v-card-subtitle>

          <v-card-text>
            あなたのお店を登録しましょう。このボタンから登録をすれば簡単にショップのオーナーになれます。ゲストログインもありますので、気軽にお試しください！
          </v-card-text>

          <!-- ボタン -->
          <v-card
            width="100%"
            outlined
          >
            <v-btn
              class="ma-10"
              min-width="16%"
              height="60px"
              color="#1c1c1d"
              style="color: #fbfbfb;"
              @click.stop="goToShop"
            >
              ショップを開設する
            </v-btn>
          </v-card>
        </v-card>
      </v-lazy>

      <!-- JavaScriptをつかってアニメーション -->
      <v-lazy
        v-model="isActiveCircleBlue"
      >
        <transition
          :css="false"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <div class="circle-blue"></div>
        </transition>
      </v-lazy>

      <v-lazy
        v-model="isActiveUser"
        :options="{
          threshold: .5
        }"
        min-height="400"
        transition="slide-x-transition"
      >
        <v-card>
          <v-card
            width="100%"
            outlined
          >
            <v-card-title style="font-weight: bold; letter-spacing: 1px;">好きな商品を購入しましょう！</v-card-title>
            <v-card-subtitle>
              Infomation
            </v-card-subtitle>

            <v-card-text>
              お気に入りの商品を見つけて購入しましょう。このボタンから登録をすればスムーズに商品を購入できるようになります。ゲストログインもありますので、気軽にお試しください！
            </v-card-text>

          <!-- ボタン -->
            <v-btn
              class="ma-10"
              min-width="16%"
              height="60px"
              color="#1c1c1d"
              style="color: #fbfbfb;"
              @click.stop="goToUser"
            >
              新規登録する
            </v-btn>
          </v-card>
        </v-card>
      </v-lazy>

      <!-- JavaScriptをつかってアニメーション -->
      <v-lazy
        v-model="isActiveCircleGreen"
      >
        <transition
          :css="false"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <div class="circle-green"></div>
        </transition>
      </v-lazy>

      <v-lazy
        v-model="isActiveGuests"
        :options="{
          threshold: .5
        }"
        min-height="400"
        transition="slide-x-transition"
      >
        <v-card>
          <!-- ゲストログイン -->
          <v-card
            width="100%"
            outlined
          >
            <v-card-title style="font-weight: bold; letter-spacing: 1px;">ゲストログインはこちらから！</v-card-title>
            <v-card-subtitle>
              Infomation
            </v-card-subtitle>

            <v-card-text>
              ゲストログインもありますので、気軽にお試しください！<br>
              ショップオーナーとして試してみる↓<br>
              <!-- ストアゲストボタン -->
              <v-btn
                class="ma-10"
                min-width="16%"
                height="60px"
                color="#1c1c1d"
                style="color: #fbfbfb; margin-top: 20px !important;"
                @click.stop="storeLoginAsaGuest"
              >
                ストアゲスト
              </v-btn><br>
            </v-card-text>
            <v-card-text>
              会員登録を試してみる↓<br>
              <!-- ユーザーゲストボタン -->
              <v-btn
                class="ma-10"
                min-width="16%"
                height="60px"
                color="#1c1c1d"
                style="color: #fbfbfb; margin-top: 20px !important;"
                @click.stop="userLoginAsaGuest"
              >
                ユーザーゲスト
              </v-btn><br>
            </v-card-text>
          </v-card>
        </v-card>
      </v-lazy>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cycle: true,
      slides: [
        {
          src: require('../../public/image/sample7.jpg'),
        },
        {
          src: require('../../public/image/sample8.jpg'),
        },
        {
          src: require('../../public/image/sample9.jpg'),
        },
      ],
      isActiveStore: false,
      isActiveUser: false,
      isActiveGuests: false,
      isActiveCircleRed: false,
      isActiveCircleBlue: false,
      isActiveCircleGreen: false,
      email: process.env.VUE_APP_MAIL_ADDRESS,
      password: process.env.VUE_APP_MAIL_PASSWORD,
    }
  },
  methods: {
    goToShop() {
      this.$router.push('/store_register');
    },
    goToUser() {
      this.$router.push('/user_register');
    },
    onError() {
      // エラー内容を変数に格納
      this.error = this.$store.getters.errorInfo;

      // アラート判定
      if (this.error) {
        this.alert = true;

        // 5s後にリセット
        setTimeout(() => {
          this.reset();
        }, 3600);
      } else {
        this.alert = false;
      }

      // エラー内容リセット
      this.$store.dispatch('setError', null);
    },
    async storeLoginAsaGuest() {
      await this.$store.dispatch('login', {
        store_email: this.email,
        store_password: this.password,
      });

      // エラーの処理
      this.onError();

      // リセット
      this.email = "";
      this.password = "";
    },
    async userLoginAsaGuest(){
      await this.$store.dispatch('userLogin', {
        user_email: this.email,
        password: this.password,
      });

      // エラーの処理
      this.onError();

      // リセット
      this.email = "";
      this.password = "";
    },
    beforeEnter(el) { //現れる前
      el.style.transform = "scale(0)";
    },
    enter(el, done) { //現れる時
      let scale = 0;
      const interval = setInterval(() => {  //アロー関数
        el.style.transform = `scale(${scale})`; //scale = 0;値を入れてあげる。
        scale += 0.01  //0.01づつ大きくしていく。
        if ( scale > 1 ) {  //終わらせる構文。
          clearInterval(interval);
          done();  //cssを使わないときは必ずいる。
        }
      }, 10);
    },
    leave(el, done) { //消えるとき
      let scale = 1;  
      const interval = setInterval(() => {  //アロー関数
        el.style.transform = `scale(${scale})`; //scale = 0;値を入れてあげる。
        scale -= 0.01  //0.01づつ大きくしていく。
        if ( scale < 0 ) {  //終わらせる構文。
          clearInterval(interval);
          done();  //cssを使わないときは必ずいる。
        }
      }, 10);
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
.circle-red {
  position: absolute;
  top: 580px;
  left: 0px;
  z-index: 0;
  width: 400px;
  height: 400px;
  margin: auto;
  border-radius: 200px;
  background-color: #FF5252;
}
.circle-blue {
  position: absolute;
  top: 1200px;
  right: 0px;
  z-index: 0;
  width: 400px;
  height: 400px;
  margin: auto;
  border-radius: 200px;
  background-color: #308DC2;
}
.circle-green {
  position: absolute;
  top: 1900px;
  left: 0px;
  z-index: 0;
  width: 400px;
  height: 400px;
  margin: auto;
  border-radius: 200px;
  background-color: #4CAF50;
}
.v-card {
  margin-bottom: 10px;
  z-index: 10;

  &__subtitle {
    text-align: left;
    padding: 16px;
    letter-spacing: 1px;
  }
}
.v-card__text {
  position: relative;
  top: -2px;
  border-bottom: 1px solid #DDD;
}

.v-card__text::after {
  position: absolute;
  content: " ";
  border-bottom: solid 1px #ec4747;
  bottom: -1px;
  width: 10%;
  display: block;
}
</style>