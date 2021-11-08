<template>
	<div id="big_div ">
		<el-tabs v-model="activeName" >
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
                 <el-button type="success" plain style="margin-left: 30px" size="mini" @click="ckxq(scope.row)"> 查看详情 </el-button>
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
<!--  回访结束  -->


  <!--  查看合同详情开始  -->
  <el-dialog
      title="合 同 详 情"
      v-model="htxqtk"
      width="90%"
      destroy-on-close
      center
  >

      <div class="block">
        <el-avatar :size="50" >{{htxq.czrPojo.name}}</el-avatar>
        电话：{{ htxq.czrPojo.phone }} 身份证：{{ htxq.czrPojo.sfz }}
        <el-button type="success" plain style="margin-left: 30px" size="mini" @click="opendh(htxq.czrPojo)">修改电话</el-button>
      </div>
<!--    房 源 信 息   -->
      <div style="margin-top: 28px">
        <p style="font-size: 18px">房 源 信 息</p>
        <div class="mydiv">
          地址：{{htxq.fyHousing.city}}<br/>
          租金：{{htxq.fyHousing.city}}/月<br/>
        </div>
        <div class="mydiv" >
          房屋信息：{{htxq.fyHousing.roomNum}}{{htxq.fyHousing.hall}}{{htxq.fyHousing.defend}}{{htxq.fyHousing.kitchen}}<br/>
          房间大小：{{htxq.fyHousing.houseMeters}}
        </div>
        <div>
          房屋类型：{{ htxq.fyHousing.jointRent === 0?'整租':'合租'}}<br/>
          房屋特点：{{ htxq.fyHousing.houseProperty }}
        </div>
      </div>
<!--    合 同 信 息 -->
    <div style="margin-top: 28px">
      <p style="font-size: 18px">合 同 信 息</p>
      <div class="mydiv">
        合同编号：{{htxq.heTong.htId}}<br/>
        签约时间：{{htxq.heTong.qysj}}<br/>
      </div>
      <div class="mydiv" >
        合同开始时间：{{htxq.heTong.htksSj}}<br/>
        合同结束时间：{{htxq.heTong.htdqSj}}<br/>
      </div>
      <div>
        押金：{{htxq.heTong.yaJing}}<br/>
        租金：{{htxq.heTong.zhuJing}}<br/>
        提前付款天数：{{htxq.heTong.tqfk}}<br/>
      </div>
    </div>
<!--  签约信息 -->
    <div style="margin-top: 28px">
      <p style="font-size: 18px">签 约 信 息</p>
      <div class="mydiv">
        地址：{{htxq.fyHousing.city}}<br/>

      </div>
      <div class="mydiv" >
        房屋信息：{{htxq.fyHousing.roomNum}}{{htxq.fyHousing.hall}}{{htxq.fyHousing.defend}}{{htxq.fyHousing.kitchen}}<br/>
        房间大小：{{htxq.fyHousing.houseMeters}}
      </div>
      <div>
        房屋类型：{{ htxq.fyHousing.jointRent === 0?'整租':'合租'}}<br/>
        房屋特点：{{ htxq.fyHousing.houseProperty }}
      </div>
    </div>
<!--    同住人信息 -->
    <div style="margin-top: 28px">
      <p style="font-size: 18px">同 住 人 信 息</p>
      <el-table :data="htxq.czrs" stripe style="width: 80%;margin:0 auto">
        <el-table-column prop="name" label="姓名" width="180" align="center"> </el-table-column>
        <el-table-column prop="phone" label="电话号码" width="180" align="center"> </el-table-column>
        <el-table-column prop="sfz" label="身份证" align="center"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="success" plain style="margin-left: 30px" size="mini" @click="opendh(scope.row)">
              修改电话
            </el-button>
            <el-button type="success" plain style="margin-left: 30px" size="mini" @click="opensc(scope.row.rzId)">
              删 除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
  <!--  查看合同详情结束  -->
</template>

<script>
import { defineComponent, ref } from 'vue'
	export default {
			data() {
				return {
          htxqtk: false,
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
            },
          // 合同详情
            htxq : {
              czrPojo: {
                "rzId": 20001,
                "name": "刘亮",
                "phone": "10086",
                "sfz": "sfz",
                "fjId": null
              },
              "czrs": [
                {
                  "rzId": 20002,
                  "name": "猴子",
                  "phone": "10010",
                  "sfz": "6666666",
                  "fjId": "20001"
                }
              ],
              "heTong": {
                "zjId": 3319,
                "htId": "HT20211108023242",
                "fwId": "1",
                "czr": "20001",
                "czrPojo": null,
                "czrs": null,
                "htksSj": "2021-11-01",
                "htdqSj": "2021-12-31",
                "zhuJing": 8600.00,
                "yaJing": 2000.00,
                "tqfk": 3,
                "zhuangTai": "0",
                "cjr": null,
                "cjr2": "1108",
                "qysj": "2021-11-08 02:32:42",
                "fyHousing": null
              },
              "fyHousing": {
                "houseId": 1,
                "city": "湖南省株洲市区玫瑰小区1单元201室",
                "userId": "1",
                "roomNum": "2室",
                "hall": "1厅",
                "defend": "1卫",
                "kitchen": "1厨",
                "inLayers": "2",
                "totalCeng": "6",
                "orientationId": 1,
                "houseMeters": "700",
                "fitmentId": 1,
                "houserRentDate": "2021-11-06 14:58:29",
                "rentalPrices": 5000.00,
                "houseFloorPrice": 4500.00,
                "housePaymentMethod": "押一付三",
                "featureId": 1,
                "houseProperty": "房屋极大，环境优美",
                "homeState": 0,
                "jointRent": 0,
                "natureId": 1
              }
            }
				}
			},
    methods:{
      opendh(czr) {
        this.$prompt('请输入新的电话', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
            .then(({ value }) => {
                  czr.phone=value
              console.log(czr)
                  this.axios.post("xgdh",czr).then(req=>{
                    this.$message({
                      type: 'success',
                      message: '修改成功!',
                    })
                  })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '取消修改',
              })
            })
      },
      opensc() {
        this.$confirm('删除同住人？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
      },
			  // 查看合同详情
      ckxq(row){
        this.htxqtk=true
        this.axios("htxq/"+row.htId).then( req =>{
          this.htxq=req.data.data
          console.log(this.htxq)
        })
      },
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
  .mydiv{
    margin: 1px;
    width: 32%;
    float: left;
  }
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
