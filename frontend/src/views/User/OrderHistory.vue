<template>
  <v-container fluid>
    <v-col
      cols="auto"
      md=auto xl=auto
    >
      <v-card-title style="font-weight: bold;">購入履歴</v-card-title>

      <!-- エラー -->
      <template v-if="isErrored">{{ error }}</template>

      <!-- 購入リスト（ペイIDごとにループで表示） -->
      <v-simple-table
        v-for="(payment, index) in paymentRole"
        :key="index"
        style="margin-bottom: 100px "
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                注文日時：{{ payment.bought_at }}
              </th>
              <th class="text-left">
                注文数量：{{ payment.pay_totalquantity }}
              </th>
              <th class="text-left">
                合計金額(税込)： ¥{{ payment.pay_totalprice | addComma }}
              </th>
            </tr>
          </thead>
          <tbody
            v-for="(role, index) in payment.role"
            :key="index"
          >
            <tr>
              <td>{{ role.item[0].fields.item_name }}</td>
              <td>
                ¥{{role.item[0].fields.item_price | addComma}}
              </td>
              <td>
                注文数量：{{ role.item_quantity }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return{
      error: null,
      paymentInfo: [],
      paymentRole: [],
    }
  },
  computed: {
    isErrored() {
      return this.error != null;
    },
    userAccessToken() {
      return this.$store.getters.user_access_token;
    },
  },
  methods: {},
  async created() {
    // 購入情報取得
    await this.$store.dispatch('getPaymentInfo');

    // 購入情報を初期化
    this.paymentRole = [];

    // 購入情報表示
    this.paymentInfo = this.$store.getters.paymentInfo;

    // 購入履歴がない場合
    if (this.paymentInfo.length == 0) {
      return this.error = "購入履歴がありません。"
    }

    // moment 
    const moment = require('moment-timezone');

    this.paymentInfo.forEach(el => {
      // ペイID取得
      const payId = el.pk;

      // ペイidに紐づいた購入情報を取得
      axios.get(`/payments/${payId}/get_payments/`, {
        // トークン
        headers: {
          Authorization: `Bearer ${this.userAccessToken}`
        }
      })
      .then(response => {
        // 日本時間の記述に変更
        response.data.data.bought_at = moment(response.data.data.bought_at).tz("Asia/Tokyo").format('YYYY年MM月DD日 HH時mm分');

        // ペイIDに紐づいた商品を格納
        this.paymentRole.push(response.data.data);

        // 降順
        this.paymentRole.sort((a,b) => (a.pay_id < b.pay_id ? 1 : -1));
      })
      .catch(error => {
        this.error = error;
      });
    });

    // エラー
    this.error = this.$store.getters.errorInfo;
  }
}
</script>
