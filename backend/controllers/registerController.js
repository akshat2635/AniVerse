const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user,email, pwd } = req.body;
    if (!user || !email || !pwd) return res.status(400).json({ "registered":false,'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({username:user}).exec();
    if (duplicate) return res.status(409).json({"registered":false,"message":"User Already Present"}); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const result =await User.create({ 
            "username": user,
            "email":email,
            "password": hashedPwd 
        });
        console.log(result);
        res.status(201).json({"registered":true, 'message': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };