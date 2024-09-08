const User = require('../model/User');

const handleLogout = async (req, res) => {
    // on client delete access token
    const cookies=req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    console.log(cookies.jwt);
    const refreshToken=cookies.jwt;

    const foundUser =  await User.findOne({refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie('jwt',{httpOnly:true});
        return res.sendStatus(204); 
    }//Unauthorized 
    // evaluate password 
    foundUser.refreshToken='';
    const result=await foundUser.save();
    // console.log(result);
    res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true});
    res.sendStatus(204);
}

module.exports = { handleLogout };