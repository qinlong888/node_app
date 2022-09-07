import { createStore } from 'vuex'

// 命名常量
const types = {
  SET_IS_AUTHENTIATED: 'SET_IS_AUTHENTIATED', // 是否认证通过
  SET_USER: 'SET_USER' // 用户信息
}

const state = {
  isAuthenticated: false,  // 是否授权认证
  user: {}   // 存储用户信息
}

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  user(state) {
    return state.user;
  }
}

const mutations = {
  [types.SET_IS_AUTHENTIATED](state, isAutnenticated) {
    if (isAutnenticated)
      state.isAutnenticated = isAutnenticated
    else
      state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user)
      state.user = user
    else
      state.user = {}
  }
}

const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(types.SET_IS_AUTHENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_IS_AUTHENTIATED, false)
    commit(types.SET_USER, null)
  }
}

const modules = {

}
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules
})
