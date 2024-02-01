import axios from "axios";

import errorResponseHandler from "./errorResponseHandler";

const URI_BASE = process.env.REACT_APP_HOST;

export const API = axios.create({
  baseURL: `${URI_BASE}/api/v1/member`,
});

API.interceptors.response.use((response) => response, errorResponseHandler);
