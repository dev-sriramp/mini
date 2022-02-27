import './App.css';
import React,{ useState } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [ImageInfo, setImageInfo] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);

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
        <input value={`${image.alt}`} style={{ position: 'relative', bottom: 180, left: 20 }} type={`checkbox`} onClick={(e) => { imageSelected(e) }}></input>
        <img style={{ width: 200, height: 200 }} key={image.alt} src={(`${image.src}`)} />

      </div>
    )
  })
  const update = async (e) => {
    var fileUpload = new FormData();
    ImageInfo.map(images => {
      fileUpload.append("file", images.uploadImg)
    })
    fileUpload.append('email', email);
    await axios.post("http://localhost:5000/upload", fileUpload).then((res) => {
      console.log(res);
    })
  }
  const emailCheck = (e) => {
    let element = e.target.value;
    setEmail(element);
  }
  const emailChecked = async (e) => {
    await axios.post("http://localhost:5000/list", { email: email }).then((e) => {
      setUser("User Created");
      setNewUser(true);
    }).catch((err) => {
      console.log(err);
      setUser("User Email Already Found");
    })
  }
  const imageSelected = (e) => {
    console.log(e.target.checked);
    var data = [...selectedImage];
    if (e.target.checked) {
      data.push(e.target.value);
      setSelectedImage(data);
      console.log(data)
    }
    else {
      const index = data.indexOf(e.target.value);
      if (index > -1) {
        data.splice(index, 1);
      }
      setSelectedImage(data);
      console.log(data);
    }
  }
  
  return (
    <div className="App">
      {!newUser && <form >
        <h1>Email</h1>
        <input type="text" name="email" placeholder="email" value={email} onChange={(e) => { emailCheck(e) }} ></input>
        <br />
        <button type="button" onClick={(e) => { emailChecked(e) }}>Next</button>
        <p>{user}</p>
      </form>}
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

export default App;
