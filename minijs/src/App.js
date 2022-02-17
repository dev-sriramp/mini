import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [value, setValue] = useState({id:null,session_id:null,direction:null});
  const update = async(e) => {
    e.preventDefault();
     let {file} = e.target.elements;
     file = file.files[0];
    console.log(file);
    var fileUpload = new FormData();
    fileUpload.append("file",file)
    await axios.post("http://localhost:5000/upload",fileUpload).then((res)=>{
      //console.log(res);
    })
    // let formValues = { ...value };
    // formValues[e.target.name] = e.target.value;
    // setValue(formValues);
    //console.log(value);
  }
  const formSubmitted = async () =>{
    if(value.id !== null && value.session_id !== null && value.direction !== null)
    axios.post("http://localhost:5000/upload", {data:{ id: value.id, session_id: value.session_id, direction:value.direction} }).then(res=>{
      console.log(res);
      console.log(res.data);
    });

  }
  return (
    <div className="App">
      <form onSubmit={update} encType="multipart/form-data"
      method='POST'
      >
        
        <label>
          session_id:
          <br />
          <input type="file" name="file"  />
        </label>
        <br />
        
        <br />
        {/* <input type="submit" value="Submit" /> */}
        <button type="submit" value={"Submit"}  >Submit </button>
      </form>
    </div>
  );
}

export default App;
