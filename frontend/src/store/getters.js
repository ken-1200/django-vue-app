export default {
  access_token: state => state.access_token,
  user_access_token: state => state.user_access_token,
  store_id: state => state.store_id,
  user_id: state => state.user_id,
  userInfo: state => state.userInfo,
  storeItemData: state => state.storeItemData,
  allItemListData: state => state.allItemListData,
  selectItems: state => id => { return state.allItemListData.filter(el => el.pk === id); },
  addToCart: state => state.addToCart,
  itemInfo: state => state.itemInfo,
  paymentInfo: state => state.paymentInfo,
  errorInfo: state => state.errorInfo,
};