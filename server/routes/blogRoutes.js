import express from "express"
import { createBlog, deleteBlog, updateBlog } from "../controllers/blogController.js";
import userAuth from "../middleware/userAuth.js";


const blogRouter = express.Router();

blogRouter.post("/create-blog", createBlog)
blogRouter.get("/update-blog", updateBlog)
blogRouter.delete("/delete-blog", deleteBlog)


export default blogRouter;