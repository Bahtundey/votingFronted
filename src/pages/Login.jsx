import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import "../styles/login.css";
import anime from "../assets/anime.webp";


const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="login-bg">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">

          
          <div className="col-lg-10">
            <div className="row align-items-center">

              
              <div className="col-md-6 d-none d-md-flex justify-content-center">
                <img
                  src={anime}
                  alt="Voting animation"
                  className="img-fluid login-anime"
                />
              </div>

              
              <div className="col-md-6">
                <h2 className="text-center mb-4 text-white">Welcome Back</h2>

                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const { data } = await API.post("/auth/login", values);

                      dispatch(
                        loginSuccess({
                          token: data.token,
                          user: data.user,
                        })
                      );

                      navigate(
                        data.user.role === "admin" ? "/admin" : "/user",
                        { replace: true }
                      );
                    } catch (err) {
                      alert(err.response?.data?.error || "Login failed");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="card p-4 shadow-lg border-0">
                      {/* EMAIL */}
                      <label>Email</label>
                      <Field name="email" className="form-control" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />

                     
                      <label className="mt-3">Password</label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />

                     
                      <button
                        type="submit"
                        className="btn btn-primary w-100 mt-4"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Logging in..." : "Login"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
