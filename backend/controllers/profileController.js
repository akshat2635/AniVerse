const User = require('../model/User');
const UserProfile = require('../model/UserProfile');

const handleProfile = async (req, res) => {
    const username = req.user.username;
    if (!username) return res.status(400).json({ 'message': 'check verifyjwt' });
    
    // check for duplicate usernames in the db
    try {
        const curuser = await User.findOne({username:username}).exec();
        if (!curuser) return res.status(409).json({"message":"User not Registered"}); //Conflict 
        let userProfile = await UserProfile.findOne({username:username}).exec();
        if(userProfile){
            Object.keys(req.body).forEach((key) => {
                if (req.body[key] !== undefined && key !== 'userId') {
                  userProfile[key] = req.body[key];
                }
            });
            await userProfile.save();
            return res.status(200).json({ message: 'Profile updated successfully', userProfile });
        }else{
            userProfile = new UserProfile(req.body);
            userProfile.username=curuser.username;
            userProfile.email=curuser.email;
            userProfile.CreatedAt=curuser.CreatedAt;
            
            await userProfile.save();
            return res.status(201).json({ message: 'Profile created successfully', userProfile });
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getProfile=async (req,res)=>{
    const username=req.user.username;
    if (!username) return res.status(400).json({ 'message': 'check verifyjwt' });
    try {
        let userProfile = await UserProfile.findOne({username:username}).exec();
        if(!userProfile) return res.status(400).json({"error":"User Profile not created"});
        return res.status(200).json({ userProfile });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleProfile,getProfile };