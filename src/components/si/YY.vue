<template>
	<!-- 新增预约 -->
	<el-button @click="tk()">弹框页面</el-button>
	 <el-dialog title="新增预约" v-model="yyform">
		<div id="dialog_div">
			<el-form style="margin-top: 10px;">
				<el-form-item>
					<el-row>
						<el-col :span="24">
							<el-form-item label="约看房源" id="input_width" >
								<el-select v-model="origin" placeholder="约看房源" clearable="true" size="medium"
									style="margin-left:13px;width: 518px;">
									<el-option v-for="item in origins" :key="item" :label="item" :value="item">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="租客姓名" prop="csex" id="input_width">
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
						<el-col :span="12">
							<el-form-item label="租客电话" prop="csex" id="input_width">
								<el-input></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="约看时间" prop="cage" id="input_width">
								<el-input style="margin-left:13px;width: 160px;"></el-input>
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
				yyform: false,
				origins:[]
			}
		},
		methods: {
			tk() {
				console.log("新增预约")
				this.yyform=true;
			},
			addPre(){
				console.log("新增预约啊")
			}
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
</style>
