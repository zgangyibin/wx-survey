// pages/createSurvey/createSurvey.js
/*问卷数据结构  
 surveyData:{//问卷的数据结构
            title:"",//问卷标题
            description:"",//问卷描述
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
import { createPSQ, updatePSQ,getPSQone,delPSQ } from "../../service/service"
const tool = require("../../utils/util")
Page({
    data: {
        index:"",//判断是否从index界面进入
        id:"",//文件的id,根据id是否有值判断为创建问卷或更新问卷
        title:"",//问卷标题
        description:"",//问卷描述
        endtime:tool.formatTime(new Date(),"date"),//问卷结束时间
        question:[],//问题列表
    },
    onLoad(option){//option 是给当前页面传递的参数
        // 根据option是否有id判断更新还是新加
        const {id,index} = option;
        if(index){
            this.setData({index})
        }
        if(id){
            getPSQone({id},(res)=>{
                const data = res.data[0].data[0];
                this.setData({
                   id:data.id,
                   title:data.title,
                   description:data.description,
                   endtime:tool.formatTime(new Date(data.endtime),"date"),
                   question:JSON.stringify(data.detail),

                })
            })
        }
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
            description:e.detail.value//获取输入框的值，并修改到description
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
    handleDel(){//删除问题
        wx.showModal({//确认框
            title: '提示',
            content: '确定删除信息？',
            success: (res)=> {
              if (res.confirm) {
                delPSQ({id:this.data.id},()=>{
                    wx.showToast({
                        title: '删除成功',
                        icon:'success',
                        duration:2000
                        })
                       setTimeout(()=>{
                           if(this.data.index){
                               wx.navigateBack()
                           }else {
                                wx.switchTab({
                                    url:"/pages/my/my"
                                })                           
                            }
                       },2000)
                    })
              } 
            }
          })
    },
    handleSave(){
        if(!this.data.id){
            //保存问卷
            createPSQ({
                title:this.data.title,
                description:this.data.description,
                detail:JSON.stringify(this.data.question),
                uid:getApp().globalData.userInfo.id,
                endtime:new Date(this.data.endtime)
            },(res)=>{//箭头函数的this指向的上一层的this
                this.setData({id:res.data[0].data.insertId})
                wx.showToast({
                title: '保存成功',
                icon:'success',
                duration:2000
                })
            })
        }
        else {
              //更新问卷
            updatePSQ({
                id:this.data.id,
                title:this.data.title,
                description:this.data.description,
                detail:JSON.stringify(this.data.question),
                uid:getApp().globalData.userInfo.id,
                endtime:new Date(this.data.endtime)
            },(res)=>{//箭头函数的this指向的上一层的this
                wx.showToast({
                title: '保存成功',
                icon:'success',
                duration:2000
                })
            })
            }
     
    }
})