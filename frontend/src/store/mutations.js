export default {
    // トークン
    updateAccessToken(state, token) {
      state.access_token = token;
    },
    // ユーザーのトークン
    updateUserAccessToken(state, token) {
      state.user_access_token = token;
    },
    // ストアID
    updateStoreId(state, store_id) {
      state.store_id = store_id;
    },
    // ユーザーID
    updateUserId(state, user_id) {
      state.user_id = user_id;
    },
    // ストア側商品データ
    getItemDetail(state, storeItemData) {
      state.storeItemData = storeItemData;
    },
    // 商品リスト
    getAllItemListData(state, allItemListData) {
      state.allItemListData = allItemListData;
    },
    // カートの中身
    addToCart(state, addToCart) {
      state.addToCart.push(addToCart);
    },
    // 商品情報
    getItemInfo(state, itemInfo) {
      state.itemInfo.push(itemInfo);
    },
    // カート内削除
    deleteCart(state, id) {
      const index = state.addToCart.findIndex(el => el.pk == id);
      if (index >= 0) {
        state.addToCart.splice(index, 1);
      }
    },
    // カート内の情報削除
    deleteCartInfo(state, id) {
      const index = state.itemInfo.findIndex(el => el.item_id == id);
      if (index >= 0) {
        state.itemInfo.splice(index, 1);
      }
    },
    // ユーザー情報を格納
    getUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 支払い情報取得
    getPaymentInfo(state, paymentInfo) {
      state.paymentInfo = paymentInfo;
    },
    setErrorInfo(state, errorInfo) {
      state.errorInfo = errorInfo;
    },
};