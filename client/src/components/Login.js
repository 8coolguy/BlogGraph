import React, {useState, useContext} from 'react';
import {AccountContext} from "./Account";
import { useNavigate } from 'react-router-dom';
import {BackgroundDiv} from '../Styles/Style';
import {FormContainer} from "../Styles/Form.Style";
const Login = () =>{
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const {authenticate} = useContext(AccountContext);
     
    const onSubmit =(event)=>{
        event.preventDefault();
        
        //s
        authenticate(userName,password)
            .then(data => {
                console.log("Success",data);
                navigate("/home");
                navigate(0);})
            .catch(err => {

                if(err.name==="UserNotConfirmedException"){
                    navigate("/confirm/"+btoa(userName));
                }else{
                    alert(err.name);
                }
            });
        //e

    };
    return(
        <BackgroundDiv>
            <h1 style={{padding:0,textAlign: "center",margin:0}}>Login</h1>
            <FormContainer>
                

                <form onSubmit ={onSubmit}>
                    <label htmlFor="userName">userName</label>
                    <input value={userName} onChange={(event) =>setUserName(event.target.value)}></input>


                    <label htmlFor="password">password</label>
                    <input value={password} type="password" onChange={(event) =>setPassword(event.target.value)}></input>

                    <button class="submit" type="submit">Login</button>
                </form>
            </FormContainer>
        </BackgroundDiv>
    )

};
export default Login;