<template>
	<el-tabs>
		<el-tab-pane label="租约变更" name="zybg">
			<div>
				<el-row>
					<el-button type="primary">全部</el-button>
					<el-button type="primary" @click=selectone()>待处理</el-button>
					<el-button type="primary">派单中</el-button>
					<el-button type="primary">待验收</el-button>
					<el-button type="primary">已验收</el-button>
					<el-button type="primary">已取消</el-button>
					<el-button type="primary" @click=click()>申请</el-button>
				</el-row>
			</div>


			<div style="margin-top: 15px;">
				<div class="demo-input-suffix" >
					维修类型：<el-select v-model="zhwxlxs" placeholder="请选择维修类型">
						<el-option v-for="zh in zhwxlx" :key="zh.lxName" :label="zh.lxName" :value="zh.lxName">
						</el-option>
					</el-select> 
					&nbsp;
					工人：<el-select v-model="zhwxgrs" placeholder="请选择工人">
						<el-option v-for="zr in zhwxgr" :key="zr.grName" :label="zr.grName" :value="zr.grName">
						</el-option>
					</el-select>
					&nbsp;&nbsp;&nbsp;
					<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					&nbsp;
					<el-input v-model="input" style="width:200px;" placeholder="请输入内容"></el-input>
					
					<el-button plain size="small" style="margin-left:10px;background-color: royalblue;color: white;" @click="selectGroup()"
					 icon="el-icon-search">查询
					</el-button>

					
					<!-- 
					新增、修改维修单 
					 -->
					<el-dialog :title="dialogType" v-model="dialogFormVisible">

						<el-form :model="zhweiform">
							<el-form-item label="地址" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxCity" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="申请来源" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxLaiyuan" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="申请人" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxName" autocomplete="off"></el-input>
							</el-form-item>
							<!-- <el-form-item label="预约上门时间" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxTime" autocomplete="off"></el-input>
							</el-form-item> -->
							<el-form-item label="联系电话" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxPhone" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="预约上门时间" :label-width="formLabelWidth">
								<el-date-picker v-model="zhweiform.wxTime" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>

							<el-form-item label="维修类型" :label-width="formLabelWidth">
								<el-select v-model="zhweiform.lxId" placeholder="请选择维修类型">
									<el-option v-for="zh in zhwxlx" :key="zh.lxName" :label="zh.lxName" :value="zh.lxId">
									</el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="紧急状态" :label-width="formLabelWidth">
								<el-select v-model="zhweiform.jjId" placeholder="紧急状态">
									<el-option v-for="jj in zhwxjj" :key="jj.wxjjname" :label="jj.wxjjname" :value="jj.jjId">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="申请原因" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxReason" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						<template #footer>
							<span class="dialog-footer">
								<el-button @click="dialogFormVisible = false">取 消</el-button>
								<el-button type="primary" @click="Addweixiu()">确 定</el-button>
							</span>
						</template>
					</el-dialog>


				</div>
				<el-dialog :title="dialogType1" v-model="dialogFormVisible1">

					<el-form :model="zhweiform1">
						<el-form-item label="工人姓名" :label-width="formLabelWidth">
							<el-input v-model="zhweiform1.pdName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="备注" :label-width="formLabelWidth">
							<el-input v-model="zhweiform1.pdBeizhu" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="预计费用" :label-width="formLabelWidth">
							<el-input v-model="zhweiform1.pdQian" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="预计时间" :label-width="formLabelWidth">
							<el-date-picker v-model="zhweiform1.pdDate" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button @click="dialogFormVisible1 = false">取消</el-button>
							<el-button type="primary" @click="update()">确定</el-button>
						</span>
					</template>
				</el-dialog>


				<el-table ref="multipleTable" :data="tableData" style="width: 100%;margin-top: 10px;" :default-sort="{prop: 'driverId', order: 'descending'}">
					<el-table-column prop="ztIds" label="状态">
						<template #default="scope">
							<p v-if="scope.row.ztIds==0" style="color: skyblue;">待处理</p>
							<p v-if="scope.row.ztIds==1" style="color: red;">已取消</p>
							<p v-if="scope.row.ztIds==2" style="color: gold;">派单中</p>
						</template>
					</el-table-column>
					<!-- 	<el-table-column prop="wxjjname" label="紧急程度" width="100">
					</el-table-column> -->
					<el-table-column prop="wxReason" label="申请原因" width="100">
					</el-table-column>
					<el-table-column prop="wxCity" label="地址" width="100">
					</el-table-column>
					<el-table-column prop="wxLaiyuan" label="来源">
					</el-table-column>
					<el-table-column prop="wxName" label="申请人">
					</el-table-column>
					<el-table-column prop="wxPhone" label="电话">
					</el-table-column>
					<el-table-column prop="pdDate" label="预计上门时间">
					</el-table-column>
					<el-table-column prop="pdName" label="维修工人">
					</el-table-column>
					<el-table-column prop="wxTime" label="预计时间">
					</el-table-column>
					<el-table-column label="操作">
						<template #default="scope1">
							<!-- <el-button type="text" size="small">删除</el-button> -->
							<el-button type="text" size="small" @click=click1(scope1.row)>派单</el-button>
						</template>
					</el-table-column>
				</el-table>


				<!-- 分页部分 -->


				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo.page"
				 :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
				</el-pagination>
			</div>
		</el-tab-pane>
		<el-tab-pane label="保洁服务" name="second">
			<div>
				<el-row>
					<el-button type="primary">全部</el-button>
					<el-button type="primary">待处理</el-button>
					<el-button type="primary">派单中</el-button>
					<el-button type="primary">待验收</el-button>
					<el-button type="primary">已验收</el-button>
					<el-button type="primary">已取消</el-button>
					<el-button type="primary" @click=click()>申请</el-button>
				</el-row>
			</div>


			<div style="margin-top: 15px;">
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

					<el-button plain size="small" style="margin-left: 30px;background-color: royalblue;color: white;" @click="selectGroup()"
					 icon="el-icon-search">查询
					</el-button>

					<!-- 
					新增、修改维修单 
					 -->
					<el-dialog :title="dialogType" v-model="dialogFormVisible">

						<el-form :model="zhweiform">
							<el-form-item label="地址" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxCity" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="申请来源" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxLaiyuan" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="申请人" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxName" autocomplete="off"></el-input>
							</el-form-item>
							<!-- <el-form-item label="预约上门时间" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxTime" autocomplete="off"></el-input>
							</el-form-item> -->
							<el-form-item label="联系电话" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxPhone" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="预约上门时间" :label-width="formLabelWidth">
								<el-date-picker v-model="zhweiform.wxTime" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>

							<el-form-item label="维修类型" :label-width="formLabelWidth">
								<el-select v-model="zhweiform.lxId" placeholder="请选择维修类型">
									<el-option v-for="zh in zhwxlx" :key="zh.lxName" :label="zh.lxName" :value="zh.lxId">
									</el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="紧急状态" :label-width="formLabelWidth">
								<el-select v-model="zhweiform.jjId" placeholder="紧急状态">
									<el-option v-for="jj in zhwxjj" :key="jj.wxjjname" :label="jj.wxjjname" :value="jj.jjId">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="申请原因" :label-width="formLabelWidth">
								<el-input v-model="zhweiform.wxReason" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						<template #footer>
							<span class="dialog-footer">
								<el-button @click="dialogFormVisible = false">取 消</el-button>
								<el-button type="primary" @click="Addweixiu()">确 定</el-button>
							</span>
						</template>
					</el-dialog>


				</div>
				<el-dialog :title="dialogType1" v-model="dialogFormVisible1">

					<el-form :model="zhweiform1">
						<el-form-item label="工人姓名" :label-width="formLabelWidth">
							<el-input v-model="zhweiform1.pdName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="备注" :label-width="formLabelWidth">
							<el-input v-model="zhweiform1.pdBeizhu" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="预计费用" :label-width="formLabelWidth">
							<el-input v-model="zhweiform1.pdQian" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="预计时间" :label-width="formLabelWidth">
							<el-date-picker v-model="zhweiform1.pdDate" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button @click="dialogFormVisible1 = false">取消</el-button>
							<el-button type="primary" @click="update()">确定</el-button>
						</span>
					</template>
				</el-dialog>


				<el-table ref="multipleTable" :data="tableData2" style="width: 100%;margin-top: 10px;" :default-sort="{prop: 'driverId', order: 'descending'}">
					<el-table-column prop="ztId" min-width="30" label="状态" align="center">
						<template #default="scope">
							<p v-if="scope.row.ztId==0" style="color: skyblue;">待处理</p>
							<p v-if="scope.row.ztId==1" style="color: red;">已取消</p>
							<p v-if="scope.row.ztId==2" style="color: gold;">派单中</p>
						</template>
					</el-table-column>

					<!-- 	<el-table-column prop="wxjjname" label="紧急程度" width="100">
					</el-table-column> -->
					<el-table-column prop="bjReason" label="申请原因" width="100">
					</el-table-column>
					<el-table-column prop="fyCity" label="地址" width="100">
					</el-table-column>
					<el-table-column prop="bjLaiyuan" label="来源">
					</el-table-column>
					<el-table-column prop="wxName" label="申请人">
					</el-table-column>
					<el-table-column prop="bjPhone" label="电话">
					</el-table-column>
					<el-table-column prop="bjTime" label="预计上门时间">
					</el-table-column>
					<el-table-column prop="" label="维修工人">
					</el-table-column>
					<el-table-column prop="wxTime" label="预计时间">
					</el-table-column>
					<el-table-column label="操作">
						<template #default="scope1">
							<!-- <el-button type="text" size="small">删除</el-button> -->
							<el-button type="text" size="small" @click=click1(scope1.row)>派单</el-button>
						</template>
					</el-table-column>
				</el-table>


				<!-- 分页部分 -->


				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo2.page"
				 :page-size="pageInfo2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo2.total">
				</el-pagination>
			</div>
		</el-tab-pane>


		<el-tab-pane label="租约变更" name="third"></el-tab-pane>

	</el-tabs>



