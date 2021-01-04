/* eslint-disable prettier/prettier */
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');
const Likes = require('../models/likesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user _id'
  }).populate({
    path: 'bookings',
    fields: 'booked'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

//signup form
exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign Up'
  });
};

exports.getTokenForm = (req, res) => {
  res.status(200).render('tokenPage', {
    title: 'Reset Token'
  });
};

exports.getResetForm = (req, res) => {
  res.status(200).render('resetPassword', {
    title: 'Reset Password'
  });
};

exports.getforgotPassForm = (req, res) => {
  res.status(200).render('forgotpassword', {
    title: 'Forgot Password'
  });
};

exports.getMyReviewsForm = catchAsync(async (req, res,next) => {
  
  const docs = await Review.find({user:req.user.id});
  
  res.status(200).render('my-reviews', {
    title: 'My Reviews',
    docs
  });
});


exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });
console.log(`booking: ${bookings}`);
  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.getMyFavTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const fav = await Likes.find({ user: req.user.id });
console.log(`fav: ${fav}`);
  // 2) Find tours with the returned IDs
  const tourIDs = fav.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Favorite Tours',
    tours
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
