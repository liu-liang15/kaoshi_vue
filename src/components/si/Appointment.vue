<template>
	<div id="big_div">
		<div id="div_top">
			 <el-select v-model="value" 
			 @change="pickLx(value)"
			 placeholder="客户来源类型" 
			 class="select_div">
				<el-option v-for="item in options" :key="item.tname" :label="item.tname" :value="item.tname">
				</el-option>
			</el-select>
			 <!--  -->
			<el-button plain size="small" style="background-color: lightcoral;color: white;margin-left: 13px;"
				@click="opencus()">
				新增客源
			</el-button>
			<el-button size="small" 
			@click="searchGroup()"
			plain style="margin-left:10px;background-color:skyblue ;color: white;">
				查询</el-button>
			<el-button size="small" plain style="margin-left:10px;background-color:thistle ;color: white;"
				@click="jumpYd()">
				预定一览</el-button>
			<el-button size="small" @click="jumpYy()" plain
				style="margin-left:10px;background-color:palevioletred ;color: white;">
				预约一览</el-button>
			<!--  -->
		</div>
		<!-- 客源表格-->
		 <div id="div_user">
			<el-table :data="custominfo" style="width: 100%">
				<el-table-column label="姓名" width="180" prop="cname"> </el-table-column>
				<el-table-column label="电话" width="180" prop="ctel"> </el-table-column>
				<el-table-column label="来源类型" prop="ctype.tname"> </el-table-column>
				<el-table-column label="租期类型" prop="kyUneeds[0].utenancy.tname"> </el-table-column>
				<el-table-column label="入住时间"  prop="kyUneeds[0].uIntime"> </el-table-column>
				<el-table-column label="房源地址" prop="kyUneeds[0].uddress"> </el-table-column>
			 </el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"
				:page-sizes="[1,5]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</div>

	</div>

	<!-- 新增客源弹框 -->
	<el-dialog title="客源新增" v-model="form">
		<div id="div_need">客户信息</div>
		<div id="dialog_div">
			<!-- -->
			<el-form style="margin-top: 10px;">
				<el-form-item>
					<el-row>
						<el-col :span="12">
							<el-form-item label="姓名" prop="cname" id="input_width">
								<el-input v-model="cname"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证号码" prop="cardnum" id="input_width">
								<el-input v-model="cardnum"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="12">
							<el-form-item label="号码" prop="ctel" id="input_width">
								<el-input v-model="ctel"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="租客来源" id="input_width">
								<el-select v-model="origin" @change="chly(origin)" placeholder="来源" clearable="true"
									size="medium" style="margin-left:13px;">
									<el-option v-for="item in origins" :key="item.tname" :label="item.tname"
										:value="item.tname">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="性别" prop="csex" id="input_width">
								<el-input v-model="csex"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="租客年龄" prop="cage" id="input_width">
								<el-input style="margin-left:13px;width: 160px;" v-model="cage"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div id="div_need" style="width: 670px;">需求信息</div>
			<el-form>
				<el-form-item>
					<el-row>
						<el-col :span="12">
							<el-form-item label="需求类型" id="input_width">
								<el-select v-model="needtype" @change="chtype(needtype)" placeholder="需求类型"
									clearable="true" style="height: 40px;" size="medium">
									<el-option v-for="item in needtypes" :key="item.tname" :label="item.tname"
										:value="item.tname">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="入住时间"   id="input_width">
								<el-date-picker v-model="intime" 
								type="datetime" placeholder="入住时间" style="width: 200px;">
								</el-date-picker>
							 </el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="需求地址" :label-width="formLabelWidth" id="input_width">
								<el-select v-model="addres" 
								placeholder="需求地址" clearable="true" style="height: 40px;"
									size="medium">
									<el-option v-for="item in address" :key="item.city" :label="item.city"
										:value="item.city">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div style="width: 200px;margin-left: 450px;">
				<el-button plain size="small" style="background-color: lightcoral;color: white;margin-left: -13px;"
					@click="addcus()">
					确认
				</el-button>
				<el-button plain size="small" style="background-color: skyblue;color: white;margin-left: 13px;"
					@click="form=false">
					取消
				</el-button>
			</div>
		</div>
	</el-dialog>
	<!--  -->
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				hnum:'',
				options: [], //客户来源类型
				value: '',
				needops: [], //需求类型
				tenencyops: [], //租期类型
				areaops: [], //区域类型
				custominfo: [], //客源信息
				pageSize: 5,
				pageNo: 1,
				total: 1,
				periods: [], //周期
				value1: '', //预定时间
				form: false, //新增客源的弹框
				kyorigins: [], //客户来源数组
				kyorigin: '', //客户来源
				cname: '',
				cardnum: '',
				ctel: '',
				csex: '',
				cage: 0,
				cTypeid: 0,
				origins: [],
				origin: '',
				address: [],
				addres: '',
				need: '',
				needtypes: [],
				needtype: '',
				typeid: 0,
				intime: '',
				ntid:0,
				intext:'',//姓名
				lyid:0
			}
		},
		methods: {
			pickLx(item){
				console.log(item,"item")
				if(item!=''){
					for (var i = 0; i < this.options.length; i++) {
						if (item == this.options[i].tname) {
							this.lyid = this.origins[i].tid;
							console.log(this.lyid,"获取到地来源id")
						}
					}
				}
			},
			searchGroup(){//组合查询
				console.log(this.value,"组合查询...",this.intext)
				this.axios.post("customer/group",{
						cTypeid:this.lyid,
					     pageNo:this.pageNo,
					     pageSize:this.pageSize
						 
				}).then(res=>{
					console.log(res,"组合查询地结果")
					this.custominfo=res.data.list;
					this.total=res.data.total;
					this.pageNo=res.data.pageNum;
					this.pageSize=res.data.pageSize;
					
				})
			},
			chly(origin) { //获取来源类型
				if (origin != '' && origin != undefined) {
					for (var i = 0; i < this.origins.length; i++) {
						if (origin == this.origins[i].tname) {
							this.typeid = this.origins[i].tid;
						}
					}

				}
			},
			chtype(needtype) {
				 if (needtype != '') {
					for (var i = 0; i < this.needtypes.length; i++) {
						if (needtype == this.needtypes[i].tname) {
							this.ntid=this.needtypes[i].tid;
						 }
					}
				}
			},
			addcus() { //新增客源
				 this.axios.get("customer/add", {
					params: {
						cname: this.cname,
						ctel: this.ctel,
						cardnum: this.cardnum,
						csex: this.csex,
						cTypeid: this.typeid
					}
				}).then(res => {
					 let time=moment(this.intime).format('yyyy-MM-DD HH:mm:ss');
					 // 出租类型    
					if(res.data!=0){
						this.axios.post("uneed/add",{
							     ucid:res.data,
							     uinitime:time,
							     utenancytid:this.ntid,
							      uaddress:this.addres
						}).then(res=>{
							console.log(res, "客源需求")
							this.loadData();
						})
					}

 
				})
				this.form = false;
			},
			jumpYy() {
				this.$router.replace("/forwardShow");
			},
			jumpYd() {
				this.$router.replace("/supre");
			},
			opencus() {
				console.log("打开弹框..")
				this.form = true;
			},
			loadSelects(id) { //获取下拉列表的值
				this.axios.post("typez/all", {
					tcid: id
				}).then(res => {
					this.options = res.data;
					this.origins = res.data;
				})
			},
			loadNeeds() {
				this.axios.post("typez/all", {
					tcid: 12
				}).then(res => {
					this.needtypes = res.data;
				 })
			},
			loadData() {
				  this.axios.post("customer/moremres", {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res, "分页加载数据加载数据")
					if(res.data.list.length!=0){
						this.custominfo=res.data.list;
						this.total=res.data.total;
						this.pageNo=res.data.pageNum;
						this.pageSize=res.data.pageSize;
					}
				})
			},
			loadHouse() {
				this.axios.post("customer/allhouse").then(res => {
					 if (res.data.length != 0) {
						this.address = res.data;
					}

				})
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.loadData();
			},
			handleCurrentChange(val){
				this.pageNo = val;
				this.loadData();
			} 
		},
		mounted() {
			this.loadSelects(6);
			this.loadHouse();
			this.loadNeeds();
			this.loadData();
		 
		}
	}
</script>

<style scoped="scoped">
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

	.select_div {
		width: 200px;
		margin-left: 10px;
		margin-top: 10px;
	}
</style>
