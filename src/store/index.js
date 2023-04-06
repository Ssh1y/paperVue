import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import user from './modules/user'

export default createStore(
    {
        getters,
        modules: {
            user
        },
        plugins: [createLogger(), createPersistedState()]
    }
)
