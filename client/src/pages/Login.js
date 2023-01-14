import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import '../dist/main.css'
import {motion} from 'framer-motion';


function Login() {

    const navigate= useNavigate();
   const dispatch=useDispatch();
   const onFinish = async(values)=>{
    try{
        dispatch(ShowLoading());
        const response=await axios.post("/api/users/login",values);
        dispatch(HideLoading());
        if(response.data.success){
            message.success(response.data.message);
            localStorage.setItem("token",response.data.data);
            window.location.href="/";
        } else {
            message.error(response.data.message);
        }
    }
    catch(error){
        dispatch(HideLoading());
        message.error(error.message);
    }
}; 

    return(
        <div className="h-screen d-flex justify-content-center align-items-center auth">
            <motion.div className='w-400 card p-3'
            //Animations on the Login Page 
            initial={{y:-250,opacity:0}}
            animate={{y:-10,opacity:1}}
            transition={{delay:0.2}}>
                <h1 className="text-lg">Study Space Finder - Login</h1>
                <hr />
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label='Email' name='email'>
                    <input type="text" required />
                </Form.Item>
                <Form.Item label='Password' name='password'>
                    <input type="password" required/>
                </Form.Item>

                <div className="d-flex justify-content-between align-items-center my-3">
                     <Link to="/register">Click Here To Register</Link>
                    <motion.button className="secondary-btn" type="submit"

                   
                    initial={{x:'-100vw'}}
                    animate={{x:0}}
                    transition={{delay:0.2}}
                    >
                     Login
                    </motion.button>
                 </div>
            </Form>
            </motion.div>
        </div>
    );
}

export default Login;