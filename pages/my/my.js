// pages/my/my.js
import { getPSQList } from "../../service/service"
const tool=require("../../utils/util")
Page({
    data: {
        dataList:"",
    },
    // 页面加载
    onLoad(){
        
    },
    // 监听tab页面切换
    onTabItemTap(){//微信小程序的tab页面切换,不会销毁当前页面，不会触发onLoad
        getPSQList({
            uid:getApp().globalData.userInfo.id,
            page:1
        },(res)=>{
            const {data} =res.data[0];
            data.forEach((item)=>{
                item.createtime = tool.formatTime(new Date(item.createtime),"date");
                item.endtime = tool.formatTime(new Date(item.endtime),"date");
                item.end = new Date().getTime() - new Date(item.endtime).getTime() > 0;
            })
            this.setData({
                dataList:res.data[0].data
            })
        })
    }
})