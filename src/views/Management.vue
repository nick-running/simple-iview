<template>
	<div class="management">
		<div class="mb">
			<Button @click="drawer.visible = true"
			        type="primary" size="small">新增</Button>
		</div>
		<s-table
				:url="overviewUrl"
				:fetchParams="condTypes"
				:columns="tableColumns"
				:data="tableData"
				:sortable="true"
				:option="tableOption"
				:hasPage="false"
				@on-row-change="handleRowChanged"
				mapId="code">
		</s-table>
		<Drawer
				title="Create"
				v-model="drawer.visible"
				width="420"
				:mask-closable="false"
				:styles="styles"
		>
			<Form ref="formValidate" :model="formData" :rules="ruleValidate">
				<Row :gutter="32">
					<i-col span="12">
						<FormItem label="Name" prop="name" label-position="top">
							<Input v-model="formData.name" placeholder="please enter user name" />
						</FormItem>
					</i-col>
					<i-col span="12">
						<FormItem label="Url" prop="url" label-position="top">
							<Input v-model="formData.url" placeholder="please enter url">
								<span slot="prepend">http://</span>
								<span slot="append">.com</span>
							</Input>
						</FormItem>
					</i-col>
				</Row>
				<Row :gutter="32">
					<i-col span="12">
						<FormItem label="Owner" prop="owner" label-position="top">
							<Select v-model="formData.owner" placeholder="please select an owner">
								<Option value="jobs">Steven Paul Jobs</Option>
								<Option value="ive">Sir Jonathan Paul Ive</Option>
							</Select>
						</FormItem>
					</i-col>
					<i-col span="12">
						<FormItem label="Type" prop="type" label-position="top">
							<Select v-model="formData.type" placeholder="please choose the type">
								<Option value="private">Private</Option>
								<Option value="public">Public</Option>
							</Select>
						</FormItem>
					</i-col>
				</Row>
				<Row :gutter="32">
					<i-col span="12">
						<FormItem label="DateTime" prop="date" label-position="top">
							<DatePicker v-model="formData.date" type="daterange" placeholder="please select the date" transfer style="display: block" placement="bottom-end"></DatePicker>
						</FormItem>
					</i-col>
				</Row>
				<FormItem label="Description" label-position="top">
					<Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" />
				</FormItem>
			</Form>
			<div class="demo-drawer-footer">
				<Button style="margin-right: 8px" @click="drawer.visible = false">Cancel</Button>
				<Button :loading="drawer.footer.loading" type="primary" @click="handleDrawerSubmit('formValidate')">Submit</Button>
			</div>
		</Drawer>
	</div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: "management",
    data() {
      return {
        overviewUrl: this.$insightUrls.G_CITY_LIST,
        condTypes: {
          businessName: '',
          ip: '',
        },
        tableOption: {
          maxHeight: 600
        },
        tableColumns: [],
        tableData: [],
        activeData: null,
        activeId: null,
        drawer: {
          visible: false,
          loading: false, // 内部加载
          footer: {
            loading: false
          }
        },
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        formData: {
          name: '',
          url: '',
          owner: '',
          type: '',
          date: '',
          desc: ''
        },
        ruleValidate: {
          name: [
            { required: true, trigger: 'blur', message: '请输入名称' },
            { type: 'string', min: 2, max: 36, message: '请输入长度为2至36个字符的名称', trigger: 'blur' },
          ],
          url: [
            { required: true, trigger: 'blur', message: '请输入url' },
            { type: 'string', max: 255, message: '请输入长度为2至36个字符的名称', trigger: 'blur' },
          ],
          owner: [
            { type: 'string', required: true, message: '请选择所有者', trigger: 'change' }
          ],
          type: [
            { type: 'string', required: true, message: '请选择所type', trigger: 'change' }
          ],
          date: [
            {
              required: true, type: 'array',
              fields: {
                0: {type: 'date', required: true, message: '请输入起止日期'},
                1: {type: 'date', required: true, message: '请输入起止日期'}
              }
            }
          ],
        },
      }
    },
    methods: {
      handleRowChanged({data, activeId}){
        console.log('...handleRowChanged')
        this.activeData = data
        this.activeId = activeId
      },
      handleDrawerSubmit(name){
        const _this = this
        // this.drawer.footer.loading = true
        this.$refs[name].validate((valid) => {
          if (valid) {
            _this.$Message.success('通过！')
            _this.drawer.visible = false
          }
        })
      }
    },
    computed: {
      ...mapState({
        cities: state => state.tables.cities.cities,
      }),
    },
    watch: {
      'drawer.visible'(v){
        if(!v){
          this.$refs.formValidate.resetFields()
        }
      }
    },
    mounted() {
      
    },
    created() {
      this.tableColumns = this.cities
    }
  }
</script>

<style scoped lang="scss">
	.demo-drawer-footer{
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		border-top: 1px solid #e8e8e8;
		padding: 10px 16px;
		text-align: right;
		background: #fff;
	}
</style>