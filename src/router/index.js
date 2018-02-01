import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import good from '@/views/good'
Vue.use(Router)

export default new Router({
	base:'/',

	routes: [
	{path:'/',redirect:'/GoodsList'},
	{
		path: '/GoodsList',
		name: 'GoodsList',
		component: GoodsList
	},
	{
		path: '/Cart',
		name: 'Cart',
		component: Cart
	}
	]
})
