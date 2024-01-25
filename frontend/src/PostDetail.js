import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImgUrl } from "./const";
import { deletePost } from "./ApiRequest";

const PostDetail = () => {
 const postData = useLocation()?.state;
 const navigate = useNavigate();

 const handleEdit = async () => {
  navigate("/addPost", { state: { ...postData } });
 };

 const handleDelete = async () => {
  const { data } = await deletePost({ _id: postData._id });
  if (data.status === 200) {
   navigate("/posts");
  }
 };

 return (
  <div className="d-flex justify-content-center pt-4">
   <div className="w-50">
    <div className="card ">
     {console.log(ImgUrl + postData.image)}
     <img src={ImgUrl + postData.image} alt="" />
     <div className="card-body">
      <h5 className="card-title">{postData.title}</h5>
      <p className="card-text">{postData.description}</p>
      <div className="d-flex gap-2">
       <button className="btn btn-outline-primary" onClick={() => handleEdit()}>
        Edit
       </button>
       <button className="btn btn-outline-primary" onClick={() => handleDelete()}>
        Delete
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default PostDetail;
