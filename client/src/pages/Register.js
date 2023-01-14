import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import "../dist/main.css";
import { motion } from "framer-motion";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/register", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center auth">
      <motion.div
        className="w-400 card p-3"
        initial={{ y: -250, opacity: 0 }}
        animate={{ y: -10, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-lg">Study Space Finder - Register</h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" required />
          </Form.Item>

          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/login">Click Here To Login</Link>
            <motion.button
              className="secondary-btn"
              type="submit"
              // Animations in the Register Page
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Register
            </motion.button>
          </div>
        </Form>
      </motion.div>
    </div>
  );
}

export default Register;
