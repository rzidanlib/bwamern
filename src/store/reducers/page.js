import { FETCH_PAGE } from "store/types";

const initialState = {};

export default function page(state = initialState, action) {
  switch (action.type) {
    case FETCH_PAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
