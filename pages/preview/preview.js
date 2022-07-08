// pages/preview/preview.js
import {
  getPSQone,
  createPSQ_detail,
  get_PSQ_detail_byuid,
  update_PSQ_detail
} from "../../service/service";
const tool = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    byuserid: "", // 创建问卷用户的id
    askDataId: "", // 填写的文件数据的id
    id: "", // 问卷的id，根据id是否有值判断是创建问卷还是更新文件。
    title: "", // 问卷标题
    description:"", // 问卷描述
    endtime: tool.formatTime(new Date(),"date"), // 问卷结束时间
    question: [] ,// 问题列表
    askData:[] //  用户填写问卷的数据结构,和question是类似，只是有些小改动
  },
  onLoad(option){ // option里面是给当前页面传递的参数
    // 根据option是否有参数来决定是更新数据还是新加数据
    // id可以判断是从my的页面进入，index有值则是从index界面进入。
    const { id } = option;
    if(id){
      getPSQone({id},(res)=>{
        const data = res.data[0].data[0];
        this.setData({
          id: data.id,
          byuserid: data.uid,
          title: data.title,
          description: data.description,
          endtime: tool.formatTime(new Date(data.endtime), "date"),
          question: JSON.parse(data.detail)
        });
        get_PSQ_detail_byuid({ // 请求完创建的问卷信息再去请求用户填写的问卷信息
          psqid: id,
          uid: getApp().globalData.userInfo.id
        },(res)=>{
          let ask = res.data[0].data;
          console.log(ask);
          if(ask.length > 0){ 
            this.setData({ // 把问创建的问题数据赋值给askData
              askDataId: ask[0].id,
              askData: JSON.parse(ask[0].detail)
            })
          } else { // 如果没有保存过填写信息，则需要把文件的数据赋值给askData
            this.setData({ // 把问创建的问题数据赋值给askData
              askData: JSON.parse(data.detail)
            })
          }
        })
      })
    }
  },
  changeValue(e){ // 接受子组件传的值,并修改对应的数据
    const { detail } = e;
    const { askData } = this.data;
    for(let i=0;i<askData.length;i++){
      if(askData[i].id === detail.id){
        if(detail.optionId){ // 如果子组件传递的数据有optionId则是单选或者多选,optionId是一个数组
          for(let j=0;j<askData[i].option.length;j++){
            // 先把option里面的checked设置为false
            askData[i].option[j].checked=false;
          }
          detail.optionId.forEach((item)=>{ // 遍历optionId里面的每一个id，如果该id在option里面找到，这个设置为true表示选中。
            for(let j=0;j<askData[i].option.length;j++){
              if(askData[i].option[j].id === item){
                askData[i].option[j].checked=true;
                break;
              }
            }
          })
          
        } else {
          askData[i] = {...askData[i],...detail};
          this.setData({
            askData: [...askData]
          })
        }
        break;
      }
    }
  },
  handleSave(){ // 保存用户填写问卷信息
    const { askData } = this.data;
    for(let i=0;i<askData.length;i++){ // 校验数据是否满足必填
      let item = askData[i];
      if(item.require && ["text","number"].indexOf(item.type)>-1 && !item.value){
        return wx.showToast({
          title: `请填写'${item.title}'`,
          icon: 'error',
          duration: 2000
        })
      } else if(item.require && ["checkbox","radio"].indexOf(item.type)>-1){ // 单选或者多选必填判断
        let ok = false;
        for(let j=0;j<item.option.length;j++){
          if(item.option[j].checked) { // 如果是有一个选中的，则表示有填写的，如果所有checke为false则没有填写。
            ok=true;
            break;
          }
        }
        if(!ok){
          return wx.showToast({
            title: `请填写'${item.title}'`,
            icon: 'error',
            duration: 2000
          })
        }
      }
    }
    if(this.data.askDataId){ // 更新用户填写问卷信息
      update_PSQ_detail({
        id: this.data.askDataId,
        detail: JSON.stringify(this.data.askData)
      },()=>{
        return wx.showToast({
          title: "更新成功",
          icon: 'success',
          duration: 2000
        })
      })
    } else { // 没有askDataId则是创建用户填写信息
      createPSQ_detail({
        pqsid: this.data.id,
        byuserid: this.data.byuserid,
        detail: JSON.stringify(this.data.askData),
        uid: getApp().globalData.userInfo.id,
      },(res)=>{
        this.data.askDataId = res.data[0].result.insertId;
        return wx.showToast({
          title: "提交成功",
          icon: 'success',
          duration: 2000
        })
      })
    }
  },
  onShareAppMessage(){
    return {
      title: this.data.title+"问卷填写",
      path: "/pages/preview/preview"
    }
  }
})