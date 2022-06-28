import styled from "styled-components";
import {Link} from "react-router-dom";


export const NavbarContainer =styled.nav`
    width:100%;
    height:80px;
    background-color:purple;
    display:flex;
    flex-direction:column;
    
`;
export const LeftContainer=styled.div`
    flex:70%;
    display:30%;
    justify-content:flex-end;
    align-items:center;
    padding-right:50px;

`;
export const RightContainer=styled.div`
    flex:30%;
    display:30%;
    justify-content:flex-end;
    padding-right:5%;
    align-items:center;

`;
export const NavbarInner=styled.div`
    width:100%;
    height:80px;
    display:flex;

`;
export const NavbarLink=styled.div`
    display:flex;
`;
export const NavLink=styled(Link)`
    color:white;   
    font-size:x-large;
    margin:20px;
`;
export const Titled=styled.h1`
    margin:20px;
    align:center;
    color:white;
    

`;
export const NavBtnLink = styled.button`
    text-align:center;
    border-radius: 4px;
    background: #808080;
    padding: 10px 22px;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
    //font-size:x-large;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    /* Second Nav */
    margin-left: 20px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #808080;
    }
    `;
