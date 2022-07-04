export default function Request(url,data,callback,method="get",errback=()=>{}) {
    return new Promise(function(resove,reject){
        wx.request({
            url,
            header:{
                Authoraization:wx.getStorageSync('token')
            },
            data,
            method,
            success(res){
                //请求成功
                const{ data } = res;
                resove(data);
                if(data.success){
                    resove(data);
                }
                else {
                    reject(data);
                }
            },
            fail(err){
              //请求失败
              reject(err);
            }
        })
    })
    .then(callback)
    .catch((err)=>{
        wx.showToast({
            title: err.message,
            icon: 'error',
            duration: 2000
          })
        errback();
    })
   
}