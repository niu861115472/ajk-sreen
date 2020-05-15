<template>
  <div
    class="real-time"
    :class="{'current':parentmsg == 2}"
    @mouseenter="enter()"
    @mouseleave="leave()"
  >
    <div class="real-time-left">
      <p>线温(°C)</p>
      <div id="myChart3" />
      <div class="line-rate-text">
        <div>35</div>
        <div>45</div>
        <div>50</div>
      </div>
      <div class="line-rate-tip">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="line"></div>
    <div class="real-time-right">
      <p>功率(W)</p>
      <div id="myChart4"></div>
      <div class="power-text">
        <div>正常</div>
        <div>过高</div>
      </div>
      <div class="power-tip">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["parentmsg"],
  data() {
    return {
      max:'',
      data: []
    };
  },
  mounted() {
    setInterval(() => {
      this.getRealTimeData();
    }, 5000);
    
  },
  methods: {
    enter() {
      this.$emit("func");
    },
    leave() {
      this.$emit("funco");
    },
    getRealTimeData() {
      this.$api
        .getRealTimeData({
          DeviceID: "5b8374554c1d6e0df006c2d4"
        })
        .then(res => {
          // console.log(res.dataObject.Lines);
          this.data = res.dataObject.Lines;
          var newArr = [];
          var newArr1 = [];
          this.max = this.data[0].Max
          for (var i = 0; i < this.data.length; i++) {
            var newObj = {};
            var newObj1 = {};
            newObj.name = this.data[i].Name;
            newObj.value = this.data[i].Temp;

            if (newObj.value > 0 && newObj.value < 35) {
              newObj.itemStyle = { color: "#54e7a9" };
            }
            if (newObj.value >= 35 && newObj.value < 45) {
              newObj.itemStyle = { color: "#ebb052" };
            }
            if (newObj.value >= 45) {
              newObj.itemStyle = { color: "#ed393a" };
            }
            newObj1.name = this.data[i].Name;
            newObj1.value = this.data[i].Power;
            if (newObj1.value / 220 < this.data[i].Max) {
              newObj1.itemStyle = { color: "#54e7a9" };
              // console.log(newObj1.value / 220);
            } else {
              newObj1.itemStyle = { color: "#ed393a" };
            }
            newArr.push(newObj);
            newArr1.push(newObj1);
            // const name = newArr.map(item =>{
            //   return item.name
            // })
            // const value = newArr.map(item =>{
            //   return item.value
            // })
            // const name1 = newArr1.map(item =>{
            //   return item.name
            // })
            // const value1 = newArr1.map(item =>{
            //   return item.value
            // })
            // console.log(name,value)
            // console.log(newArr,newArr1)
            this.getPie(newArr,newArr1);
          }
        });
    },
    // 饼图
    getPie(arr1,arr2) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart3"));
      let myChart1 = this.$echarts.init(document.getElementById("myChart4"));
      // myChart.setOption({
      //   tooltip: {},
      //   grid: {
      //     left: "15%", //设置canvas图距左的距离
      //     top: "20%",
      //     right: "15%",
      //     bottom: "20%"
      //   },
      //   xAxis: {
      //     name: "线路",
      //     type: "category",
      //     data: name,
      //     axisLabel: {
      //       show: true,
      //       interval: 0, //横轴信息全部显示
      //       textStyle: {
      //         color: "#fff"
      //       }
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: "#2454A9"
      //       }
      //     }
      //   },
      //   yAxis: {
      //     name: "温度",
      //     type: "value",
      //     axisLabel: {
      //       show: true,
      //       textStyle: {
      //         color: "#fff"
      //       }
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: "#2454A9"
      //       }
      //     }
      //   },
      //   series: [
      //     {
      //       data: value,
      //       type: "bar",
      //       barWidth: 13,
      //       itemStyle: {
      //         // 柱的颜色。
      //         normal: {
      //           label: {
      //             show: true, //开启显示
      //             position: "top", //在上方显示
      //             textStyle: {
      //               //数值样式
      //               color: "#fff",
      //               fontSize: 15
      //             }
      //           },
      //           barBorderRadius: [20, 20, 0, 0],
      //           // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //           //   {
      //           //     offset: 0,
      //           //     color: "#29ACE2"
      //           //   },
      //           //   {
      //           //     offset: 1,
      //           //     color: "#4527D5"
      //           //   }
      //           // ])
      //         }
      //       }
      //     }
      //   ]
      // });
      // myChart1.setOption({
      //   tooltip: {},
      //   grid: {
      //     left: "10%", //设置canvas图距左的距离
      //     top: "20%",
      //     right: "20%",
      //     bottom: "20%"
      //   },
      //   xAxis: {
      //     name: "线路",
      //     type: "category",
      //     data: name1,
      //     axisLabel: {
      //       show: true,
      //       interval: 0, //横轴信息全部显示
      //       textStyle: {
      //         color: "#fff"
      //       }
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: "#2454A9"
      //       }
      //     }
      //   },
      //   yAxis: {
      //     name: "功率",
      //     type: "value",
      //     axisLabel: {
      //       show: true,
      //       textStyle: {
      //         color: "#fff"
      //       }
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: "#2454A9"
      //       }
      //     }
      //   },
      //   series: [
      //     {
      //       data: value1,
      //       type: "bar",
      //       barWidth: 13,
      //       itemStyle: {
      //         // 柱的颜色。
      //         normal: {
      //           label: {
      //             show: true, //开启显示
      //             position: "top", //在上方显示
      //             textStyle: {
      //               //数值样式
      //               color: "#fff",
      //               fontSize: 15
      //             }
      //           },
      //           barBorderRadius: [20, 20, 0, 0],
      //           // color:function(params){
      //           //   if(params.value1)
      //           // }
      //         }
      //       }
      //     }
      //   ]
      // });
      // window.addEventListener("resize", () => {
      //   myChart1.resize();
      // });
      // window.addEventListener("resize", () => {
      //   myChart.resize();
      // });
      // 绘制图表，this.echarts1_option是数据
      myChart.setOption({
        series: [
          {
            name: "",
            type: "pie",
            radius: "45%",
            center: ["53%", "50%"],
            hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果
            data: arr1,
            label: {
              normal: {
                show: true,
                formatter: "{b}({c})"
              }
            },
            itemStyle:{
              normal:{
                label:{
                  textStyle:{
                    fontSize:11
                  }
                }
              }
            },
            labelLine: {
              //引导线样式
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                smooth: 0, //0-1，越大越平滑弯曲
                length: 10, //从块到文字的第一段长
                length2: 5 //拐弯到文字的段长
              }
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart1.setOption({
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "45%",
            center: ["45%", "50%"],
            hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果
            data: arr2,
            label: {
              normal: {
                show: true,
                formatter: "{b}({c})"
              }
            },
            itemStyle:{
              normal:{
                label:{
                  textStyle:{
                    fontSize:11
                  }
                }
              }
            },
            labelLine: {
              //引导线样式
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                smooth: 0, //0-1，越大越平滑弯曲
                length: 10, //从块到文字的第一段长
                length2: 5 //拐弯到文字的段长
              }
            }
          }
        ],
        tooltip: {
          formatter: "{b} : {c}" // 默认值null，内容格式器
        },
        legend: {
          y: "bottom",
          x: "center",
          data: ["陌生人", "在住人", "工作人员"]
        }
      });
      window.addEventListener("resize", () => {
        myChart1.resize();
      });
    }
  }
};
</script>
<style scoped>
.real-time {
  position: absolute;
  left: 0;
  top: 22px;
  width: 100%;
  height: 70%;
  margin-top: 5px;
  padding-left: 5px;
  display: flex;
  visibility: hidden;
}
.current {
  visibility: visible;
}
.real-time p {
  text-align: center;
  font-size: 6px;
}
.real-time-left {
  width: 50%;
  height: 100%;
}
.line {
  width: 0px;
  height: 40%;
  margin: 0 5px;
  margin-top: 25px;
  border-right: 0.5px solid #fff;
}
.real-time-right {
  width: 50%;
  height: 100%;
}
#myChart3 {
  width: 100%;
  height: 80%;
}
#myChart4 {
  width: 100%;
  height: 80%;
}
.line-rate-tip,
.line-rate-text,
.power-tip,
.power-text {
  width: 78%;
  height: 4.5px;
  border-radius: 0.5px;
  margin: 0 auto;
  display: flex;
}
.line-rate-text,
.power-text {
  position: relative;
  bottom: 3px;
}
.line-rate-tip div,
.line-rate-text div {
  width: 33.3%;
  text-align: right;
  font-size: 6px;
}
.power-tip div,
.power-text div {
  width: 50%;
  text-align: center;
  font-size: 5px;
}
.line-rate-tip div:nth-child(1),
.power-tip div:nth-child(1) {
  background: rgb(84, 231, 169);
}
.line-rate-tip div:nth-child(2) {
  background: rgb(235, 176, 82);
}
.line-rate-tip div:nth-child(3),
.power-tip div:nth-child(2) {
  background: #ed393a;
}
</style>