// pages/questionType/questionType.js
const tool = require("../../utils/util")
Page({
    data: {
        datalist:[//用数据驱动列表类的ui显示
            {
                type:"text",
                icon:"text",
                text:"填空"
            },
            {
                type:"number",
                icon:"number",
                text:"数字"
            },
            {
                type:"radio",
                icon:"radio",
                text:"单选"
            },
            {
                type:"checkbox",
                icon:"checkbox",
                text:"多选"
            },
            {
                type:"judge",
                icon:"judge",
                text:"判断"
            },
        ]
    },
    selectType(e){
        const {type} = e.currentTarget.dataset;//获取自定义数据
        //获取上一个页面的对象
        const pages = getCurrentPages()//返回当前页面栈，结构是一个数组
        let prePage = pages[pages.length-2];//获取上一个页面对象
        let questionData = {};
        if(["text","number"].indexOf(type)>-1){
            questionData = {
                id:tool.uuid(),//唯一id
                type:type,//问题类型
                title:"",//问题名称
                placeholder:"",//问题描述补充
                require:false,//是否必填
            }
        }
        else if(["checkbox","radio"].indexOf(type)>-1){
            questionData = {
                id:tool.uuid(),//唯一id
                type:type,//问题类型
                title:"",//问题名称
                placeholder:"",//问题描述补充
                require:false,//是否必填
                option:[]
            }
        }
        // prePage.data.surveyData.question.push(questionData);//把createSurvey页面的surveyData数据的option追加一个问题数据结构
        prePage.setData({//修改上一个页面的data数据
            question:{
                ...prePage.data.question,
                questionData
            }
        })
        wx.navigateBack();//返回上一级页面
    }
})