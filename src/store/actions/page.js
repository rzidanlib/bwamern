import { API } from "config/API";
import { FETCH_PAGE } from "../types";

export const fetchPage = (url, page) => (dispatch) => {
  return API.get(url)
    .then((response) => {
      dispatch({
        type: FETCH_PAGE,
        payload: {
          [page]: response.data,
        },
      });
    })
    .catch(function (error) {
      console.log(error.toJSON());
    });
};
