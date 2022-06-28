import React,{createContext} from  'react';
import UserPool from "../UserPool";
import  {CognitoUser,AuthenticationDetails} from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';


const AccountContext = createContext();

const Account = (props) =>{
    const navigate=useNavigate();
    const getSession = async() => {
        return await new Promise((resolve,reject) => {
            const user =UserPool.getCurrentUser();
            if(user){
                user.getSession((err,session) =>{
                    if(err){
                        reject();
                    }else{
                        resolve(session);
                    }
                
            });
            }else{
                reject(user);
            }
        });

    };
    const authenticate = async (username,password) =>{
        return await new Promise((resolve,reject) => {

            const user = new CognitoUser({Username:username,Pool:UserPool});
            //console.log(username,password);
            const auth = new AuthenticationDetails({Username:username,Password:password});

            user.authenticateUser(auth,{
                onSuccess:(data) =>{
                    console.log("onSuccess:", data);
                    resolve(data);
                },
                onFailure:(err)=>{
                    console.error("onFailure",err);
                    reject(err);
                },
                newPasswordRequired:(data) => {
                    console.log("newPasswordRequired:", data);
                    resolve(data);
                },
            });

        });
    };
    const logout = () => {
        const user = UserPool.getCurrentUser();
        if(user){
            user.signOut();
            navigate(0);
        }
    }


    return(
        <AccountContext.Provider value={{authenticate,getSession,logout}}>
            {props.children}
        </AccountContext.Provider>
    );

};
export {Account,AccountContext};