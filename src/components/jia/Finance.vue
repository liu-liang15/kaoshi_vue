<template>
	<el-tabs v-model="Account" @tab-click="handleClick">
		<!-- -------------------------------------------- 财务收支 ----------------------------------------- -->
		<el-tab-pane label="财务收支" name="first">
			<el-row>
				<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
					<div class="el-select-table-one-s">
						快速检索：<el-select v-model="pageInfo.value" placeholder="请选择" clearable>
							<el-option label="收付款方姓名" value="收付款方姓名"></el-option>
							<el-option label="费用类型" value="费用类型"></el-option>
						</el-select>
						<el-input v-model="pageInfo.input" clearable class="el-input-one-s"></el-input>
					</div>
					<div class="el-select-table-two-s">
						<el-button @click="selectCwFinance" style="background:#337ab7;border-color: #337ab7;color: #fff;">查询</el-button>
						<el-button @click="finance=true" style="background:#337ab7;border-color: #337ab7;color: #fff;">添加记账</el-button>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="23" class="el-table-show-one-s">
					<div class="grid-content2 bg-purple-dark1">
						<div>
							<el-table :data="CwFinanceData" @selection-change="handleSelectionChange" stripe class="el-table-one-s" ref="multipleTable"
							 :header-cell-style="{background:'rgb(238, 241, 246) none repeat scroll 0% 0%',color:'#606266'}">
								<el-table-column type="index" width="30" align="center">
								</el-table-column>
								<el-table-column prop="cwCosttype.costtypeName" min-width="30" label="费用类型" align="center">
								</el-table-column>
								<el-table-column prop="money" min-width="30" label="金额" align="center">
								</el-table-column>
								<el-table-column prop="budgetsTime" min-width="50" label="收支时间" align="center">
								</el-table-column>
								<el-table-column prop="costDescription" min-width="30" label="费用描述" align="center">
								</el-table-column>
								<el-table-column prop="htRuZhur.name" min-width="30" label="收/付款方" align="center">
								</el-table-column>
								<el-table-column prop="htRuZhur.phone" min-width="30" label="电话" align="center">
								</el-table-column>
								<el-table-column prop="state" min-width="30" label="状态" align="center">
									<template #default="scope">
										<p v-if="scope.row.state==0" style="color: skyblue;">待收款</p>
										<p v-if="scope.row.state==1" style="color: red;">待付款</p>
										<p v-if="scope.row.state==2" style="color: gold;">待审核</p>
										<p v-if="scope.row.state==3" style="color: greenyellow;">审核成功</p>
										<p v-if="scope.row.state==4" style="color: gray;">审核失败</p>
									</template>
								</el-table-column>
								<el-table-column label="操作" align="center">
									<template #default="scope">
										<el-button type="text" size="small" @click="updateCwFinancestate1(scope.row)">收款</el-button>
										<el-button type="text" size="small" @click="updateCwFinancestate1(scope.row)">付款</el-button>
										<el-button type="text" size="small" @click="updateCwFinancestate1(scope.row)">审核</el-button>
										<el-button type="text" size="small" @click="updateCwFinancestate1(scope.row)">取消审核</el-button>
										<el-button type="text" size="small" @click="updateCwFinancestate2(scope.row)">驳回</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div class="block" style="background:#FFF">
								<!-- 分页 -->
								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
								 :page-sizes="[5, 10, 15, 20]" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
								 :total="pageInfo.total" class="el-block-showtable-one-s">
								</el-pagination>
							</div>
						</div>
					</div>
					<!-- 新增财务收支记录 -->
					<el-dialog title="添加记账" v-model="finance" width="30%" :before-close="handleClose">
						<el-form :model="form" label-width="100px" class="demo-ruleForm">
							<el-form-item label="入住人 :">
								<el-select style="width: 335px;" v-model="form.rzId" placeholder="请选择" autocomplete="off">
									<el-option v-for="item in RzrData" :key="item.value" :label="item.name" :value="item.rzId">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="费用类型 :">
								<el-select style="width: 335px;" v-model="form.costtypeId" placeholder="请选择" autocomplete="off">
									<el-option v-for="item in CwCosttypeData" :key="item.value" :label="item.costtypeName" :value="item.costtypeId">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="金额:" prop="money">
								<el-input v-model="form.money"></el-input>
							</el-form-item>
							<el-form-item label="费用周期" prop="sjxzq">
								<el-date-picker style="width: 335px;" v-model="sjxzq" type="daterange" range-separator="至" start-placeholder="开始日期"
								 end-placeholder="结束日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="费用描述:" prop="costDescription">
								<el-input v-model="form.costDescription"></el-input>
							</el-form-item>
							<el-form-item class="el-form-butt-show-one-s">
								<el-button type="primary" @click="addCwFinance">立即创建</el-button>
							</el-form-item>
						</el-form>
					</el-dialog>
				</el-col>
			</el-row>
		</el-tab-pane>

		<!-- -------------------------------------------- 企业账户 ----------------------------------------- -->
		<el-tab-pane label="企业账户" name="second">
			<el-row>
				<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
					<div class="el-select-table-one-s">
						快速检索：<el-select v-model="pageInfo2.value" placeholder="请选择" clearable>
							<el-option label="账户名称" value="账户名称"></el-option>
							<el-option label="持卡人姓名" value="持卡人姓名"></el-option>
						</el-select>
						<el-input v-model="pageInfo2.input" clearable class="el-input-one-s"></el-input>
					</div>
					<div class="el-select-table-two-s">
						<el-button @click="selectCwAccount" style="background:#337ab7;border-color: #337ab7;color: #fff;">查询</el-button>
						<el-button @click="role=true" style="background:#337ab7;border-color: #337ab7;color: #fff;">添加企业账户</el-button>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="23" class="el-table-show-one-s">
					<div class="grid-content2 bg-purple-dark1">
						<div>
							<el-table :data="CwAccountData" @selection-change="handleSelectionChange" stripe class="el-table-one-s" ref="multipleTable"
							 :header-cell-style="{background:'rgb(238, 241, 246) none repeat scroll 0% 0%',color:'#606266'}">
								<el-table-column type="index" width="50" align="center">
								</el-table-column>
								<el-table-column prop="accountName" min-width="50" label="账户名称" align="center">
								</el-table-column>
								<el-table-column prop="number" min-width="80" label="银行卡号码" align="center">
								</el-table-column>
								<el-table-column prop="cardholderName" min-width="50" label="持卡人姓名" align="center">
								</el-table-column>
								<el-table-column prop="bank" min-width="50" label="开户行" align="center">
								</el-table-column>
								<el-table-column prop="bankName" min-width="50" label="支行全称" align="center">
								</el-table-column>
								<el-table-column prop="merchant" min-width="50" label="商户号" align="center">
								</el-table-column>
								<el-table-column prop="remarks" min-width="50" label="备注" align="center">
								</el-table-column>
								<el-table-column prop="accountState" min-width="50" label="状态" align="center">
									<template #default="scope">
										<p v-if="scope.row.accountState==0" style="color: limegreen;">启用</p>
										<p v-if="scope.row.accountState==1" style="color: red;">禁用</p>
									</template>
								</el-table-column>
								<el-table-column label="操作" align="center">
									<template #default="scope">
										<el-button type="text" size="small" @click="updateCwAccountstate(scope.row)">修改状态</el-button>
										<el-button type="text" size="small" @click="showEdit(scope.row)">编辑</el-button>
										<el-button type="text" size="small" @click="delCwAccount(scope.row)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div class="block" style="background:#FFF">
								<!-- 分页 -->
								<el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="pageInfo2.currentPage"
								 :page-sizes="[5, 10, 15, 20]" :page-size="pageInfo2.pagesize" layout="total, sizes, prev, pager, next, jumper"
								 :total="pageInfo2.total" class="el-block-showtable-one-s">
								</el-pagination>
							</div>
						</div>
					</div>
					<!-- 新增企业账户 -->
					<el-dialog title="添加企业账户" v-model="role" width="30%" :before-close="handleClose">
						<el-form :model="form2" :rules="rules" label-width="100px" class="demo-ruleForm">
							<el-form-item label="账户名称:" prop="accountName">
								<el-input v-model="form2.accountName"></el-input>
							</el-form-item>
							<el-form-item label="银行卡号码:" prop="number">
								<el-input v-model.number="form2.number"></el-input>
							</el-form-item>
							<el-form-item label="持卡人姓名:" prop="cardholderName">
								<el-input v-model="form2.cardholderName"></el-input>
							</el-form-item>
							<el-form-item label="开户行" prop="bank">
								<el-input v-model="form2.bank"></el-input>
							</el-form-item>
							<el-form-item label="支行全称" prop="bankName">
								<el-input v-model="form2.bankName"></el-input>
							</el-form-item>
							<el-form-item label="商户号" prop="merchant">
								<el-input v-model="form2.merchant"></el-input>
							</el-form-item>
							<el-form-item label="备注" prop="remarks">
								<el-input v-model="form2.remarks"></el-input>
							</el-form-item>
							<el-form-item class="el-form-butt-show-one-s">
								<el-button type="primary" @click="addCwAccount">立即创建</el-button>
							</el-form-item>
						</el-form>
					</el-dialog>
					
					<!-- 修改企业账户信息 -->
					<el-dialog title="修改企业账户" v-model="bjjs" width="30%" :before-close="handleClose">
						<el-form :model="form2" :rules="rules" label-width="100px" class="demo-ruleForm">
							<el-form-item label="账户名称:" prop="accountName">
								<el-input v-model="form2.accountName"></el-input>
							</el-form-item>
							<el-form-item label="银行卡号码:" prop="number">
								<el-input v-model.number="form2.number"></el-input>
							</el-form-item>
							<el-form-item label="持卡人姓名:" prop="cardholderName">
								<el-input v-model="form2.cardholderName"></el-input>
							</el-form-item>
							<el-form-item label="开户行" prop="bank">
								<el-input v-model="form2.bank"></el-input>
							</el-form-item>
							<el-form-item label="支行全称" prop="bankName">
								<el-input v-model="form2.bankName"></el-input>
							</el-form-item>
							<el-form-item label="商户号" prop="merchant">
								<el-input v-model="form2.merchant"></el-input>
							</el-form-item>
							<el-form-item label="备注" prop="remarks">
								<el-input v-model="form2.remarks"></el-input>
							</el-form-item>
							<el-form-item class="el-form-butt-show-one-s">
								<el-button type="primary" @click="updateCwAccount">更新</el-button>
								<el-button @click="bjjs=false">关闭</el-button>
							</el-form-item>
						</el-form>
					</el-dialog>
				</el-col>
			</el-row>
		</el-tab-pane>


		<!-- -------------------------------------------- 费用类型 ----------------------------------------- -->
		<el-tab-pane label="费用类型" name="third">
			<el-row>
				<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
					<div class="el-select-table-two-s">
						<el-button @click="addrow(CwCosttypeData)" class="el-icon-circle-plus" type="primary">添加费用类型</el-button>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="23" class="el-table-show-one-s">
					<div class="grid-content2 bg-purple-dark1">
						<div>
							<el-table :data="CwCosttypeData" stripe class="el-table-one-s" :header-cell-style="{background:'rgb(238, 241, 246) none repeat scroll 0% 0%',color:'#606266'}">
								<el-table-column prop="costtypeName" min-width="50" label="费用类型名称" align="center">
									<template #default="props">
										<el-input v-if="AddUpd==props.$index" type="text" v-model="props.row.costtypeName" placeholder="请填写费用类型名称"></el-input>
										<span v-if="AddUpd!=props.$index">{{props.row.costtypeName}}</span>
									</template>
								</el-table-column>
								<el-table-column label="操作" align="center">
									<template #default="scope">
										<el-button v-if="AddUpd!=scope.$index" type="text" size="small" @click="upd1(scope.row,scope.$index)">编辑</el-button>
										<el-button v-if="AddUpd==scope.$index" type="text" size="small" @click="upd2(scope.row)">保存</el-button>
										<el-button type="text" size="small" @click="delWay(CwCosttypeData,scope.row,scope.$index)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div class="block" style="background:#FFF">
								<!-- 分页 -->
								<el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :current-page="pageInfo3.currentPage"
								 :page-sizes="[5, 10, 15, 20]" :page-size="pageInfo3.pagesize" layout="total, sizes, prev, pager, next, jumper"
								 :total="pageInfo3.total" class="el-block-showtable-one-s">
								</el-pagination>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-tab-pane>
	</el-tabs>



