import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { createPost, editPost } from "./ApiRequest";
import { useLocation, useNavigate } from "react-router-dom";

const AddPost = () => {
 const navigate = useNavigate();
 const [image, setImage] = useState();
 const editData = useLocation()?.state;

 const submitForm = async (val) => {
  const formData = new FormData();
  formData.append("title", val.title);
  formData.append("description", val.description);
  formData.append("image", image);

  const { data } = await createPost(formData);
  if (data.status == 200) {
   navigate("/posts");
  }
 };

 const editForm = async (val) => {
  const formData = new FormData();
  formData.append("title", val.title);
  formData.append("description", val.description);
  formData.append("_id", editData._id);
  image && formData.append("image", image);
  const { data } = await editPost(formData);
  if (data.status == 200) {
   navigate("/posts");
  }
 };

 const formAttr = (form, field) => ({ onChange: form.handleChange, onBlur: form.handleBlur, value: form.values[field] });
 const errorContainer = (form, field) => {
  return form.touched[field] && form.errors[field] ? <span className="text-danger">{form.errors[field]}</span> : null;
 };
 return (
  <div className="row d-flex justify-content-center">
   <div className="col-4">
    <Formik
     initialValues={{
      title: editData ? editData.title : "",
      description: editData ? editData.description : "",
      // image: editData ? editData.image : "",
     }}
     validationSchema={yup.object({
      title: yup.string().required("title required."),
      description: yup.string().required("description required."),
      // image: yup.string().required("image required."),
     })}
     onSubmit={(formData) => {
      editData ? editForm(formData) : submitForm(formData);
     }}
    >
     {(runform) => (
      <form onSubmit={runform.handleSubmit} className="d-flex flex-column gap-2">
       <input type="text" className="form-control" name="title" {...formAttr(runform, "title")} />
       {errorContainer(runform, "title")}
       <input type="text" className="form-control" name="description" {...formAttr(runform, "description")} />
       {errorContainer(runform, "description")}
       <input
        type="file"
        className="form-control"
        name="image"
        {...formAttr(runform, "image")}
        onChangeCapture={(e) => {
         setImage(e.target.files[0]);
        }}
       />
       {errorContainer(runform, "image")}
       <button type="submit" className="btn btn-primary">
        {editData ? "Edit Post" : "Add Post"}
       </button>
      </form>
     )}
    </Formik>
   </div>
  </div>
 );
};

export default AddPost;
