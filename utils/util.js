const formatTime = (date,type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if(type === "date"){
    return `${[year, month, day].map(formatNumber).join('-')}`
  } 
  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

let numarr=[];
function getAddNum(){// 返回一个数组的元素，数组的元素是一个递增的数字。
  if(numarr.length === 0){
    for(let i=0;i<100;i++){
      numarr.push(i+"");
    }
  }
  return numarr.splice(0,1)[0];
}

// 自定义一个生成唯一id的方法，需要考虑到同一时间有多人操作。用时间戳+递增数字防止高并发产生相同的值。
const uuid = function(){
  return new Date().getTime()+getAddNum();
}
module.exports = {
  formatTime,
  uuid
}
