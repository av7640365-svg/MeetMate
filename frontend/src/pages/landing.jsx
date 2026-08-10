import React from 'react'
import "../App.css"
import {useNavigate} from 'react-router-dom';






export default function LandingPage(){
    const router = useNavigate();
    return (
       
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>MeetMate</h2>
                </div>
                <div className='navlist'>
                    <p onClick={()=>{
                        router("/Guest")
                    }}>Join as Guest</p>
                    <p onClick={()=>{
                        router("/SignUp")
                    }}>Register</p>
                    <div role='button'><p onClick={()=>{
                        router("/login")
                    }}>Login</p></div>
                </div>
            </nav>
            <div className="landingMainContainer">
                <div>
                 <h1><span style={{color:"#FF9839"}}>Connect</span> with your loved Ones</h1>
                 <p>Cover a distance by MeetMate</p>
                 <div role='button'>
                 <a href="/login">Get Start</a>
                 </div>
                </div>
                <div>  
                    <img src="/mobile.png" alt=""/>
                </div>
            </div>
        </div>
    )
}