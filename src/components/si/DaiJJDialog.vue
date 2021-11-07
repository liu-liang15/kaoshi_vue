<template>
	 <el-dialog
		    title="会员充值"
		    v-model="dialogFormVisibles"
		    width="50%">
			<hr>
		  <el-form   style="height: 400px;">
				<span style="margin-left: 75px;">
						姓名：<el-tag style="width: 150px; margin-top: 20px;"> </el-tag>
				</span>
				<span  style="margin-left: 15px;float: right;margin-top: 20px;">
						电话号码：<el-tag style="width: 150px;"> </el-tag>
				</span>
				<br />
				<span style="margin-left: 48px;">
						会员等级：<el-tag style="width: 150px; margin-top: 20px;"> </el-tag>
				</span>
				<span  style="margin-left: 15px;float: right;margin-top: 20px;">
						会员余额：<el-tag style="width: 150px;"> </el-tag>
				</span>
				<br />
				<span style="margin-left: 20px;">
						会员办理时间：<el-tag style="width: 150px; margin-top: 20px;"> </el-tag>
				</span>
				<span  style="margin-left: 15px;float: right;margin-top: 20px;">
						累计消费次数：<el-tag style="width: 150px;"> </el-tag>
				</span>
				<br />
				
				<div style="margin-top: 30px;width: 100%; height: 10px; background-color: #00AAFF;">
				</div>
				<el-form :rules="formregular"     label-width="100px" class="demo-ruleForm">
					<el-form-item label="操作人:" style="margin-top: 10px; margin-left: 20px;">
					    <el-span class="sjsumm"    style="width: 300px;color: red;" >
							  
						</el-span>
					</el-form-item>
					<el-form-item prop="chargeTime"
					style="margin-top: -60px; margin-left: 50%;"
					  label="申请日期:"
					>
					<el-span class="sjsumm"   style="width: 300px" >
									   
					</el-span>
					 </el-form-item>
				  <el-form-item prop="chargeMenoy"
				  style="margin-top: 15px;margin-left: 20px;"
				    label="充值金额:">
				    <el-input style="width: 20%;" type="number" 
					  autocomplete="off"
					placeholder="输入数字"
					 ></el-input>
				  </el-form-item>
					<div style="margin-left: 20px;">
						<span>充值之后金额</span>
						<div style="border-bottom:2px solid #00457D;width: 20%;margin-top: -20px;margin-left: 105px;">
						 
						</div>
					</div>
				</el-form>
			</el-form>
		    <span slot="footer" class="dialog-footer">
		        <el-button @click="dialogFormVisibles = false">取 消</el-button>
		        <el-button type="primary" @click="dialogFormVisibles = false; install()">确 定</el-button>
		    </span>
		</el-dialog>
</template>

<script>
	export default {
			data() {
				return {
					dialogFormVisibles:true, 
					formregular:{}
				}
			},
			methods: {
			 install(){
				 console.log("确认...")
			 }
			},
			mounted() {
	
			}
		}
</script>

<style scoped="scoped">
	
</style>
