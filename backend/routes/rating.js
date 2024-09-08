const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { verifyJWT } = require('../middleware/verifyJWT');

router.get('/anime/:id', ratingController.getRatingsbyAnime);
router.post('/',verifyJWT, ratingController.addRating);
router.get('/',verifyJWT, ratingController.getRatings);
router.get('/user/:id',verifyJWT, ratingController.getRatingsUser);

module.exports = router;