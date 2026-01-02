import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import API from "../services/api";

const AvatarSchema = Yup.object().shape({
  avatar: Yup.mixed()
    .required("Avatar required")
    .test("fileSize", "File too large (max 2MB)", (value) =>
      !value || value.size <= 2 * 1024 * 1024
    )
    .test("fileType", "Unsupported format (PNG or JPG only)", (value) =>
      !value || ["image/png", "image/jpeg"].includes(value.type)
    ),
});

export default function AvatarUpload() {
  const [preview, setPreview] = useState(null);

  return (
    <div className="container py-5" style={{ maxWidth: 500 }}>
      <h2 className="mb-3">Upload Avatar</h2>

      <Formik
        initialValues={{ avatar: null }}
        validationSchema={AvatarSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = new FormData();
            formData.append("avatar", values.avatar);

            await API.post("/auth/upload-avatar", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Avatar uploaded successfully!");
          } catch (err) {
            alert("Upload failed");
            console.error(err);
          }

          setSubmitting(false);
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="card p-4 shadow" encType="multipart/form-data">
            
            {preview && (
              <div className="text-center mb-3">
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #ddd",
                  }}
                />
              </div>
            )}

            <input
              type="file"
              className="form-control"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = e.target.files[0];
                setFieldValue("avatar", file);

                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />

            <ErrorMessage
              name="avatar"
              component="div"
              className="text-danger mt-2"
            />

            <button
              type="submit"
              className="btn btn-primary mt-3 w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
