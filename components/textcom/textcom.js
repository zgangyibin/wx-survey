// components/textcom/textcom.js
Component({
  properties: { // 只读属性，数据放在data属性里面。如果要在组件里面修改props的属性，只能通过子组件把值传递给父组件，在父组件修改值。
    questionData:{ 
      type: Object,
      value: {}
    },
    preview:{ // 根据preview属性判断组件是预览还是编辑状态
      type:Boolean,
      value: false
    },
  },
  externalClasses:["icondel","iconcopy"],// 组件的样式只能用组件内部的样式，没办法用全局样式，externalClasses可以继承父组件的样式。定义一个样式属性，父组件可以给该属性传递样式
  data: {
  },
  methods: {
    commonTrigger(data){
      this.triggerEvent("change",{...data,id:this.data.questionData.id});//子组件通过触发change事件，传值到父组件。把当前数据的id属性传到父组件。
    },
    changeInput(e){
     this.commonTrigger({title: e.detail.value});
    },
    changePlaceholder(e){
      this.commonTrigger({placeholder:e.detail.value});
    },
    handleChange(e){ // checkbox-group的change事件
      this.commonTrigger({require:e.detail.value.length>0});
    },
    delQuestionData(){ // 删除问题
      this.commonTrigger({
        type: "del"
      });
    },
    copyQuestionData(){ // 复制一个问题
      this.commonTrigger({
        type: "copy"
      });
    },
    changeValue(e){ // 用户填写问卷的值
      this.commonTrigger({value:e.detail.value});
    }
  }
})
