<template>
  <div>
    <div id="div_searchtop">
      <div style="width: 820px;">
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
        <el-table-column   label="预定状态" prop="kysurepres[0].kystatu.tname"> </el-table-column>
        <el-table-column   label="姓名" width="80" prop="cname"> </el-table-column>
        <el-table-column   label="电话" width="180" prop="ctel"> </el-table-column>
        <el-table-column   label="剩余签约天数"> </el-table-column>
        <el-table-column   label="定金金额" prop="kysurepres[0].smoney"> </el-table-column>
        <el-table-column   label="预定时间" prop="kysurepres[0].sutime">
          <!-- <template #default="scope">
            {{scope.row.bcdetailDate.substr(0,10)}}
          </template> -->
        </el-table-column>
        <el-table-column   label="房源地址" prop="kyUneeds[0].uddress"> </el-table-column>
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
                <el-select v-model="user"
                           @change="pickUser(user)"
                           placeholder="姓名" clearable="true" size="medium"
                           style="margin-left:13px;">
                  <el-option v-for="item in users" :key="item.cname" :label="item.cname" :value="item.cname">
                  </el-option>
                </el-select>

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
                <el-input v-model="csex"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房源地址"   id="input_width">
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
              <el-form-item label="应收定金"
                            :label-width="formLabelWidth"
                            id="input_width"
                            style="width: 209px;">
                <el-input v-model="markMon"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收定人" id="input_width"  style="width: 193px;">
                <el-input style="margin-left: 13px;"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>

            <el-col :span="12">
              <el-form-item label="签约时间" :label-width="formLabelWidth" id="input_width">
                <el-date-picker
                    @change="pickUntime()"
                    v-model="intime"
                    type="date"
                    placeholder="预计签约时间"
                    style="width: 200px;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失效时间" :label-width="formLabelWidth" id="input_width">
                <el-date-picker
                    v-model="untime"
                    type="date"
                    placeholder="签约失效时间"
                    style="width: 200px;">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="收款账号"   id="input_width" style="width: 209px;">
                <el-select v-model="count"
                           style="width: 139px;"
                           @change="pickNum(count)"
                           placeholder="收款账号" clearable="true" size="medium"
                >
                  <el-option v-for="item in counts"
                             :key="item.number" :label="item.number" :value="item.number">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div style="width: 200px;margin-left: 450px;">
        <el-button plain size="small"
                   style="background-color: lightcoral;color: white;margin-left: -13px;"
                   @click="addSupre()">
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
import qs from 'qs'
import moment from 'moment'
export default {
  data() {
    return {
      value1:'',//时间
      surepageSize:5,
      surepageNo:1,
      suretotal:1,
      ydform:false,
      users:[],
      user:'',
      cardnum:'',
      ctel:'',
      kyorigin:'',
      kyorigins:[],
      csex:'',
      dzorigin:'',
      dzorigins:[],
      counts:[],//账号数组
      count:'',//账号
      untime:'',
      intime:'',
      markMon:'',
      accountId:0,
      scid:0,
      custominfo:[]

    }
  },methods:{
    pickNum(item){
      if(item!=''){
        for (var i = 0; i < this.counts.length; i++) {
          if(item==this.counts[i].number){
            this.accountId=this.counts[i].accountId;
          }
        }
      }

    },
    loadData(){
      this.axios.post("customer/moremres", {
        pageNo: this.surepageNo,
        pageSize: this.surepageSize
      }).then(res => {
        console.log(res, "分页加载数据加载数据")
        if(res.data.list.length!=0){
          this.custominfo=res.data.list;
          this.suretotal=res.data.total;
          this.surepageNo=res.data.pageNum;
          this.surepageSize=res.data.pageSize;
        }
      })
    },
    pickUntime(){
      let bdate=moment(this.intime).add(3,'days').toDate();
      this.untime=moment(bdate).format("YYYY-MM-DD");
    },
    addSupre(){//新增的结果
      // scid 客户信息  stid预定状态
      console.log(this.intime,this.untime,this.accountId,this.scid,this.markMon,"121")
      this.axios.post("surepre/insert",{
        sutime:this.intime,
        suntime:this.untime,
        accountId:this.accountId,
        empid:0,//应该和登录账户挂钩
        stid:20,//默认预约状态是待处理
        scid:this.scid,
        smoney:this.markMon
      }).then(res=>{
        console.log(res,"新增的结果");
      })
      this.ydform=false;
    },
    pickUser(item){
      this.axios.post("customer/byname",{
        cname:item
      }).then(res=>{
        console.log(res,"选择用户的值直至");
        if(res.data.cardnum!=''){
          this.cardnum=res.data.cardnum;
          this.ctel=res.data.ctel;
          this.csex=res.data.csex;
          this.scid=res.data.cid;
          this.kyorigins.push(res.data.ctype.tname);
          if(res.data.kyUneeds.length!=0){
            this.dzorigin=res.data.kyUneeds[0].uaddress;
            let obj = {
              city:this.dzorigin
            }
            /* 转换成对象的格式 */
            let newObj = qs.stringify(obj);
            this.axios.post("surepre/byhname",newObj).then(res=>{
              console.log(res,"根据地址查询的res");
              this.markMon=res.data.houseFloorPrice*0.8;

            })
          }

        }
        console.log(res,"查询用户的信息:");
      })
    },
    sureSizeChange(val){
      this.surepageSize = val;
      this.loadData();
    },
    sureCurrentChange(val){
      this.surepageNo = val;
      this.loadData();
    },
    addPred(){
      this.ydform=true;
    },
    backCu(){
      this.$router.replace("/appointment");
    },
    loadAccount(){
      this.axios.post("surepre/mes").then(res=>{
        console.log(res,"countscountscountscounts")
        this.counts=res.data;

      })
    },
    loadUsers(){
      this.axios.post("customer/mess").then(res=>{
        if(res.data.length!=0){
          this.users=res.data;
        }

      })
    },
    // customer/byname

  },mounted() {
    this.loadUsers();
    this.loadAccount();
    this.loadData();
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
