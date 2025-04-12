
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            message : "unauthorised login again"
        })
        
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET );
        req.userId = decoded.userId;

        next();
    }
    catch(error){
        return res.status(401).json({
            message: "Invalid token, please login again"
        });
    }
}

export {authMiddleware};