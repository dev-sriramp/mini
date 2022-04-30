import React,{useEffect,useState} from "react";
import {useParams } from "react-router-dom";
import axios from "axios";
const VerifyUser = () =>{
  const [userVerified,setUserVerified] = useState("Verification in Process");
  const params = useParams();
  useEffect(async()=>{
    await axios.get(`http://localhost:5002/user/${params.id}/verify/${params.token}`).then((e) => {

      if(e.status===200){
        setUserVerified("Verified Sucessfully");
      }

    }).catch((err) => {
      setUserVerified("Error in Verification");

    })
    console.log(params.id);
    console.log(params.token);
  },[params.id,params.token,setUserVerified])
  return(
    <div>
      {<h1>
        {userVerified}
      </h1>}
    </div>
  )
}
export default VerifyUser;
