import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList'
import good from '@/views/good'
Vue.use(Router)

export default new Router({
	mode:"history",
	routes: [
	{
		path: '/GoodsList',
		name: 'GoodsList',
		component: GoodsList
	},
	{
		path: '/good',
		name: 'good',
		component: good
	}
	]
})
