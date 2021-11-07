<template>
	<!--
	页面示例
	 ，，，，价格区间-->
	<div id="big_div ">
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="租 客 合 同" name="first">
				 <div id="div_top">
           <el-radio-group v-model="radio">
             <el-radio :label="1">全部</el-radio>
             <el-radio :label="2">即将搬入</el-radio>
             <el-radio :label="3">在租中</el-radio>
             <el-radio :label="4">即将搬出</el-radio>
             <el-radio :label="5">已到期</el-radio>
             <el-radio :label="6">以退租</el-radio>
           </el-radio-group>
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
				  <!--   合同表格    -->
				<div id="div_user ">
					 <el-table :data="heTongList.slice((queryParams.pageNum-1)*queryParams.pageSize,
          queryParams.pageNum*queryParams.pageSize)" style="width: 100%;font-size: 12px;" >
             <el-table-column label="状态" align="center" prop="zhuangTai" />
             <el-table-column label="签约人/签约时间/编号/地址" align="center">
               <template #default="scope">
                 {{scope.row.cjr.ygName}}/{{scope.row.qysj}}<br/>{{scope.row.htId}}/{{scope.row.fyHousing.city}}
               </template>
             </el-table-column>
             <el-table-column label="租客姓名/电话/租期" align="center">
               <template #default="scope">
                 {{scope.row.czr.name}}/{{scope.row.czr.phone}}<br/>{{scope.row.htksSj}}至{{scope.row.htdqSj}}
               </template>
             </el-table-column>
             <el-table-column label="押金／租金／付款方式" align="center" prop="ygId">
               <template #default="scope">
                 {{scope.row.yaJing}}/押金<br/>{{scope.row.zhuJing}}/每月
               </template>
             </el-table-column>
						<el-table-column   label="相关操作" align="center">
						<template #default="scope">
							<el-button size="mini" type="primary" plain>预约</el-button>
							<el-button size="mini" type="success" plain style="margin-left:2px;"
								 >预定</el-button>
						</template>
						</el-table-column>
					  </el-table>

          <!-- 分页组件开始 -->
          <div class="block" align="center">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[3,6,12,20]"
                :current-page="queryParams.pageNum"
                :page-size="queryParams.pageSize"
                layout="total,sizes, prev, pager, next, jumper"
                :total="heTongList.length">
            </el-pagination>
          </div>
          <!-- 分页组件结束 -->
				</div>


			</el-tab-pane>
		    <el-tab-pane label="合 同 审 批" name="second">
				 <div id="big_div">
					<!-- 房源表格 -->
					<div id=" div_user ">
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
		</el-tabs>


	</div>
</template>

<script>
	export default {
			data() {
				return {
          // 查询参数
          queryParams: {
            pageNum: 1,
            pageSize: 10,
          },
				  //单选框
          radio: 1,
					 options:[],//客户来源类型
					 value:'',
					 needops:[],//需求类型
					 tenencyops:[],//租期类型
					 areaops:[],//区域类型
          //  合同信息
          heTongList:[],
					 pageSize:1,
					 pageNo:1,
					 total:1,
					 activeName:'first',
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
					 suretotal:1,
            heTong: {
              "ht_id": "合同ID",
              "city": "株洲市区111",
              "fyHousing":{
                "city":""
              },
              "cjr": "cjr1108",
              "house_payment_method": "押一付三",
              "zhuang_tai": "0",
              "phone": "17673845994",
              "czr": {
                "rzId": null,
                "name": "徐蓉",
                "phone": "电话",
                "sfz": "身份证"
              },
              "fw_id": "1",
              "qysj":''
            }
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
        //获取合同表格数据
				gethtlist(){
				  this.axios.post("heTong",this.heTong).then(req  =>  {
				    this.heTongList=req.data.data
            console.log(this.heTongList)
          })
        },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange(size) {
        this.queryParams.pageSize = size;
        // console.log(this.pagesize) //每页下拉显示数据
      },
      handleCurrentChange(currentPage) {
        this.queryParams.pageNum = currentPage;
      },
			},created() {
			  this.gethtlist()
    }
  }
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
		margin-top:0px;
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
