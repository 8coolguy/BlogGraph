import React,{useState,useEffect} from 'react';
import {GraphContainer} from "../Styles/Explore.Style";
import Graph from "./Graph";
import {BackgroundDiv} from "../Styles/Style";
import {getUsers} from "../actions/user";

//this page will show the home page with highlighted users graphs which will be me lol
const Explore = () =>{
    //probably needs to be in graph comp
    const [users,setUsers]=useState([]);
    useEffect(() => {
        getUsers()
            .then(res => {
                setUsers(res.data);
                console.log(res.data);
            })
            .catch(err => console.log("Explore", err.name));
      
    }, [])
    
    
    return(
        <BackgroundDiv>
            <h1 style={{padding:0,textAlign: "center",margin:0}}>Explore top BlogGraphs</h1>
            {users.map((user) => <div> <Graph userName={user.userName}/></div>) }
        </BackgroundDiv>
    )      

}

export default Explore;
