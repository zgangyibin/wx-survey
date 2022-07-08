// pages/createServey/createServey.js
/** 问卷的数据结构
  data: { 
      title: "", // 问卷标题
      description:"", // 问卷描述
      question: [ // 问题列表
        { // text,number类问题的数据结构
          id: "", // 唯一id
          type: "text", // 问题类型
          title: "", // 问题名称
          placeholder: "", // 问题描述补充
          require: false, // 问题是否必填
        },
        { // checkbox,radio 类问题的结构
          id: "", // 唯一id
          type: "checkbox", // 问题类型
          title: "", // 问题名称
          placeholder: "", // 问题描述补充
          require: false, // 问题是否必填
          option: [
            {id:"",text:""}  
          ]
        }
      ]
    }
 */
import { createPSQ, updatePSQ, getPSQone, delPSQ } from "../../service/service";
const tool = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:"", // 判断是否从index界面进入该页面。
    id: "", // 问卷的id，根据id是否有值判断是创建问卷还是更新文件。
    title: "", // 问卷标题
    description:"", // 问卷描述
    endtime: tool.formatTime(new Date(),"date"), // 问卷结束时间
    question: [] ,// 问题列表
  },
  onLoad(option){ // option里面是给当前页面传递的参数
    console.log(option);
    // 根据option是否有参数来决定是更新数据还是新加数据
    // id可以判断是从my的页面进入，index有值则是从index界面进入。
    const { id, index } = option;
    if(index){
      this.setData({index});
    }
    if(id){
      getPSQone({id},(res)=>{
        const data = res.data[0].data[0];
        this.setData({
          id: data.id,
          title: data.title,
          description: data.description,
          endtime: tool.formatTime(new Date(data.endtime), "date"),
          question: JSON.parse(data.detail)
        })
      })
    }
  },
  changeTitle(e){ // 问卷title输入框输入值触发的函数
    this.setData({ // 修改data的数据
      title:e.detail.value, // 获取输入框的值并修改到title
    })
    console.log(this.data.serveyData);
  },
  changeDetail(e){
    this.setData({ // 修改data的数据
      description:e.detail.value // 获取输入框的值并修改到title
    })
  },
  changeValue(e){ // 接受子组件传的值,并修改对应的数据
    const { detail } = e;
    const { question } = this.data;
    for(let i=0;i<question.length;i++){
      if(question[i].id === detail.id){
        if(detail.type==="del"){ // 根据type判断数据的操作类型
          question.splice(i,1);
        } else if(detail.type==="copy"){ //复制一条同样的问题数据,复制同样数据的时候，主要复制的数据的id要重新生成唯一id；
          question.splice(i,0,JSON.parse(JSON.stringify({...question[i],id:tool.uuid()})));
        } else {
          question[i] = {...question[i],...detail};
        }
        this.setData({
          question: [...question]
        })
        break;
      }
    }
  },
  bindTimeChange(e){
    console.log(e);
    this.setData({
      endtime: e.detail.value
    })
  },
  handleDel(){// 删除问卷
    wx.showModal({ // 删除操作需要确认框
      title: '提示',
      content: '确定删除信息?',
      success: (res) => {
        console.log(res);
        if (res.confirm) {
          delPSQ({id:this.data.id},()=>{
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            });
            setTimeout(()=>{
              if(this.data.index){ // 如果index有值，则返回上一级路由，也就是index界面
                wx.navigateBack()
              } else { // 如果没有index则是从my页面进入，需要用switchTab方法跳转路由，触发my页面的onTabItemTap方法重新获取最新数据。
                const pages = getCurrentPages();// 返回当前页面栈，结构是一个数组
                let prePage = pages[pages.length - 2]; // 获取上一个页面对象
                prePage.init();// 触发my页面的init方法，更新数据
                wx.switchTab({
                  url: '/pages/my/my',
                  success(res){
                    console.log(res);
                  }
                })
              }
            },2000);
          })
        }
      }
    })
  },
  handleSave(){ // 保存问卷信息
    if(!this.data.id){ // 如果没有id，就是保存数据，调用create接口
      createPSQ({
        title: this.data.title, 
        description:this.data.description,
        detail: JSON.stringify(this.data.question),
        uid: getApp().globalData.userInfo.id,
        endtime: new Date(this.data.endtime),
      },(res)=>{ // 箭头函数的this指向的上层的this
        this.setData({id: res.data[0].data.insertId})
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      })
    } else{
      updatePSQ({
        id: this.data.id,
        title: this.data.title, 
        description:this.data.description,
        detail: JSON.stringify(this.data.question),
        uid: getApp().globalData.userInfo.id,
        endtime: new Date(this.data.endtime),
      },(res)=>{ // 箭头函数的this指向的上层的this
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      })
    }
  },
  handlePreview(){ // 预览
    wx.navigateTo({
      url: '/pages/preview/preview?id='+this.data.id,
    })
  }
})