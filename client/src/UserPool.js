import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData ={
    UserPoolId:"us-west-1_XY5hneouc",
    ClientId:"3v6s1tl41ghgb6ugcddl4ql976",
}
export default new CognitoUserPool(poolData);