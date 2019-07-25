<template>
    <div class="Table">
        <h1>表格</h1>
        <s-table
                :url="overviewUrl"
                :fetchParams="condTypes"
                :columns="tableColumns"
                :data="tableData"
                :hasPage="false"
                mapId="code">
        </s-table>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: "Table",
    data() {
      return {
        overviewUrl: this.$insightUrls.G_CITY_LIST,
        condTypes: {
          businessName: '',
          ip: '',
        },
        tableColumns: [],
        tableData: []
      }
    },
    methods: {},
    computed: {
      ...mapState({
        cities: state => state.tables.cities.cities,
      }),
    },
    created(){
      this.tableColumns = this.cities
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>