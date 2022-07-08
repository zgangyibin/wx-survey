// components/checkboxcom/checkboxcom.js
const tool = require("../../utils/util");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    questionData:{ // 自定义data属性，组件给与给该属性传值
      type: Object,
      value: {}
    },
    preview:{ // 根据preview属性判断组件是预览还是编辑状态
      type:Boolean,
      value: false
    }
  },
  externalClasses:["icondel","iconcopy","iconadd","iconremove"],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
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
    delOption(e){ // 删除选项
      const { id } = e.currentTarget.dataset;
      let { option } = this.data.questionData;
      for(let i=0;i<option.length;i++){
        if(option[i].id === id){
          option.splice(i,1);
          this.commonTrigger({
            option:[
              ...option,
            ]
          });
          break;
        }
      }
    },
    changeOption(e){ // 修改选项文本内容
      const { id } = e.currentTarget.dataset;
      let { option } = this.data.questionData;
      for(let i=0;i<option.length;i++){
        if(option[i].id === id){
          option[i].text = e.detail.value;
          this.commonTrigger({
            option:[
              ...option
            ]
          });
          break;
        }
      }
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
    handleCheckboxValue(e){ // 填写问卷的多选输入触发的方法
      console.log(e.detail.value);
      this.commonTrigger({optionId:e.detail.value});
    },
    handleRadioValue(e){ // 填写问卷的单选输入触发的方法
      this.commonTrigger({optionId:[e.detail.value]});
    }
  }
})
