<template>
  <div class="hello">
    <div class="name">{{name}}运维图</div>
    <div class="time">{{date}}</div>
    <div class="manager time" @click="backStage()">后台管理</div>
    <div class="box">
      <Left></Left>
      <Middle></Middle>
      <Right></Right>
    </div>
    <upload-photo></upload-photo>
  </div>
</template>

<script>
import Middle from "./middle";
import Left from "./left";
import Right from "./right";
import utils from './utils'
import UploadPhoto from './uploadPhoto'

export default {
  components: {
    Middle,
    Left,
    Right,
    UploadPhoto
  },
  data() {
    return {
      date: "",
      name:'',
    };
  },
  created() {
    let sign = utils.getUrlKey('sign');
    sessionStorage.setItem('sign',sign);
    this.getHotelBySign()
    console.log(sign)
  },
  mounted() {
    setInterval(() => {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var second = date.getSeconds();
      var minutes = date.getMinutes();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 0 && day <= 9) {
        day = "0" + day;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      this.date =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        second;
    }, 1000);
  },
  methods: {
    backStage(){
      window.location.href = 'http://www.live-ctrl.com/aijukex/tenement/mainPage'
    },
    //根据标识获取酒店信息
    getHotelBySign(){
      this.$api.getHotelBySign({
        sign:sessionStorage.getItem('sign')
      })
      .then(res =>{
        if(res.success){
          this.name = res.dataObject.name
        }     
      })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.hello {
  width: 100%;
  position: relative;
  color: #fff;
  background-image: url(../assets/images/bg.png);
  background-size: 100% 100%;
}
.name {
  width: 100%;
  height: 30px;
  padding-top: 10px;
  color: #fff;
  font-size: 13px;
  text-align: center;
  background-image: url(../assets/images/top.png);
  background-size: 100% 100%;
}
.time {
  position: absolute;
  font-size: 6px;
  top: 5px;
  right: 30px;
  color: #459ad9;
}
.manager {
  top: 2px;
  right: 200px;
  border-radius: 2px;
  padding: 3px 6px;
  background: -webkit-linear-gradient(#153aaa, #112779);
}
.manager:hover{
  cursor: pointer;
}
.box {
  display: flex;
  width: 100%;
  position: relative;
  top: -15px;
}
</style>