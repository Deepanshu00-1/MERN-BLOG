import jwt from "jsonwebtoken"

const userAuth = async(req,res)=>{
    const {token} = req.cookies;
    if(!token){
        return res.json({success: false, message: "Not authorized. Login again"})
    }
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodeToken){
            req.body.userId = decodeToken.id;
        }else{
            return res.json({success: false, message: 'Not authorized. Login again'})
        }
        next();
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}