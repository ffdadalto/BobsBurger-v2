import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Pedido from '@/views/Pedido.vue'
import Item from '@/views/Item.vue'
import Situacao from '@/views/Situacao.vue'
import Cliente from '@/views/Cliente.vue'
import FormaPagamento from '@/views/FormaPagamento.vue'
import Bairro from '@/views/Bairro.vue'
import Cidade from '@/views/Cidade.vue'
import Sobre from '@/views/Sobre.vue'
import Erro404 from '@/views/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/Pedido', name: 'Pedido', component: Pedido },
    { path: '/Item', name: 'Item', component: Item },
    { path: '/Situacao', name: 'Situacao', component: Situacao },
    { path: '/Cliente', name: 'Cliente', component: Cliente },
    { path: '/FormaPagamento', name: 'FormaPagamento', component: FormaPagamento },
    { path: '/Bairro', name: 'Bairro', component: Bairro },
    { path: '/Cidade', name: 'Cidade', component: Cidade },    
    { path: '/Sobre', name: 'Sobre', component: Sobre },
    { path: '/Erro404', name: 'Erro404', component: Erro404 },
  ]
})

export default router
