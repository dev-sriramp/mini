import React ,{useState, createContext} from "react";

const userData = createContext({});


const ContextProvider = ({children}) =>{
  const [userEmail,setUserEmail] = useState("");

  // const updateUser = async(props) =>{
  //   console.log(props);
  //   setUserEmail(props.email)
  // }

  return(
    <userData.Provider value={{userEmail,setUserEmail}}>
      {children}
    </userData.Provider>
  )
}
export {userData};
export default ContextProvider;
