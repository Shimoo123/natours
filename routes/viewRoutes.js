/* eslint-disable prettier/prettier */
const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/',bookingController.createBookingCheckout, authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup',  viewsController.getSignupForm);
router.get('/forgotpassword',  viewsController.getforgotPassForm);
router.get('/token-page',  viewsController.getTokenForm);
router.get('/reset-password',  viewsController.getResetForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-reviews', authController.protect, viewsController.getMyReviewsForm);
router.get('/my-fav-tours', authController.protect, viewsController.getMyFavTours);


router.get(
  '/my-tours',
  bookingController.createBookingCheckout,
  authController.protect,
  viewsController.getMyTours
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