</template>

<script>
	import qs from 'qs'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		data() {
			// 此处自定义校验企业账户的银行卡号码js逻辑
			var phoneReg = /^[6][3,4,5,7,8][0-9]{17}$/
			var validatePhone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('银行卡号码不能为空'))
				}
				setTimeout(() => {
					if (!phoneReg.test(value)) {
						callback(new Error('银行卡号码必须为19位数字'))
					} else {
						callback()
					}
				}, 1000)
			}
			return {
				sjxzq: '',
				Account: "first",

				// -------------------------------财务收支---------------------------------------
				form: {
					financeId: "",
					rzId: "",
					costtypeId: "",
					costDescription: "",
					costCyclestart: "",
					costCycleend: "",
					money: "",
					budgetsTime: "",
					state: ""
				}, //财务收支表单
				pageInfo: {
					value: "",
					input: "",
					currentPage: 1,
					pagesize: 5,
					total: 0
				}, //财务收支分页
				CwFinanceData: [], //财务收支数组
				finance: false,
				state1: false,
				RzrData: [],





				// -------------------------------企业账户---------------------------------------
				form2: {
					accountId: "",
					accountName: "",
					number: "",
					cardholderName: "",
					bank: "",
					bankName: "",
					merchant: "",
					remarks: "",
					accountState: ""
				}, //企业账户表单
				bjjs: false,
				pageInfo2: {
					value: "",
					input1: "",
					currentPage: 1,
					pagesize: 5,
					total: 0
				}, //企业账户分页
				CwAccountData: [], //企业账户数组
				//input: '',//搜索输入框
				role: false,
				//新增企业账户验证
				rules: {
					accountName: [{
							required: true,
							message: '账户名称不能为空',
							trigger: 'blur'
						},
						{
							max: 20,
							message: '名称不能大于20个字符',
							trigger: 'blur'
						}
					],
					number: [{
						required: true,
						validator: validatePhone,
						trigger: 'blur'
					}],
				},







				//----------------------------------费用类型---------------------------------------
				form3: {
					costtypeId: "",
					costtypeName: "",
					addname: "",
					addtime: ""
				},

				//判断修改保存
				AddUpd: 0.1,

				pageInfo3: {
					currentPage: 1,
					pagesize: 5,
					total: 0
				},

				notnull() {
					ElMessage({
						showClose: true,
						message: '保存内容不能为空！',
						type: 'warning'
					});
				},
				addd() {
					ElMessage({
						showClose: true,
						message: '取消新增。'
					});
				},
				adds() {
					ElMessage({
						showClose: true,
						message: '新增成功!',
						type: 'success'
					});
				},
				updd() {
					ElMessage({
						showClose: true,
						message: '取消修改。'
					});
				},
				upds() {
					ElMessage({
						showClose: true,
						message: '修改成功!',
						type: 'success'
					});
				},
				dels() {
					ElMessage({
						showClose: true,
						message: '删除成功!',
						type: 'success'
					});
				},

				//储存添加行中输入的信息
				CwCosttypeData: [],




			}
		},
		methods: {
			// ------------------------------------------------ 财务收支增删改查方法 -------------------------------------------------------
			//增加财务收支
			addCwFinance() {
				const _this = this
				var time1 = this.sjxzq[0].getFullYear() + "-" + (this.sjxzq[0].getMonth() + 1) + "-" + this.sjxzq[0].getDate();
				var time2 = this.sjxzq[1].getFullYear() + "-" + (this.sjxzq[1].getMonth() + 1) + "-" + this.sjxzq[1].getDate();
				this.form.costCyclestart = time1
				this.form.costCycleend = time2
				this.axios.post("http://localhost:8848/addCwFinance", this.form)
					.then(function(response) {
						_this.axios.get("http://localhost:8848/selectAllCwFinance", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.CwFinanceData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						_this.finance = false
						for (var key in _this.form) {
							delete _this.form[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},

			//修改财务收支状态1
			updateCwFinancestate1(row) {
				const _this = this
				var flag = true
				this.$confirm('此操作将修改财务收支状态, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.axios.put("http://localhost:8848/updateCwFinancestate1", row)
						.then(function(response) {
							_this.axios.get("http://localhost:8848/selectAllCwFinance", {
									params: _this.pageInfo
								})
								.then(function(response) {
									console.log(response)
									_this.CwFinanceData = response.data.list
									_this.pageInfo.total = response.data.total
								}).catch(function(error) {
									console.log(error)
								})
							for (var key in _this.form) {
								delete _this.form[key]
							}
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '取消修改!'
					});
				});
			},

			//修改财务收支状态2
			updateCwFinancestate2(row) {
				const _this = this
				var flag = true
				this.$confirm('此操作将修改财务收支状态, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.axios.put("http://localhost:8848/updateCwFinancestate2", row)
						.then(function(response) {
							_this.axios.get("http://localhost:8848/selectAllCwFinance", {
									params: _this.pageInfo
								})
								.then(function(response) {
									console.log(response)
									_this.CwFinanceData = response.data.list
									_this.pageInfo.total = response.data.total
								}).catch(function(error) {
									console.log(error)
								})
							for (var key in _this.form) {
								delete _this.form[key]
							}
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '取消修改!'
					});
				});
			},

			//多条件查询
			selectCwFinance() {
				const _this = this
				this.axios.get("http://localhost:8848/selectCwFinance", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.CwFinanceData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},

			handleCurrentChange(page) {
				var _this = this
				this.pageInfo.currentPage = page;
				this.axios.get("http://localhost:8848/selectAllCwFinance", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.CwFinanceData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},

			handleSizeChange(size) {
				var _this = this
				this.pageInfo.pagesize = size;
				this.axios.get("http://localhost:8848/selectAllCwFinance", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.CwFinanceData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},





			// ------------------------------------------------ 企业账户增删改查方法 -------------------------------------------------------
			//增加企业账户
			addCwAccount() {
				const _this = this
				this.axios.post("http://localhost:8848/addCwAccount", this.form2)
					.then(function(response) {
						_this.axios.get("http://localhost:8848/selectAllCwAccount", {
								params: _this.pageInfo2
							})
							.then(function(response) {
								_this.CwAccountData = response.data.list
								_this.pageInfo2.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						_this.role = false
						for (var key in _this.form2) {
							delete _this.form2[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},

			//删除企业账户
			delCwAccount(row) {
				const _this = this
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.axios.put("http://localhost:8848/delCwAccount", row)
						.then(function(response) {
							_this.axios.get("http://localhost:8848/selectAllCwAccount", {
									params: _this.pageInfo2
								})
								.then(function(response) {
									_this.CwAccountData = response.data.list
									_this.pageInfo2.total = response.data.total
								}).catch(function(error) {
									console.log(error)
								})
							for (var key in _this.form2) {
								delete _this.form2[key]
							}
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '取消删除!'
					});
				});
			},

			//修改企业账户状态
			updateCwAccountstate(row) {
				const _this = this
				var flag = true
				this.$confirm('此操作将修改供应商状态, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.axios.put("http://localhost:8848/updateCwAccountState", row)
						.then(function(response) {
							_this.axios.get("http://localhost:8848/selectAllCwAccount", {
									params: _this.pageInfo2
								})
								.then(function(response) {
									console.log(response)
									_this.CwAccountData = response.data.list
									_this.pageInfo2.total = response.data.total
								}).catch(function(error) {
									console.log(error)
								})
							for (var key in _this.form2) {
								delete _this.form2[key]
							}
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '取消修改!'
					});
				});
			},

			//修改
			showEdit(row) {
				this.form2.accountId = row.accountId
				this.form2.accountName = row.accountName
				this.form2.number = row.number
				this.form2.cardholderName = row.cardholderName
				this.form2.bank = row.bank
				this.form2.bankName = row.bankName
				this.form2.merchant = row.merchant
				this.form2.remarks = row.remarks
				this.bjjs = true
			},

			//修改企业账户信息
			updateCwAccount() {
				const _this = this
				this.axios.put("http://localhost:8848/updateCwAccount", this.form2)
					.then(function(response) {
						_this.axios.get("http://localhost:8848/selectAllCwAccount", {
								params: _this.pageInfo2
							})
							.then(function(response) {
								console.log(response)
								_this.CwAccountData = response.data.list
								_this.pageInfo2.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						var cwaccount = response.data
						var row = _this.CwAccountData.filter(t => t.accountId == cwaccount.accountId)[0]
						_this.bjjs = false
						for (var key in _this.form2) {
							delete _this.form2[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},

			//多条件查询
			selectCwAccount() {
				const _this = this
				this.axios.get("http://localhost:8848/selectAllCwAccount", {
						params: this.pageInfo2,
					})
					.then(function(response) {
						console.log(response)
						_this.CwAccountData = response.data.list
						_this.pageInfo2.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},

			handleCurrentChange2(page) {
				var _this = this
				this.pageInfo2.currentPage = page;
				this.axios.get("http://localhost:8848/selectAllCwAccount", {
						params: this.pageInfo2
					})
					.then(function(response) {
						console.log(response)
						_this.CwAccountData = response.data.list
						_this.pageInfo2.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},

			handleSizeChange2(size) {
				var _this = this
				this.pageInfo2.pagesize = size;
				this.axios.get("http://localhost:8848/selectAllCwAccount", {
						params: this.pageInfo2
					})
					.then(function(response) {
						console.log(response)
						_this.CwAccountData = response.data.list
						_this.pageInfo2.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},







			// ------------------------------------------------ 费用类型增删改查方法 -------------------------------------------------------
			addrow(CwCosttypeData) {
				CwCosttypeData.push({
					costtypeId: "",
					costtypeName: "",
					addname: "",
					addtime: ""
				})
			},

			clo() {
				this.form3.costtypeId = '';
				this.form3.costtypeName = '';
				this.form3.addname = '';
				this.form3.addtime = '';
			},

			upd1(row, index) {
				this.AddUpd = index;
			},
			upd2(row) {
				if (row.costtypeName == '') {
					this.notnull();
				} else {
					if (row.costtypeId == '') {
						//增加费用类型
						this.form3.costtypeName = row.costtypeName;
						const _this = this
						this.axios.post("http://localhost:8848/addCwCosttype", this.form3)
							.then(function(response) {
								_this.axios.get("http://localhost:8848/selectAllCwCosttype", {
										params: _this.pageInfo3
									})
									.then(function(response) {
										_this.CwCosttypeData = response.data.list
										_this.pageInfo3.total = response.data.total
									}).catch(function(error) {
										console.log(error)
									})
								_this.adds();
								_this.clo();
								_this.AddUpd = 0.1;
							}).catch(function(error) {
								console.log(error)
							})
					} else {
						//修改费用类型
						this.form3.costtypeId = row.costtypeId;
						this.form3.costtypeName = row.costtypeName;
						const _this = this
						this.axios.put("http://localhost:8848/updateCwCosttype", this.form3)
							.then(function(response) {
								_this.axios.get("http://localhost:8848/selectAllCwCosttype", {
										params: _this.pageInfo3
									})
									.then(function(response) {
										_this.CwCosttypeData = response.data.list
										_this.pageInfo3.total = response.data.total
									}).catch(function(error) {
										console.log(error)
									})
								_this.upds();
								_this.clo();
								_this.AddUpd = 0.1;
							}).catch(function(error) {
								console.log(error)
							})
					}
				}
			},


			//删除费用类型
			delWay(rows, row, index) {
				if (row.costtypeId == '') {
					rows.splice(index, 1);
				} else {
					this.form3.costtypeId = row.costtypeId;
					const _this = this
					this.axios.put("http://localhost:8848/delCwCosttype", this.form3)
						.then(function(response) {
							_this.axios.get("http://localhost:8848/selectAllCwCosttype", {
									params: _this.pageInfo3
								})
								.then(function(response) {
									_this.CwCosttypeData = response.data.list
									_this.pageInfo3.total = response.data.total
								}).catch(function(error) {
									console.log(error)
								})
							_this.dels();
							_this.clo();
						}).catch(function(error) {
							console.log(error)
						})
				}
			},

			handleCurrentChange3(page) {
				var _this = this
				this.pageInfo3.currentPage = page;
				this.axios.get("http://localhost:8848/selectAllCwCosttype", {
						params: this.pageInfo3
					})
					.then(function(response) {
						console.log(response)
						_this.CwCosttypeData = response.data.list
						_this.pageInfo3.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},

			handleSizeChange3(size) {
				var _this = this
				this.pageInfo3.pagesize = size;
				this.axios.get("http://localhost:8848/selectAllCwCosttype", {
						params: this.pageInfo3
					})
					.then(function(response) {
						console.log(response)
						_this.CwCosttypeData = response.data.list
						_this.pageInfo3.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},








		},
		created() {
			var _this = this
			//财务收支分页显示
			this.axios.get("http://localhost:8848/selectAllCwFinance", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.CwFinanceData = response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})

			//查询所有入住人
			this.axios.get("http://localhost:8848/selectAllRzr", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.RzrData = response.data
				}).catch(function(error) {
					console.log(error)
				})

			//企业账户分页显示
			this.axios.get("http://localhost:8848/selectAllCwAccount", {
					params: this.pageInfo2
				})
				.then(function(response) {
					console.log(response)
					_this.CwAccountData = response.data.list
					_this.pageInfo2.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})

			//费用类型分页显示
			this.axios.get("http://localhost:8848/selectAllCwCosttype", {
					params: this.pageInfo3
				})
				.then(function(response) {
					console.log(response)
					_this.CwCosttypeData = response.data.list
					_this.pageInfo3.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})
		}
	}
</script>

<style>
	.el-center-top-labels {
		background-color: #FFF;
		height: 61px;
		margin-bottom: 10px;
		margin-top: 10px;
		margin-left: 23px;
		box-shadow: 0 0 0 0 #eaeaea, 0 2px 2px 1px #eaeaea;
	}

	.el-col {
		border-radius: 0px;
	}

	.el-center-title-content {
		padding: 16px 32px 0 32px;
	}

	.ivu-page-header-main {
		width: 100%;
	}

	.ivu-page-header-row {
		width: 100%;
	}

	.ivu-page-header-title {
		margin-bottom: 16px;
	}

	.ivu-page-header-title {
		display: inline-block;
		color: #17233d;
		font-weight: 500;
		font-size: 20px;
	}

	.ivu-page-header-content {
		font-size: 14px;
		margin-bottom: 16px;
		color: #515a6e;
	}

	.el-table-show-one-s {
		margin: 0 23px;
	}

	.el-select-table-one-s {
		float: left;
		margin-left: 30px;
		margin-top: 10px;
		font-size: 14px;
		color: #73879c;
	}

	.el-select-table-two-s {
		margin-top: 10px;
		margin-right: 30px;
		float: right;
	}

	.el-input-one-s {
		height: 32px;
		width: 193px;
		margin-right: 30px;
	}

	.grid-content2 {
		border-radius: 0px;
	}

	.bg-purple-dark1 {
		background: #FFF;
	}

	.el-top-background-one-s {
		-webkit-border-top-left-radius: 4px;
		-webkit-border-top-right-radius: 4px;
	}

	.el-table-one-s {
		padding-top: 20px;
		height: 100%;
		padding-left: 15px;
		padding-right: 15px;
	}

	.el-table__body-wrapper {
		height: 100%;
	}

	.el-pagin-show-one-s {
		padding-top: 15px;
		padding-bottom: 15px;
		background: #FFF;
		margin-bottom: 30px;
		-webkit-border-bottom-left-radius: 4px;
		-webkit-border-bottom-right-radius: 4px;
	}

	/* switch按钮样式 */
	.switch .el-switch__label {
		position: absolute;
		display: none;
		color: #fff !important;
	}

	/*打开时文字位置设置*/
	.switch .el-switch__label--right {
		z-index: 1;
	}

	/* 调整打开时文字的显示位子 */
	.switch .el-switch__label--right span {
		margin-right: 9px;
	}

	/*关闭时文字位置设置*/
	.switch .el-switch__label--left {
		z-index: 1;
	}

	/* 调整关闭时文字的显示位子 */
	.switch .el-switch__label--left span {
		margin-left: 9px;
	}

	/*显示文字*/
	.switch .el-switch__label.is-active {
		display: block;
	}

	/* 调整按钮的宽度 */
	.switch.el-switch .el-switch__core,
	.el-switch .el-switch__label {
		width: 60px !important;
		margin: 0;
	}

	.el-table .cell {
		padding-left: 9px;
	}
</style>
