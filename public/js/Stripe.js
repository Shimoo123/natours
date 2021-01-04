/* eslint-disable */
//import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { showAlert } from './alerts';
//const stripe = Stripe('pk_test_51Hwz2BLMBBT0XvECX4wy2PaLjkWCN1aXZYyfxmcFaaGJEWKqMUor5eook8KHCaxFRPOC78njg0BTxSrP266287dN00Bot94zrP');
const stripePromise  = loadStripe('pk_test_51Hwz2BLMBBT0XvECX4wy2PaLjkWCN1aXZYyfxmcFaaGJEWKqMUor5eook8KHCaxFRPOC78njg0BTxSrP266287dN00Bot94zrP');
export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    const stripe = await stripePromise
    stripe.redirectToCheckout({
      sessionId: session.data.session.id
     }); 
  } catch (err) {
    console.log(err); 
    showAlert('error', err);
  }
};
