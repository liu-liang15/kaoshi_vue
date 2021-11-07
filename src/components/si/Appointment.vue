<template>
	<div id="big_div">
		<div id="div_top">
			<el-select v-model="value" placeholder="区域">
				<el-option v-for="item in areaops" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-select v-model="value" placeholder="客户来源类型" class="select_div">
				<el-option v-for="item in options" :key="item.tname" :label="item.tname" :value="item.tname">
				</el-option>
			</el-select>
			<el-select v-model="need" placeholder="需求类型" class="select_div">
				<el-option v-for="item in needops" :key="item.tname" :label="item.tname" :value="item.tname">
				</el-option>
			</el-select>
			<el-select v-model="value" placeholder="租期" class="select_div">
				<el-option v-for="item in tenencyops" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-input v-model="input" placeholder="姓名电话" class="select_div" />
		</div>
		<!-- 客源表格-->
		<div id="div_btn">
			<div style="width: 400px;margin-left:50px;margin-top: 10px;">
				<el-button plain size="small" style="background-color: lightcoral;color: white;margin-left: -13px;"
					@click="opencus()">
					新增客源
				</el-button>
				<el-button size="small" plain style="margin-left:10px;background-color:skyblue ;color: white;">
					查询</el-button>
				<el-button size="small" plain style="margin-left:10px;background-color:thistle ;color: white;"
					@click="jumpYd()">
					预定一览</el-button>
				<el-button size="small" @click="jumpYy()" plain
					style="margin-left:10px;background-color:palevioletred ;color: white;">
					预约一览</el-button>
			</div>
		</div>
		<div id="div_user">
			<el-table :data="custominfo" style="width: 100%">
				<el-table-column label="姓名" width="180"> </el-table-column>
				<el-table-column label="电话" width="180"> </el-table-column>
				<el-table-column label="来源类型"> </el-table-column>
				<el-table-column label="需求类型"> </el-table-column>
				<el-table-column label="入住时间"> </el-table-column>
				<el-table-column label="租期类型"> </el-table-column>
				<el-table-column label="相关操作">
					<template #default="scope">
						<el-button size="mini" type="primary" plain>预约</el-button>
						<el-button size="mini" type="success" plain style="margin-left:2px;">预定</el-button>
					</template>
				</el-table-column>
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
								<el-select v-model="origin"
								 @change="chly(origin)"
								placeholder="来源" clearable="true" size="medium"
									style="margin-left:13px;">
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
								<el-select v-model="needtype"
								 placeholder="需求类型" clearable="true" style="height: 40px;"
									size="medium">
									<el-option v-for="item in needtypes" :key="item.tname" :label="item.tname" :value="item.tname">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="入住时间" prop="ctel" id="input_width">
								<el-date-picker v-model="value1" type="date" placeholder="入住时间" style="width: 200px;">
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
								 	<el-option v-for="item in address" :key="item.city" :label="item.city" :value="item.city">
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
	export default {
		data() {
			return {
				options: [], //客户来源类型
				value: '',
				needops: [], //需求类型
				tenencyops: [], //租期类型
				areaops: [], //区域类型
				custominfo: [], //客源信息
				pageSize: 1,
				pageNo: 1,
				total: 1,
				periods: [], //周期
				value1: '', //预定时间
				form: false, //新增客源的弹框
				kyorigins: [], //客户来源数组
				kyorigin: '', //客户来源
				cname:'',
				cardnum:'',
				ctel:'',
				csex:0,
				cage:0,
				cTypeid:0,
				origins:[],
				origin:'',
				address:[],
				addres:'',
				need:'',
				needtypes:[],
				needtype:''
			}
		},
		methods: {
			chly(origin){//获取来源类型
			  if(origin!=''&& origin!=undefined){
				  for (var i = 0; i < this.origins.length; i++) {
					  if(origin==this.origins[i].tname){
						  this.cTypeid=this.origins[i].tid;
					 }
				  }
				 
			 }
			},
			addcus() { //新增客源
		   console.log("111",this.addres)
				this.axios.post("customer/add", {
					cname:this.cname,
					ctel:this.ctel,
					cardnum:this.cardnum,
					csex:this.csex,
					cTypeid:this.cTypeid
				}).then(res => {
					console.log(res, "res")
					if(res.code==200){
						this.loadData();
					}
				})
				this.form=false;
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
					console.log(res, "获取到的结果")
					this.options = res.data;
					this.origins = res.data;
				 })
			},
			loadNeeds(){
				this.axios.post("typez/all", {
					tcid: 12
				}).then(res => {
					 this.needtypes=res.data;
					console.log(this.needtypes, "12获取到的结果")
				})
			},
			loadData(){
			console.log("加载数据")	
			},
			loadHouse(){
				 this.axios.post("customer/allhouse").then(res=>{
					console.log(res,"fangzi地址")
					if(res.data.length!=0){
						this.address=res.data;
					}
					
				})
			}
			// handleSizeChange(){

			// },
			// handleCurrentChange(){

			// } 
		},
		mounted() {
		    this.loadSelects(6);
			this.loadHouse();
			this.loadNeeds()
			// this.loadSelects(12);
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
