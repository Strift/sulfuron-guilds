import { config } from '@vue/test-utils'

config.stubs['nuxt-img'] = { template: '<img/>' }
config.stubs.NuxtLink = { template: '<a></a>' }
