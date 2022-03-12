import axios from "axios";
import React, { useState } from "react";
import imageSelected from "../util/imageSelected";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage,setSelectedImage] = useState([]);
  // const imagesValue = images.map(async image => {
  //   const value = await axios.get(`http://localhost:5000/download?image=${image}`)
  //   console.log(value);
  //   return (
  //     <div>
  //       <img style={{ width: 200, height: 200 }} src={'http://localhost:5000/download?image=4f70d86bb98e5775ddf91c6959ef196f'} />

  //     </div>
  //   )
  // })
  const emailCheck = (e) => {
    let element = e.target.value;
    setEmail(element);
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
    <div>
      <form >
        <h1>Email</h1>
        <input type="text" name="email" placeholder="email" value={email} onChange={(e) => { emailCheck(e) }} ></input>
        <br />
        <button type="button" onClick={(e) => { emailChecked(e) }}>Next</button>
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
      <button onClick={(e)=>{
        console.log(selectedImage)
      }}>find</button>
      

    </div>
  )
}
export default SignUp;