import httpStatus from "http-status";
import {User} from "../models/users.model.js";
import {Meeting} from "../models/meeting.model.js";

import bcrypt,{hash} from "bcrypt";
import crypto from "crypto";

const login = async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please provide"})
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User Not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(200).json({message:"Login Successfull",token:token,
                user:{
                   _id:user._id,
                   username:user.username,
                   name:user.name,
                   email:user.email,
            }
        });
        }else{
            return res.status(401).json({
                message:"Invalid user or Password"
            });
        }
    }catch(e){
        res.status(500).json({message:`Something went wrong ${e}`});
    }
};

const register = async (req,res) => {
    const {name,username,password,email} = req.body;

    try{
        const existingUser = await User.findOne({username});
       if(existingUser){
        return res.status(409).json({message:"User already exist"});
       }
       const hashedPassword = await bcrypt.hash(password,10);

       const newUser = new User({
        name:name,
        username:username,
        email:email,
        password:hashedPassword
       });
       await newUser.save();
       res.status(201).json({message:"User Registered"})
    }
       catch(e){
            res.json({message:`Something went wrong ${e} `})
       }

    };

 const getUserHistory = async (req,res) => {
    const {token} = req.query;
    try{
        const user = await User.findOne({token:token});
        const meetings = await Meeting.find({user_id:user.username});
        res.json(meetings)
    } catch(e){
        res.json({message:`Something went wrong ${e}`})
    }
 };
 const addToHistory = async (req,res)=>{
    const {token,meeting_code} = req.body;
    try{
        const user = await User.findOne({token:token});
        console.log(token);
        console.log(user);
        const newMeeting = new Meeting({
            user_id:user.username,
            meetingCode:meeting_code
        });
        console.log(newMeeting);
        await newMeeting.save();
        console.log("Meeting Save");

        res.status(201).json({message:"Added code to history"})
    } catch (e) {
        res.json({message:`Someting went wrong ${e}`})
    }
 };


    export {login,register,getUserHistory,addToHistory};
