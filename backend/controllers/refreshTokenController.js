const User = require('../model/User');

const jwt=require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {
    const cookies=req.cookies;
    if (!cookies?.jwt) return res.status(401).json({"message":"Refresh Token not in cookie"});
    // console.log(cookies.jwt);
    const refreshToken=cookies.jwt;
    const foundUser = await User.findOne({refreshToken}).exec();
    if (!foundUser) return res.status(403).json({"message":"User not found"}); //Unauthorized 
    // evaluate password 
    jwt.verify(
        refreshToken,
        process.env.ACCESS_TOKEN_REFRESH,
        (err,decoded)=>{
            if(err || foundUser.username!==decoded.username) return res.status(403).json({"message":"User not found"});
            const accessToken=jwt.sign(
                {'username':decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'5m'}
            )
            res.json({accessToken});
        }
    )
    
}

module.exports = { handleRefreshToken };