</template>

<script>
	import qs from 'qs'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		data() {
			return {
				pageInfo: {
					page: 1,
					pageSize: 5,
					total: 0
				},
				pageInfo2: {
					page: 1,
					pageSize: 5,
					total: 0
				},
				dialogType: '',
				zhweiform: {},
				zhweiform1: {},
				tableData: [], //所有维修表
				tableData2: [],
				zhwxlx: [], //租后维修类型信息
				zhwxlxs: "",
				zhwxgr: [], //租后维修工人名字信息
				zhwxgrs: "",
				zhwxjj: [], //维修紧急状态
				zhwxjjs: "",
				dialogFormVisible: false, //新增表单
				dialogFormVisible1: false, //修改表单
				dialogedit: false, //编辑表单
				formLabelWidth: '120px',
				licenceFirstDate: '',
				driverLicenceUnvalid: '',
				driverLicenceValid: '',
				names: [], //下拉列表中的员工名字
				value: '',
				people: [], //用来存储可新增的驾驶员数据
				form: {

				}, //新增表单  
				formedit: {

				}, //编辑表单



				driverId: 0, //驾驶员编号
				empId: 0, //员工编号
				editobj: {}, //修改对象
				driverStatus: '',
			}
		},
		methods: {
			// Selectone() {
			// 	let _this = this
			// 	console.log("分页：", this.pageInfo)
			// 	this.axios.get("http://localhost:8848/selectone", {
			// 			params: _this.pageInfo
			// 		})
			// 		.then(function(response) {
			// 			console.log(response)
			// 			_this.tableData = response.data.list
			// 			console.log("数据：", response.data.list)
			// 			_this.pageInfo.total = response.data.total
			// 		}).catch(function(error) {
			// 			console.log(error)
			// 		})
			// },
			
			selectone() {
				const _this = this;
				var fd = {
					currentPage: _this.pageInfo.page,
					pageSize: _this.pageInfo.pageSize,
				};
				console.log(fd,"qqq")
				_this.axios({
						url: 'http://localhost:8848/selectone',
						method: 'get',
						params: fd,
					})
					.then(function(response) {
						console.log("currentPage::", response.data.data.list)
						_this.tableData = response.data.data.list
						_this.pageInfo.total = response.data.data.total
						console.log("查看所有的取消订单：", _this.tableData)
					}).catch(function(error) {
						console.log(error)
					})
			},

			//修改
			click1(ROW) {
				this.zhweiform1 = {
					pdDate: '',
					pdBeizhu: '',
					pdQian: '',
					pdName: '',
					wxId: ROW.wxId,
				}
				this.dialogType1 = '派单';
				this.dialogFormVisible1 = true;
			},
			//新增
			click() {
				this.zhweiform = {
					wxTime: '',
					wxPhone: '',
					wxLaiyuan: '',
					wxName: '',
					wxjjname: '',
					wxCity: '',
					lxId: '',
					jjId: '',
					wxReason: '',
					fwId: '',

				}
				this.dialogType = '新增';
				this.dialogFormVisible = true;
			},

			//修改
			update() {
				const _this = this;
				if (this.dialogType1 == "派单") {
					var uu = this.zhweiform1.pdDate.getFullYear() + "-" + (this.zhweiform1.pdDate.getMonth() + 1) + "-" + this.zhweiform1
						.pdDate.getDate();
					console.log("修改数据：", this.zhweiform1)
					this.zhweiform1.pdDate == uu
					console.log(this.zhweiform1)
					this.axios.post("update", this.zhweiform1).then(req => {
						alert("修改成功")
						this.selectzhwxlx();
						_this.updatezt()
					})

				} else {

				}
			},
			//修改状态
			updatezt() {
				const _this = this;
				if (this.dialogType1 == "派单") {
					console.log("修改状态：", this.zhweiform1)
					console.log(this.zhweiform1)
					this.axios.post("updatezt", this.zhweiform1).then(req => {
						// alert("修改成功")
						//this.selectzhwxlx();
					})

				} else {

				}
			},
			//确认 npm install qs
			Addweixiu() {
				const _this = this;
				if (this.dialogType == "新增") {
					var tt = this.zhweiform.wxTime.getFullYear() + "-" + (this.zhweiform.wxTime.getMonth() + 1) + "-" + this.zhweiform
						.wxTime.getDate();
					console.log("新增数据：", this.zhweiform)
					this.zhweiform.wxTime == tt
					console.log(this.zhweiform)
					this.axios.post("insertBatch", this.zhweiform).then(req => {
						alert("新增成功")
					})

				} else {

				}

			},
			//查询所有维修类型
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
			//查询所有维修工人
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
			//查询所有紧急状态
			selectzhwxjj() {
				const _this = this;
				_this.axios({
						url: 'http://localhost:8848/selectjj',
						method: 'get',
					})
					.then(function(response) {
						_this.zhwxjj = response.data.data;
						console.log("紧急状态::", response.data.data)
						console.log("值：", _this.zhwxjj)
					}).catch(function(error) {
						// console.log(error)
					})
			},
			created1() {
				let _this = this
				console.log("分页：", this.pageInfo)
				this.axios.get("http://localhost:8848/slectPageAll", {
						params: _this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.tableData = response.data.list
						console.log("数据：", response.data.list)
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},

			handleCurrentChange(page) {
				var _this = this
				this.pageInfo.page = page;
				this.axios.get("http://localhost:8848/slectPageAll", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.tableData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},

			handleSizeChange(size) {
				var _this = this
				this.pageInfo.pageSize = size;
				this.axios.get("http://localhost:8848/slectPageAll", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.tableData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},


			created2() {
				let _this = this
				console.log("分页：", this.pageInfo2)
				this.axios.get("http://localhost:8848/slectPageAll1", {
						params: _this.pageInfo2
					})
					.then(function(response) {
						console.log(response)
						_this.tableData2 = response.data.list
						console.log("数据：", response.data.list)
						_this.pageInfo2.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},

			handleCurrentChange2(page) {
				var _this = this
				this.pageInfo2.page = page;
				this.axios.get("http://localhost:8848/slectPageAll1", {
						params: this.pageInfo2
					})
					.then(function(response) {
						console.log(response)
						_this.tableData2 = response.data.list
						_this.pageInfo2.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},

			handleSizeChange2(size) {
				var _this = this
				this.pageInfo2.pageSize = size;
				this.axios.get("http://localhost:8848/slectPageAll1", {
						params: this.pageInfo2
					})
					.then(function(response) {
						console.log(response)
						_this.tableData2 = response.data.list
						_this.pageInfo2.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},


		},




		created() {
			this.selectzhwxlx();
			this.selectzhwxgr();
			this.selectzhwxjj();
			this.created1();
			this.created2();

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
