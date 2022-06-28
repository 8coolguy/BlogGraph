import React , {useContext,useState,useEffect} from 'react';
import {AccountContext} from "./Account"
import {NavBtnLink} from "../Styles/Navbar.Style"

const Status =() =>{
    const [status, setStatus] =useState(false);
    const {getSession,logout }= useContext(AccountContext);

    useEffect(() => {
      getSession()
        .then((session) => {
            //console.log("Session", session);
            setStatus(true);
        });
    }, []);

    return <>{status ?  (<NavBtnLink onClick={logout}> Logout</NavBtnLink>):<></>}</>

};
export default Status;