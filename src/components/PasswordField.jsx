import React, { useState } from "react";
import { Field } from "formik";
import { Eye, EyeOff } from "lucide-react"; 


export default function PasswordField({ name }) {
const [show, setShow] = useState(false);
return (
<div className="position-relative">
<Field
name={name}
type={show ? "text" : "password"}
className="form-control"
/>
<span
onClick={() => setShow(!show)}
style={{
position: "absolute",
right: "10px",
top: "50%",
transform: "translateY(-50%)",
cursor: "pointer",
}}
>
{show ? <EyeOff size={18} /> : <Eye size={18} />}
</span>
</div>
);
}