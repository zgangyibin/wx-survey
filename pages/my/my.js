// pages/my/my.js
import { getPSQList } from "../../service/service";
const tool = require("../../utils/util");
Page({
  data: {
    dataList: []
  },
  onLoad() {
    this.init();
  },
  onTabItemTap(){ // 微信小程序的tab页面切换，不会销毁当前页面，不会触发onLoad时间。onTabItemTap可以监听tab页面切换。
    this.init();
  },
  init(){
    getPSQList({ // 请求我创建的文件列表
      uid:getApp().globalData.userInfo.id,
      page:1
    },(res) => {
      const {data} = res.data[0];
      data.forEach((item)=>{
        item.createtime=tool.formatTime(new Date(item.createtime),"date");
        item.endtime=tool.formatTime(new Date(item.endtime),"date");
        item.end= new Date().getTime() - new Date(item.endtime).getTime() > 0; // 用当前时间的时间戳减去结束时间的时间戳，如果大于0则问卷时间结束。
      })
      this.setData({
        dataList: res.data[0].data
      })
    })
  }
})