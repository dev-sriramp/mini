import axios from "axios";
import React, { useState } from "react";
import imageSelected from "../util/imageSelected";
import validator from 'validator';
import { Link,Navigate } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage,setSelectedImage] = useState([]);
    const [emailVerified,setEmailVerified] = useState("");
  const [emailError, setEmailError] = useState("outline-blue-500");
  const [showresend,setShowresend] = useState(false);
  const [passwordVerified,setPasswordVerified] = useState(false);

  if (passwordVerified) {
      return <Navigate to="/welcome"/>;
    }

  const emailCheck = (e) => {
    let email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError("outline-green-500");
    } else {
      setEmailError("outline-cyan-500");
    }
    setEmail(email);
  }
  const resendEmail = async()=>{
    await axios.get(`http://localhost:${process.env.React_App_DBPORT}/resendemail?email=${email}`).then((e) => {

      console.log(e);

    }).catch((err) => {
      console.log(err);

    })
  }
  const verifyPassword= async() =>{
    await axios.post(`http://localhost:${process.env.React_App_DBPORT}/verifypassword`,{email:email,password:selectedImage}).then((e)=>{
      if(e.data.value){
        console.log("use navigate");
        setPasswordVerified(true);
      }

    }).catch((e)=>{
      console.log("Error")
       setSelectedImage([]);
        setImages([]);
      emailChecked();
    })
  }
  const emailChecked = async (e) => {
    console.log(process.env.React_App_DBPORT);
    // var data = [];
    await axios.get(`http://localhost:${process.env.React_App_DBPORT}/getallimages?email=${email}`).then((e) => {
      setImages(e.data);
      // console.log(e);

    }).catch((err) => {
      console.log(err);
      if(err.toString().includes("code 400")){
        setEmailVerified("Email Not Found");
      }
      if(err.toString().includes("code 401")){
        setEmailVerified("Verify Your Email");
        setShowresend(true);
      }

    })
    //setImages(data);
    // imagesValue();
  }

  return (

    <div className="">
      <center>
      <form >
        <div>
        <h1 className="">Graphical password Login</h1>
        </div>
        <div>
      <input className={``} type="text" name="email" placeholder="Email" value={email} onChange={(e) => { emailCheck(e) }} ></input>
      </div>
        <br />
        {
          !images[0] ? <button className="" type="button" onClick={(e) => { emailChecked(e) }}>Next</button> : ""
        }
        {!images[0] &&
            <p>{emailVerified}</p>
        }
      {
        !images[0]&&
        showresend && <button type="button" onClick={()=>{
          resendEmail();
        }}>
          resend verification Email
        </button>
      }
      </form>
      {/* {imagesValue} */}
      {
        images.map((image) => {
          // console.log(image);
          return (
            <>
              <input value={`${image}`} style={{ position: 'relative', bottom: 180, left: 20 }} type={`checkbox`} onClick={(e) => { imageSelected(e,selectedImage,setSelectedImage) }}></input>
            <img style={{ width: 200, height: 200 }} key={`${image}`} src={`http://localhost:${process.env.React_App_DBPORT}/getPassword?image=${image}`} />
            </>

          )
        })

      }

      <div>
      <button onClick={(e)=>{verifyPassword()}}>find</button>
  </div>
  {!images[0]&&
  <div>
    <Link to="/create">
    <button>Create An Account</button>
</Link>
</div>}
      </center>
    </div>
  )
}
export default SignUp;
