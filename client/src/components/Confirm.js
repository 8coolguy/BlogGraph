import React,{useState} from 'react';
import {BackgroundDiv} from "../Styles/Style";
import {FormContainer} from "../Styles/Form.Style";
import UserPool from "../UserPool";
import  {CognitoUser} from 'amazon-cognito-identity-js';
import {useParams,useNavigate} from "react-router-dom";
import {postUser} from "../actions/user";
const Confirm =()=>{
    const [code,setCode] =useState("");
    const navigate =useNavigate();
    let {user} =useParams();
    user=atob(user);
    var id =UserPool.clientId;
    console.log(user);
    const onSubmit = (event)=>{
        event.preventDefault();
     
        const cognitoUser = new CognitoUser({Username:user,Pool:UserPool});
        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                alert(err);
            } else {
                console.log(result);
                postUser({user:user})
                    .then(()=> console.log("Confirm","Created Account"))
                    .catch(()=> console.log("Confirm","Failed Account"));
                navigate('/login');
                
            }
           });
        
    }
    
    return(
        <BackgroundDiv>
            <h2 style={{padding:0,textAlign: "center",margin:0}}>Code is sent to your email.</h2>
            <FormContainer>
                <form onSubmit={onSubmit}>
                    <label htmlFor="code">Confirmation Code
                        <input value={code} onChange={(event) =>{setCode(event.target.value);console.log("Confirm",event.target.value);}}></input>
                    </label>
                    <button type="submit">Confirm Signup</button>
                </form> 
            </FormContainer>
        </BackgroundDiv>
    )
}
export default Confirm;
