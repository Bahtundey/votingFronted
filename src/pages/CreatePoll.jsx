import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import API from "../services/api";


const PollSchema = Yup.object().shape({
  title: Yup.string().required("Poll title is required"),
  description: Yup.string().required("Poll description is required"),
  choicesRaw: Yup.string()
    .required("Choices are required")
    .test("at-least-two", "Enter at least 2 choices", (value) => {
      if (!value) return false;
      const arr = value.split("\n").map((s) => s.trim()).filter(Boolean);
      return arr.length >= 2;
    }),
  endsAt: Yup.string().required("End date is required"),
});

export default function CreatePoll({ onCreated }) {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        choicesRaw: "",
        endsAt: "",
      }}
      validationSchema={PollSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          const payload = {
            title: values.title.trim(),
            description: values.description.trim(),
            choices: values.choicesRaw
              .split("\n")
              .map((c) => ({ text: c.trim() }))
              .filter((c) => c.text.length > 0),
            endsAt: values.endsAt,
          };
      
          console.log("PAYLOAD SENT TO BACKEND:", payload);
      
          await API.post("/polls", payload);
      
          alert("Poll created!");
      
          if (onCreated) onCreated();  
          resetForm();
        } catch (err) {
          console.error("CREATE POLL ERROR:", err);
          alert("Failed to create poll");
        }
      
        setSubmitting(false);
      }}
      
      
    >
      {({ isSubmitting }) => (
        <Form className="p-3">
          <h4 className="mb-3">Create a New Poll</h4>

          
          <label>Poll Title</label>
          <Field
            name="title"
            className="form-control"
            placeholder="Enter poll title"
          />
          <ErrorMessage name="title" component="div" className="text-danger" />

          
          <label className="mt-3">Description</label>
          <Field
            as="textarea"
            name="description"
            className="form-control"
            placeholder="Describe the poll"
            rows={3}
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-danger"
          />

          
          <label className="mt-3">Choices (one per line)</label>
          <Field
            as="textarea"
            name="choicesRaw"
            className="form-control"
            placeholder="Option 1&#10;Option 2&#10;Option 3"
            rows={4}
          />
          <ErrorMessage
            name="choicesRaw"
            component="div"
            className="text-danger"
          />

          
          <label className="mt-3">End Date</label>
          <Field type="datetime-local" name="endsAt" className="form-control" />
          <ErrorMessage name="endsAt" component="div" className="text-danger" />

         
          <button
            type="submit"
            className="btn btn-success mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Poll..." : "Create Poll"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
