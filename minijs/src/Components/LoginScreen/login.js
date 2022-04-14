import axios from "axios";
import React, { useState } from "react";
import imageSelected from "../util/imageSelected";
import validator from 'validator';
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage,setSelectedImage] = useState([]);
  const [emailError, setEmailError] = useState("outline-blue-500")

  const emailCheck = (e) => {
    let email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError("outline-green-500");
    } else {
      setEmailError("outline-cyan-500");
    }
    setEmail(email);
  }
  const verifyPassword= async() =>{
    await axios.post(`http://localhost:5000/verifypassword`,{email:email,password:selectedImage}).then((e)=>{
      console.log(e);

    }).catch((e)=>{
      console.log("Error")
       setSelectedImage([]);
        setImages([]);
      emailChecked();
    })
  }
  const emailChecked = async (e) => {
    // var data = [];
    await axios.get(`http://localhost:5000/getemail?email=${email}`).then((e) => {
      setImages(e.data);
      console.log(e.data);

    }).catch((err) => {
      console.log(err);

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
        
        {/* <p>{user}</p> */}
      </form>
      {/* {imagesValue} */}
      {
        images.map((image) => {
          // console.log(image);
          return (
            <>
              <input value={`${image}`} style={{ position: 'relative', bottom: 180, left: 20 }} type={`checkbox`} onClick={(e) => { imageSelected(e,selectedImage,setSelectedImage) }}></input>
              <img style={{ width: 200, height: 200 }} key={`${image}`} src={`http://localhost:5000/download?image=${image}`} />
            </>

          )
        })

      }
      <button onClick={(e)=>{verifyPassword()}}>find</button>
      
      </center>
    </div>
  )
}
export default SignUp;