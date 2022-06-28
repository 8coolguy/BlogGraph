const axios =require('axios');
var FormData = require('form-data');
//var FormData = require('form-data');

const postUser= (props) =>{
    var data = new FormData();
    data.append("userName",props.user)
    var config = {
      method: 'post',
      url: '/api/users/',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data : data,
    };
    
    return axios(config);
        
}
const updateCount = (user,dir) =>{
    //console.log("Actions Blog",userName);
    return axios({
        method: "put",
        url: ("/api/users/update/"+user+"/"+dir),
    });        
}
const getUsers= () =>{
    //console.log("Actions Blog",userName);
    return axios({
        method: "get",
        url: ("/api/users/"),
    });        
}
const searchUsers= (query) =>{
    return axios({
        method: "get",
        url: ("/api/users/search/"+query),
    });        
}
export {postUser,updateCount,getUsers,searchUsers};