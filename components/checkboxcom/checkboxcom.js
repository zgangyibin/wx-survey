// components/checkboxcom/checkboxcom.js
const tool = require("../../utils/util");
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        questionData:{//自定义data属性，组件给该属性传值
            type:Object,
            value:{},
       }
    },
    externalClasses:["icondel","iconcopy","iconadd","iconremove"],//组件不能使用全局样式，要继承父组件样式，用externalClasses
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        commonTrigger(data,id){
            this.triggerEvent("change",{...data,id:this.data.questionData.id})//子组件通过触发change事件，传值给父组件
        },
        changeInput(e){
            this.commonTrigger({title:e.detail.value})
        },
        changePlaceholder(e){
            this.commonTrigger({placeholder:e.detail.value})
        },
        handleChange(e){
            this.commonTrigger({require:e.detail.value.length>0})
        },
        addOption(){ // 添加一个选项
            let { option } = this.data.questionData;
            console.log(option);
            this.commonTrigger({
              option:[
                ...option,
                {id: tool.uuid(),text: ""}
              ]
            });
        },
        delOption(e){//删除选项
            const {id} = e.currentTarget.dataset;//获取自定义属性
            let { option } = this.data.questionData;
            for(let i = 0;i <option.length;i++){
                if(option[i].id === id){
                    option.splice(i,1);
                    this.commonTrigger({
                        option:[
                          ...option
                        ]
                      });
                    break;
                }
            }
            console.log(e)
        },
        changeOption(e){
            //修改选项文本内容
            const {id} = e.currentTarget.dataset;//获取自定义属性
            let { option } = this.data.questionData;
            for(let i = 0;i <option.length;i++){
                if(option[i].id === id){
                    option[i].text = e.detail.value;
                    this.commonTrigger({
                        option:[
                          ...option,
                        ]
                      });
                    break;
                }
            }
            console.log(e)
        },
        delQuestion(){//删除问题
            this.commonTrigger({
               type :"del"
            });
        },
        copyQuestion(){//复制一个问题
            this.commonTrigger({
                type :"copy"
            });
        }
    }
})
