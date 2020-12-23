/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();  
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const reviewRouter = require('../routes/reviewRoutes');

router.use('/:userId/reviews/', reviewRouter);


router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/signup', authController.signup);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
.route('/')
.get(userController.getAllUsers)
.post(userController.createUser);
router
.route('/:id')
//.get(reviewController.getAllReviews)
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;