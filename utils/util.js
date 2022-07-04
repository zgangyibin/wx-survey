const formatTime = (date,type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if(type === "date"){
    return `${[year, month, day].map(formatNumber).join('-')}`;
  }
    return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 自定义一个生成唯一id的方法，需要考虑同一时间多人操作
let numarr = [];
function getAddNum(){
    if(numarr.length == 0){
        for(let i = 0;i < 100;i ++){
            numarr.push(i+'');
        }
    }
    return numarr.splice(0,1)[0];
}
const uuid = function(){
    return new Date().getTime()+getAddNum();
}
module.exports = {
  formatTime,
  uuid
}
