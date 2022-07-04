// pages/createSurvey/createSurvey.js
/*问卷数据结构  
 surveyData:{//问卷的数据结构
            title:"",//问卷标题
            discription:"",//问卷描述
            question:[//问题列表
                {    //填空，数字
                    id:"",//唯一id
                    type:"text",//问题类型
                    title:"",//问题名称
                    placeholder:"",//问题描述补充
                    require:false,//是否必填
                },
                {   //多选，单选
                    id:"",//唯一id
                    type:"checkbox",//问题类型
                    title:"",//问题名称
                    placeholder:"",//问题描述补充
                    require:false,//是否必填
                    option:[
                        {
                            id:"",
                            text:""
                        }
                    ]
                },
            ],
        }
*/
import { createPSQ } from "../../service/service"
const tool = require("../../utils/util")
Page({
    data: {
        title:"",//问卷标题
        discription:"",//问卷描述
        endtime:tool.formatTime(new Date(),"date"),//问卷结束时间
        question:[],//问题列表
    },
    changeTitle(e){//问卷title输入框输入值触发的函数
        console.log(e)
        this.setData({//修改data的数据
            title:e.detail.value//获取输入框的值，并修改到title
        })
    },
    changeDetail(e){
        console.log(e)
        this.setData({//修改data的数据
            discription:e.detail.value//获取输入框的值，并修改到discription
        })
    },
    changeValue(e){//接收子组件的值,并修改对应的数据
        const {detail} = e;
        const {question}=this.data;
        for(let i = 0;i < question.length;i++){
            if(question[i].id == detail.id){
                if(detail.type == "del"){//根据type判断操作类型
                    question.splice(i,1);
                }else if(detail.type == "copy"){//复制问题,复制同样数据的时候id要重新生成唯一id
                    question.splice(i,0,JSON.parse(JSON.stringify({...question[i],id:tool.uuid()})))
                }
                else {
                    question[i] = {...question[i],...detail};
                }        
                this.setData({
                    question:[...question]
                })
                break;
            }
        }
    },
    bindTimeChange(e){
        console.log(e)
        this.setData({
            endtime:e.detail.value
        })
    },
    handleSave(){
        //保存问卷
        createPSQ({
            title:this.data.title,
            discription:this.data.discription,
            detail:JSON.stringify(this.data.question),
            uid:getApp().globalData.userInfo.id,
            endtime:new Date(this.data.endtime)
        },function(res){
            wx.showToast({
              title: '保存成功',
              icon:'success',
              duration:2000
            })
        })
    }
})