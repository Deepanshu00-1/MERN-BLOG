

// create blog

import BlogModel from "../models/BlogModel.js";
import UserModel from "../models/UserModel.js";

export const createBlog = async(req,res)=>{
    const {title, content, createdAt, createdBy, userId} = req.body;
    if(!title || !content){
        return res.json({success: false, message: "Missing details"});
    }
    try {
        const user = await UserModel.findOne({userId});
        const blog = new BlogModel({title, content, createdBy: user.name})
        await blog.save();
        return res.json({success: true, message: "Blog created ✔"})
    
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// update blog

export const updateBlog = async(req,res)=>{
    const {title, content, createdAt, createdBy, userId} = req.body;
    if(!title || !content){
        return res.json({success: false, message: "Missing details"})
    }
    try {
        const id = req.params.id;
        const blog = await BlogModel.findOne({id});
        if(!blog){
            return res.json({success: false, message: 'No such blog found!'})
        }
        blog._id = req.body.id;
        blog.title = req.body.title;
        blog.content = req.body.content;
        await blog.save();
        return res.json({success: true, message: "Blog updated successfully ✔"})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// delete blog

export const deleteBlog = async(req,res)=>{
    try {
        const id = req.params.id;
        await BlogModel.deleteOne({id});
        return res.json({success: true, message: "Blog Deleted Successfully ✔"})
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}