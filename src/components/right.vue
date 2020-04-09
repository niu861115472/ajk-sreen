<template>
  <div class="right">
    <div class="order_num same_bg">
      <p class="left_name">订单个数>></p>
      <div id="myChart2"></div>
    </div>
    <div class="hotel_info message same_bg">
      <p class="left_name">客房信息>></p>
      <div class="change_btn">
        <div :class="{'visited':show3 == true}" @click="changeTotal()">未处理</div>
        <div :class="{'visited':show3 == false}" @click="changeChild()">已处理</div>
      </div>
      <p>
        需处理的消息：
        <span>{{waitCount}}</span>
      </p>
      <p>
        已处理的消息：
        <span>{{doneCount}}</span>
      </p>
      <div v-if="show" class="loading">
        <img src="../assets/images/loading.gif" alt />
      </div>
      <vue-seamless-scroll :class-option="classOption" :data="list" class="seamless-warp">
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <img v-if="show3 == true" src="../assets/images/微信图片_20191206165149.png" alt />
            <img v-if="show3 == false" src="../assets/images/矩形647.png" alt />
            <span class="span">
              
              <span style="fontSize:19px;color:#240fe0;">【{{item.name}}】</span>
              {{item.content}}
              </span>
              <div class="message-time">
                  {{show3 ? item.gmtCreate.trim().split(" ")[1] : item.gmtModify.trim().split(" ")[1]}}
              </div>
          </li>
          <div style="clear:both"></div>
        </ul>
      </vue-seamless-scroll>
    </div>
    <div class="error_info message same_bg">
      <p class="left_name">设备异常消息>></p>
      <div class="change_btn">
        <div :class="{'visited':show2 == true}" @click="changeTotal1()">未处理</div>
        <div :class="{'visited':show2 == false}" @click="changeChild1()">已处理</div>
      </div>
      <p>
        需处理的消息：
        <span>{{waitCount1}}</span>
      </p>
      <p>
        已处理的消息：
        <span>{{doneCount1}}</span>
      </p>
      <div v-if="show1" class="loading1">
        <img src="../assets/images/loading.gif" alt />
      </div>
      <vue-seamless-scroll v-if="list1.length == 0" :class-option="classOption" :data="list1" class="seamless-warp1">
        <ul>
          <li v-for="(item,index) in list1" :key="index">{{item.devName}}</li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>
<script>
import newArr from "./time";
export default {
  data() {
    return {
      show: true, //订单loading
      show1: true, //消息loading
      show3: true, //切换隐藏
      show2:true,
      pageNo: 0,
      pageNo1: 0,
      pageSize: 3,
      waitCount: "",
      doneCount: "",
      waitCount1: "0",
      doneCount1: "0",
      timer: "",
      timer2: "",
      timer3: "",
      childList: [],
      list: [],
      list1: [],
      childList1: [],
      status: 0
    };
  },
  computed: {
    classOption() {
      return {
        step: 0.5,
        openWatch: true,
        limitMoveNum: 3
      };
    }
  },
  created() {
    setTimeout(() => {
      this.getHotelOrders();
    }, 2000);
    this.getHotelMsgs(this.status);

    this.timer2 = setInterval(() => {
      setTimeout(() => {
        this.getHotelExceptionMsgs(this.status);
      }, 0);
    }, 6000);
    setInterval(() => {
      let type = ''
      let type1 = ''
      this.show3 = !this.show3
      this.show2 = !this.show2
      this.pageNo = 0;
      this.pageNo1 = 0;
      this.list = []
      this.list1 = []
      type = this.show3 == true ? 0 : 2
      type1 = this.show2 == true ? 0 : 2
      this.getHotelMsgs(type)
      this.getHotelExceptionMsgs(type1)
    }, 10000);
  },
  methods: {
    //未处理
    changeTotal() {
      this.status = 0
      this.pageNo = 0;
      this.list = []
      this.getHotelMsgs(this.status)
      this.show3 = true
    },
    //已处理
    changeChild() {
      this.status = 2
      this.pageNo = 0;
      this.list = []
      this.getHotelMsgs(this.status)
      this.show3 = false
    },

    changeChild1() {
      this.status = 2
      this.pageNo1 = 0;
      this.list1 = []
      this.getHotelExceptionMsgs(this.status)
      this.show2 = false
    },

    changeTotal1() {
      this.status = 0
      this.pageNo1 = 0;
      this.list1 = []
      this.getHotelExceptionMsgs(this.status)
      this.show2 = true
    },

    //酒店订单
    getHotelOrders() {
      this.$api
        .getHotelOrders({
          hotelId: sessionStorage.getItem("hotelId")
        })
        .then(res => {
          if (res.success) {
            const list = res.dataObject;
            const newList = newArr[3];
            this.matchDate(list, newList);
          }
        });
    },
    //客房消息
    getHotelMsgs(status) {
      this.$api
        .getHotelMsgs({
          hotelId: '907003670336145664',
          status: status,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.success) {
            this.show = false;
            this.childList = res.dataObject;
            this.pageNo = this.pageNo + 1;
            this.list = [...this.list, ...this.childList];
            var list = this.list.filter(item => item.name);
            this.list = list;
            this.waitCount = this.list[0].waitCount;
            this.doneCount = this.list[0].doneCount;
            // if (this.childList.length < 3) {
            //   clearInterval(this.timer);
            //   this.timer = null;
            // }
          }
        });
    },
    //异常消息
    getHotelExceptionMsgs(status) {
      this.$api
        .getHotelExceptionMsgs({
          hotelId: sessionStorage.getItem("hotelId"),
          pageNo: this.pageNo1,
          pageSize: this.pageSize,
          status:status
        })
        .then(res => {
          if (res.success) {
            this.show1 = false;
            this.childList1 = res.dataObject;
            this.pageNo1 = this.pageNo1 + 1;
            this.list1 = [...this.list1, ...this.childList1];
            // if (this.childList1.length < 3) {
            //   clearInterval(this.timer2);
            //   this.timer2 = null;
            // }
          }
        });
    },
    //日期数据匹配
    matchDate(list, newList) {
      for (var x in newList) {
        for (var y in list) {
          if (newList[x].datex == list[y].datex) {
            newList[x].count = list[y].count;
          }
        }
      }
      const arr = newList.map(item => {
        return item.count;
      });
      this.drawLine(arr);
    },
    drawLine(arr) {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));

      myChart2.setOption({
        tooltip: {},
        grid: {
          left: "15%", //设置canvas图距左的距离
          top: "20%",
          right: "17%",
          bottom: "20%"
        },
        xAxis: {
          name: "日期",
          type: "category",
          data: newArr[0],
          axisLabel: {
            show: true,
            interval: 0, //横轴信息全部显示
            textStyle: {
              color: "#fff",
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: "#2454A9"
            }
          }
        },
        yAxis: {
          name: "（订单/个）",
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#2454A9"
            }
          }
        },
        series: [
          {
            name: "订单个数",
            data: arr,
            type: "bar",
            barWidth: 13,
            itemStyle: {
              // 柱的颜色。
              normal: {
                barBorderRadius: [20, 20, 0, 0],
                color: "#07EBF6",
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#fff",
                    fontSize: 16
                  }
                }
              }
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        myChart2.resize();
      });
    },
  }
};
</script>
<style scoped>
.right {
  width: 25%;
  margin-right: 10px;
  /* border: 1px solid; no */
}
.left_name {
  padding: 6px;
  font-size: 7px;
  color: #1ce6f4;
}
.right .same_bg {
  background-image: url(../assets/images/d.png);
  background-size: 100% 100%;
  margin-bottom: 6px;
}
.right .same_bg:nth-of-type(1) {
  height: 125px;
}
.right .same_bg:nth-of-type(3) {
  height: 125px;
}
.right div:last-child {
  margin-bottom: 0;
}

