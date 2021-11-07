<template>
	<el-tabs>
		<el-tab-pane label="租约变更" name="zybg">
			<div style="border: 1px solid red; ">
				<el-row>
					<el-button type="info">全部</el-button>
					<el-button type="info">待处理</el-button>
					<el-button type="info">派单中</el-button>
					<el-button type="info">待验收</el-button>
					<el-button type="info">已验收</el-button>
					<el-button type="info">已取消</el-button>
					<el-button type="info" @click="dialogFormVisible = true">申请</el-button>
				</el-row>
			</div>


			<div>
				<div class="demo-input-suffix">
					维修类型：<el-select v-model="zhwxlxs" placeholder="请选择维修类型">
						<el-option v-for="zh in zhwxlx" :key="zh.lxName" :label="zh.lxName" :value="zh.lxName">
						</el-option>
					</el-select>
					&nbsp;
					工人：<el-select v-model="zhwxgrs" placeholder="请选择工人">
						<el-option v-for="zr in zhwxgr" :key="zr.grName" :label="zr.grName" :value="zr.grName">
						</el-option>
					</el-select>
					&nbsp;
					<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-input v-model="input" style="width:200px;" placeholder="请输入内容"></el-input>
					&nbsp;

					<el-button plain size="small" style="margin-left: 50px;background-color: #13CE66;color: white;" @click="selectGroup()"
					 icon="el-icon-search">查询
					</el-button>

					<!-- 
					新增驾驶员部分 
					 -->
					<el-dialog title="新增维修单" v-model="dialogFormVisible">
						<el-form :model="form">
							<el-form-item label="地址" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="申请来源" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="申请人" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="预约上门时间" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="联系电话" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="维修类型" :label-width="formLabelWidth">
								<el-select v-model="zhwxlxs" placeholder="请选择维修类型">
									<el-option v-for="zh in zhwxlx" :key="zh.lxName" :label="zh.lxName" :value="zh.lxName">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="紧急状态" :label-width="formLabelWidth">
								<el-select v-model="form.region" placeholder="请选择">
									<el-option label="紧急" value="shanghai"></el-option>
									<el-option label="一般" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="申请原因" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						<template #footer>
							<span class="dialog-footer">
								<el-button @click="dialogFormVisible = false">取 消</el-button>
								<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
							</span>
						</template>
					</el-dialog>
				</div>


				<el-table ref="multipleTable" :data="driver" style="width: 100%;margin-top: 10px;" :default-sort="{prop: 'driverId', order: 'descending'}">
					<el-table-column prop="driverLicence" label="状态">
					</el-table-column>
					<el-table-column label="紧急程度" width="100" prop="driverName">
					</el-table-column>
					<el-table-column label="申请原因" width="100" prop="driverName">
					</el-table-column>
					<el-table-column label="地址" width="100" prop="driverName">
					</el-table-column>
					<el-table-column prop="driverLicence" label="来源">
					</el-table-column>
					<el-table-column prop="driverLicenceValid" label="申请人">
					</el-table-column>
					<el-table-column prop="driverLicenceUnvalid" label="电话">
					</el-table-column>
					<el-table-column prop="driverLicenceUnvalid" label="预约上门时间">
					</el-table-column>
					<el-table-column prop="driverLicenceUnvalid" label="维修工人">
					</el-table-column>
					<el-table-column prop="driverLicenceUnvalid" label="预计时间">
					</el-table-column>
					<el-table-column label="操作">
						<template #default="scope">
							<el-button size="mini" icon="el-icon-edit" plain>修改
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 编辑驾驶员部分  -->

				<!-- 分页部分 -->

				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"
				 :page-sizes="[1,3]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</el-tab-pane>
		<el-tab-pane label="保洁服务" name="second"></el-tab-pane>
		<el-tab-pane label="租约变更" name="third"></el-tab-pane>

	</el-tabs>



</template>

<script>
	import {
		ElMessage
	} from 'element-plus'
	export default {
		methods: {
			selectzhwxlx() {
				const _this = this;
				_this.axios({
						url: 'http://localhost:8848/selectzhwxlx',
						method: 'get',
					})
					.then(function(response) {
						_this.zhwxlx = response.data.data;
						console.log("维修类型", response.data.data)
						console.log("8888888：", _this.zhwxlx)
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectzhwxgr() {
				const _this = this;
				_this.axios({
						url: 'http://localhost:8848/selectzhgr',
						method: 'get',
					})
					.then(function(response) {
						_this.zhwxgr = response.data.data;
						console.log("维修工人::", response.data.data)
						console.log("值：", _this.zhwxgr)
					}).catch(function(error) {
						// console.log(error)
					})
			},
		},
		// mounted() {
		
		// },
		data() {
			return {
				zhwxlx: [], //租后维修类型信息
				zhwxlxs:"",
				zhwxgr:[],//租后维修工人名字信息
				zhwxgrs:"",
				dialogFormVisible: false, //新增表单
				dialogedit: false, //编辑表单
				formLabelWidth: '120px',
				total: 0,
				pageNo: 1,
				pageSize: 5,
				driverphone: '', //组合查询中的驾驶员电话
				driverName: '', //组合查询中的驾驶员名字
				empFileHome: '', //组合查询中的驾驶员地址
				licenceFirstDate: '',
				driverLicenceUnvalid: '',
				driverLicenceValid: '',

				names: [], //下拉列表中的员工名字
				value: '',
				people: [], //用来存储可新增的驾驶员数据
				form: {}, //新增表单  
				formedit: {
				
				}, //编辑表单

				driverId: 0, //驾驶员编号
				empId: 0, //员工编号
				editobj: {}, //修改对象
				driverStatus: ''
			}
		},
		created() {
			this.selectzhwxlx();
			this.selectzhwxgr();
		}
		
	}
</script>

<style scoped="scoped">
	#box_table {
		margin-top: 10px;
	}

	/* .demo-input-suffix {
		font-size: 4px;
	} */

	.el-input,
	.el-select {
		width: 180px;
	}

	.el-overlay {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2000;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		overflow: hidden;
	}
</style>
