import React,{useContext} from "react";
import {userData} from "../../dataProvider";

const WelcomeScreen = () =>{
  const userDetail = useContext(userData);
  console.log(userDetail);
  return(
    <div>
      <h1>
        Welcome you logged in sucessfully
      </h1>
      <button onClick={()=>{
        console.log(userDetail)
      }}>Press</button>
    </div>
  )
}
export default WelcomeScreen;
