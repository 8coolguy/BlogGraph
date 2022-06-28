import UserPool from "../UserPool";

import Graph from "./Graph";
import {BackgroundDiv} from "../Styles/Style"

//this page will show the home page with highlighted users graphs which will be me lol
const Home = () =>{
    //probably needs to be in graph comp
    const user = UserPool.getCurrentUser()?UserPool.getCurrentUser().username :"arnav" ;
    return(
        <BackgroundDiv>
            <Graph userName={user} />
        </BackgroundDiv>
    )      
}
export default Home;
