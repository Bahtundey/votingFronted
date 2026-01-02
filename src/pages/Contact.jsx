import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import API from "../services/api";

const ContactSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Message required"),
});

export default function Contact() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2>Contact Us</h2>

     
      {success && (
        <div className="alert alert-success mt-3">
          Message sent successfully!
        </div>
      )}

      <Formik
        initialValues={{ email: "", message: "" }}
        validationSchema={ContactSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await API.post("/contact/send", values);
            setSuccess(true);
            resetForm();

            
            setTimeout(() => setSuccess(false), 4000);
          } catch (err) {
            alert("Failed to send message.");
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="card p-4 shadow mt-3">
            <label>Email</label>
            <Field name="email" className="form-control" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger mt-1"
            />

            <label className="mt-3">Message</label>
            <Field
              as="textarea"
              name="message"
              className="form-control"
              rows={5}
            />
            <ErrorMessage
              name="message"
              component="div"
              className="text-danger mt-1"
            />

            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
