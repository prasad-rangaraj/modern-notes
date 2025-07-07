const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.status(401).json({message: 'Please login to access'});
    } 
    try{
        const decoded =  jwt.verify(token,process.env.JWT_SECERT);
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({message: 'Invalid token'});
    }
};

module.exports = auth;