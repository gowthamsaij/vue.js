import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Auth/Login'
import AdminLogin from '@/components/Auth/AdminLogin'

import Logout from '@/components/Auth/Logout'
import list from '@/components/list'

import secure from '@/components/secure'
import importfile from '@/components/Recurring/importfile'
import recurringlist from '@/components/Recurring/recurringlist'
import recurringlistdata from '@/components/Recurring/recurringlistdata'
import recurringfaildatalist from '@/components/Recurring/recurringfaildatalist'
import recurringprocessdata from '@/components/Recurring/recurringprocessdata'




import index from '@/components/index'
import router from '../router'
import store  from '../store/store'


Vue.use(VueRouter)

export default new VueRouter({

 mode :'history',
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login,
			meta : {
				requiresVisitor : true
			}
		},
		{
			path: '/list/:name',
			name: 'list',
			component: list,
			meta : {
				requiresAuth : true
			}
		},
		{
			path: '/dashboard',
			name: 'index',
			component: index,
			meta : {
				requiresAuth :true,
				breadcrumb : [
				{
					name : 'Dashboard',
					link : 'dashboard'
				},
				{
					name : 'Overview',
					link : ''
				}
				]
			}
		},
		{
			path: '/recurringupload',
			name: 'importfile',
			component: importfile,
			meta : {
				requiresAuth :true,
				breadcrumb : [
				{
					name : 'Dashboard',
					link : 'dashboard'
				},
				{
					name : 'Recurring Upload',
					link : ''
				}
				]
			}
		},
		{
			path: '/recurringlist',
			name: 'recurringlist',
			component: recurringlist,
			meta : {
				requiresAuth :true,
				breadcrumb : [
				{
					name : 'Dashboard',
					link : 'dashboard'
				},
				{
					name : 'Recurring List',
					link : ''
				}]
			}
		},
		{
			path: '/recurringdetails/:id',
			name: 'recurringlistdata',
			component: recurringlistdata,
			meta : {
				requiresAuth :true,
				breadcrumb : [
				{
					name : 'Dashboard',
					link : '/'
				},
				{
					name : 'Recurring List',
					link : '/recurringlist'
				},
				{
					name : 'Recurring List data',
					link : ''
				},]
			}
		},
		{
			path: '/recurringfaildetails/:id',
			name: 'recurringfaildatalist',
			component: recurringfaildatalist,
			meta : {
				requiresAuth :true,
				breadcrumb : [
				{
					name : 'Dashboard',
					link : '/'
				},
				{
					name : 'Recurring List',
					link : '/recurringlist'
				},
				{
					name : 'Recurring List data',
					link : ''
				},]
			}
		},
		{
			path: '/recurringprocess/:id',
			name: 'recurringprocessdata',
			component: recurringprocessdata,
			meta : {
				requiresAuth :true,
				breadcrumb : [
				{
					name : 'Dashboard',
					link : '/'
				},
				{
					name : 'Recurring List',
					link : '/recurringlist'
				},
				{
					name : 'Recurring card details',
					link : ''
				},]
			}
		},
		{
			path: '/logout',
			name: 'Logout',
			component: Logout,
			meta : {
				requiresAuth :true
			}
		},
		{
			path: '/admin/login',
			name: 'AdminLogin',
			component: AdminLogin,
			meta : {
				requiresVisitor : true
			}
		},
		{
			path: '*',
			component: secure
		}
	],

});


//validating router
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (store.getters.getUser != null) {
		 next()
		}
		else {
			next({
				path: '/'
			})
		}
	}
	else {
		//afterlogin dont allow to go login page
		if (store.getters.getUser != null) {
			next({
				path :'/dashboard'
			})
		}
		else {
	 next()
		}
	}
})

