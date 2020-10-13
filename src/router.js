import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: () => import('@/views/EventList')
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: () => import('@/views/EventShow'),
      props: true,
      beforeEnter(to, from, next) {
        // в идеале это делать в компоненте через beforeRouteEnter , но он не имеет this
        store
          .dispatch('event/fetchEvent', to.params.id)
          .then(event => {
            to.params.event = event
            next()
          })
          .catch(e => {
            if (e.response && e.response.status === 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: () => import('@/views/EventCreate')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/NotFound'),
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: () => import('@/views/NotFound')
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
    }
  ]
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})
router.afterEach(() => Nprogress.done())

export default router
