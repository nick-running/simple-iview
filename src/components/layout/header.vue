<template>
    <Header>
        <Menu @on-select="handleMenuSelect" mode="horizontal" theme="dark" :active-name="activeMenu">
            <router-link class="layout-logo" to="/discover" tag="div"></router-link>
            <div class="layout-nav" style="float:left;margin-left: 40px">
                <MenuItem name="table">
                    <Icon type="ios-apps" />
                    表格
                </MenuItem>
                <Submenu name="line-chart">
                    <template slot="title">
                        <Icon type="md-person"/>
                        图表
                    </template>
                    <MenuItem name="line-chart">
                        <Icon type="md-person"/>
                        折线图
                    </MenuItem>
                    <MenuItem name="graph-chart">
                        <Icon type="ios-log-out"/>
                        关系图
                    </MenuItem>
                </Submenu>
                <!--<MenuItem name="line-chart">-->
                    <!--<Icon type="ios-apps" />-->
                    <!--折线图-->
                <!--</MenuItem>-->
                <MenuItem name="discover">
                    <Icon type="ios-compass-outline" />
                    发现列表
                </MenuItem>
            </div>
            <div class="layout-nav" style="float:right;">
                <!--<Submenu v-if="account.username" name="3">-->
                    <!--<template slot="title">-->
                        <!--<Icon type="md-person" />-->
                        <!--{{account.username}}-->
                    <!--</template>-->
                    <!--<MenuItem name="profile">-->
                        <!--<Icon type="md-person" />-->
                        <!--profile-->
                    <!--</MenuItem>-->
                    <!--<MenuItem name="logout">-->
                        <!--<Icon type="ios-log-out" /> 退出</MenuItem>-->
                <!--</Submenu>-->
                <!--<MenuItem v-else name="login">-->
                    <!--<Icon type="md-person"></Icon>-->
                    <!--登录-->
                <!--</MenuItem>-->
            </div>
        </Menu>
    </Header>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: "header",
    data(){
      return {
        activeMenu: null
      }
    },
    methods: {
      ...mapActions(['logout']),
      handleMenuSelect(name) {

        switch (name) {
          case 'table':
            this.$router.push('/table')
            break
          case 'line-chart':
            this.$router.push('/lineChart')
            break
          case 'graph-chart':
            this.$router.push('/graphChart')
            break
          case 'discover':
            this.$router.push('/discover')
            break
          case 'login':
            this.$router.push('/login')
            break
          case 'profile':
            this.$router.push('/profile')
            break
          case 'logout':
            this.logout()
            // localStorage.setItem('tto', null)
            // localStorage.setItem('username', null)
            // this.$store.commit('updateUser', {username: ''})
            this.$router.push('/login')
            break
        }
      }

    },
    computed: {
      ...mapState({
        // account: state => state.account,
      }),
      username(){

      }
    },
    created() {
      // console.log('this.$route is: ', this.$route.path.replace('/',''))
      this.activeMenu = this.$route.path.replace('/','')
    }
  }
</script>

<style scoped>
    .layout-logo{
        background-image: url("../../assets/logo.png");
        background-repeat: no-repeat;
        background-position-y: center;
        float: left;
        width: 50px;
        height: 64px;
        background-size: contain;
        cursor: pointer;
    }
</style>