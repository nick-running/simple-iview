<template>
    <div class="main-layout">
        <Layout style="min-height: 100vh;">
            <mHeader></mHeader>
            <!--<Content :style="{padding: '0 50px'}">-->
                <!--<Breadcrumb :style="{margin: '20px 0'}">-->
                    <!--<BreadcrumbItem>来吧</BreadcrumbItem>-->
                    <!--<BreadcrumbItem>就是</BreadcrumbItem>-->
                    <!--<BreadcrumbItem>这里</BreadcrumbItem>-->
                <!--</Breadcrumb>-->
                <!--<Card>-->
                    <!--<div style="min-height: 200px;">-->
                        <!--<transition name="fade" mode="out-in">-->
                            <!--<router-view></router-view>-->
                        <!--</transition>-->
                    <!--</div>-->
                <!--</Card>-->
            <!--</Content>-->

            <Layout :style="{padding: '0 50px 24px'}">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem>来吧</BreadcrumbItem>
                    <BreadcrumbItem>就是</BreadcrumbItem>
                    <BreadcrumbItem>这里</BreadcrumbItem>
                </Breadcrumb>
                <!--<Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">-->
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                <!--</Content>-->
            </Layout>
            <!--<Footer class="layout-footer-center">2011-2016 &copy; BigEvent</Footer>-->
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
