import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { login } from "./ApiRequest";
import { useNavigate } from "react-router-dom";

const Login = () => {
 const navigate = useNavigate();
 const submitForm = async (formData) => {
  const { data } = await login(formData);
  if (data.status === 200) {
   navigate("/posts");
  }
 };

 const formAttr = (form, field) => ({ onChange: form.handleChange, onBlur: form.handleBlur, value: form.values[field] });
 const errorContainer = (form, field) => {
  return form.touched[field] && form.errors[field] ? <span className="text-danger">{form.errors[field]}</span> : null;
 };

 return (
  <div className="container-fluid h-100">
   <div className="row h-100 d-flex justify-content-center align-items-center h-100">
    <div className="col-3 ">
     <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={yup.object({
       email: yup.string().required("required").email("Invalid email"),
       password: yup.string().required("required"),
      })}
      onSubmit={(formData) => {
       submitForm(formData);
      }}
     >
      {(runform) => (
       <form onSubmit={runform.handleSubmit} className="row">
        <input type="text" name="email" className="col-10 mb-3 form-control" {...formAttr(runform, "email")} />
        {errorContainer(runform, "email")}
        <input type="password" name="password" className="col-10 mb-3 form-control" {...formAttr(runform, "password")} />
        {errorContainer(runform, "password")}
        <button type="submit" className="col-10 mb-3 form-control btn btn-primary">
         Login
        </button>
       </form>
      )}
     </Formik>
    </div>
   </div>
  </div>
 );
};

export default Login;
