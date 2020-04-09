
      
      let time = []
      let time1 = []
      let realTime = []
      let newArr = []
      let dataArr = []
      let orderArr = []
      let houseArr = []

      let date = new Date();
      let date1 = new Date(new Date().getTime() - (3600*24*1000))
      let date2 = new Date(new Date().getTime() - (3600*24*1000*2))
      let date3 = new Date(new Date().getTime() - (3600*24*1000*3))
      let date4 = new Date(new Date().getTime() - (3600*24*1000*4))
      let date5 = new Date(new Date().getTime() - (3600*24*1000*5))
      let date6 = new Date(new Date().getTime() - (3600*24*1000*6))

      let year = date.getFullYear();
      let year1 = date.getFullYear();
      let year2 = date.getFullYear();
      let year3 = date.getFullYear();
      let year4 = date.getFullYear();
      let year5 = date.getFullYear();
      let year6 = date.getFullYear();

      let month = (date.getMonth() + 1) < 10 ? ('0'+ (date.getMonth() + 1)) : (date.getMonth() + 1);
      let month1 = (date1.getMonth() + 1) < 10 ? ('0'+ (date1.getMonth() + 1)) : (date1.getMonth() + 1);
      let month2 = (date2.getMonth() + 1) < 10 ? ('0'+ (date2.getMonth() + 1)) : (date2.getMonth() + 1);
      let month3 = (date3.getMonth() + 1) < 10 ? ('0'+ (date3.getMonth() + 1)) : (date3.getMonth() + 1);
      let month4 = (date4.getMonth() + 1) < 10 ? ('0'+ (date4.getMonth() + 1)) : (date4.getMonth() + 1);
      let month5 = (date5.getMonth() + 1) < 10 ? ('0'+ (date5.getMonth() + 1)) : (date5.getMonth() + 1);
      let month6 = (date6.getMonth() + 1) < 10 ? ('0'+ (date6.getMonth() + 1)) : (date6.getMonth() + 1);

      let day = date.getDate() < 10 ? ('0'+ date.getDate()) : date.getDate();
      let day1 = date1.getDate() < 10 ? ('0'+ date1.getDate()) : date1.getDate();
      let day2 = date2.getDate() < 10 ? ('0'+ date2.getDate()) : date2.getDate();
      let day3 = date3.getDate() < 10 ? ('0'+ date3.getDate()) : date3.getDate();
      let day4 = date4.getDate() < 10 ? ('0'+ date4.getDate()) : date4.getDate();
      let day5 = date5.getDate() < 10 ? ('0'+ date5.getDate()) : date5.getDate();
      let day6 = date6.getDate() < 10 ? ('0'+ date6.getDate()) : date6.getDate();

      let today = month + '/' + day
      let today1 = month1 + '/' + day1
      let today2 = month2 + '/' + day2
      let today3 = month3 + '/' + day3
      let today4 = month4 + '/' + day4
      let today5 = month5 + '/' + day5
      let today6 = month6 + '/' + day6

      let newToday = year + '-' + month + '-' + day + ' ' + '00:00:00'
      let newToday1 = year1 + '-' + month1 + '-' + day1 + ' ' + '00:00:00'
      let newToday2 = year2 + '-' + month2 + '-' + day2 + ' ' + '00:00:00'
      let newToday3 = year3 + '-' + month3 + '-' + day3 + ' ' + '00:00:00'
      let newToday4 = year4 + '-' + month4 + '-' + day4 + ' ' + '00:00:00'
      let newToday5 = year5 + '-' + month5 + '-' + day5 + ' ' + '00:00:00'
      let newToday6 = year6 + '-' + month6 + '-' + day6 + ' ' + '00:00:00'

      let orderDate = year + '-' + month + '-' + day
      let orderDate1 = year1 + '-' + month1 + '-' + day1
      let orderDate2 = year2 + '-' + month2 + '-' + day2
      let orderDate3 = year3 + '-' + month3 + '-' + day3
      let orderDate4 = year4 + '-' + month4 + '-' + day4
      let orderDate5 = year5 + '-' + month5 + '-' + day5
      let orderDate6 = year6 + '-' + month6 + '-' + day6

      time = [today6,today5,today4,today3,today2,today1,'今天'];
      time1 = [today3,today2,today1]
      realTime = [today6,today5,today4,today3,today2,today1,today]
      houseArr = [
        {date:newToday3,homes:[],power:['0','0','0']},
        {date:newToday2,homes:[],power:['0','0','0']},
        {date:newToday1,homes:[],power:['0','0','0']}
      ]
      dataArr = [
        {totalPower:'0',date:newToday6},
        {totalPower:'0',date:newToday5},
        {totalPower:'0',date:newToday4},
        {totalPower:'0',date:newToday3},
        {totalPower:'0',date:newToday2},
        {totalPower:'0',date:newToday1},
        {totalPower:'0',date:newToday}
      ]
      orderArr = [
        {count:'0',datex:orderDate6},
        {count:'0',datex:orderDate5},
        {count:'0',datex:orderDate4},
        {count:'0',datex:orderDate3},
        {count:'0',datex:orderDate2},
        {count:'0',datex:orderDate1},
        {count:'0',datex:orderDate}
      ]
      newArr = [time,realTime,dataArr,orderArr,time1,houseArr]

export default newArr