/* eslint-disable prettier/prettier */
const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const reviewRouter = require('../routes/reviewRoutes');
const bookingRouter = require('../routes/bookingRoutes');

const router = express.Router();
router.use('/:id/reviews', reviewRouter);
router.use('/:id/bookings', bookingRouter);

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/signup', authController.signup);

router.post('/forgotPassword',authController.forgotPassword);
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
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;