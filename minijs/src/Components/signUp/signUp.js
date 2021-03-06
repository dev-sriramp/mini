
import React,{ useState } from 'react';
import axios from 'axios';
import imageSelected from '../util/imageSelected';
import {Link} from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [ImageInfo, setImageInfo] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [passwordUpdated,setPassowrdUpdated] = useState(false);

  const handleImg = async (e) => {
    //console.log(e.target.files);
    const res = [];
    for (let i = 0; i < e.target.files.length; i++) {
      let newData = {
        src: URL.createObjectURL(e.target.files[i]),
        alt: e.target.files[i].name,
        uploadImg: e.target.files[i]
      }

      res.push(newData);
      console.log(res);
      setImageInfo(res);
    }
  }
  const images = ImageInfo.map(image => {
    return (
      <div>
        <input value={`${image.alt}`} style={{ position: 'relative',bottom:0, left: 20 }} type={`checkbox`} onClick={(e) => { imageSelected(e,selectedImage,setSelectedImage) }}></input>
        <img style={{ width: 200, height: 200 }} key={image.alt} src={(`${image.src}`)} />
      </div>
    )
  })
  const sendEmail = async () =>{
    await axios.get(`http://localhost:${process.env.React_App_DBPORT}/listings`).then((res)=>{
      console.log(res);
    })
  }
  const update = async (e) => {
    var fileUpload = new FormData();
    ImageInfo.map(images => {
      fileUpload.append("file", images.uploadImg)
    })
    fileUpload.append('email', email);
    fileUpload.append('password',selectedImage);
    await axios.post(`http://localhost:${process.env.React_App_DBPORT}/upload`, fileUpload).then((res) => {
      console.log(res);
      setPassowrdUpdated(true);
    })
  }
  const emailCheck = (e) => {
    let element = e.target.value;
    setEmail(element);
  }
  const emailChecked = async (e) => {
    await axios.post(`http://localhost:${process.env.React_App_DBPORT}/checkuser`, { email: email }).then((e) => {
      setUser("");
      setNewUser(true);
    }).catch((err) => {
      console.log(err);
      setUser("User Email Already Found");
    })
  }
  const verifyOtp = async (e) =>{

  }

  return (
    <div className="App">
      {!newUser && <form >
        <h1>Craete Account</h1>
        <input type="text" name="email" placeholder="email" value={email} onChange={(e) => { emailCheck(e) }} ></input>
        <br />
        <button type="button" onClick={(e) => { emailChecked(e) }}>Next</button>
        <p>{user}</p>
      </form>}

{!newUser &&
        <div>
          <Link to="/login">
          <button>Already Have an Account</button>
      </Link>
        </div>

}
      {
        newUser && <form  >
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleImg}
            multiple />
          <button type="button" value={"Submit"} onClick={() => { update() }}>Submit </button>
        </form>
      }
      {images}

    </div>

  );
}

export default LoginPage;
