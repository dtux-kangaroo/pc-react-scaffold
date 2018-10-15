import _ from 'lodash';
import http from '@/utils/http';


const API_URL={
  getUserData:{
    method:'GET',
    url:'/mock/userData.json'
  },
  getNavData:{
    method:'GET',
    url:'/mock/navData.json'
  },
  getUserList:{
    method:'GET',
    url:'/mock/userList.json'
  }
}


const API = {}
_.keys(API_URL).forEach(key=>{
  const item = API_URL[key]
  switch(item.method){
    case 'GET':
      API[key]=function(params){
        return http.get(item.url,params)
      }
      break;
    case 'POST':
      API[key]=function(params){
        return http.post(item.url,params)
      }
      break;
    case 'DELETE':
      API[key]=function(params){
        return http.delete(item.url,params)
      }
      break;
    case 'PUT':
      API[key]=function(params){
        return http.put(item.url,params)
      }
      break;
    case 'POSTFORM':
      API[key]=function(params){
        return http.postForm(item.url,params)
      }
      break;
    case 'HEAD':
      API[key]=function(params){
        return http.head(item.url,params)
      }
      break;
    default:
      API[key]=function(params){
        return http.get(item.url,params)
      }
  } 
});


export default API;