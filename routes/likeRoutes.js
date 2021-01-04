/* eslint-disable prettier/prettier */
const express = require('express');
const likesController = require('../controllers/likesController');
const authController = require('../controllers/authController');
const router = express.Router();
router.use(authController.protect);

router
  .route('/')
  .get(likesController.getCountLikes)//,likesController.getAllLikes
  .post(
    authController.restrictTo('user'),
    likesController.createLike
  );

router
  .route('/:id')
  .get(likesController.getLike)
 
  .delete(
    authController.restrictTo('user', 'admin'),
    likesController.deleteLike
  );


module.exports = router;
