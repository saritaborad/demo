import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./PostList";
import AddPost from "./AddPost";
import PostDetail from "./PostDetail";
import Form3 from "./Form2";

function RequireAuth() {
 let isAuthenticated = localStorage.getItem("admin_token");
 if (!isAuthenticated) {
  console.log(isAuthenticated);
  return <Navigate to={"/login"} />;
 } else {
  return <Outlet />;
 }
}

const RouteMain = () => {
 return (
  <>
   <BrowserRouter>
    <Routes>
     <Route path="/" element={<Form3 />} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route element={<RequireAuth />}>
      <Route path="/posts" strict element={<PostList />} />
      <Route path="/addPost" strict element={<AddPost />} />
      <Route path="/postDetail" strict element={<PostDetail />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
     </Route>
     <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
   </BrowserRouter>
  </>
 );
};

export default RouteMain;
