
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    access_token : localStorage.getItem('access_token') || null,
    merchant_id : localStorage.getItem('merchant_id') || null,
    merchantName : localStorage.getItem('merchantName') || null,
    user_access : localStorage.getItem('user_access') || null
}

const getters = {
    getUser: state => {
        return state.access_token
    },
    loggedIn: state => {
        return state.access_token !== null
    },
    loggedOut: state => {
        return state.access_token === null
    },
    mechantId: state => {
    	return state.merchant_id
    },
    userAccess: state => {
    	return state.user_access
    }
}

const mutations = {
    change(state, token) {
      	state.access_token = token
    },
    userAcessState(state, access) {
    	state.user_access = access
    },
    logOut(state, token) {
      	state.access_token = null
      	state.merchant_id = null
      	state.merchantName = null
      	state.user_access = null
    },
    removeaccessToken(){
        state.access_token = null
        state.merchant_id = null
      	state.merchantName = null
      	state.user_access = null

    }
}

const actions = {
    changeEvent (context, access_token) {
    	context.commit('change', access_token)
   },
   removeToken(context) {
	    localStorage.removeItem('access_token')
	    localStorage.removeItem('merchant_id')
	    localStorage.removeItem('merchantName')
	    localStorage.removeItem('user_access')
	    context.commit('removeaccessToken')
   },
   getToken(context) {
	   const token = localStorage.getItem('access_token')
	   return token
   },
   getMerchantName(context) {
	   const merchantname = localStorage.getItem('merchantName')
	   return merchantname
   },
   getUserAccess(context) {
	   const user = localStorage.getItem('user_access')
	   return user
   }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
