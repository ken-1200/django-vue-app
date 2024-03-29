<template>
  <v-container fluid>
    <v-col
      cols="auto"
      md=auto xl=auto
    >
      <!-- 商品詳細一覧 -->
      <v-card-title id="titleInfo__title">公開中の商品一覧</v-card-title>
      <v-card-subtitle id="titleInfo__subtitle">あなたの商品をここで確認しましょう</v-card-subtitle>

      <!-- エラー -->
      <template v-if="isErrored">{{ error }}</template>

      <transition-group
        name="fade"
        tag="div"
        class="row row--dense"
        @beforeEnter="beforeEnter"
      >
        <v-col
          v-for="(item, index) in detailItems"
          :key="index"
          class="d-flex child-flex"
          cols=12 md=3 xl=4
        >
          <v-card
            @click.stop="itemEdit(item.pk)"
            elevation-24
            hover
            outlined
          >
            <v-img
              :src="item.fields.item_img"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              aspect-ratio="1"
              height="200px"
            >

              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <!-- タイトル/サブタイトル -->
            <v-card-title
              v-text="item.fields.item_name"
            ></v-card-title>
            <v-card-subtitle
              v-text="item.fields.item_detail"
            ></v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon x-small>{{ item.fields.item_price }}円</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon x-small>{{ item.fields.item_total }}個</v-icon>
              </v-btn>
              <v-menu
                bottom
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mr-2"
                    x-small
                    v-bind="attrs"
                    v-on="on"
                  >
                    削除
                  </v-icon>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(dialog, i) in dialogTitle"
                    :key="i"
                    @click="clickMenu(i, item.pk)"
                  >
                    <v-list-item-title>{{ dialog.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-col>
      </transition-group>
    </v-col>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      detailItems: [],
      error: null,
      blobUrl: "",
      dialogTitle: [
        {
          title: 'キャンセル',
        },
        {
          title: 'OK',
        },
      ]
    }
  },
  computed: {
    accessToken() {
      return this.$store.getters.access_token;
    },
    getByStoreId() {
      return this.$store.getters.store_id;
    },
    isErrored() {
      return this.error != null;
    },
  },
  methods: {
    clickMenu(index, item_id) {
      switch (index) {
        case 0:
          "() => {}"
          break;
        case 1:
          this.itemDelete(item_id);
          break;
        default:
          "() => {}"
      }
    },
    itemEdit(item_id) {
      this.$router.push(`/item_detail/edit/${item_id}`);
    },
    async itemDelete(item_id) {
      await axios.delete(`/all/${item_id}/delete_item/`)
      .then(() => {
        // リロードする
        this.$router.go({ name: 'item_detail', query: { page: this.$store.getters.store_id }});
      })
      .catch(error => {
        // ステータス400返却時
        if (error.response.status == 400) {
          window.alert(error.message);
        } else {
          window.alert(error.message);
        }
      });
    },
    beforeEnter() {
      // 一番上のルートにアクセス
      this.$root.$emit('triggerScroll');
    },
  },
  // 非同期
  async created() {
    // プロミスが帰って来たら(レスポンス)表示する、またはエラー表示
    await this.$store.dispatch('getItem');
    this.detailItems = this.$store.getters.storeItemData;

    // 画像取得用のURL
    const getImageUrl = process.env.VUE_APP_BASE_URL;

    // 画像を表示
    this.detailItems.forEach(el => {
      // 画像がないもの
      if (el.fields.item_img == "") {
        // サンプル
        el.fields.item_img = getImageUrl + "image/sampleImage.jpg";
      } else {
        // 画像あり
        el.fields.item_img = getImageUrl + el.fields.item_img;
      }
    });

    // エラー情報取得
    this.error = this.$store.getters.errorInfo;

    // エラー表示
    if (this.detailItems.length != 0) {
      // エラー内容表示(ex)Notfound..)
      this.error = this.$store.getters.errorInfo;
    } else {
      // 商品がない時(0個返却された)
      this.error = ' 商品がありません。新しい商品を登録しましょう。';
    }
  },
}
</script>

<style lang="scss" scoped>
/* fade-move */
.fade-move {
  transition: transform 1.26s;
}
/* fade-transition */
.fade-enter, 
.fade-leave-to {
  /* 現れる時の最初の状態, 消えるときの最後の状態 */
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  /* 現れる時のトランジションの状態, 消えるときのトランジションの状態 */
  transition: opacity 1.26s;
}
.fade-enter-to,
.fade-leave {
  /* 現れる時の最後の状態, 消える時の最初の状態 */
  opacity: 1;
}

.v-btn--icon.v-size--default {
  height: 36px;
  width: 32px;
}
.v-card {
  &__title {
    align-items: center;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    font-size: .701rem;
    font-weight: bold !important;
    letter-spacing: .0125em;
    line-height: 2rem;
    word-break: break-all;
  }

  &__subtitle {
    text-align: left;
    padding: 16px;
    font-size: .669rem;
    font-weight: 400;
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
    margin-bottom: 8px;
  }
}
.v-application .mr-2 {
  margin-right: 8px!important;
  margin-left: 8px!important;
}
</style>