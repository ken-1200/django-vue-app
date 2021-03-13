import axios from 'axios'
import router from '../router';

export default {
  // オートログイン
  async userAutoLogin({ commit, dispatch }) {
    // ローカルストレージからユーザー情報を取得する
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    // ローカルストレージからユーザーidを取得する
    const userId = localStorage.getItem('userId');

    // ローカルストレージからアクセストークンを取得する
    const accessToken = localStorage.getItem('userRefreshAccessToken');

    // アクセストークンが無い場合
    if (!accessToken) return;

    // 有効期限が切れているか判別
    const now = new Date();

    // 有効期限取得(未来)
    const userExpiryTimeMs = localStorage.getItem('userExpiryTimeMs');

    // 有効期限切れ取得 true/false
    const isExpired = now.getTime() >= userExpiryTimeMs;

    // リフレッシュトークン取得
    const refreshToken = localStorage.getItem('userRefreshToken');

    if (isExpired) {
      // １時間有効期限切れの場合
      await dispatch('userRefreshAccessToken', refreshToken);
    } else {
      // 有効期限内の場合、残り時間を取得する
      const expiresInMs = userExpiryTimeMs - now.getTime();

      // 残り時間後にトークンをリフレッシュする処理
      setTimeout(() => {
        dispatch('userRefreshAccessToken', refreshToken);
      }, expiresInMs);

      // リフレッシュしたアクセストークンをステートに保存する
      commit('updateUserAccessToken', accessToken);

      // ユーザーidをステートに保存する
      commit('updateUserId', userId);

      // ユーザー情報をステートに保存する
      const userInfo = {
        user_name: userName,
        user_email: userEmail,
      }
      commit('getUserInfo', userInfo);
    }
  },
  // ユーザーログイン
  async userLogin({ dispatch }, loginData) {
    await axios.post('/user_login/', {
      user_email: loginData.user_email,
      password: loginData.password,
    })
    .then(response => {
      // user_id
      const id = response.data.data.user_id;

      dispatch('setUserAuthData', {
        // オブジェクトでユーザー名、メールアドレス、id, 有効期限、アクセス、リフレッシュトークンを渡す
        user_name: response.data.data.user_name,
        user_email: response.data.data.user_email,
        user_id: response.data.data.user_id,
        access_token: response.data.data.access_token,
        refresh_token: response.data.data.refresh_token,
        expires_in: response.data.data.expires_in,
      });

      if (this.getters.addToCart.length != 0) {
        // カートに商品が入っている場合は支払い確認画面
        router.push(`/order/cart/furisode/${id}`);
      } else {
        // 商品一覧画面
        router.push('/user_home');
      }
    })
    .catch(error => {
      // ステータス400返却時
      if (error.response.status == 400) {
        window.alert(error.message);
      }

      // エラー内容を格納
      dispatch('setError', error.response.data.message);
    });
  },
  // トークンをリフレッシュする為の関数
  async userRefreshAccessToken({ dispatch }, refreshToken) {
    await axios.post('/user_refresh_token/', {
      // リフレッシュトークンを送り、アクセストークンの更新を促す
      'key': refreshToken,
    })
    .then(response => {
      // 更新されたaccess_tokenが帰ってくる
      dispatch('setUserAuthData', {
        // オブジェクトでユーザー名、メールアドレス、id, 有効期限、アクセス、リフレッシュトークンを渡す
        user_name: response.data.data.user_name,
        user_email: response.data.data.user_email,
        user_id: response.data.data.user_id,
        access_token: response.data.data.access_token,
        refresh_token: response.data.data.refresh_token,
        expires_in: response.data.data.expires_in,
      })
      .catch(error => {
        // ステータス400返却時
        if (error.response.status == 400) {
          window.alert(error.message);
        }

        // エラー内容を格納
        dispatch('setError', error.response.data.message);
      })
    });
  },
  // ローカルストレージにアクセストークンと有効期限時間とリフレッシュトークンを保存し、１時間おきにトークンを更新する
  setUserAuthData({ commit, dispatch }, authData) {
    // 有効期限を決める
    const now = new Date();
    // 1hに設定
    const userExpiryTimeMs = now.getTime() + authData.expires_in * 1000;

    // mutationsを実行し、ステートのアクセストークンに保存する
    commit('updateUserAccessToken', authData.access_token);

    // mutationsを実行し、ステートのユーザーidに保存する
    commit('updateUserId', authData.user_id);

    // ユーザー情報を格納
    const userInfo = {
      user_name: authData.user_name,
      user_email: authData.user_email,
    }
    commit('getUserInfo', userInfo);

    // ローカルストレージにユーザー名、メールさドレス、id、アクセストークンと有効期限時間とリフレッシュトークンを保存する(有効期限(12H)も保存)
    localStorage.setItem('userName', authData.user_name);
    localStorage.setItem('userEmail', authData.user_email);
    localStorage.setItem('userId', authData.user_id);
    localStorage.setItem('userRefreshAccessToken', authData.access_token);
    localStorage.setItem('userRefreshToken', authData.refresh_token);
    localStorage.setItem('userExpiryTimeMs', userExpiryTimeMs);

    // リフレッシュトークンを使って、1時間置きにトークンを更新する
    setTimeout(() => {
      dispatch('userRefreshAccessToken', authData.refresh_token);
    }, authData.expires_in * 1000);
  },
  // ログアウト
  user_logout({ commit }) {
    // AccessTokenを削除
    commit('updateUserAccessToken', null);

    // userIdを削除
    commit('updateUserId', null);

    // ユーザー情報を削除
    commit('getUserInfo', null);

    // ローカルストレージから各アイテムを削除
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRefreshAccessToken');
    localStorage.removeItem('userRefreshToken');
    localStorage.removeItem('userExpiryTimeMs');

    // DashBoardに遷移する
    router.push('/');
  },
  // 退会
  user_withDrawal({ commit, dispatch }, id) {
    axios.delete(`/users/${id}/delete_user/`)
    .then(() => {})
    .catch(error => {
      // ステータス400返却時
      if (error.response.status == 400) {
        window.alert(error.message);
      }

      // エラー内容を格納
      dispatch('setError', error.response.data.message);
    });

    // AccessTokenを削除
    commit('updateUserAccessToken', null);

    // userIdを削除
    commit('updateUserId', null);

    // ユーザー情報を削除
    commit('getUserInfo', null);

    // ローカルストレージから各アイテムを削除
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRefreshAccessToken');
    localStorage.removeItem('userRefreshToken');
    localStorage.removeItem('userExpiryTimeMs');

    // DashBoardに遷移する
    router.push('/');
  },
  // 商品リスト取得
  async getItemList({ commit }) {
    await axios.get('/all/items_list/')
    .then(response => {
      // コミット実行で商品リストを格納
      commit('getAllItemListData', response.data);
    })
    .catch(error => {
      // エラー処理
      this.getters.errorInfo = `商品が見つかりませんでした。${error}`;
    });
  },
  // カートの処理/制御
  addToCart({ state, commit }, itemData) {
    // idに紐づく商品情報を取得する
    const data = state.allItemListData.filter(el => el.pk == itemData.item_id);

    // 同じ商品をカートに入れた時は既に入っているという旨の警告を出す
    const sameItem = state.addToCart.find(el => el.pk == itemData.item_id);

    if (!sameItem) {
      // カートに格納
      commit('addToCart', data[0]);

      // 数量を格納
      commit('getItemInfo', itemData);

      // ページ遷移
      router.push('/order/cart/furisode');
    } else {
      // アラートを表示
      itemData.alert = true;

      // 1分後解除
      if (itemData.alert) {
        setTimeout(() => {
          itemData.alert = false;
        }, 60000);
      }
    }

    // カートに入れた後の商品一覧の在庫数を減らす
    const quantity = state.allItemListData.find(el => el.pk == itemData.item_id);

    // 商品一覧の在庫数からカート内の商品数を引く
    quantity.fields.item_total -= itemData.item_total;
  },
  // カート内削除
  deleteCart({ commit }, id) {
    commit('deleteCart', id);
  },
  // カート内の情報削除
  deleteCartInfo({ commit }, id) {
    commit('deleteCartInfo', id);
  },
  // 購入情報を格納
  async getPaymentInfo({ commit, dispatch }) {
    await axios.get('/payments/get_payment_info/', {
      // 第二引数にヘッダー
      headers: {
        Authorization: `Bearer ${this.getters.user_access_token}`
      }
    })
    .then(response => {
      // 購入情報をコミット
      commit('getPaymentInfo', response.data);
    })
    .catch(error => {
      // ステータス400返却時
      if (error.response.status == 400) {
        window.alert(error.message);
      }

      // エラー内容を格納
      dispatch('setError', error.response.data.message);
    });
  },
  // エラー処理共通化
  setError({ commit }, data) {
    commit('setErrorInfo', data);
  },
};