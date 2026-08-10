import withAuth from '../utils/withAuth.jsx';

import AuthContext from '../contexts/AuthContext.jsx';
import {useNavigate} from "react-router-dom";
import React,{useState,useContext} from 'react' 
 import {Badge,IconButton,TextField,Button} from "@mui/material";
import "../App.css";


import RestoreIcon from '@mui/icons-material/Restore';

 function HomeComponent(){

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");


    const {addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async ()=>{
        await addToUserHistory(meetingCode)
     navigate(`/${meetingCode}`)
    }


    return (
        <>
        <div className="navBar">
            <div style={{display:"flex", alignItems:"center"}}>
                <h3>MeetMate</h3>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
            <IconButton onClick={()=>navigate("/history")}>
                <RestoreIcon/>
                <p>History</p>
            </IconButton>
            <Button onClick={()=>{
                  localStorage.removeItem("token")
                  navigate("/")
            }}>Logout</Button>
            </div>
        </div>
        <div className="meetContainer">
            <div className="leftPanel">
                <div>
                    <h2>Providing Quality Video Just Like Quality Education</h2>

                    <div style={{display:'flex',gap:"10px"}}>
                       
                   <TextField onChange={e=>setMeetingCode(e.target.value)} label='Meeting Code' id="outlined"></TextField>

                   <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                    </div>
                </div>
            </div> 
            <div className="rightPanel">
                <img srcSet='logo3.png' alt=""/>
            </div>

        </div>


        </>
    )
}

export default withAuth(HomeComponent)
