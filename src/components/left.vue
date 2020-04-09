<template>
  <div class="left">
    <div class="same_bg1">
      <p class="left_name">爱居客为您提供酒店一站式服务>></p>
      <ul>
        <li>
          已经运行
          <span>{{data.dateCount}}</span>
          <span>天</span>
        </li>
        <li>
          客流总量
          <span>{{data.customerCount}}</span>
          <span>人</span>
        </li>
        <li>
          客房总量
          <span>1</span>
          <span>间</span>
        </li>
        <li>
          设备总量
          <span>10</span>
          <span>个</span>
        </li>
      </ul>
    </div>
    <div class="same_bg2">
      <p class="left_name" v-show="index == 0">总体用电统计>></p>
      <p class="left_name" v-show="index == 1">房间用电统计>></p>
      <p class="left_name" v-show="index == 2">房间实时状态>></p>
      <div class="change_btn">
        <div :class="{'visited':index ==0}" @click="changeTotal()">总体</div>
        <div :class="{'visited':index ==1}" @click="changeChild()">房间</div>
        <div :class="{'visited':index ==2}" @click="changeThird()">实时</div>
      </div>
      <div @mouseenter="enter()" @mouseleave="leave()" v-show="index == 0" id="myChart"></div>
      <div
        @mouseenter="enter()"
        @mouseleave="leave()"
        :class="{'current':index == 1}"
        id="myChart1"
      ></div>
      <real-time @funco="leave" @func="enter" :parentmsg="index"></real-time>
    </div>
    <div class="same_bg3">
      <div class="hotel_info">
        <p class="left_name">用电报警信息统计>></p>
        <div class="change_btn">
          <div :class="{'visited':show == true}" @click="changeTotal1()">未处理</div>
          <div :class="{'visited':show == false}" @click="changeChild1()">已处理</div>
        </div>
        <p>
          需处理的消息：
          <span>{{msgNum.undoCount}}</span>
        </p>
        <p>
          已处理的消息：
          <span>{{msgNum.doneCount}}</span>
        </p>
        <div v-if="show1" class="loading">
          <img src="../assets/images/loading.gif" alt />
        </div>
        <vue-seamless-scroll :class-option="classOption" :data="list" class="seamless-warp1">
          <ul>
            <li v-for="(item,index) in list" :key="index">{{show ? item.gmtCreate : item.gmtModify}}{{item.content}}</li>
          </ul>
        </vue-seamless-scroll>
      </div>
      <!-- <div class="listNone" v-if="show2">暂无报警信息</div> -->
    </div>
  </div>
