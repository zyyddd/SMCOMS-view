import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
    
  },
  {
    path: '/login',
    name: 'Login',
    component:Login

  },
  {
    path:'/checkout',
    name:'Checkout',
    component:() => import('../views/Checkout.vue')
  },
  {
    path:'/bef_main',
    name:'Bef_main',
    redirect:'/main'

  },
  
  {
    path: '/main',
    name: '',
    component: () => import( '../views/Main.vue'),
    children:[
      {
        path:'/',
        name:'Welcome',
        component:() =>import('../views/Welcome')
      },
      
      {
        path:'/user',
        name:'User',
        component:() =>import('../views/User.vue')
      },
      {
        path:'/goods',
        name:'Goods',
        component:() =>import('../views/Goods.vue')
      },
      {
        path:'/order',
        name:'Order',
        component:() =>import('../views/Order.vue')
      },
      {
        path:'/customer',
        name:'Customer',
        component:() =>import('../views/Customer.vue')
      },
      {
        path:'/adduser',
        name:'Adduser',
        component:() =>import('../views/Adduser.vue')
      },
      {
        path:'/addgoods',
        name:'Addgoods',
        component:() =>import('../views/Addgoods.vue')
      },
      {
        path:'/addcustomer',
        name:'Addcustomer',
        component:() =>import('../views/Addcustomer.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
