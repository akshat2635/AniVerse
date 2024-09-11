const User = require('../model/User');
const bcrypt = require('bcrypt');

const jwt=require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({username:user}).exec();
    // console.log(foundUser);
    if (!foundUser) return res.status(401).json({ 'message':   `User ${user} not Found.` }); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken=jwt.sign(
            {'username':foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1h'}
        );
        const refreshToken=jwt.sign(
            {'username':foundUser.username},
            process.env.ACCESS_TOKEN_REFRESH,
            {expiresIn:'1d'}
        );

        foundUser.refreshToken=refreshToken;
        const result=await foundUser.save();
        // console.log(result);
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',maxAge: 24*60*60*1000});
        res.status(200).json({'message':"Logged in Successfully",accessToken});
    } else {
        res.status(401).json({"message":"Incorrect Password"});
    }
}

module.exports = { handleLogin };