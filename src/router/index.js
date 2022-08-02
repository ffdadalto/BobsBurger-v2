import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/Pedido', name: 'Pedido', component: () => import('@/views/Pedido.vue') },
    { path: '/Item', name: 'Item', component: () => import('@/views/Item.vue') },
    { path: '/Situacao', name: 'Situacao', component: () => import('@/views/Situacao.vue') },
    { path: '/Cliente', name: 'Cliente', component: () => import('@/views/Cliente.vue') },
    { path: '/FormaPagamento', name: 'FormaPagamento', component: () => import('@/views/FormaPagamento.vue') },
    { path: '/Bairro', name: 'Bairro', component: () => import('@/views/Bairro.vue') },
    { path: '/Cidade', name: 'Cidade', component: () => import('@/views/Cidade.vue') },
    { path: '/Sobre', name: 'Sobre', component: () => import('@/views/Sobre.vue') },
    { path: '/Erro404', name: 'Erro404', component: () => import('@/views/404.vue') },
  ]
})

export default router
