import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import App from '@/App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

Vue.use(Vuetify);
Vue.use(VueRouter);

const localVue = createLocalVue()

localVue.use(Vuex)

describe('App.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      access_token: () => "",
      user_access_token: () => "",
    }

    store = new Vuex.Store({
      getters
    })
  })

  it('getters: access_token', () => {
    const wrapper = shallowMount(App, { store, localVue })
    const template = wrapper.find('div')
    expect(template.text()).toBe(getters.access_token())
  })

  it('getters: user_access_token', () => {
    const wrapper = shallowMount(App, { store, localVue })
    const template = wrapper.findAll('div').at(1)
    expect(template.text()).toBe(getters.user_access_token())
  })
});
