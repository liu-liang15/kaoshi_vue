<template>
	<!--
	页面示例
	 ，，，，价格区间-->
	<div id="big_div ">
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="租 客 合 同" name="first">
				 <div id="div_top">
           <el-radio-group v-model="radio" @change="gethtlist">
             <el-radio :label="1">全部</el-radio>
             <el-radio :label="2">即将搬入</el-radio>
             <el-radio :label="3">在租中</el-radio>
             <el-radio :label="4">已到期</el-radio>
           </el-radio-group>
           <el-input v-model="parmt" placeholder="租客姓名 电话 房源地址 合同编号" class="select_div" style="width: 400px"/>
           <el-button type="primary" @click="gethtlist()" plain style="margin-left: 50px"> 搜 索 </el-button>
           <el-button type="success" @click="dialogVisible = !dialogVisible" plain style="margin-left: 50px"> 批 量 回 访 </el-button>
				 </div>
				  <!--   合同表格    -->
				<div id="div_user ">
					 <el-table :data="heTongList.slice((queryParams.pageNum-1)*queryParams.pageSize,
          queryParams.pageNum*queryParams.pageSize)" style="width: 100%;font-size: 12px;" >
             <el-table-column label="操作" align="center" >
               <template #default="scope">
                 <el-checkbox v-model="scope.row.zhuangTai"></el-checkbox>
                 <el-button type="success" plain style="margin-left: 30px" size="mini"> 查看详情 </el-button>
               </template>

             </el-table-column>>
             <el-table-column label="签约人/签约时间/编号/地址" align="center">
               <template #default="scope">
                 {{scope.row.cjr.ygName}}/{{scope.row.qysj}}<br/>{{scope.row.htId}}/{{scope.row.fyHousing.city}}
               </template>
             </el-table-column>
             <el-table-column label="租客姓名/电话/租期" align="center">
               <template #default="scope">
                 {{scope.row.czrPojo.name}}/{{scope.row.czrPojo.phone}}<br/>{{scope.row.htksSj}}至{{scope.row.htdqSj}}
               </template>
             </el-table-column>
             <el-table-column label="押金／租金／付款方式" align="center" prop="ygId">
               <template #default="scope">
                 {{scope.row.yaJing}}/押金<br/>{{scope.row.zhuJing}}/每月
               </template>
             </el-table-column>
						<el-table-column   label="相关操作" align="center">
						<template #default="scope">
							<el-button size="mini" type="primary" plain>续约</el-button>
							<el-button size="mini" type="success" plain>退租</el-button>
              <el-button size="mini" type="primary" @click="ckhfjl(scope.row.zjId)"> 记 录 </el-button>
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
           <!--   合同表格    -->
           <div>
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
                   {{scope.row.czrPojo.name}}/{{scope.row.czrPojo.phone}}<br/>{{scope.row.htksSj}}至{{scope.row.htdqSj}}
                 </template>
               </el-table-column>
               <el-table-column label="押金／租金／付款方式" align="center" prop="ygId">
                 <template #default="scope">
                   {{scope.row.yaJing}}/押金<br/>{{scope.row.zhuJing}}/每月
                 </template>
               </el-table-column>
               <el-table-column   label="相关操作" align="center">
                 <template #default="scope">
                   <el-button size="mini" type="primary">审批</el-button>
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
				</div>
			 </el-tab-pane>
		</el-tabs>


	</div>
  <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%"
  >
    <el-input
        type="textarea"
        placeholder="请输入回访内容"
        v-model="textarea"
        maxlength="100"
        show-word-limit
    />
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="xzhf">确 定</el-button>
    </span>
    </template>
  </el-dialog>
<!--  回访记录-->
  <el-drawer
      title="回访记录"
      v-model="drawer"
      direction="ltr"
      destroy-on-close
  >
    <el-table :data="hfjl" stripe style="width: 100%">
      <el-table-column prop="hfSj" label="回访时间" width="180"> </el-table-column>
      <el-table-column prop="hfjl" label="回访记录"> </el-table-column>
    </el-table>
  </el-drawer>
</template>

<script>
import { defineComponent, ref } from 'vue'
	export default {
			data() {
				return {
				  hfjl: [],
          drawer: false,
          textarea: ref(''),
				  //批量回复的框
          dialogVisible: false,
          parmt:"",
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
              "czrPojo": {
                "rzId": null,
                "name": "徐蓉",
                "phone": "电话",
                "sfz": "身份证"
              },
              "fw_id": "1",
              "qysj":''
            }
				}
			},
    methods:{
			//  查看回访记录
      ckhfjl(htId){
        this.drawer=true
        this.axios("ckhfjl/"+htId).then(req=>{
          this.hfjl=req.data.data
          console.log(this.hfjl)
        })
      },

			//  批量回复
      xzhf(){
        this.dialogVisible=false
        var list=[]

        for (let i = 0; i < this.heTongList.length; i++) {
          if (this.heTongList[i].zhuangTai === true){
            var HtHuiFang= {
              hfjl:'',
              hfr:'刘亮',
              htId:''
            }
            HtHuiFang.htId=this.heTongList[i].zjId
            HtHuiFang.hfjl=this.textarea
            list.push(HtHuiFang)
          }
        }
        if (list.length===0){
          return
        }
        this.axios.post("tjhf",list).then(req =>{
          this.gethtlist()
          alert(req.data.message)
        })

      },
        //获取合同表格数据
				gethtlist(){
				  this.axios("heTong",{params: {zhuangTai: this.radio,parmt: this.parmt}}).then(req  =>  {
				    this.heTongList=req.data.data
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