</template>
<script>
import newArr from "./time";
import Bus from "./eventBus.js";
import qs from "qs";
import RealTime from "./realTime";
var token = "RQsb3e69V1ZNeGNVeFhjM1JoUnprd1dsZDRTV0l5TVd3PQC3hhBsZ8ZoOUj5bO==";
export default {
  components: {
    RealTime
  },
  data() {
    return {
      index: 0,
      show: true,
      show1: true,
      show2: false,
      data: "",
      msgNum: "",
      pageNo: 1,
      pageSize: 3,
      childList: [],
      timer: "",
      timer2: "",
      list: []
    };
  },
  computed: {
    classOption() {
      return {
        step: 0.5,
        openWatch: true,
        show1: true,
        limitMoveNum: 3,
        name: ""
      };
    }
  },
  created() {
    this.getHotelBySign();
    this.timer = setInterval(() => {
      setTimeout(() => {
        this.getHotelPowerWarnMsg();
      }, 0);
    }, 4000);
    this.leave()
  },
  methods: {
    //根据标识获取酒店信息
    getHotelBySign() {
      this.$api
        .getHotelBySign({
          sign: sessionStorage.getItem("sign")
        })
        .then(res => {
          if (res.success) {
            let type = res.dataObject.powerType;
            this.name = res.dataObject.name;
            let typeId = type == 1 ? "hostId" : "hotelId";
            let powerId =
              typeId == "hostId"
                ? res.dataObject.powerHostId
                : res.dataObject.id;
            let id = res.dataObject.id;
            this.getFlowStatistics(id);
            this.getHotelPowerRank(type, typeId, powerId);
            this.getHotelPowerStatistics(type, typeId, powerId);
            this.getHotelPowerWarnCount(id);
            const idStore = sessionStorage.setItem(
              "hotelId",
              res.dataObject.id
            );
            Bus.$emit("sendId", res.dataObject.id);
          }
        });
    },
    //客流、房间数等信息
    getFlowStatistics(id) {
      this.$api
        .getFlowStatistics({
          hotelId: id
        })
        .then(res => {
          if (res.success) {
            this.data = res.dataObject;
            Bus.$emit("sendMsg", res.dataObject.todayCount);
          }
        });
    },
    //电源统计
    getHotelPowerStatistics(type, typeId, id) {
      this.$api
        .getHotelPowerStatistics({
          type: type,
          [typeId]: id
        })
        .then(res => {
          if (res.success) {
            const list = res.dataObject;
            const newList = newArr[2];
            this.matchDate(list, newList, type);
          }
        });
    },
    //电源排行
    getHotelPowerRank(type, typeId, id) {
      this.$api
        .getHotelPowerRank({
          type: type,
          [typeId]: id
          // hotelId:'308968208420250752'
        })
        .then(res => {
          if (res.success) {
            const arr = res.dataObject;
            var houseArr = [];
            var powerArr = [];
            if (type == 1) {
              houseArr = arr.map(item => {
                return item.deviceId;
              });
              powerArr = arr.map(item => {
                return item.totalPower;
              });
            } else {
              const newData = newArr[5];
              for (var x in newData) {
                for (var y in arr) {
                  if (newData[x].date == arr[y].gmtCreate) {
                    newData[x].homes.push(arr[y].deviceName)
                    newData[x].power[x] = arr[y].power
                  }
                }
              }
              console.log(newData);
              let arr1 = []
              let arr2 = []
              let arr3 = []
              let home = newData[0].homes
              arr1.push(newData[0].power[0],newData[1].power[0],newData[2].power[0])
              arr2.push(newData[0].power[1],newData[1].power[1],newData[2].power[1])
              arr3.push(newData[0].power[2],newData[1].power[2],newData[2].power[2])
              this.drawLine1(houseArr, arr1,arr2,arr3,home);
            }
          }
        });
    },
    //用电报警
    getHotelPowerWarnMsg() {
      this.$api
        .getHotelPowerWarnMsg({
          hotelId: sessionStorage.getItem("hotelId"),
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          status: this.show == true ? 0 : 2
        })
        .then(res => {
          this.show1 = false;
          if (res.dataObject.length == 0) {
            this.show2 = true;
          } else {
            this.show2 = false;
          }
          this.childList = res.dataObject;
          this.pageNo = this.pageNo + 1;
          this.list = [...this.list, ...this.childList];
          // if (this.childList.length < 3) {
          //   clearInterval(this.timer);
          //   this.timer = null;
          // }
        });
    },
    //用电报警已处理、未处理消息数
    getHotelPowerWarnCount(id) {
      this.$api
        .getHotelPowerWarnCount({
          hotelId: id
        })
        .then(res => {
          this.msgNum = res.dataObject;
        });
    },
    //日期数据匹配
    matchDate(list, newList, type) {
      for (var x in newList) {
        for (var y in list) {
          if (type == 1) {
            if (newList[x].date == list[y].date) {
              newList[x].totalPower = list[y].totalPower;
            }
          } else {
            if (newList[x].date == list[y].gmtCreate) {
              newList[x].totalPower = list[y].power;
            }
          }
        }
      }
      const arr = newList.map(item => {
        return item.totalPower;
      });
      this.drawLine(arr);
    },
    drawLine(arr) {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      let option = {
        tooltip: {},
        // X轴设置
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
            rotate: 0, //-30度角倾斜显示
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

        // Y轴设置
        yAxis: {
          name: "（用电/度）",
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
            itemStyle: {
              // 点的颜色。
              color: "#FFF100"
            },
            name: "客房数量",
            symbolSize: 6,
            type: "line",
            data: arr
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    drawLine1(houseArr, arr1,arr2,arr3,home) {
      // 基于准备好的dom，初始化echarts实例
      console.log(arr1,arr2,arr3)
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
  // console.log(newData[0].homes)
      myChart1.setOption({
        tooltip: {},
        grid: {
          left: "15%", //设置canvas图距左的距离
          top: "20%",
          right: "17%",
          bottom: "20%"
        },
        xAxis: {
          name: "房间",
          type: "category",
          data: newArr[4],
          axisLabel: {
            show: true,
            interval: 0, //横轴信息全部显示
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
        yAxis: {
          name: "（用电/度）",
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
            name: home[0],
            data: arr1,
            type: "bar",
            barWidth: 13,
            itemStyle: {
              // 柱的颜色。
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#fff",
                    fontSize: 15
                  }
                },
                barBorderRadius: [20, 20, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#29ACE2"
                  },
                  {
                    offset: 1,
                    color: "#4527D5"
                  }
                ])
              }
            }
          },
          {
            name: home[1],
            data: arr2,
            type: "bar",
            barWidth: 13,
            itemStyle: {
              // 柱的颜色。
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#fff",
                    fontSize: 15
                  }
                },
                barBorderRadius: [20, 20, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#29ACE2"
                  },
                  {
                    offset: 1,
                    color: "#4527D5"
                  }
                ])
              }
            }
          },
          {
            name: home[2],
            data: arr3,
            type: "bar",
            barWidth: 13,
            itemStyle: {
              // 柱的颜色。
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#fff",
                    fontSize: 15
                  }
                },
                barBorderRadius: [20, 20, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#29ACE2"
                  },
                  {
                    offset: 1,
                    color: "#4527D5"
                  }
                ])
              }
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        myChart1.resize();
      });
    },
    //总用电统计点击
    changeTotal() {
      this.index = 0;
    },
    //设备用电统计点击
    changeChild() {
      this.index = 1;
    },
    //实时用电统计点击
    changeThird() {
      this.index = 2;
    },
    //用电报警统计未处理
    changeTotal1() {
      this.pageNo = 0;
      this.list = [];
      this.show = true;
      this.getHotelPowerWarnMsg();
    },
    //用电报警统计已处理
    changeChild1() {
      this.pageNo = 0;
      this.list = [];
      this.show = false;
      this.getHotelPowerWarnMsg();
    },
    enter() {
      clearInterval(this.timer2);
    },
    leave() {
      this.timer2 = setInterval(() => {
        this.show = !this.show;
        this.pageNo = 0
        this.list = [];
        this.getHotelPowerWarnMsg();
        this.index++;
        if (this.index == 3) {
          this.index = 0;
        }
      }, 8000);
    }
  }
};
</script>
<style scoped>
.left {
  width: 25%;
  margin-left: 10px;
  /* border: 1px solid; no */
}
.left .same_bg1 {
  background-image: url(../assets/images/a.png);
  background-size: 100% 100%;
  margin-bottom: 5px;
}
.left .same_bg2 {
  position: relative;
  background-image: url(../assets/images/b.png);
  background-size: 100% 100%;
  height: 125px;
  margin-bottom: 5px;
}
.left .same_bg3 {
  position: relative;
  background-image: url(../assets/images/c.png);
  height: 125px;
  background-size: 100% 100%;
}
.same_bg3 p:not(:first-child) {
  display: inline-block;
  margin-top: 4px;
  margin-left: 8px;
  font-size: 6px;
}
.same_bg3 p span {
  font-size: 8px;
  color: #fffc00;
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
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 6px;
  margin: 0 auto 10px auto;
  border: 1.5px solid #275ab6; /*no*/
  border-radius: 25px;
  text-align: center;
}
.left_name {
  padding: 6px;
  font-size: 7px;
  color: #1ce6f4;
}
.left .same_bg1 ul {
  padding: 5px 15px;
}
.left .same_bg1 ul li {
  margin-bottom: 5px;
  font-size: 6px;
}
.left .same_bg1 ul li span:nth-of-type(1) {
  display: inline-block;
  text-align: center;
  width: 100px;
  height: 15px;
  line-height: 15px;
  margin: 0 7px;
  font-size: 8px;
  background-image: url(../assets/images/yuanj.png);
  background-size: 100% 100%;
}
.left .same_bg1 ul li span:nth-of-type(2) {
  color: #1ce6f4;
}
#myChart {
  width: 100%;
  height: 80%; /*no*/
  position: relative;
  /* left: 20px; */
}
#myChart1 {
  position: absolute;
  width: 100%; /*no*/
  height: 80%; /*no*/
  top: 25px;
  visibility: hidden;
}
.change_btn {
  position: absolute;
  display: flex;
  top: -3px;
  right: 20px;
  width: 60px;
}
.change_btn div {
  border-radius: 2px;
  margin-left: 5px;
  width: 25px;
  height: 12px;
  line-height: 12px;
  text-align: center;
}
.change_btn div.visited {
  background: -webkit-linear-gradient(#153aaa, #112779);
}
.change_btn div:hover {
  cursor: pointer;
}
#myChart1.current {
  visibility: visible;
}
.listNone {
  width: 100%;
  position: absolute;
  top: 50%;
  text-align: center;
  font-size: 15px;
}
.hotel_info {
  position: relative;
}
.loading {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  bottom: 80px;
  margin: auto;
}
.loading img {
  width: 100%;
  height: 100%;
}
</style>
