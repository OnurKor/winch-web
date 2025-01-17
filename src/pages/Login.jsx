import React, { useEffect } from "react";
import Logo from "../assets/logo/logo.jpeg";
import { Form, Formik, useFormik } from "formik";
import validation from "../utils/validation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../store/services/mainSlice";
import load from "../assets/logo/load.gif";
import { setVerifyToken } from "../utils/verifyjwt";
import { useLoginMutation } from "../store/services/authApi";
import { setCredentials } from "../store/services/authSlice";
import Cookies from "universal-cookie";
import Input from "../components/formElement/Input";
import OutlinedBaseBtn from "../components/buttons/OutlinedBaseBtn";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [login, { isLoading }] = useLoginMutation();

  
  const handleLogin = async (values) => {
    try {
      const data = await login(values).unwrap(); 
      if (data.status === 'ok') {
        const { access_token, user } = data.ret;
        // Redux'a kaydet
        dispatch(
          setCredentials({
            bearer: { access: access_token }, 
            user,
          })
        );
        navigate("/")
        
      } else {
        console.error('Login failed:', data.error_message);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="h-[100%] flex justify-center items-center ">
      <div className="w-[300px] md:w-[400px] lg:w-[550px] h-[450px] bg-white  rounded-xl shadow-lg">
        <div className="flex justify-center items-center my-12">
          <img alt="Logo" src={Logo} className="w-[280px]" />
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, actions) => {
            console.log(values);

            handleLogin({
              username: values.email,
              password: values.password,
            })
            
          }}
        >
          {({
            
            handleSubmit,
            
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div className="w-full flex gap-2 flex-wrap justify-center items-center">
                  <div className="flex flex-col  gap-2 flex-wrap md:flex-nowrap w-[80%]">
                    <div className=" flex flex-col  w-full gap-2 ">
                      <Input name="email" label="Name" />
                      <Input name="password" label="Password" />
                    </div>
                  </div>
                  <OutlinedBaseBtn title="Giriş Yap" type="submit" />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
