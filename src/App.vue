<template>
  <div id="app">
    <Header :user="user"/>
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'App',
  components: {
    Header
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    return {
      user
    }
  }
}
</script>
