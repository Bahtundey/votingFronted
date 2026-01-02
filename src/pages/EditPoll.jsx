import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PollSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  choicesRaw: Yup.string()
    .required("Choices are required")
    .test("two-options", "Enter at least 2 choices", (val) => {
      if (!val) return false;
      return val.split("\n").filter((v) => v.trim() !== "").length >= 2;
    }),
  endsAt: Yup.string().required("End date required"),
});

export default function EditPoll() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);

  async function loadPoll() {
    try {
      const { data } = await API.get(`/polls/${id}`);
      setPoll(data);
    } catch (err) {
      console.error("Load poll failed:", err);
    }
  }

  useEffect(() => {
    loadPoll();
  }, []);

  if (!poll) return <p>Loading...</p>;

  return (
    <Formik
      initialValues={{
        title: poll.title,
        description: poll.description,
        choicesRaw: poll.choices.map((c) => c.text).join("\n"),
        endsAt: poll.endsAt.slice(0, 16),
      }}
      validationSchema={PollSchema}
      onSubmit={async (values) => {
        try {
          const payload = {
            title: values.title,
            description: values.description,
            choices: values.choicesRaw
              .split("\n")
              .map((c) => ({ text: c.trim() }))
              .filter((c) => c.text.length),
            endsAt: values.endsAt,
          };

          await API.put(`/polls/${id}`, payload);

          alert("Poll updated!");
          navigate("/admin/dashboard");
        } catch (err) {
          console.error("UPDATE FAILED:", err);
          alert("Failed to update poll");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="container mt-4 card p-4 shadow-sm">
          <h2>Edit Poll</h2>

          <label className="mt-3">Title</label>
          <Field className="form-control" name="title" />
          <ErrorMessage component="div" className="text-danger" name="title" />

          <label className="mt-3">Description</label>
          <Field className="form-control" name="description" />
          <ErrorMessage component="div" className="text-danger" name="description" />

          <label className="mt-3">Choices</label>
          <Field as="textarea" rows={4} className="form-control" name="choicesRaw" />
          <ErrorMessage component="div" className="text-danger" name="choicesRaw" />

          <label className="mt-3">End Date</label>
          <Field type="datetime-local" className="form-control" name="endsAt" />
          <ErrorMessage component="div" className="text-danger" name="endsAt" />

          <button type="submit" className="btn btn-success mt-4" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
