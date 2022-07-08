export default function Request(url,data,callback,method="get",errback=()=>{}){
  wx.showLoading({
    mask: true,
    title: '加载中',
  })
  
  setTimeout(function () {
    wx.hideLoading()
  }, 30*1000)
  return new Promise(function(resove,reject){
    wx.request({
      url,
      header:{
        Authoraization: wx.getStorageSync('token')
      },
      data,
      method,
      success(res){ // 请求成功
        const { data } = res;
        if(data.success){
          resove(data);
        } else {
          reject(data);
        }
      },
      fail(err){
        reject(err);
      },
      complete(){
        wx.hideLoading()
      }
    })
  })
  .then(callback)
  .catch(err=>{
    wx.showToast({
      title: err.message,
      icon: 'error',
      duration: 2000
    })
    errback(err)
  })
}