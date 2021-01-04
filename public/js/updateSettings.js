/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const mongoose = require('mongoose');

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const postReview = async (data1,id) => {
  try {
    
  
    var _id = mongoose.Types.ObjectId(id);
    const url = `/api/v1/tours/${id}/reviews`
    console.log(url);
    let request_body = {
      "review": data1
    }
    const res = await axios({
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      url:url,
      data:request_body
    });
 
    if (res.data.status === 'success') {
      showAlert('success', ` Review added successfully!`);
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1500);
    }
  } catch (err) {
   showAlert('error', 'You can not do review on unbooked tour');
   
  }
};

export const editReview = async (data1,id) => {
  try {
  
    const url = `/api/v1/reviews/${id}`
    
    let request_body = {
      "review": data1
    }
    const res = await axios({
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      url:url,
      data:request_body
    });
 
    if (res.data.status === 'success') {
      showAlert('success', ` Review updated successfully!`);
     
    }
  } catch (err) {
   showAlert('error', err.message);
   
  }
};
