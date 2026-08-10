
import {createContext,useState,useContext} from "react";
import server from "../environment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import server from "../environment";
const AuthContext = createContext();




const client = axios.create({
    baseURL: `${server}/api/v1/users`
})


export const AuthProvider = ({children}) => {

   const authContext = useContext(AuthContext);
    
    const router = useNavigate();

  const [user,setUser] = useState(authContext);

 const handleSignUp = async (name, username,email, password) => {
        try {
            let request = await client.post("/Signup", {
                 name:name,
                 username:username,
                  email:email,
                  password:password
            });


            if (request.status === 201 ) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }

    const handleLogin = async (email, password) => {
        try {
            let request = await client.post("/login", {
                email:email,
                password: password
            });

            console.log(email, password)
            console.log(request.data)

            if (request.status === 200) {
                localStorage.setItem("token", request.data.token);
                router("/home")
            }
        } catch (err) {
            throw err;
        }
    }


const getHistoryOfUser = async()=>{
  try{
    let request = await client.get("/get_all_activity",{
      params:{
        token:localStorage.getItem("token")
      } 
    });
    return request.data
  } catch(e){
    throw e;
  }
}

const addToUserHistory = async(meetingCode)=>{
try{
  let request = await client.post("/add_to_activity",{
    token:localStorage.getItem("token"),
    meeting_code:meetingCode
  });
  return request
}catch(e){
  throw e;
}
}

const data = {
  getHistoryOfUser,addToUserHistory,handleSignUp,handleLogin
};

  return (
    <AuthContext.Provider value={{user,setUser,...data}}>
        {children}
    </AuthContext.Provider>
  );
}



export default AuthContext;