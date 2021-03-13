import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

// ストア
const DashBoard = () => import(/* webpackChunkName: "DashBoard" */"./views/DashBoard.vue");
const StoreLogin = () => import(/* webpackChunkName: "StoreLogin" */"./views/Store/StoreLogin.vue");
const StoreRegister = () => import(/* webpackChunkName: "StoreRegister" */"./views/Store/StoreRegister.vue");
const StoreItemRegister = () => import(/* webpackChunkName: "StoreItemRegister" */"./views/Store/StoreItemRegister.vue");
const StoreItemList = () => import(/* webpackChunkName: "StoreItemList" */"./views/Store/StoreItemList.vue");
const StoreItemDetail = () => import(/* webpackChunkName: "StoreItemDetail" */"./views/Store/StoreItemDetail.vue");
const StoreHomePage = () => import(/* webpackChunkName: "StoreHomePage" */"./views/Store/StoreHomePage.vue");

// ユーザー
const UserRegister = () => import(/* webpackChunkName: "UserRegister" */"./views/User/UserRegister.vue");
const UserLogin = () => import(/* webpackChunkName: "UserLogin" */"./views/User/UserLogin.vue");
const UserHomePage = () => import(/* webpackChunkName: "UserHomePage" */"./views/User/UserHomePage.vue");
const OrderHistory = () => import(/* webpackChunkName: "OrderHistory" */"./views/User/OrderHistory.vue");

// 商品
const ItemList = () => import(/* webpackChunkName: "ItemList" */"./views/Item/ItemList.vue");
const ItemDetail = () => import(/* webpackChunkName: "ItemDetail" */"./views/Item/ItemDetail.vue");
const ItemCart = () => import(/* webpackChunkName: "ItemCart" */"./views/Item/ItemCart.vue");
const ItemCartOrder = () => import(/* webpackChunkName: "ItemCartOrder" */"./views/Item/ItemCartOrder.vue");
const PaymentConfirmed = () => import(/* webpackChunkName: "PaymentConfirmed" */"./views/PaymentConfirmed.vue");

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: DashBoard,
    },
    {
      path: '/store_register',
      component: StoreRegister,
    },
    {
      path: '/store_login',
      component: StoreLogin,
    },
    {
      path: '/store_home',
      component: StoreHomePage,
    },
    {
      path: '/item_register',
      component: StoreItemRegister,
      beforeEnter(to, from, next) {
        if (store.getters.access_token) {//access_tokenがない時は、ログイン画面へ
          next();
        } else {
          next('/store_login');
        }
      }
    },
    {
      path: '/item_list',
      component: ItemList
    },
    {
      path: '/item_detail',
      name: 'item_detail',
      component: StoreItemList,
      beforeEnter(to, from, next) {
        if (store.getters.store_id) { // ストアidがない場合は、ダッシュボードへ
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/item_detail/edit/:id',
      component: StoreItemDetail,
      beforeEnter(to, from, next) {
        if (store.getters.store_id) { // ストアidがない場合は、商品詳細へ
          next();
        } else {
          next('/item_detail');
        }
      }
    },
    {
      path: '/user_register',
      component: UserRegister,
    },
    {
      path: '/user_login',
      component: UserLogin,
    },
    {
      path: '/user_home',
      component: UserHomePage,
      beforeEnter(to, from, next) {
        if (store.getters.user_access_token) { // ユーザートークンがない場合は、ダッシュボードへ
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/items/:id',
      component: ItemDetail,
    },
    {
      path: '/order/cart/furisode',
      component: ItemCart,
    },
    {
      path: '/order/cart/furisode/:id',
      component: ItemCartOrder,
      beforeEnter(to, from, next) {
        if (store.getters.user_access_token) { // ユーザートークンがない場合は、ダッシュボードへ
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/payment',
      component: PaymentConfirmed,
      beforeEnter(to, from, next) {
        if (store.getters.user_access_token) { // ユーザートークンがない場合は、ダッシュボードへ
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/member/order/history',
      component: OrderHistory,
      beforeEnter(to, from, next) {
        if (store.getters.user_access_token) { // ユーザートークンがない場合は、ダッシュボードへ
          next();
        } else {
          next('/');
        }
      }
    },
    {
      // 定義されていないパスへの対応
      path: '*',
      beforeEnter(to, from, next) {
        if (store.getters.access_token) { // ストアのトークンがある場合は、ストアホームへ
          next('/store_home');
        } else if (store.getters.user_access_token) { // ユーザーのトークンがある場合は、ユーザーホームへ
          next('/user_home');
        } else { // それ以外はダッシュボード画面へ
          next('/');
        }
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // スクロール位置を記憶している場合はその位置を返す
    if (savedPosition) {
      return new Promise((resolve) => {
        // トランジションあり
        this.app.$root.$once('triggerScroll', () => {
          resolve(savedPosition);
        });
      });
    } else {
      // それ以外は、先頭の位置を返す
      return { x: 0, y: 0 };
    }
  }
});