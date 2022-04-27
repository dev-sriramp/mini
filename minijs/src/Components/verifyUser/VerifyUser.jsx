import React,{useEffect} from "react";
import {useParams } from "react-router-dom";

const VerifyUser = () =>{
  const params = useParams();
  useEffect(()=>{
    console.log(params.id);
  })
  return(
    <div>
      <h1>
        Verified Sucessfully
      </h1>
    </div>
  )
}
export default VerifyUser;
