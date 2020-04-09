<template>
    <div class="middle">
        <p class="title">今日访客数量</p>
        <div class="num">
            <ul>
                <li>{{customerNum[0]}}</li>
                <li>{{customerNum[1]}}</li>
                <li>{{customerNum[2]}}</li>
                <li>{{customerNum[3]}}</li>
                <li>{{customerNum[4]}}</li>
                <li>{{customerNum[5]}}</li>
                <li>{{customerNum[6]}}</li>
                <li>{{customerNum[7]}}</li>
                <li>{{customerNum[8]}}</li>
            </ul>
        </div>
        <div class="status">
            <span></span>
            <p>主机离线或设备异常</p>
            <span></span>
            <p>主机在线且设备正常</p>
        </div>
        <div class="list">
            <ul>
                <li v-for="(item,index) in list" :key="index" :class="{'current':item.hostStatus == '主机离线'}">
                    <p>{{item.name}}</p>
                    <!-- <p style="color:#db161d;fontWeight:550">{{item.msg}}</p> -->
                    <p>{{item.hostStatus.replace(/－/g,'')}}</p>
                </li>
            </ul>
        </div>
        <div class="fire-control">
            <!-- <img src="../assets/images/微信图片_20191120093425.png" alt=""> -->
        </div>
        <div v-if="show" class="loading">
            <img src="../assets/images/loading.gif" alt="">
        </div>
    </div>
</template>
<script>
import Bus from './eventBus'
import spArray from './resetArr'
export default {
    data() {
        return {
            show:true,
            customerNum:[],
            list:[],
            msgList:[]
        }
    },
    mounted() {
        this.getHotelId()
        var self = this;
        Bus.$on('sendMsg',function(msg){
            let str = msg
            str = str.padStart(9,'0');
            self.customerNum = str.split('')
        })
    },
    methods: {
        getHotelId(){
            let self = this
            Bus.$on('sendId',function (id){
                self.getHotelHouses(id)
            })
        },
        //获取客房消息
        getHotelMsgs(arr){
            this.$api.getHotelMsgs({
                hotelId:sessionStorage.getItem('hotelId'),
                status:0
            }).then(res=>{
                this.msgList = res.dataObject
                // sessionStorage.setItem('deviceId',res.dataObject[0].deviceId)
                arr.forEach(item =>{
                    item.msg = ''
                    this.msgList.forEach(val =>{
                        if(item.name == val.name){
                            item.msg = val.content
                        }
                    })
                })
            })
        },
        getHotelHouses(id){
            this.$api.getHotelHouses({
                hotelId:id
            }).then(res=>{
                if(res.success){
                    let arr = res.dataObject
                    this.getHotelMsgs(arr)
                    var spArray = function(N,Q) {
                        var R = [],F;
                        for (F = 0;F < Q.length;) {
                            R.push(Q.slice(F,F += N))
                        }
                        return R
                    }
                    let newArr = spArray(10,arr)
                    let index = newArr.length
                    let num = 0
                    setInterval(() => {
                        num ++;
                        if(num  == index) num = 0;
                        this.show = false
                        this.list = newArr[num]
                    }, 5000);
                }
            })
        },
        
    },
}
</script>
<style scoped>
    .middle{
      width: 50%;
      /* border: 1px solid; no */
    }
    .title{
        font-size: 8px;
        margin-left: 20px;
        margin-top: 10px;
    }
    .num ul{
        display: flex;
        margin-top: 15px;
        margin-left: 20px;
    }
    .num ul li{
        width: 26px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 15px;
        margin-left: 3px;
    }
    .num ul li:nth-of-type(1),
    .num ul li:nth-of-type(4),
    .num ul li:nth-of-type(7){
        background-image: url(../assets/images/fa1.png);
        background-size: 100% 100%
    }
    .num ul li:nth-of-type(2),
    .num ul li:nth-of-type(5),
    .num ul li:nth-of-type(8){
        background-image: url(../assets/images/fa2.png);
        background-size: 100% 100%
    }
    .num ul li:nth-of-type(3),
    .num ul li:nth-of-type(6),
    .num ul li:nth-of-type(9){
        background-image: url(../assets/images/fa3.png);
        background-size: 100% 100%
    }
    .status{
        margin-left: 35px;
        margin-top: 15px;
    }
    .status span,.status p{
        display: inline-block;
        font-size: 6px
    }
    .status p{
        margin-left: 5px;
    }
    .status span:nth-of-type(1){
        width: 12px;
        height: 4.5px;
        background: #E30B14;
        border-radius: 3px; /*no*/
        /* border: 1px solid; */
    }
    .status span:nth-of-type(2){
        width: 12px;
        height: 4.5px;
        margin-left: 20px;
        background: #2E69CA;
        border-radius: 3px; /*no*/
    }
    .list{
        margin: 12px auto;
        padding: 0 20px;

    }
    .list ul{
        display: flex;
        flex-wrap: wrap
    }
    .list ul li{
        width: 45px;
        height: 50px;
        text-align: center;
        margin: 8px;
        background-image: url(../assets/images/blue.png);
        background-size: 100% 100%;
    }
    .list ul li.current{
        width: 45px;
        height: 50px;
        text-align: center;
        margin: 8px;
        background-image: url(../assets/images/red.png);
        background-size: 100% 100%;
    }
    .list ul li p:nth-of-type(1){
        font-size: 8px;
        margin-top: 12px;
    }
    .list ul li p:nth-of-type(2){
        width: 30px;
        font-size: 6px;
        margin: 3px auto
    }
    .list ul li p:nth-of-type(3){
        font-size: 5px;
    }
    .loading{
        width: 35px;
        height: 35px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    .loading img{
        width: 100%;
        height: 100%;
    }
    .fire-control{
        width: 43%;
        height: 120px;
        position: absolute;
        bottom: 4%;
        left: 28%;
        background-image: url(../assets/images/20191120093425.png);
        background-size: 100% 100%;
    }
    /* .fire-control img{
        width: 100%;
        height: 100%;
    } */
</style>
