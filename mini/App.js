import React from "react";
import { SafeAreaView, StyleSheet, TextInput,Button } from "react-native";
import axios from 'axios';


const App = () => {
  const [id, setId] = React.useState(null);
  const [session_id, setSession_Id] = React.useState(null);
  const [direction,setDirection] = React.useState(null);

  const val = async() =>{
    if(id!=null ){
    //const data = await axios.post("http://cda2-103-114-208-197.ngrok.io/listings/recordSwipe", { id: id, session_id: session_id, direction:direction });
    const data = await axios.delete(`http://cda2-103-114-208-197.ngrok.io/listings/delete/${id}`, { id: id})
    console.log(`http://cda2-103-114-208-197.ngrok.io/listings/delete/${id}`)
    console.log(data.data);
    console.log(id);
// console.log(session_id);
// console.log(direction);
setId(null);
// setDirection(null);
// setSession_Id(null);
}
    else{
      alert('Fill all the fields')
    }

  }
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setId}
        value={id}
        placeholder={"Id"}
      />
      <TextInput
        style={styles.input}
        onChangeText={setSession_Id}
        value={session_id}
        placeholder="Session Id"
        
      />
      <TextInput
        style={styles.input}
        onChangeText={setDirection}
        value={direction}
        placeholder="Direction"
        
      />
      <Button
      title={"submit"}
      onPress={()=>{val()}}
      >
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default App;