import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: [{
		path: '/',
		name: 'index',
		redirect: '/show',
		component: resolve => require(['./views/index.vue'], resolve)
	}, {
		path: '/show',
		name: 'show',
		meta: [{
			path: "Admin",
			name: "管理"
		}],
		component: resolve => require(['./components/Show.vue'], resolve)
	}, {
		path: '/shoplist',
		name: 'ShopList',
		component: resolve => require(['./components/ShopList.vue'], resolve)
	}, {
		path: '/shopdetail/:id',
		name: 'ShopDetail',
		redirect: '/shopdetail/:id/comment/:id',
		component: resolve => require(['./components/ShopDetail.vue'], resolve),
		children: [{
			path: '/shopdetail/:id/comment/:id',
			name: 'Comment',
			component: resolve => require(['./components/Comment.vue'], resolve)
		}, {
			path: '/shopdetail/:id/detail/:id',
			name: 'Detail',
			component: resolve => require(['./components/Detail.vue'], resolve)
		}]
	}, {
		path: '/shopcar',
		name: 'ShopCar',
		component: resolve => require(['./components/ShopCar.vue'], resolve)
	}, {
		path: '/login',
		name: 'Login',
		component: resolve => require(['./components/Login.vue'], resolve)
	}, {
		path: '/regist',
		name: 'Regist',
		component: resolve => require(['./components/Regist.vue'], resolve)
	}, {
		path: '/infomanage',
		name: 'InfoManage',
		redirect: '/infomanage/userinfo',
		component: resolve => require(['./components/userInfoAdmin/InfoManage.vue'], resolve),
		children: [{
			path: '/infomanage/userinfo',
			name: 'UserInfo',
			component: resolve => require(['./components/userInfoAdmin/UserInfo.vue'], resolve)
		}, {
			path: '/infomanage/boughtShop',
			name: 'BoughtShop',
			component: resolve => require(['./components/userInfoAdmin/BoughtShop.vue'], resolve)
		}, {
			path: '/infomanage/collectedShop',
			name: 'CollectedShop',
			component: resolve => require(['./components/userInfoAdmin/CollectedShop.vue'], resolve)
		}]
	}, {
		path: '/addShop',
		name: 'AddShop',
		component: resolve => require(['./components/admin/AddShop.vue'], resolve)
	}, {
		path: '/updateShop/:id',
		name: 'UpdateShop',
		component: resolve => require(['./components/admin/UpdateShop.vue'], resolve)
	}, {
		path: '/admin',
		name: 'Admin',
		component: resolve => require(['./components/admin/Admin.vue'], resolve)
	}, {
		path: '/account',
		name: 'Account',
		component: resolve => require(['./components/Account.vue'], resolve)
	}, {
		path: '*',
		redirect: '/'
	}]
})