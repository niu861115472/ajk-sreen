<template>
  <div class="center-photo" v-show="show">
    <p>有客人来访,请及时开门！</p>
    <div class="photo-box">
      <img :src="img" alt />
    </div>
    <div class="box">
      <div class="open-btn" @click="openDoor()">{{door}}</div>
      <div class="close-btn" @click="closeBox()">关闭</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      path: "ws://demo.live-ctrl.com/snbface/ws/snb",
      socket: "",
      img: "",
      houseId: "",
      door:'开门',
      show: false
    };
  },
  mounted() {
    // this.init();
  },
  methods: {
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onsend = this.send;
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open: function() {
      this.send();
      console.log("socket连接成功");
    },
    error: function() {
      console.log("连接错误");
    },
    getMessage: function(msg) {
      console.log(JSON.parse(msg.data));
      if (msg.data) {
        let obj = JSON.parse(msg.data);
        this.show = true;
        this.img = `data:image/jpeg;base64,${obj.data}`;
        this.houseId = obj.houseId;
      }
    },
    send: function() {
      const hotelId = '907003670336145664';
      this.socket.send(hotelId);
    },
    close: function() {
      console.log("socket已经关闭");
      this.send();
    },
    openDoor() {
      this.$api
        .postOpenDoor({
          houseId: this.houseId
        })
        .then(res => {
          if (res.errno == 'OK') {
            this.door = '已开';
          }
        });
    },
    closeBox(){
      this.show = false
    }
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close;
  }
};
</script>
<style scoped>
.center-photo {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 180px;
  height: 180px;
  background: rgba(45, 15, 218, 0.7);
  border-radius: 8px;
}
.center-photo p {
  font-size: 8px;
  color: rgb(206, 240, 15);
  margin: 10px 10px 10px 25px;
}
.photo-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 120px;
  height: 120px;
  border: 1px solid #ffffff;
  border-radius: 5px;
}
.photo-box img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.open-btn,
.close-btn{
  position: absolute;
  left: 25%;
  bottom: 10px;
  font-size: 6px;
  width: 30px;
  height: 12px;
  line-height: 12px;
  border: 1px solid #18067a;
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
  background: #18067a;
}
.close-btn{
  left: 60%;
}
</style>