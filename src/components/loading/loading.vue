<template>
    <div class="loading">
        <Spin fix>
            <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
            <!--<div>Loading</div>-->
        </Spin>
        <!--<div>Loading</div>-->
    </div>
</template>

<script>
  export default {
    name: "loading"
  }
</script>

<style scoped>
    .spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>