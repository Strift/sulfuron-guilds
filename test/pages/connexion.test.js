import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import LoginPage from '~/pages/connexion.vue'
import LoginCard from '~/components/Login/Card.vue'
import LoginButton from '~/components/Login/Button.vue'
import BattleNetIcon from '~/components/BattleNetIcon.vue'
import { state, getters } from '~/store/account'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('LoginCard', LoginCard)
localVue.component('LoginButton', LoginButton)
localVue.component('BattleNetIcon', BattleNetIcon)

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
        currentRoute: {
          query
        }
      }
    }
  })
}

describe('Login Page', () => {
  it('displays the LoginCard', () => {
    const wrapper = mountComponent()
    expect(wrapper.findComponent(LoginCard).exists()).toBe(true)
  })

  it('attempts login if there is an auth_token query parameter', () => {
    mountComponent({ authToken: 'some-token' })
    expect(store.dispatch).toHaveBeenCalledWith('account/login', 'some-token')
  })
})
