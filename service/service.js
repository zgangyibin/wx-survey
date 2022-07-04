import Request from "../utils/request";
import api from "../api/api";
export function getWxUid(data,callback){
    Request(api.getWxUid,data,callback,"post")
}
export function saveWxData(data,callback){
    Request(api.saveWxData,data,callback,"post")
}
export function createPSQ(data,callback){
    Request(api.createPSQ,data,callback,"post")
}
export function getPSQone(data,callback){
    Request(api.getPSQone,data,callback)
}
export function delPSQ(data,callback){
    Request(api.delPSQ,data,callback)
}
export function updatePSQ(data,callback){
    Request(api.updatePSQ,data,callback,"post")
}