const axios =require('axios');
var FormData = require('form-data');

const deleteBlog= (id) =>{
  //console.log("Actions Blog",userName);
  return axios({
      method: "delete",
      url: ("/api/blogs/"+id),
  });        
}
const getBlogs= (userName) =>{
    //console.log("Actions Blog",userName);
    return axios({
        method: "get",
        url: ("/api/blogs/author/"+userName),
    });        
}
const getBlogTitle= (title) =>{
  //console.log("Actions Blog",userName);
  return axios({
      method: "get",
      url: ("/api/blogs/title/"+title),
  });        
}
const getBlogFile= (path) =>{
  //console.log("Actions Blog",userName);
  var encode =btoa(path);
  return axios({
      method: "get",
      url: ("/api/blogs/file/"+encode),
  });        
}
const getBlogImage= (path) =>{
  
  var encode =btoa(path);
  console.log("getBlogImage",encode)
  return axios({
      method: "get",
      url: ("/api/blogs/image/"+encode),
  });
        
}
const postBlog= (props) =>{
    
    var data = new FormData();
    data.append('title', props.title);
    data.append('related_title',props.related_title);
    data.append('article_file', props.article_file);
    data.append('user', props.user);
    data.append('thumbnail_file', props.thumbnail_file);
    var config = {
      method: 'post',
      url: '/api/blogs',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data : data,
    };
    
    return axios(config);
        
}
export {getBlogs,getBlogTitle,postBlog,getBlogFile,getBlogImage,deleteBlog};