const rating = require('../model/rating');
const User = require('../model/User');

const addRating = async (req, res) => {
    const { animeId, userRating,review } = req.body;
    // return res.status(400).json({"message":"Rating must be from 1-10"})
    const username = req.user.username;
    if (!username || !animeId ) return res.status(400).json({ 'message': 'details missing' });
    const foundUser = await User.findOne({username:username}).exec();
    // console.log(foundUser);
    if (!foundUser) return res.status(401).json({"message":"dhanka jwt nhi aaya"}); //Unauthorized 
    // evaluate password 
    // if(userRating<1 && userRating>10) return res.status(400).json({"message":"Rating must be from 1-10"})
    try {
        const foundRating=await rating.findOne({username:username,animeId:animeId});
        if(foundRating){
            if(userRating) foundRating.rating=userRating;
            if(review) foundRating.review=review;
            foundRating.reviewedAt=Date.now();
            await foundRating.save();
            return res.status(200).json({ 'message': 'rating updated' });
        }else{
            if(!userRating) return res.status(400).json({ 'message': 'rating is required for new review' });
            const newRating = new rating({
                username: username,
                animeId: animeId,
                rating: userRating
            });
            if(review) newRating.review=review;
            await newRating.save();
            return res.status(200).json({ 'message': 'rating added' });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({"message":err.message})
    }
}

const getRatingsUser = async (req, res) => {
    if(!req?.user?.username) return res.status(400).json({ "message": 'JWT ne nhi diya username' });
    if(!req?.params?.id) return res.status(400).json({ "message": 'animeID is required' })
    try {
        const userReviews = await rating.find({username:req.user.username,animeId:req.params.id}).exec();
        if (!userReviews) {
        return res.status(400).json({ "message": `there are no reviews by ${req.user.username}` });
        }
        res.json(userReviews[0]);
        
    } catch (err) {
        return res.status(400).json({"Error":err.message});
    }
}
const getRatings = async (req, res) => {
    if(!req?.user?.username) return res.status(400).json({ "message": 'JWT ne nhi diya username' })
    try {
        const userReviews = await rating.find({username:req.user.username}).sort({reviewedAt:'descending'}).exec();
        if (!userReviews) {
        return res.status(400).json({ "message": `there are no reviews by ${req.user.username}` });
        }
        res.json(userReviews);
        
    } catch (err) {
        return res.status(400).json({"Error":err.message});
    }
}

const getTrending = async (req, res) => {
    try {
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 15);  // Calculate the date 10 days ago
  
      const trendingAnime = await rating.aggregate([
        // Match condition: ratings above 7 and reviewed within the last 10 days
        {
          $match: {
            rating: { $gt: 7 },
            reviewedAt: { $gte: tenDaysAgo }  // Filter out reviews older than 10 days
          }
        },
        // Group by animeId and calculate the count of ratings and the latest reviewedAt date
        {
          $group: {
            _id: "$animeId",  // Group by animeId
            count: { $sum: 1 },  // Count how many times the anime was rated
            latestReview: { $max: "$reviewedAt" }  // Get the most recent review date
          }
        },
        // Add fields to calculate days since the latest review
        {
          $addFields: {
            daysSinceLatestReview: {
              $divide: [
                { $subtract: [new Date(), "$latestReview"] },
                1000 * 60 * 60 * 24  // Convert milliseconds to days
              ]
            }
          }
        },
        // Sort by count (number of high ratings) and recency factor (most recent review comes first)
        {
          $sort: {
            count: -1,  // Highest number of reviews comes first
            daysSinceLatestReview: 1  // For ties in count, the most recent review comes first
          }
        },
        // Project only the animeId and the count of ratings
        {
          $project: {
            _id: 0,  // Do not return _id
            animeId: "$_id",  // Return animeId
            count: 1,  // Optionally return the count of ratings if needed
            latestReview: 1  // Optionally return the latest review date if needed
          }
        }
      ]).exec();
  
      res.json(trendingAnime);
      
    } catch (err) {
      console.error("Error details:", err);
      return res.status(400).json({ "Error": err.message });
    }
  }
  
  
  
  

const getRatingsbyAnime = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ "message": 'animeID is required' })
    try {
        const userReviews = await rating.find({animeId:req.params.id}).sort({reviewedAt:'descending'}).exec();
        if (!userReviews) {
            return res.status(400).json({ "message": `there are no reviews for ${req.params.id}` });
        }
        res.json(userReviews);
    } catch (err) {
        return res.status(400).json({"Error":err.message});
    }
}

module.exports = { addRating ,getRatings,getRatingsbyAnime,getRatingsUser,getTrending};