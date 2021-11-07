<template>
	 <div>
		<div id="div_searchtop">
			<div style="width: 820px;">
				<el-date-picker
				 style="width: 200px;margin-left: -100px;"
				      v-model="value1"
				      type="datetimerange"
				      range-separator="To"
				      start-placeholder="开始时间"
				      end-placeholder="结束时间"
				    >
				    </el-date-picker>
					<!-- 价格区间 -->
				 <el-input v-model="input" placeholder="姓名电话" 
				 class="select_div"/>
				 <el-button size="small"   plain  style="margin-left:20px;background-color:skyblue ;color: white;" >查询</el-button>
			<el-button plain size="small" style="background-color: lightcoral;color: white;margin-left: 13px;" @click="addPred()">
				 新增预定
			</el-button>
			<el-button plain size="small" style="background-color: yellowgreen;color: white;margin-left: 13px;"
				@click="backCu()">
				客源管理
			</el-button>
			</div>
			 
		</div>
		 <!-- 客源表格    -->
		<div id="div_user">
			 <el-table :data="custominfo" style="width: 100%">
				 <el-table-column   label="预定状态"> </el-table-column>
				 <el-table-column   label="姓名" width="180"> </el-table-column>
			    <el-table-column   label="电话" width="180"> </el-table-column>
			    <el-table-column   label="签订人"> </el-table-column>
				<el-table-column   label="剩余签约天数"> </el-table-column>
				<el-table-column   label="定金金额"> </el-table-column>
				<el-table-column   label="预定时间"> </el-table-column>
				<el-table-column   label="房源地址"> </el-table-column>
				<el-table-column   label="相关操作"> 
				<template #default="scope">
					 <el-button size="mini" type="success" plain style="margin-left:2px;"
						 >签约</el-button>
				</template>
				</el-table-column>
			  </el-table>
			   <!-- 分页组件 -->
			   <el-pagination @size-change="sureSizeChange" @current-change="sureCurrentChange" :current-page="surepageNo"
			   	:page-sizes="[1,5]" :page-size="surepageSize" layout="total, sizes, prev, pager, next, jumper" :total="suretotal">
			   </el-pagination>
		</div>
	</div>
	<!-- 新增预定 -->
	<el-dialog title="新增预定" v-model="ydform">
		<div id="div_need">客户信息</div>
		<div id="dialog_div">
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
								<el-select v-model="kyorigin" placeholder="来源" clearable="true" size="medium"
									style="margin-left:13px;">
									<el-option v-for="item in kyorigins" :key="item" :label="item" :value="item">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="性别" prop="csex" id="input_width">
								<el-input></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="租客年龄" prop="cage" id="input_width">
								<el-input style="margin-left:13px;width: 160px;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					 <el-row>
						<el-col :span="24">
							<el-form-item label="房源地址" prop="cage" id="input_width">
								<el-select v-model="dzorigin" placeholder="房源地址" clearable="true" size="medium"
									style="margin-left:13px;">
									<el-option v-for="item in dzorigins" :key="item" :label="item" :value="item">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div id="div_need" style="width: 670px;">预定信息</div>
			<el-form>
				<el-form-item>
					<el-row>
						<el-col :span="12">
							<el-form-item label="定金" :label-width="formLabelWidth" id="input_width">
								<el-input></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="收定人" id="input_width">
								<el-input></el-input>
							</el-form-item>
						</el-col>
	
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="签约失效时间" :label-width="formLabelWidth" id="input_width">
								<el-date-picker type="date" placeholder="签约失效时间" style="width: 200px;">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="预计签约时间" :label-width="formLabelWidth" id="input_width">
								<el-date-picker type="date" placeholder="预计签约时间" style="width: 200px;">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
	
				</el-form-item>
			</el-form>
			<div style="width: 200px;margin-left: 450px;">
				<el-button plain size="small" style="background-color: lightcoral;color: white;margin-left: -13px;">
					确认
				</el-button>
				<el-button plain size="small" style="background-color: skyblue;color: white;margin-left: 13px;"
					@click="ydform=false">
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
				value1:'',//时间
				surepageSize:5,
				surepageNo:1,
				suretotal:1,
				ydform:false
			}
		},methods:{
			sureSizeChange(){
				console.log("预定")
			},
			sureCurrentChange(){
				console.log("预定")
			},
			addPred(){
				this.ydform=true;
			},
			backCu(){
				this.$router.replace("/appointment");
			},
			
		}
	}
</script>

<style scoped="scoped">
#div_searchtop{
	min-height: 56px;
	margin-top:25px;
	 
}
.select_div{
		 width: 200px;
		 margin-left:10px;
		 margin-top:10px;
	}
	
	
	.select_div{
		 width: 200px;
		 margin-left:10px;
		 margin-top:10px;
	}
	#big_div{
		border: 1px solid gainsboro;
	 }
		
	#div_top{
		border: 1px solid gainsboro;
		min-height: 106px;
		margin-top:45px;
	}
	
	/deep/.el-input--prefix .el-input__inner {
		width: 140px;
	}
	
	#dialog_div {
		width: 820px;
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
