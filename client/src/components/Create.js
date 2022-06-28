import React,{useState,useEffect,useContext} from 'react';
import UserPool from "../UserPool";
import {useNavigate,Link} from "react-router-dom";
import {AccountContext} from "./Account";
import {FormContainer} from "../Styles/Form.Style";
import {getBlogs,postBlog} from "../actions/blog";
import {BackgroundDiv} from '../Styles/Style';
import {updateCount} from "../actions/user";



const Create =()=>{
    const [user,setUser]=useState({});
    const [blogs,setBlogs]=useState([]);
    const {getSession }= useContext(AccountContext);
    const navigate =useNavigate();
    
    const [title,setTitle] =useState("");
    //drop bar because article has to exist
    const [related_title,setRelated_Title]=useState("");
    const [article_file,setArticle_file]=useState({});
    const [thumbnail,setThumbnail]=useState({});
    useEffect(() => {
      getSession()
        .then((session)=>{
            const user=UserPool.getCurrentUser();
            //console.log("Create",user.username);
            setUser(user);
            getBlogs(user.username)
                .then(res=>{
                //console.log("Create",res.data);
                setBlogs(res.data);})
                .catch(err=>{console.log("Create",err);})
        })
        .catch((err)=>{
            console.log("Create",err);
            navigate("/login");
        });
    
      return () => {
        
      }
    }, [])
    
    function getExtension(filename){
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }
      
    function isImage(filename) {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'gif':
            case 'png':
            //etc
            return true;
        }
        return false;
    }
    function isMd(filename) {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'md':
            //etc
            return true;
        }
        return false;
    }
    const handleArticleInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > 10240000){
            alert("File size cannot exceed more than 1MB");
        }
        else if(!isMd(file.name)){
            alert("File has to be .md");
        }
        else {
            setArticle_file(e.target.files[0]);
            console.log("Create",file);
        }
    };
    
    const handleThumbnailInput = (e) => {
        // handle validations
        console.log("Create",e.target);
        const file = e.target.files[0];
        console.log("Create",file)
        if (file.size > 10240000){
            alert("File size cannot exceed more than 10MB");
            
        }else if(!isImage(file.name)){
            alert("File has to be .png,.jpeg, or .gif");
            
        }
        else {
            setThumbnail(file)
            console.log("Create",file.name);
        };
        
    };
    const onSubmit =(e)=>{
        e.preventDefault();
        var props={
            "title":title.replace("?", "_"),
            "related_title":related_title,
            "user":user.username,
            "article_file":article_file,
            "thumbnail_file":thumbnail,
        
        };
        postBlog(props)
            .then(res => {
                console.log("Create",res);
                updateCount(user.username,"up");
                navigate("/home");
            })
            .catch(err =>{alert("Check if title already exists or if there is an article file.");navigate(0);})
    }
    
    
    return(
        <BackgroundDiv>
            
        <h1 style={{padding:0,textAlign: "center",margin:0}}>Create a Blog</h1>
        <FormContainer>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title
                    <input value={title} onChange={(event) =>{setTitle(event.target.value);console.log("Create",event.target.value);}}></input>
                </label>

                <label htmlFor="article_file">Blog
                    <input type="file" onChange={handleArticleInput}></input>
                </label>

                <label htmlFor="related_title"> Related Blog:
                    
                    <select onChange={(e)=>{console.log("Create",e.target.value); setRelated_Title(e.target.value);}}>
                        <option></option>
                        { blogs.map((blog) => <option key={blog.title}>{blog.title}</option>) }
                    </select>
                    
                </label>

                <label htmlFor="thumbnail"> Thumbnail:
                    <input type="file" onChange={handleThumbnailInput}></input>
                </label>
                <button class="submit" type="submit">Create Blog Post</button>

            </form>
        </FormContainer>
    </BackgroundDiv>
    )
};
export default Create;