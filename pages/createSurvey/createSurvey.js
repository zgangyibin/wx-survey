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
Page({
    data: {

        title:"",//问卷标题
        discription:"",//问卷描述
        question:[],
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
                question[i] = {...question[i],...detail};
                this.setData({
                    question:[...question]
                })
                break;
            }
        }
        console.log(question)
    }
})