import axios from "axios";
import React, { useState } from "react";
const SignUp = () => {
    const [email,setEmail]=useState("");
    const [images,setImages] = useState([]);
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
        const emailChecked = async(e)=>{
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
        images.map((image)=>{
          // console.log(image);
          return(
          <img style={{ width: 200, height: 200 }} key={`${image}`} src={`http://localhost:5000/download?image=${image}`} />)
        })
      }
     
        </div>
    )
}
export default SignUp;