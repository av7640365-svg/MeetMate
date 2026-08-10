import logo from './logo.svg';
import './App.css';
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom';
import LandingPage from './pages/landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VideoMeet from './pages/videomeet';
import Home from './pages/home.jsx';
import History from './pages/history.jsx';

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeComponent from './pages/home.jsx';

function App() {
  return (
    <>
  
    
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/:url' element={<VideoMeet/>}/>
        <Route path='/home' element={<HomeComponent/>}/>
        <Route path='/history' element={<History/>}/>
       </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
