import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { register } from "./ApiRequest";
import { useNavigate } from "react-router-dom";

const Register = () => {
 const navigate = useNavigate();
 const submitForm = async (formData) => {
  const { data } = await register(formData);
  if (data.status == 200) {
   navigate("/");
  }
 };
 const formAttr = (form, field) => ({ onChange: form.handleChange, onBlur: form.handleBlur, value: form.values[field] });
 const errorContainer = (form, field) => {
  return form.touched[field] && form.errors[field] ? <span className="text-danger">{form.errors[field]}</span> : null;
 };

 return (
  <div className="row d-flex justify-content-center">
   <div className="col-3">
    <Formik
     initialValues={{ username: "", email: "", password: "" }}
     validationSchema={yup.object({
      email: yup.string().required("required").email("Enter valid email"),
      username: yup.string().required("required."),
      password: yup.string().required("required."),
     })}
     onSubmit={(formData) => {
      submitForm(formData);
     }}
    >
     {(runform) => (
      <form onSubmit={runform.handleSubmit} className="d-flex flex-column">
       <input className="form-control mb-3" type="text" name="email" {...formAttr(runform, "email")} />
       {errorContainer(runform, "email")}
       <input className="form-control mb-3" type="text" name="username" {...formAttr(runform, "username")} />
       {errorContainer(runform, "username")}
       <input className="form-control mb-3" type="password" name="password" {...formAttr(runform, "password")} />
       {errorContainer(runform, "password")}
       <button className="btn btn-primary mb-3" type="submit">
        Register
       </button>
      </form>
     )}
    </Formik>
   </div>
  </div>
 );
};

export default Register;
