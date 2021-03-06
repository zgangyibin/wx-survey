// pages/questionType/questionType.js
const tool = require("../../utils/util");
Page({
  data: {
    dataList:[ // 用数据驱动列表类的ui显示
      {
        type: "text",
        icon: "text",
        title: "填空"
      },
      {
        type: "number",
        icon: "number",
        title: "数字"
      },
      {
        type: "radio",
        icon: "radio",
        title: "单选"
      },
      {
        type: "checkbox",
        icon: "checkbox",
        title: "多选"
      },
      {
        type: "judge",
        icon: "judge",
        title: "判断"
      }
    ]
  },
  selectType(e){
    // 小程序方法在wxml文件里面不能传参，如果要传参，只能通过data-自定义数据的方式获取。
    // e 是当前点击元素对象
    const { type } = e.currentTarget.dataset;// 获取自定义数据
    // 获取上一个页面的对象
    const pages = getCurrentPages();// 返回当前页面栈，结构是一个数组
    let prePage = pages[pages.length - 2]; // 获取上一个页面对象
    let questionData = {};
    if(["text","number"].indexOf(type) > -1){
      questionData =  {
        id: tool.uuid(), // 唯一id
        type, // 问题类型
        title: "", // 问题名称
        placeholder: "", // 问题描述补充
        require: false, // 问题是否必填
      }
    } else if(["checkbox","radio"].indexOf(type) > -1) {
        questionData = {
          id: tool.uuid(), // 唯一id
          type, // 问题类型
          title: "", // 问题名称
          placeholder: "", // 问题描述补充
          require: false, // 问题是否必填
          option: []
      }
    }
    prePage.setData({ // 修改上一个页面的data数据
      question: [
        ...prePage.data.question,
        questionData
      ]
    })
    wx.navigateBack()// 返回上一级页面
  }
})