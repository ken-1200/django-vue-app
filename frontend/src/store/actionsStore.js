import axios from 'axios'
import router from '../router';

const actions = {
  // 商品取得
  async getItem({ commit }) {
    await axios.get(`/items/get_item_detail/?page=${this.getters.store_id}`, {
      // 第二引数にヘッダー
      headers: {
        Authorization: `Bearer ${this.getters.access_token}`
      }
    })
    .then(response => {
      console.log(response.data);
      // コミット実行で、商品データを格納
      commit('getItemDetail', response.data);
    })
    .catch(error => {
      // エラー処理
      this.getters.errorInfo = `商品が見つかりませんでした。${error}`;
      console.log(error);
    });
  },
  // オートログイン
  async autoLogin({ commit, dispatch }) {
    // ローカルストレージからストアidを取得する
    const StoreId = localStorage.getItem('StoreId');

    // ローカルストレージからアクセストークンを取得する
    const accessToken = localStorage.getItem('refreshAccessToken');

    // アクセストークンが無い場合
    if (!accessToken) return;

    // 有効期限が切れているか判別
    const now = new Date();

    // 有効期限取得(未来)
    const expiryTimeMs = localStorage.getItem('expiryTimeMs');

    // 有効期限切れ取得 true/false
    const isExpired = now.getTime() >= expiryTimeMs;

    // リフレッシュトークン取得
    const refreshToken = localStorage.getItem('refreshToken');

    if (isExpired) {
      // １時間有効期限切れの場合
      await dispatch('refreshAccessToken', refreshToken);
      console.log('トークンを更新しました。');
    } else {
      // 有効期限内の場合、残り時間を取得する
      const expiresInMs = expiryTimeMs - now.getTime();

      // 残り時間後にトークンをリフレッシュする処理
      setTimeout(() => {
        dispatch('refreshAccessToken', refreshToken);
      }, expiresInMs);

      // リフレッシュしたアクセストークンをステートに保存する
      commit('updateAccessToken', accessToken);

      // ストアidをステートに保存する
      commit('updateStoreId', StoreId);
    }
  },
  // ログイン
  async login({ dispatch }, loginData) {
    await axios.post('store_login/', {
      store_email: loginData.store_email,
      store_password: loginData.store_password
    })
    .then(response => {
      console.log(response.data.data);
      dispatch('setAuthData', {
        // オブジェクトでid, 有効期限、アクセス、リフレッシュトークンを渡す
        store_id: response.data.data.store_id,
        access_token: response.data.data.access_token,
        refresh_token: response.data.data.refresh_token,
        expires_in: response.data.data.expires_in,
      });
      // ストアホーム画面に遷移
      router.push('/store_home');
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
  // ログアウト
  logout({ commit }) {
    // AccessTokenを削除
    commit('updateAccessToken', null);

    // StoreIdを削除
    commit('updateStoreId', null);

    // ItemDataを削除
    commit('getItemDetail', []);

    // ローカルストレージから各アイテムを削除
    localStorage.removeItem('StoreId');
    localStorage.removeItem('refreshAccessToken');
    localStorage.removeItem('expiryTimeMs');
    localStorage.removeItem('refreshToken');

    // DashBoardに遷移する
    router.push('/');
  },
  // トークンをリフレッシュする為の関数
  async refreshAccessToken({ dispatch }, refreshToken) {
    await axios.post('/refresh_token/', {
      // リフレッシュトークンを送り、アクセストークンの更新を促す
      'refresh_key': refreshToken,
    })
    .then(response => {
      // 更新されたaccess_tokenが帰ってくる
      dispatch('setAuthData', {
        // オブジェクトで有効期限、アクセス、リフレッシュトークンを渡す
        store_id: response.data.data.store_user_id,
        access_token: response.data.data.access_token,
        refresh_token: response.data.data.refresh_token,
        expires_in: response.data.data.expires_in,
      });
    });
  },
  // ローカルストレージにアクセストークンと有効期限時間とリフレッシュトークンを保存し、１時間おきにトークンを更新する
  setAuthData({ commit, dispatch }, authData) {
    // 有効期限を決める
    const now = new Date();
    // 1hに設定
    const expiryTimeMs = now.getTime() + authData.expires_in * 1000;

    // mutationsを実行し、ステートのアクセストークンに保存する
    commit('updateAccessToken', authData.access_token);

    // mutationsを実行し、ステートのストアidに保存する
    commit('updateStoreId', authData.store_id);

    // ローカルストレージにアクセストークンと有効期限時間とリフレッシュトークンを保存する(有効期限(12H)も保存)
    localStorage.setItem('StoreId', authData.store_id);
    localStorage.setItem('refreshAccessToken', authData.access_token);
    localStorage.setItem('refreshToken', authData.refresh_token);
    localStorage.setItem('expiryTimeMs', expiryTimeMs);

    // リフレッシュトークンを使って、1時間置きにトークンを更新する
    setTimeout(() => {
      dispatch('refreshAccessToken', authData.refresh_token);
      console.log('1時間おきに更新しました。')
    }, authData.expires_in * 1000);
  },
}

export default {
  actions,
};