import React, { useEffect, useState } from 'react'
import { getAllPost } from './ApiRequest'
import { ImgUrl } from './const'
import { Link } from 'react-router-dom'
import ReactPaginate from "react-paginate"

const PostList = () => {
 const [posts,setPosts] = useState([])

 useEffect(() => { 
  getPosts()
 }, [])

 const getPosts =async () => {
  const { data } = await getAllPost()
   if (data.status == 200) {
   setPosts(data.data)
  }
 }
 
 return (
  <div className="container-fluid">
   <div className="row row-cols-1 row-cols-md-4">
       {posts.map((item) =>  (
    <Link to="/postDetail" state={{...item}}>        
      <div className="card h-100 border mt-3">
       <img className='card-img-top img-fluid' src={ImgUrl + item.image} alt="" />
       <div className="card-body">
        <h5 className='card-title'>{item.title}</h5>
          <p className='card-text'>{(item.description)}</p>             
       </div>
      </div>
    </Link>
    ) 
       )}
       <ReactPaginate />
   </div>
 </div>
  )
}

export default PostList
