// components/textcom/textcom.js
Component({
    properties: {//只读属性，数据放在data属性里，如果要修改，只能通过子组件把值传给父组件，在父组件修改值
       questionData:{//自定义data属性，组件给该属性传值
            type:Object,
            value:{},
       }
    },
    externalClasses:["icondel","iconcopy"],//组件不能使用全局样式，要继承父组件样式，用externalClasses

    data: {

    },

    methods: {
        commonTrigger(data,id){
             //子组件通过触发change事件，传值给父组件
             console.log(this.data.questionData)
            this.triggerEvent("change",{...data,id:this.data.questionData.id})//id传给父组件
        },
        changeInput(e){
            this.commonTrigger({title:e.detail.value})
        },
        changePlaceholder(e){
            this.commonTrigger({placeholder:e.detail.value})
        },
        handleChange(e){
            this.commonTrigger({require:e.detail.value.length>0});
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
