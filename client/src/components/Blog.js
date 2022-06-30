import React,{useEffect,useState} from 'react';
import {updateCount} from "../actions/user";
import {getBlogTitle,getBlogFile,deleteBlog} from "../actions/blog";
import {useParams,Link,useNavigate} from "react-router-dom";
import {BackgroundDiv} from "../Styles/Style";
import UserPool from "../UserPool";
import ReactMarkdown from 'react-markdown';


const Blog =() =>{
    let {title} =useParams();
    const navigate =useNavigate();
    const [blog, setBlog]=useState({});
    const [md, setMd]=useState({text:""});
    const user= UserPool.getCurrentUser()? UserPool.getCurrentUser():{"username":"____"};
    useEffect(() => {
        getBlogTitle(title)
          .then(res=> {setBlog(res.data[0]);console.log("Blog",res);})
          .catch(err=>{console.log("Blog",err)});
      }, []);
    useEffect(() => {
        
        getBlogFile(blog.article_file_path)
            .then((res) => {console.log(res);setMd({text:res.data});})
            .catch((err)=>{console.error("Blog",err)})
            
        
    
    }, [blog]);
    const onSubmit =(event)=>{
        event.preventDefault();
        let id =blog._id;
        console.log("Blog",id)
        deleteBlog(id)
            .then(()=>{
                console.log("Blog", "Delete");
                navigate("/home");
                updateCount(user.username,"down");
            })
            .catch(()=>{
                alert("Failed Deletion");
            })
        
    }
    return(
        <BackgroundDiv>
            <h1 style={{padding:0,textAlign: "center",margin:0}}>{blog.title}</h1>

            {blog.related_title?<Link style={{textAlign: "center"}} to={"/blog/"+blog.related_title} onClick={() => navigate("/blog/"+blog.related_title)}><h2>Related Blog: {blog.related_title}</h2></Link>:<></>}
            {user.username===blog.user?<button style={{backgroundColor:"red",margin: "auto",display:"flex",alignItems: "center"}} onClick={onSubmit}>Delete</button>:<></>}

            <div style={{padding:"3%"}}>
                <ReactMarkdown className="content" style={{backgroundColor:"white"}}children={md.text}></ReactMarkdown>
            </div>
        </BackgroundDiv>
    )
    





}
export default Blog;