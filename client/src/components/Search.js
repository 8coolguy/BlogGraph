import React,{useState,useEffect} from 'react';
import {GraphContainer} from "../Styles/Explore.Style";
import Graph from "./Graph";
import {BackgroundDiv} from "../Styles/Style";
import {searchUsers} from "../actions/user";

//this page will show the home page with highlighted users graphs which will be me lol
const Search = () =>{
    //probably needs to be in graph comp
    const [query,setQuery]=useState("");
    const [users,setUsers]=useState([]);
    useEffect(() => {
        if(query != ""){
            searchUsers(query)
                .then(res => {
                    setUsers(res.data);
                    console.log("Search:",res);
                })
                .catch(err => console.log("Search", err.name));
        }
      
    }, [query])
    
    
    return(
        <BackgroundDiv>
            <h1 style={{padding:0,textAlign: "center",margin:0}}>
                Search: 
                <input value={query} onChange={(event) =>{setQuery(event.target.value);console.log("Search",event.target.value);}}></input>
            </h1>
            <h2 style={{padding:0,textAlign: "center",margin:0, color:"grey"}}>{users.length} results queried</h2>
            {
                users.length !=0 ?
                    users.map((user) => (<GraphContainer> <Graph userName={user.userName}/></GraphContainer>)):<></>
                
            }
        </BackgroundDiv>
    )      

}

export default Search;
