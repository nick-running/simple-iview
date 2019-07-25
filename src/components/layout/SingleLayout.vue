<template>
    <div class="main-layout">
        <Layout style="min-height: 100vh;">
            <mHeader></mHeader>
            <Layout :style="{padding: '24px 50px'}">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import mHeader from './header'
  import { mapState } from 'vuex'
  export default {
    name: "main-layout",
    components: {mHeader},
    methods: {
    },
    computed: {
    }
  }
</script>

<style scoped>
</style>
