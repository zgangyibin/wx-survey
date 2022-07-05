// app.js
import { getWxUid,saveWxData } from "./service/service"
App({
  onLaunch() {
    // 本地存储
    if(wx.getStorageSync('userInfo')){//判断缓存里信息有无，有就不需要登录了
        return ;
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
        getWxUid({
            appid:"wx9e9eb5501bd654f6",
            code:res.code,
            secret:"af1aabeed5352b8fc523e28b2856fdb5",
        },function(res){
            console.log(res)
            if(res.data[0].data.length > 0){
                getApp().globalData.userInfo = res.data[0].data[0];
                wx.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo))//用户信息缓存到storage
                wx.setStorageSync('token', res.token)//token缓存到storage

            } 
            if(res.data[0].data.length === 0 && res.data[0].id){
                 // 如果返回了openid并且没有返回用户信息，说明用户没有在项目服务器存储，需要调用存储接口存储用户信息
                 wx.showModal({
                   title:"提醒",
                   content:"第一次使用小程序需要获取用户信息登录",
                   success(){
                    wx.getUserProfile({//获取微信用户信息,必须需要提示用户点击才能获取用户信息
                        desc: 'test',//声明获取用户个人信息后的用途，不超过30个字符
                        success(data){
                            const {userInfo} = data;
                            saveWxData({
                                openid:res.data[0].id,
                                avatar:userInfo.avatarUrl,
                                gender:userInfo.gender,
                                country:userInfo.country,
                                nickName:userInfo.nickName
                            },function(res){//存储用户信息到项目服务器,第一次保存用户信息到数据库以后，需要手动把信息存到storage和globalData里
                                getApp().globalData.userInfo={
                                    ...userInfo,
                                    id:res.data[1].data.insertId
                                }
                                wx.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo))
                            })
                        },fail(fail){
                            wx.showToast({
                                title: "获取用户信息失败",
                                icon: 'error',
                                duration: 2000
                              })
                        }
                    })
                   }
                 })
            }
        })
      }
    })
  },
  globalData: {
    userInfo: wx.getStorageSync('userInfo')?JSON.stringify(wx.getStorageSync('userInfo')):null,
  }
})
