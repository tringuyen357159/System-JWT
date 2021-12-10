const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');
const argon2 = require('argon2');

let refreshTokens = [];

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.status(400).json({   
            success: false,
            message: "Missing Username or Password"
        })
    }else{
        try {
            const user = await User.findOne({ username:username });
            
            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect Username or Password'
                })
            }else {
                const passwordInvalid = await argon2.verify(user.password, password);
                if(!passwordInvalid) {
                    return res.status(400).json({
                        success: false,
                        message: 'Incorrect Username or Password'
                    })
                }else{
                    const accessToken = jwt.sign(
                        { userId: user._id, username: user.username },
                        process.env.ACCESS_TOKEN_SCRET,
                        { expiresIn: '3h' }
                    );

                    const refreshToken = jwt.sign(
                        { userId: user._id, username: user.username },
                        process.env.REFRESH_TOKEN_SCRET
                    );

                    refreshTokens.push(refreshToken);

                    return res.status(200).json({
                        success: true,
                        message: 'Login successfully',
                        accessToken,
                        refreshToken
                    })
                }
            }
        } catch (error) {
            console.log('Error', error);
            return res.status(500).json({
                success: false,
                message: 'Server error'
            })
        }
    }
}

const handleRefreshToken = (req, res) => {
    const refreshToken = req.body.token;

    if(!refreshToken) 
        return res.sendStatus(400)
    if(!refreshTokens.includes(refreshToken))
        return res.sendStatus(403)
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SCRET, (err, data) => {
        if(err)
            return res.sendStatus(403)

        const accessToken = jwt.sign(
            { userId: data.userId, username: data.username },
            process.env.ACCESS_TOKEN_SCRET,
            { expiresIn: '3d' }
        );

        return res.json({
            accessToken
        })
    })
}

const handleLogout = (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(refToken => refToken !== refreshToken);
    return res.sendStatus(200)
}

const handleCheckLogin = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user) {
            return res.status(400).json({   
                success: false,
                message: "User not Found"
            })
        }else{
            return res.status(200).json({
                success: true,
                user
            })
        }
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

module.exports = {
    handleLogin,
    handleRefreshToken,
    handleLogout,
    handleCheckLogin
}