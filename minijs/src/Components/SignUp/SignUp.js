import axios from "axios";
import React, { useState } from "react";
const SignUp = () => {
    const [email,setEmail]=useState("");
        const emailCheck = (e) => {
            let element = e.target.value;
            setEmail(element);
          }
        const emailChecked = async(e)=>{
          await axios.post("http://localhost:5000/getemail", { email: email }).then((e) => {
            console.log(e);
            
          }).catch((err) => {
            console.log(err);
            
          })
        }
    
    return (
        <div>
           <form >
        <h1>Email</h1>
        <input type="text" name="email" placeholder="email" value={email} onChange={(e) => { emailCheck(e) }} ></input>
        <br />
        <button type="button" onClick={(e) => { emailChecked(e) }}>Next</button>
        {/* <p>{user}</p> */}
      </form>
        </div>
    )
}
export default SignUp;