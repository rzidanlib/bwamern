import { CHECKOUT_BOOKING } from "../types";
import { API } from "config/API";

export const checkoutBooking = (payload) => (dispatch) => {
  dispatch({
    type: CHECKOUT_BOOKING,
    payload: payload,
  });
};

export const submitBooking = (payload) => () => {
  return API.post(`/booking-page`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
