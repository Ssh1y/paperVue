import { login, logout, getInfo, updateInfo } from '@/api/user'

const state = {
    token: '',
    name: '',
    email: '',
    avatar: '',
    role: ''
}

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },

    SET_NAME(state, name) {
        state.name = name
    },
    SET_EMAIL(state, email) {
        state.email = email
    },
    SET_AVATAR(state, avatar) {
        state.avatar = avatar
    },
    SET_ROLE(state, role) {
        state.role = role
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        console.log(userInfo)
        const { username, password, verifyCode } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password, verifyCode: verifyCode }).then(response => {
                const { data } = response
                // TODO 优化一下逻辑，这个token可以存在vuex里面
                // localStorage.setItem('token', data.token)
                commit('SET_TOKEN', data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        }
        )
    },
    // get user info
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const { data } = response
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                const { name, email, avatar, role } = data
                commit('SET_NAME', name)
                commit('SET_EMAIL', email)
                commit('SET_AVATAR', avatar)
                commit('SET_ROLE', role)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // update user info
    updateInfo({ dispatch }, userInfo) {
        return new Promise((resolve, reject) => {
            updateInfo(userInfo).then(response => {
                const { data } = response
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                // 调用getInfo更新用户信息
                dispatch('getInfo').then(() => {
                    resolve(data)
                })
            }).catch(error => {
                reject(error)
            })
        })
    },


    // user logout
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SET_TOKEN', '')
                commit('SET_NAME', '')
                commit('SET_EMAIL', '')
                commit('SET_AVATAR', '')
                commit('SET_ROLE', '')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
