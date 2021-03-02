<template>
  <v-container style="height: 1000px;">
    <v-col
      cols="auto"
      md=auto xl=auto
    >
      <v-card-title style="font-weight: bold;">Welcome to Your Furisode Shop!</v-card-title>
      <v-card-subtitle>あなたの商品を世界中に届けましょう！ / 登録はこちらから</v-card-subtitle>
      <Form/>
    </v-col>
  </v-container>
</template>

<script>
import Form from '@/components/Form.vue'

export default {
  components: {
    Form
  }
}
</script>

<style lang="scss" scoped>
.v-card__subtitle {
  text-align: left;
  padding: 16px;
}
</style>