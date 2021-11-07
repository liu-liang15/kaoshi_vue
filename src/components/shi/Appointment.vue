<template>
	<!-- 
	页面示例
	 ，，，，价格区间-->
	<div id="big_div">
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="客源一览" name="first">
				 <div id="div_top">
					 <el-select v-model="value" placeholder="区域">
					    <el-option
					      v-for="item in areaops"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value"
					    >
					    </el-option>
					  </el-select>
					 <el-select v-model="value" placeholder="客户来源类型" 
					class="select_div"
					>
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value"
					    >
					    </el-option>
					  </el-select>
					 <el-select v-model="value" placeholder="需求类型" class="select_div">
					    <el-option
					      v-for="item in needops"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value"
					    >
					    </el-option>
					  </el-select>
					 <el-select v-model="value" placeholder="租期" class="select_div">
					   <el-option
					     v-for="item in tenencyops"
					     :key="item.value"
					     :label="item.label"
					     :value="item.value"
					   >
					   </el-option>
					 </el-select>
					<el-input v-model="input" placeholder="姓名电话" class="select_div"/>
				 
				 </div>
				  <!-- 客源表格    -->
				<div id="div_btn">
					<div style="width: 200px;margin-left:50px;margin-top: 10px;">
					<el-button plain size="small" style="background-color: lightcoral;color: white;margin-left: -13px;"   @click="addcus()">
						新增客源
					</el-button>
					 <el-button size="small"   plain  style="margin-left:10px;background-color:skyblue ;color: white;" >查询</el-button>		
					</div>
				 </div>
				<div id="div_user">
					 <el-table :data="custominfo" style="width: 100%">
						 <el-table-column   label="姓名" width="180"> </el-table-column>
					    <el-table-column   label="电话" width="180"> </el-table-column>
					    <el-table-column   label="来源类型"> </el-table-column>
						<el-table-column   label="需求类型"> </el-table-column>
						<el-table-column   label="入住时间"> </el-table-column>
						<el-table-column   label="租期类型"> </el-table-column>
						<el-table-column   label="相关操作"> 
						<template #default="scope">
							<el-button size="mini" type="primary" plain>预约</el-button>
							<el-button size="mini" type="success" plain style="margin-left:2px;"
								 >预定</el-button>
						</template>
						</el-table-column> 
					  </el-table>
					    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"
					   	:page-sizes="[1,5]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					   </el-pagination>
				</div>
				
				
			</el-tab-pane>
		    <el-tab-pane label="预约一览" name="second">
				 <div id="big_div">
					<div id="div_topone">
						  <el-select v-model="value" placeholder="查询周期" 
						class="select_div"
						>
						    <el-option
						      v-for="item in periods"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value"
						    >
						    </el-option>
						  </el-select>
						 <el-select v-model="value" placeholder="房源地址" class="select_div">
						    <el-option
						      v-for="item in sddress"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value"
						    >
						    </el-option>
						  </el-select>
						 <el-select v-model="value" placeholder="租房类型" class="select_div">
						   <el-option
						     v-for="item in rentings"
						     :key="item.value"
						     :label="item.label"
						     :value="item.value"
						   >
						   </el-option>
						 </el-select>
						<el-input v-model="input" placeholder="姓名电话" class="select_div"/>
						 
						<el-button size="small"   plain  style="margin-left:20px;background-color:skyblue ;color: white;" >查询</el-button>
						 <el-button plain size="small" style="background-color: lightcoral;color: white;margin-left: 13px;">
						 	 新增预约
						 </el-button>
					</div>
					<!-- 房源表格 -->
					<div id="div_user">
						 <el-table :data="hresource" style="width: 100%">
							 <el-table-column   label="预约状态"> </el-table-column>
							 <el-table-column   label="姓名" width="180"> </el-table-column>
						    <el-table-column   label="电话" width="180"> </el-table-column>
						    <el-table-column   label="约看时间"> </el-table-column>
							<el-table-column   label="约看房源"> </el-table-column>
							<el-table-column   label="租房类型"> </el-table-column>
							<el-table-column   label="负责人"> </el-table-column>
							
							<el-table-column   label="相关操作"> 
							<template #default="scope">
								 <el-button size="mini" type="success" plain style="margin-left:2px;"
									 >预定</el-button>
							</template>
							</el-table-column>
						  </el-table>
						   <!-- 房源分页 -->
						    <el-pagination @size-change="hreSizeChange" @current-change="hreCurrentChange" :current-page="hrepageNo"
						   	:page-sizes="[1,5]" :page-size="hrepageSize" layout="total, sizes, prev, pager, next, jumper" :total="hretotal">
						   </el-pagination>
					</div>
				</div>
			 </el-tab-pane>
		    <el-tab-pane label="预定一览" name="third"> 
			<div>
				<div id="div_searchtop">
					<div style="width: 700px;">
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
					<el-button plain size="small" style="background-color: lightcoral;color: white;margin-left: 13px;">
						 新增预约
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
			
			
			</el-tab-pane>
		    </el-tabs>
		
		
	</div>
</template>

<script>
	export default {
			data() {
				return {
					 options:[],//客户来源类型
					 value:'',
					 needops:[],//需求类型
					 tenencyops:[],//租期类型
					 areaops:[],//区域类型
					 custominfo:[],//客源信息
					 pageSize:1,
					 pageNo:1,
					 total:1,
					 activeName:'second',
					 periods:[],//周期
					 sddress:[],//房源地址
					 rentings:[],//租房类型
					 hresource:[],//房源数组
					 hrepageNo:1,
					 hrepageSize:5,
					 hretotal:1,
					 value1:'',//预定时间
					 surepageSize:5,
					 surepageNo:1,
					 suretotal:1
					 
				}
			},methods:{
				sureSizeChange(){
					console.log("预定")
				},
				sureCurrentChange(){
					console.log("预定")
				},
				 hreSizeChange(){
				console.log("房源分页")		
				},
				hreCurrentChange(){
				console.log("房源分页")	
				},
				addcus(){
				 console.log("新增客源")	
				},
				 handleClick(tab, event) {
				        console.log("tabtab",tab, "eventevent",event)
				      },
				// handleSizeChange(){
					
				// },
				// handleCurrentChange(){
					
				// } 
			}}
</script>

<style scoped="scoped">
	.select_div{
		 width: 200px;
		 margin-left:10px;
		 margin-top:10px;
	}
	#big_div{
		/* border: 1px solid gainsboro; */
	 }
		
	#div_top,#div_topone{
		 min-height: 56px;
	 }
	 #div_topone{
		border-top: none; 
		
	 }
	 
	#div_top{
		border: 1px solid gainsboro;
		margin-top:25px;
		border-bottom: none;
		
	}
	#div_btn{
		min-height: 45px;
		border: 1px solid gainsboro;
		border-top: none;
		width: 1204px;
	}
	
	#div_searchtop{
		min-height: 56px;
		margin-top:25px;
		 
	}
	.select_div{
			 width: 200px;
			 margin-left:10px;
			 margin-top:10px;
		}
</style>
