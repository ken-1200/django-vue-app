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
      style="opacity: 0.9;"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
      >
      </v-carousel-item>
    </v-carousel>

    <!--  -->
    <v-col
      cols="auto"
      md=auto xl=auto
    >
      <!-- <img src="../../public/image/sample7.jpg" alt=""> -->
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
          min-width="16%"
          height="60px"
          color="#1c1c1d"
          style="color: #fbfbfb;"
          @click.stop="goToShop"
        >
          ショップを開設する
        </v-btn>
      </v-card>
    </v-col>

    <v-col>
      <div class="tween-animate-title">
        <div class="tween-animate-title"></div>
        <h2 class="tween-animate-title">Find Your House</h2>
        <p class="tween-animate-title">お気に入りの宿泊先を見つけましょう</p>
      </div>
      <div class="houses__inner">
        <div class="houses__item">
          <div class="cover-slide hover-darken">
            <div class="bg-img-zoom img-bg50" style="background-image: url(images/villa-1.jpg);"></div>
          </div>
          <p class="houses__title">House 1</p>
        </div>
        <div class="houses__item">
          <div class="cover-slide hover-darken">
            <div class="bg-img-zoom img-bg50" style="background-image: url(images/villa-2.jpg);"></div>
          </div>
          <p class="houses__title">House 2</p>
        </div>
        <div class="houses__item">
          <div class="cover-slide hover-darken">
            <div class="bg-img-zoom img-bg50" style="background-image: url(images/villa-3.jpg);"></div>
          </div>
          <p class="houses__title">House 3</p>
        </div>
        <div class="houses__item">
          <div class="cover-slide hover-darken">
            <div class="bg-img-zoom img-bg50" style="background-image: url(images/villa-4.jpg);"></div>
          </div>
          <p class="houses__title">House 4</p>
        </div>
        <div class="houses__item">
          <div class="cover-slide hover-darken">
            <div class="bg-img-zoom img-bg50" style="background-image: url(images/villa-5.jpg);"></div>
          </div>
          <p class="houses__title">House 5</p>
        </div>
        <div class="houses__item">
          <div class="cover-slide hover-darken">
            <div class="bg-img-zoom img-bg50" style="background-image: url(images/villa-6.jpg);"></div>
          </div>
          <p class="houses__title">House 6</p>
        </div>
        <div class="houses__btn appear up">
          <button class="btn slide-bg item">もっと詳しく</button>
        </div>
      </div>
    </v-col>

    <v-card
      width="100%"
      outlined
    >
      <v-card-title style="font-weight: bold;">好きな商品を購入しましょう！</v-card-title>
      <v-card-subtitle>お気に入りの商品を見つけて購入しましょう。このボタンから登録をすればスムーズに商品を購入できるようになります。ゲストログインもありますので、気軽にお試しください！</v-card-subtitle>
      <v-card-text>
        Find and buy your favorite products. If you register from this button, you will be able to purchase products smoothly. There is also a guest login, so feel free to try it!
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

    <!-- ショップオーナー既に登録している方 -->
    <v-card
      width="100%"
      outlined
    >
      <v-card-title style="font-weight: bold;">既にショップオーナーの方！</v-card-title>
      <v-card-subtitle>こちらからログインしてください。</v-card-subtitle>

    <!-- ボタン -->
      <v-btn
        class="ma-10"
        min-width="16%"
        height="60px"
        color="#1c1c1d"
        style="color: #fbfbfb;"
        @click.stop="goToStoreLogin"
      >
        ログインする
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import ScrollObserver from '../scrollMixins.js'
import TweenTextAnimation from '../textAnimationMixins.js'

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
    }
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
    textAnimation(el, inview) {
      if(inview) {
        const ta = new TweenTextAnimation(el);
        ta.animate();
      }
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
  mounted() {
    // イベントリスナーを登録
    document.addEventListener('popstate', () => {
      new ScrollObserver('.tween-animate-title', this.textAnimation, {rootMargin: "-200px 0px"});
    });
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