const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(400).json({
            success: false,
            message: 'Accsess token not found'
        })
    }else{
        try {
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SCRET);

            req.userId = decode.userId
            next()
        } catch (error) {
            console.log(error);
            return res.status(403).json({
                success: false,
                message: 'Invalid token'
            })
        }
    }
}

module.exports = verifyToken