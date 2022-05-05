
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
    return (<>
      <div className="col-6 col-sm-3">
                            <div className="custom-control custom-checkbox image-checkbox">
                                <input value={`${image}`} style={{position: 'relative',top: 20,}}type="checkbox"
                                 onClick={(e) => { imageSelected(e,selectedImage,setSelectedImage) }}
                                    className="custom-control-input"
                                    id={
                                        `${image}`
                                    }/>
                                <label className="custom-control-label"
                                    htmlFor={
                                        `${image}`
                                }>
                                    <img style={
                                            {
                                                "width": "10rem",
                                                "height": "10rem"
                                            }
                                        }

                                        src={
                                            `http://localhost:${
                                                process.env.React_App_DBPORT
                                            }/getPassword?image=${image}`
                                        }
                                        alt={
                                            `${image}`
                                        }
                                        className="img-fluid"/>
                                </label>
                            </div>
                        </div>
      <div>
        <input value={`${image.alt}`} style={{ position: 'relative',bottom:0, left: 20 }} type={`checkbox`} onClick={(e) => { imageSelected(e,selectedImage,setSelectedImage) }}></input>
        <img style={{ width: 200, height: 200 }} key={image.alt} src={(`${image.src}`)} />
      </div></>
    )
  })
  const update = async (e) => {
    var fileUpload = new FormData();
    ImageInfo.map(images => {
      fileUpload.append("file", images.uploadImg)
    })
    fileUpload.append('email', email);
    fileUpload.append('password',selectedImage);
    await axios.post(`http://localhost:${process.env.React_App_DBPORT}/createuser`, fileUpload).then((res) => {
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
    <div className="container">
      <div className="row align-self-center">
          <div className="mx-auto col-10 mt-5 col-sm-6">
            <center>
            
      {!newUser && <form >
        <h1>Create Account</h1>





          <input type="text" name="email" placeholder="email" value={email} onChange={(e) => { emailCheck(e) }} ></input>
        <br />
        <button type="button" className="btn btn-success mt-3" onClick={(e) => { emailChecked(e) }}>Next</button>
        <p>{user}</p>
      </form>}

{!newUser &&
        <div>
          <Link to="/login">
          <button className="btn btn-info">Already Have an Account</button>
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
    </center>
</div>
    </div>
</div>
  );
}

export default LoginPage;
