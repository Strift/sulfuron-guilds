import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import LoginPage from '~/pages/connexion.vue'
import LoginPageTemplate from '~/components/templates/LoginPage.vue'
import { getters, state } from '~/store/account'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account: {
      state,
      getters,
      namespaced: true
    }
  }
})
store.dispatch = jest.fn()

const mountComponent = ({ authToken } = {}) => {
  const query = {}
  if (authToken) {
    query.auth_token = authToken
  }
  return mount(LoginPage, {
    store,
    localVue,
    mocks: {
      $config: {
        baseURL: 'https://guildes.sulfuron.eu'
      },
      $router: {
        push: jest.fn(),
        currentRoute: {
          query
        }
      }
    }
  })
}

describe('Login Page', () => {
  it('displays the LoginPageTemplate', () => {
    const wrapper = mountComponent()
    expect(wrapper.findComponent(LoginPageTemplate).exists()).toBe(true)
  })

  it('attempts login if there is an auth_token query parameter', () => {
    mountComponent({ authToken: 'some-token' })
    expect(store.dispatch).toHaveBeenCalledWith('account/login', 'some-token')
  })
})
