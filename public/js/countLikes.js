import axios from 'axios';
import { showAlert } from './alerts';

export const countLikes = async (tourId, user) => {
  try {
    let request_body = {
      "tour": tourId,
      "user":user
    }
    const res = await axios({
      method: 'POST',
      url: '/api/v1/likes',
      data: request_body
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Liked successfully!');
      window.setTimeout(() => {
        location.assign('/my-fav-tours');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'You have already liked it');
  }
};