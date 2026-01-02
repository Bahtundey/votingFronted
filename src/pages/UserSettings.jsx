import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import API from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../store/authSlice";
import "bootstrap-icons/font/bootstrap-icons.css";


const SettingsSchema = Yup.object().shape({
  name: Yup.string().required("Name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(6, "Min 6 characters"),
});

export default function UserSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [showPassword, setShowPassword] = useState(false);

  if (!user) return null; 

  return (
    <div className="container dashboard-card py-5 mt-5" style={{ maxWidth: 500 }}>
      <h2 className="mb-3 text-white fw-bold">Account Settings</h2>

      <Formik
        enableReinitialize
        initialValues={{
          name: user.name || "",
          email: user.email || "",
          password: "",
        }}
        validationSchema={SettingsSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const { data } = await API.put("/auth/update-profile", values);

            
            dispatch(updateProfile(data.user));

            resetForm({ values: { ...values, password: "" } });
            alert("Profile updated successfully!");
          } catch (err) {
            alert(err.response?.data?.error || "Update failed.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="card p-4 shadow">
            
            <label>Name</label>
            <Field name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger mt-1" />

            
            <label className="mt-3">Email</label>
            <Field name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger mt-1" />

           
            <label className="mt-3">New Password (optional)</label>
            <div className="input-group">
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter new password"
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
              </span>
            </div>
            <ErrorMessage name="password" component="div" className="text-danger mt-1" />

           
            <button
              type="submit"
              className="btn btn-primary mt-4 w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
