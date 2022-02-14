import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [value, setValue] = useState({});
  const update = (e) => {
    let formValues = { ...value };
    formValues[e.target.name] = e.target.value;
    setValue(formValues);
    console.log(value);
  }
  const formSubmitted = async () =>{
    await axios.post("http://localhost:5000/listings/recordSwipe", { id: value.id, session_id: value.session_id, direction:value.direction });
  }
  return (
    <div className="App">
      <form onSubmit={formSubmitted}>
        <label>
          id:
          <br />
          <input type="text" name="id" value={value.id || ""} onChange={(e) => { update(e) }} />
        </label>
        <br />
        <label>
          session_id:
          <br />
          <input type="text" name="session_id" value={value.session_id || ""} onChange={(e) => { update(e) }} />
        </label>
        <br />
        <label>
          direction:
          <br />
          <input type="text" name="direction" value={value.direction || ""} onChange={(e) => { update(e) }} />
        </label>
        <br />
        {/* <input type="submit" value="Submit" /> */}
        <button type="submit" value={"Submit"} >Submit </button>
      </form>
    </div>
  );
}

export default App;
