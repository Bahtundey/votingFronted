import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; 
import anime from "../assets/anime.webp"; 
import PasswordStrength from "../components/PasswordStrength";
import { emailExists } from "../services/validateEmail";
import signup from "../assets/signup.webp";


const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .test("email-unique", "Email already in use", async (value) => {
      if (!value) return false;
      return !(await emailExists(value));
    }),

  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-bg">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">

          <div className="col-lg-10">
            <div className="row align-items-center">

              
              <div className="col-md-6 d-none d-md-flex justify-content-center">
                <img
                  src={signup}
                  alt="Signup animation"
                  className="img-fluid login-anime"
                />
              </div>

              
              <div className="col-md-6">
                <h2 className="text-center mb-4 text-white">
                  Create Your Account
                </h2>

                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      await API.post("/auth/register", values);
                      alert("Signup successful! Please login.");
                      navigate("/login");
                    } catch (err) {
                      alert(err.response?.data?.error || "Signup failed");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ isSubmitting, values }) => (
                    <Form className="card p-4 shadow-lg border-0">

                      
                      <label>Name</label>
                      <Field name="name" className="form-control" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />

                      
                      <label className="mt-3">Email</label>
                      <Field name="email" className="form-control" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />

                      
                      <label className="mt-3">Password</label>
                      <div className="input-group">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="form-control"
                        />
                        <span
                          className="input-group-text"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={`bi ${
                              showPassword ? "bi-eye-slash" : "bi-eye"
                            }`}
                          />
                        </span>
                      </div>

                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />

                      <PasswordStrength password={values.password} />

                      
                      <button
                        type="submit"
                        className="btn btn-success w-100 mt-4"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Creating account..." : "Sign Up"}
                      </button>

                      <p className="text-center mt-3 small">
                        Already have an account?{" "}
                        <span
                          className="text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("/login")}
                        >
                          Login
                        </span>
                      </p>
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
