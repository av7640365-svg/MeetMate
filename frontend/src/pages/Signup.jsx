import React,{useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

import {Container,Paper,Typography,TextField,Button,} from '@mui/material'

import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box";

import {toast} from "react-toastify";
import server from "../environment";

export default function Signup(){


    const [formData,setFormData] = useState({
        name:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({
            ...formData,[name]:value,
        });
    };

    const handleSubmit= async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(`${server}/api/v1/users/register`,formData);
            console.log(response.data);
            toast.success(response.data.message);
            if(response.status === 201){ navigate("/login"); }
        }
        catch(e){
            console.log(e);
         toast.error(e.response?.data?.message || e.message);
        }

    };

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
                Create Account
            </Typography>
            <TextField label="Name" type="name" name="name" variant="outlined" fullWidth value={formData.name} onChange={handleChange}/>

            <TextField label="User Name" type="name" name="username" variant="outlined" fullWidth margin="normal" value={formData.username} onChange={handleChange}/>

             <TextField label="Email" type="email" name="email" variant="outlined"
            fullWidth margin='normal' value={formData.email} onChange={handleChange} 
            />

            <TextField label="Password" name="password" type="password" variant="outlined"
            fullWidth margin='normal' value={formData.password} onChange={handleChange} />

            <TextField label=" Confirm Password" type="password" name="confirmPassword" variant="outlined"
            fullWidth margin='normal' value={formData.confirmPassword} onChange={handleChange} />

            <Button  type="submit" variant="contained" fullWidth sx={{mt:2}}>Create Account</Button>
            </form>
        </Paper>
       </Container>
    );
}