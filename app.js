// app.js
import { getWxUid, saveWxData } from "./service/service";
App({
  onLaunch() {
    if(wx.getStorageSync('userInfo')){// 如果缓存里面存有用户信息，就不需要去发请求获取用户信息了。
      return;
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        getWxUid({
          appid:"wx9e9eb5501bd654f6",
          code:res.code,
          secret:"af1aabeed5352b8fc523e28b2856fdb5",
        },function(res){
          console.log(res);
          if(res.data[0].data.length > 0){
            getApp().globalData.userInfo = res.data[0].data[0];
            wx.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo));// 把用户信息缓存到storage
            wx.setStorageSync('token', res.token); // 存储用户的token
          }
          if(res.data[0].data.length === 0 && res.data[0].id){ // 如果返回了openid并且没有用户信息返回，说明该微信用户没有在项目服务器存储，就需要调用存储接口，存储用户信息。
            wx.showModal({
              title:"提醒",
              content: "第一次使用微信小程序，需要获取用户信息登录",
              success(){
                wx.getUserProfile({ // 获取微信用户信息,必须需要提示用户点击，才能获取用户信息。
                  desc: "test",
                  success(data){
                    const { userInfo } = data;
                    console.log(userInfo);
                    saveWxData({
                      openid: res.data[0].id,
                      avatar: userInfo.avatarUrl,
                      gender: userInfo.gender,
                      country: userInfo.country,
                      nickName: userInfo.nickName
                    },function(res){ // 存储微信用户信息到项目服务器，第一保存用户信息到数据以后，需要手动把微信信息存储到storage和globalData
                      getApp().globalData.userInfo={
                        ...userInfo,
                        id: res.data[1].data.insertId
                      }
                      wx.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo));
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
    userInfo: wx.getStorageSync('userInfo')?JSON.parse(wx.getStorageSync('userInfo')):null,

  }
})