.message p:not(:first-child) {
  display: inline-block;
  margin-top: 4px;
  margin-left: 8px;
  font-size: 6px;
}
.message p span {
  font-size: 8px;
  color: #fffc00;
}
.seamless-warp {
  height: 64px;
  overflow: hidden;
  padding: 10px 0;
  margin: 8px 8px 0px 8px;
  border-top: 1px solid #377be2; /*no*/
}
.seamless-warp ul li {
  position: relative;
  float: left;
  width: 120px;
  height: 10px;
  /* text-align: center; */
  font-size: 6px;
  margin-bottom: 18px;
}
.seamless-warp ul li img {
  width: 100%;
  /* height: 100%; */
}
.seamless-warp ul li .span {
  width: 80%;
  /* border: 1px solid red; */
  position: absolute;
  top: 2px;
  left: 10%;
}
.seamless-warp ul li:nth-of-type(2n) {
  float: right;
}
.seamless-warp ul li:nth-of-type(2n) img {
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
}
.message-time{
  position: absolute;
  top: 12px;
  right: 13px;
  color: #5c5959;
}
.seamless-warp1 {
  height: 60px;
  overflow: hidden;
  padding: 8px 0;
  margin: 8px 8px 0px 8px;
  border-top: 1px solid #377be2; /*no*/
}
.seamless-warp1 ul li {
  width: 98%;
  height: 15px;
  line-height: 15px;
  font-size: 6px;
  margin: 0 auto 10px auto;
  border: 1.5px solid #275ab6; /*no*/
  border-radius: 25px;
  text-align: center;
}
#myChart2 {
  width: 100%;
  height: 80%; /*no*/
  position: relative;
}
.hotel_info,
.error_info {
  position: relative;
}
.loading {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  color:#240fe0;
}
.loading1{
  width: 25px;
  height: 25px;
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
}
.loading img,
.loading1 img {
  width: 100%;
  height: 100%;
}
.change_btn {
  position: absolute;
  display: flex;
  top: -3px;
  right: 10px;
  width: 80px;
}
.change_btn div {
  border-radius: 2px;
  margin-left: 5px;
  width: 25px;
  height: 12px;
  line-height: 12px;
  text-align: center
}
.change_btn div.visited {
  background: -webkit-linear-gradient(#153aaa, #112779);
}
.change_btn div:hover {
  cursor: pointer;
}
.listNone {
  width: 100%;
  position: absolute;
  top: 50%;
  text-align: center;
  font-size: 15px;
}
</style>
