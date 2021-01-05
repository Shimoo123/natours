/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import {signup, login, logout,forgotPassword,confirmToken} from './login';
import { updateSettings,postReview ,editReview} from './updateSettings';
import { bookTour } from './stripe';
import { countLikes } from './countLikes'

// DOM ELEMENTS

const mapBox = document.getElementById('map');
const signupForm = document.querySelector('.form--signup');
const forgotPassForm = document.querySelector('.form--forgotPass');
const tokenForm = document.querySelector('.form--token');
const resetForm = document.querySelector('.form--reset');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form form-user-data');
const reviewForm = document.querySelector('.form-user-review');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const likeBtn = document.getElementById('like-tour');
const reviewText = document.getElementById('edit-review-text');


// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

  if (tokenForm)
  tokenForm.addEventListener('submit', e => {
    e.preventDefault();
    const validToken = document.getElementById('token').value;
    confirmToken(validToken);
  });

if (forgotPassForm)
  forgotPassForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPassword(email);
  });

  if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name,email, password,passwordConfirm);
  });

  if (resetForm)
  resetForm.addEventListener('submit', e => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup( password,passwordConfirm);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit',async e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
   await updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });


  if (reviewForm)
  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const newReview = document.getElementById('review').value;
    const  tourId  =  document.getElementById('write-review').value;
    postReview(newReview,tourId);
  });

  if (likeBtn)
  likeBtn.addEventListener('click', e => {

    const tour = likeBtn.value.split(',')[0];
    const user = likeBtn.value.split(',')[1];
    
    countLikes(tour,user);
  });

  if (reviewText) {
    reviewText.addEventListener('input', e => {
      console.log(e.target);
    const editedReview = reviewText.innerText;
    const reviewId  = e.target.attributes[3].nodeValue;
    console.log(`id: ${reviewId}`);
    editReview(editedReview,reviewId) ; 
  });
}