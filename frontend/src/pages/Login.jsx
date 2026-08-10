import React ,{useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Container,Paper,Typography,TextField,Button,} from '@mui/material'

import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box";

import {toast} from "react-toastify";

import {useContext} from "react";
import AuthContext from "../contexts/AuthContext";

export default function Login(){

    const [formData,setFormData] = useState({
   email:"",
   password:"",
    });
     const navigate = useNavigate();
     const {user,setUser} = useContext(AuthContext);
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,[name]:value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
      const response = await axios.post("http://localhost:8000/api/v1/users/login",formData);
      console.log(response.status);
      toast.success(response.data.message);

      setUser(response.data.user);
      localStorage.setItem("token",response.data.token);

      if(response.status === 200){ navigate("/home"); }
        } catch(e){
            console.log(e);
            toast.error(e.response?.data?.message || e.message);
        }
    }
    return (
    
          <Container sx={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"linear-gradient(135deg,#eef2ff,#dbeafe)",
       }}>
        <Paper elevation={5}
        sx={{
            width:400,
            padding:4,
            borderRadius:3,
        }}>

    
            <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    mb: 2,
  }}
>
  <Avatar
    sx={{
      bgcolor: "#6366F1",
      width: 70,
      height: 70,
    }}
  >
  </Avatar>
</Box>

           <form onSubmit={handleSubmit}>
            <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            mb={3}>
                Login
            </Typography>
             <TextField label="Email" type="email" name="email" autoComplete='off' variant="outlined"
            fullWidth margin='normal' value={formData.email} onChange={handleChange} 
            />

            <TextField label="Password" name="password" type="password" autoComplete='new-password' variant="outlined"
            fullWidth margin='normal' value={formData.password} onChange={handleChange} />
            <Button  type="submit" variant="contained" fullWidth sx={{mt:2}}>Login</Button>
            </form>
        </Paper>
       </Container>
    );
}