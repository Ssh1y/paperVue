import axios from "axios"
import router from "@/router"
import store from "@/store"

const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    baseURL: "http://localhost:8088",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
    // 带上cookie
    withCredentials: true
})

service.interceptors.request.use(
    config => {
        const token = store.getters.token
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            if (res.code === 401) {
                router.push('/login')
            }
            return Promise.reject(new Error(res.message || 'Error')).catch(err => {
                console.log(err)
            })
        } else {
            return res
        }
    }
)

export default service