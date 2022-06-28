import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Search from './components/Search';
import Login from './components/Login';
import Status from './components/Status';
import Home from "./components/Home";
import Explore from "./components/Explore";
import Create from './components/Create';
import Confirm from './components/Confirm';
import Blog from './components/Blog';
import React,{useEffect} from 'react';
import {Account} from './components/Account';
import {BackgroundDiv} from "./Styles/Style"
import './App.css';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

const Root =()=>{
  return (
    <BackgroundDiv>
      <h1 style={{padding:0,textAlign: "center",margin:0}}>Welcome to BlogGraph
        <h2>Blogs are visualized as Graphs</h2>
      </h1>
    </BackgroundDiv>

  )
}

function App() {
  useEffect(() => {
    document.title = "BlogGraph";
  }, []);
  return (
    
    <Router>
      <Account>
        <Navbar/>
        <Routes>
          
          <Route path ="/" exact element={<Root/>}></Route>
          <Route path ="/login" element={<Login/>}></Route>
          <Route path ="/signup" element={<Signup/>}></Route>
          <Route path="/confirm/:user" element={<Confirm/>}></Route>
          <Route path ="/home" element={<Home/>}></Route>
          <Route path ="/explore" element={<Explore/>}></Route>
          <Route path ="/search" element={<Search/>}></Route>
          <Route path="/create" element={<Create/>}></Route>
          <Route path="/blog/:title" element={<Blog/>}></Route>
        </Routes>
      </Account>
    </Router>
    

    
  );
}

export default App;
/*
<Account>
      <Navbar/>
      <Status/>
      <Signup/>
      <Login/>
    </Account>
*/