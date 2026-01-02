import React, { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AdminPollManagement() {
  const [polls, setPolls] = useState([]);
  const [editing, setEditing] = useState(null);

  
  const [form, setForm] = useState({
    title: "",
    description: "",
    choices: "",
  });

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const { data } = await API.get("/polls/active");
      setPolls(data.polls);
    } catch (err) {
      console.error(err);
    }
  }

  
  function startEdit(poll) {
    setEditing(poll._id);
    setForm({
      title: poll.title,
      description: poll.description,
      choices: poll.choices.map((c) => c.text).join("\n"), 
    });
  }

  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-white">Poll Management</h2>

      
      <div className="mt-4">
        {polls.map((poll) => (
          <div
            key={poll._id}
            className="card p-3 mb-3 shadow-sm"
            style={{ background: "#fafafa" }}
          >
            <h4>{poll.title}</h4>
            <p className="mb-1">
              Ends at: <strong>{new Date(poll.endsAt).toLocaleString()}</strong>
            </p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => startEdit(poll)}
            >
              Edit Poll
            </button>
          </div>
        ))}
      </div>

      
      {editing && (
        <div className="mt-4">
          <Formik
            initialValues={{
              title: form.title,
              description: form.description,
              choices: form.choices,
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
              choices: Yup.string().required("Enter choices (one per line)"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await API.put(`/polls/${editing}`, {
                  title: values.title,
                  description: values.description,
                  choices: values.choices
                    .split("\n")
                    .map((c) => ({ text: c.trim() }))
                    .filter((c) => c.text.length > 0),
                });

                alert("Poll updated!");
                setEditing(null);
                fetchAll();
              } catch (err) {
                alert("Failed to update poll");
              }

              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="card p-4 shadow-lg mt-3">
                <h4>Edit Poll</h4>

                <label className="mt-2 fw-bold">Title</label>
                <Field name="title" className="form-control my-2" />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />

                <label className="mt-2 fw-bold">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="form-control my-2"
                  rows={3}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />

                <label className="mt-2 fw-bold">
                  Choices (one per line)
                </label>
                <Field
                  as="textarea"
                  name="choices"
                  className="form-control my-2"
                  rows={4}
                />
                <ErrorMessage
                  name="choices"
                  component="div"
                  className="text-danger"
                />

                <button
                  type="submit"
                  className="btn btn-success mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary mt-3 ms-3"
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </motion.div>
  );
}
