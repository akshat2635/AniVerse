require('dotenv').config();
const { logger } = require('./middleware/logEvents');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser=require('cookie-parser');
const mongoose = require('mongoose');   
const connectDb = require('./config/dbConn');
const { verifyJWT } = require('./middleware/verifyJWT');
const PORT = process.env.PORT || 6969;

connectDb();

app.use(logger);
app.use(cors());

app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

app.use(cookieParser());
 
// routes 
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// app.use('/review', require('./routes/review'));
app.use('/rating', require('./routes/rating'));
app.use(verifyJWT)

app.use('/profile', require('./routes/profile'));

mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});