<template>
	<div id="big_div">
		<div id="div_top">
			<el-select
			 @change="pickHouse(value)"
			v-model="value" 
			placeholder="房源地址" 
			class="select_div">
				<el-option v-for="item in needops" :key="item.city" :label="item.city" :value="item.city">
				</el-option>
			</el-select>
		  <el-select v-model="name"
			@change="chooseUser(name)"
			placeholder="姓名" class="select_div">
				<el-option v-for="item in names" :key="item.cname" :label="item.cname" :value="item.cname">
				</el-option>
			</el-select>

			<el-button size="small" plain @click="selectGroup()"
				style="margin-left:20px;background-color:skyblue ;color: white;">
				查询</el-button>
			<el-button plain size="small" @click="insertPre()"
				style="background-color: lightcoral;color: white;margin-left: 13px;">
				新增预约
			</el-button>
			<el-button plain size="small" @click="backCus()"
				style="background-color: yellowgreen;color: white;margin-left: 13px;">
				客源管理
			</el-button>
		</div>
		<!-- 客源表格  -->
		<div id="div_user">
			<el-table :data="custominfo" style="width: 100%">
				<el-table-column label="预约状态" prop="typeStatu.tname"> </el-table-column>
				<el-table-column label="姓名" width="80" prop="kyCustominfo.cname"> </el-table-column>
				<el-table-column label="电话" width="180" prop="kyCustominfo.ctel"> </el-table-column>
				<el-table-column label="约看时间" prop="ptime"> </el-table-column>
				<el-table-column label="房源地址" prop="kyCustominfo.kyUneeds[0].uddress"> </el-table-column>
				<el-table-column label="租房类型" prop="kyCustominfo.kyUneeds[0].utenancy.tname"> </el-table-column>
			</el-table>
			<!-- 分页组件 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"
				:page-sizes="[1,5]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</div>
	</div>
	<!-- 新增预约弹框 -->
	<el-dialog title="新增预约" v-model="yyform">
		<div id="dialog_div">
			<el-form style="margin-top: 10px;">
				<el-form-item>
					<el-row>
						<el-col :span="24">
							<el-form-item label="约看房源" id="input_width">
								<el-select @change="pickAddress(origin)" v-model="origin" placeholder="约看房源"
									clearable="true" size="medium" style="margin-left:13px;width: 518px;">
									<el-option v-for="item in origins" :key="item.city" :label="item.city"
										:value="item.city">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="租客姓名" prop="cname" id="input_width">
								<el-select v-model="user" @change="pickUser(user)" placeholder="姓名" clearable="true"
									size="medium" style="margin-left:13px;">
									<el-option v-for="item in users" :key="item.cname" :label="item.cname"
										:value="item.cname">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="租客性别" prop="csex" id="input_width">
								<el-input style="margin-left:13px;width: 160px;" v-model="csex"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="租客电话" prop="ctel" id="input_width">
								<el-input v-model="ctel"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="约看时间" prop="cage" id="input_width">
								<el-date-picker v-model="lookTime" style="margin-left:13px;" type="datetime"
									placeholder="选择日期时间">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div style="width: 200px;margin-left: 450px;">
				<el-button plain size="small" style="background-color: lightcoral;color: white;margin-left: -13px;"
					@click="addPre()">
					确认
				</el-button>
				<el-button plain size="small" style="background-color: skyblue;color: white;margin-left: 13px;"
					@click="yyform=false">
					取消
				</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				options: [], //客户来源类型
				value: '',
				needops: [], //需求类型
				areaops: [], //区域类型
				custominfo: [], //客源信息
				pageSize: 5,
				pageNo: 1,
				total: 1,
				yyform: false,
				origins: [],
				origin: '',
				lookTime: '', //约看时间
				user: '',
				users: [],
				ctel: '',
				csex: '',
				pcid: '',
				phid: '',
				name: '',
				sphid: '',
				names: [], //客户信息
				userid:'',
				cphid:''


			}
		},
		methods: {
			pickHouse(content){
				console.log(content,"content")
				for (var i = 0; i < this.needops.length; i++) {
					if (content == this.needops[i].city) {
						this.cphid = this.needops[i].houseId;
					}
				}
			},
			chooseUser(item) {
				console.log("加载名字");
				if(item!=''){
					for (var i = 0; i < this.users.length; i++) {
						if(item==this.users[i].cname){
							this.userid=this.users[i].cid
						 }
					}
				}
				
			},
			selectGroup() {
				console.log("this.cphid",this.cphid,"this.userid", this.userid);
				 this.axios.post("pre/group", {
					phid:this.cphid,
					pcid: this.userid,//租客编号
					pageNo:this.pageNo,
					pageSize:this.pageSize
				}).then(res => {
					 if(res.data.list.length!=0){
					this.custominfo=res.data.list;	
					}
					
				})
			},
			loadData() {
				this.axios.post("pre/all", {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res, "进入时候...")
					if (res.data.list.length != 0) {
						this.custominfo = res.data.list;
						this.total = res.data.total;
						this.pageNo = res.data.pageNum;
						this.pageSize = res.data.pageSize;
					}
				})
			},
			pickAddress(item) {
				console.log(this.origins, "origins")
				if (item != '') {
					for (var i = 0; i < this.origins.length; i++) {
						if (item == this.origins[i].city) {
							this.phid = this.origins[i].houseId;
						}
					}
				}
			},
			loadHouse() {
				this.axios.post("customer/allhouse").then(res => {
					console.log(res, "fangzi地址")
					if (res.data.length != 0) {
						this.origins = res.data;
						this.needops = res.data;
					}

				})
			},
			addPre() {
				console.log(this.pcid, "this.pcid");
				this.axios.post("pre/add", {
					pcid: this.pcid,
					phid: this.phid,
					pstatid: 16,
					ptime: this.lookTime
				}).then(res => {
					console.log(res, "新增")
				})
				this.csex = '';
				this.ctel = '';
				this.user = '';
				this.yyform = false;
				this.loadData();

			},
			pickUser(item) {
				console.log("进来了方法...")
				this.axios.post("customer/byname", {
					cname: item
				}).then(res => {

					console.log(res, "选择用户的值直至");
					if (res.data.cardnum != '') {
						this.cardnum = res.data.cardnum;
						this.ctel = res.data.ctel;
						this.csex = res.data.csex;
						this.pcid = res.data.cid;
						console.log(this.pcid, "this.pcid:");
					}
					console.log(res, "查询用户的信息:");
				})
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.loadData();
			},
			handleCurrentChange(val) {
				this.pageNo = val;
				this.loadData();
			},
			insertPre() {
				this.yyform = true;
			},
			backCus() {
				this.$router.replace("/appointment");
			},
			loadUsers() {
				this.axios.post("customer/mess").then(res => {
					 if (res.data.length != 0) {
						this.users = res.data;
						this.names=res.data;
						console.log(this.users,"用户信息")
					}

				})
			}

		},
		mounted() {
			this.loadUsers();
			this.loadHouse();
			this.loadData();
			 

		}
	}
</script>

<style scoped="scoped">
	.select_div {
		width: 200px;
		margin-left: 10px;
		margin-top: 10px;
	}

	#big_div {
		border: 1px solid gainsboro;
	}

	#div_top {
		border: 1px solid gainsboro;
		min-height: 106px;
		margin-top: 45px;
	}

	/deep/.el-input--prefix .el-input__inner {
		width: 140px;
	}

	#dialog_div {
		width: 720px;
		margin: 0px auto;
		min-height: 450px;
	}

	#div_need {
		background-color: #1E90FF;
		border: 1px solid gainsboro;
		height: 20px;
	}

	#input_width {
		width: 240px;
		margin-top: 20px;
	}

	/*  */
	.select_div {
		width: 200px;
		margin-left: 10px;
		margin-top: 10px;
	}

	#big_div {
		/* border: 1px solid gainsboro; */
	}

	#div_top,
	#div_topone {
		min-height: 56px;
	}

	#div_topone {
		border-top: none;

	}

	#div_top {
		border: 1px solid gainsboro;
		margin-top: 25px;
		border-bottom: none;

	}

	#div_btn {
		min-height: 45px;
		border: 1px solid gainsboro;
		border-top: none;
		width: 1204px;
	}

	#div_searchtop {
		min-height: 56px;
		margin-top: 25px;

	}
</style>
