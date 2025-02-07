import { React, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import "./blogs.css"
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Blogs = () => {

  const navigate = useNavigate();
  const {backendUrl} = useContext(AppContext)

  const [blogs, setBlogs] = useState([]);

  const addPost=(e)=>{
    e.preventDefault();
    navigate("/create-blog")
  }
  // let data;
  useEffect(()=>{
    axios.get(backendUrl + "/api/blog/blogs")
    .then(result => {
      setBlogs(result.data)
      console.log(result)
    })
    .catch(err => alert(err))
  },[])

  const deleteBlog = (id)=>{
    axios.delete(backendUrl + `/api/blog/delete-blog/${id}`)
    .then(result => {
      console.log(result)
      toast.success(result.data.message)
      window.location.reload()
      // toast.success(result.data.message)
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <div className="main">
        <header className="header">
          <h2>Personal Blog</h2>
          <button className="header-btn">Logout</button>
        </header>
        <div className="blogs">
          <div className="leftside" >
            <h1>Add new blog</h1>
            <button className="leftside-btn w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer   " onClick={addPost} >Add +</button>
          </div>
          <div className="rightside">
            <div className="blog" class="shadow p-3 mb-5 bg-body-tertiary rounded" >
            
            {blogs.map((blogs,index)=>{
              return (
                <div className="data" key={index}>
                <div className="info">
                  <h1>{blogs.title}</h1>
                  <p>{blogs.content}</p>
                </div>
                <div className="action">
                  <div className="actions">
                    <Link to = {`/update-blog/${blogs._id}`}><button className="actions-btn">Update</button></Link>
                    <button className=" delete-btn" onClick={(e)=>deleteBlog(blogs._id)}>Delete</button>
                  </div>
                  <div className="time">{blogs.createdAt}</div>
                
                </div>
              </div> 
              )
            })}
              
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blogs;
