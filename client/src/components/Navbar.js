import React from 'react';
import UserPool from "../UserPool";
import {NavbarContainer,LeftContainer,RightContainer,NavbarInner,NavbarLink,NavLink,Titled} from '../Styles/Navbar.Style';
import Status from "./Status";
import BlogGraph from '../BlogGraph.png';

const Navbar = () => {
  var status =false;
  var user ="";
  const currentUser =UserPool.getCurrentUser()
  if (currentUser){
    status=true;
    user=currentUser.username;
  }

    //if loged in dont show signup or login 
  return (
    <NavbarContainer>
      <NavbarInner>
          <LeftContainer>
              <NavbarLink>
                {!status ?
                  <NavLink to="/signup">Sign Up</NavLink> 
                  :
                  (<Titled>Hello, {user} </Titled>)
                }
                {!status ? <NavLink to="/login">Login</NavLink>:<></>}
                  <NavLink to="/home">Home</NavLink>
                  <NavLink to="/explore">Explore</NavLink>
                  <NavLink to="/search">Search</NavLink>
                  {status ? <NavLink to="/create">Create</NavLink>:<></>}
                  <Status/>
              </NavbarLink>
              
          </LeftContainer>
          <RightContainer>
            <div>
              
              <img style={{height:"5pc",width:"12pc"}}src={BlogGraph}/>
            </div>
          </RightContainer>
      </NavbarInner>
    </NavbarContainer>
  );
};


    
export default Navbar;