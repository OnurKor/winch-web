import { object, string } from "yup";
import React from "react";
import Logo from "../assets/logo/logo.jpeg";
import { Form, Formik } from "formik";
import validation from "../utils/validation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../store/services/authApi";
import { setCredentials } from "../store/services/authSlice";
import Cookies from "universal-cookie";
import Input from "../components/formElement/Input";
import OutlinedBaseBtn from "../components/buttons/OutlinedBaseBtn";
import { toast } from "react-toastify";
import { toastErrorNotify } from "../helper/Toastfy";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (values) => {
    try {
      const data = await login(values).unwrap();
      console.log("data", data);
      if (data.success) {
        const { access_token, user } = data.content;
        
        // Redux'a kaydet

        if(user.role === "admin"){
          dispatch(
            setCredentials({
              bearer: { access: access_token },
              user,
            })
          );
        navigate("/")

        } else{
          toastErrorNotify("Yetkisiz Giriş")
        }
      } else {
        console.error("Login failed:", data.error_message);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  return (
    <div className="h-[100%] flex justify-center items-center ">
      <div className="w-[300px] md:w-[400px] lg:w-[550px] h-[450px] bg-white rounded-xl shadow-lg">
        <div className="flex justify-center items-center my-12">
          <img alt="Logo" src={Logo} className="w-[280px]" />
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validation} // Doğrulama şeması burada entegre ediliyor
          onSubmit={async (values) => {
            console.log(values);

            handleLogin({
              email: values.email,
              password: values.password,
            });
          }}
        >
          {({ handleSubmit, errors, touched }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div className="w-full flex gap-2 flex-wrap justify-center items-center">
                  <div className="flex flex-col gap-2 flex-wrap md:flex-nowrap w-[80%]">
                    <div className="flex flex-col w-full gap-2">
                      <Input
                        name="email"
                        label="Email"
                        error={touched.email && errors.email}
                      />
                      {errors.email && touched.email && <span className="text-red-500">{errors.email}</span>}

                      <Input
                        name="password"
                        label="Password"
                        error={touched.password && errors.password}
                      />
                      {errors.password && touched.password && <span className="text-red-500">{errors.password}</span>}
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
