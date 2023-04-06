const getters = {
    // token: state => state.user.token,
    token: state => {
        console.log('state.user.token:', state.user.token)
        return state.user.token
    },
    name: state => state.user.name,
    email: state => state.user.email,
    avatar: state => state.user.avatar,
    role: state => state.user.role
}

export default getters