import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import {getBlogs,getBlogImage} from "../actions/blog";
import ReactFlow, { MiniMap, Controls,Background }from "react-flow-renderer";
import {GraphContainer} from "../Styles/Graph.Style"
const Graph=(props)=>{
  const [blogs,setBlogs]=useState({});
  useEffect(() => {
    getBlogs(props.userName)
      .then(res=> {setBlogs(res.data)})
      .catch(err=>{console.log("Home",err)});
  }, []);
  useEffect(() => {
    console.log("Graph",blogs);
  }, [blogs]);
  
  const assignNodes = (blogs)=>{
    const n=[]
    const e=[]
    let nodeDistance=200;
    let x=1;
    let y=1
    for(let i of Object.keys(blogs)){
      //console.log("Graph",i);
      var blog =blogs[i];
      //console.log("Graph",blog);
      let encode =btoa(blog.thumbnail_file_path)
      let image='/api/blogs/image/'+encode;
      n.push({
        id: blog.title,
        data: { label: <div><Link to={"/blog/"+blog.title}><h1>{blog.title}</h1></Link></div>},
        position: { x: nodeDistance*x, y: nodeDistance*y},
        style: {
          backgroundImage:'url('+image+')',
          backgroundPosition: "center",
          backgroundSize: "cover",
        }
      });
      console.log(image);
      x+=1
      if(x==7){
        x=1
        y+=1
      }
      
      
      
      
    }
    
    return n

  }
  const assignEdges = (blogs)=>{
    const e=[]
    let c =0;
    for(let i of Object.keys(blogs)){
      console.log("Graph",i);
      var blog =blogs[i];
      if(blog.related_title !=""){
        e.push({
          id:c,
          source: blog.title,
          target: blog.related_title,
          style:{stroke:'black'},
        });
        c+=1;
      }
    }
    console.log("Graph",e);
    return e
  }

  return(
    <div class="content" style={{margin: "auto",width:"80pc",height:"100pc",justifyContent:"center",display:"flex",alignItems:"center",backgroundColor:"white",borderRadius:"7px",background: "repeating-linear-gradient(transparent, transparent 2px, rgb(255, 255, 255) 2px, rgb(255, 255, 255) 22px, transparent 22px, transparent 23px, rgb(255, 255, 255) 23px, rgb(255, 255, 255) 43px),repeating-linear-gradient(0.25turn, transparent, transparent 2px, rgb(255, 255, 255) 2px, rgb(255, 255, 255) 22px, transparent 22px, transparent 23px, rgb(255, 255, 255) 23px, rgb(255, 255, 255) 43px)"}}>
      <ReactFlow class="content" nodes={assignNodes(blogs)} edges={assignEdges(blogs)} fitView>
        <h1 style={{paddingLeft:"5%"}}>{props.userName}'s BlogGraph</h1>
        
      </ReactFlow>
    </div>
    
  );
}

export default Graph;