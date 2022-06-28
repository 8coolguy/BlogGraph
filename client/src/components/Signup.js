import React, {useState} from 'react';
import UserPool from "../UserPool";
import  {CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {BackgroundDiv} from '../Styles/Style';
import {useNavigate} from "react-router-dom";
import {FormContainer} from "../Styles/Form.Style";

const Signup = () =>{
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate =useNavigate();
    const onSubmit =(event)=>{
        event.preventDefault();

        var attributeList = [];
        
        var dataEmail = {
           "Name": 'email',
            "Value": email,
        };
        var emailAttr =new CognitoUserAttribute(dataEmail);
        attributeList.push(emailAttr)
        UserPool.signUp(userName,password,attributeList,null,(err,data)=>{
            if(err){
                console.log("Error");
                alert(err);
            }else{
                alert("Success. Account Created.");
                navigate("/confirm/"+btoa(userName));
            }
        })
    };
    return(
        <BackgroundDiv>
            <h1 style={{padding:0,textAlign: "center",margin:0}}>Signup</h1>
            <FormContainer>
                <form onSubmit ={onSubmit}>
                    <label htmlFor="userName">userName</label>
                    <input value={userName} onChange={(event) =>setUserName(event.target.value)}></input>

                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(event) =>setEmail(event.target.value)}></input>

                    <label htmlFor="password">password</label>
                    <input value={password} type="password" onChange={(event) =>setPassword(event.target.value)}></input>

                    <button class="submit" type="submit">Signup</button>
                </form>
            </FormContainer>
        </BackgroundDiv>
    )

};
export default Signup;