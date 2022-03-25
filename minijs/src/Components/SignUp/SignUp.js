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
      // setSelectedImage([]);
       // setImages([]);
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
    <div className="md:container md:mx-auto grid h-52 place-content-center">
      <form >
        <div>
        <h1 className="mt-32 mb-5 text-2xl font-bold underline">Graphical password Login</h1>
        </div>
        <div>
      <input className={`block mr-4 py-2 px-4 w-full ring focus:outline-green-500 font-serif subpixel-antialiased tracking-wide rounded-md ${emailError}`} type="text" name="email" placeholder="Email" value={email} onChange={(e) => { emailCheck(e) }} ></input>
      </div>
        <br />
        <button className="block w-full text-sm text-slate-500 mr-4 py-2 px-4 rounded-full border-0 text-sm font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100" type="button" onClick={(e) => { emailChecked(e) }}>Next</button>
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
      

    </div>
  )
}
export default SignUp;