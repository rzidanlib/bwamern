import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorResponseHandler = (error) => {
  if (error) {
    let message;
    if (error.message) {
      if (error.response.status === 500) message = "Something went wrong!";
      else if (error.response.status === 404)
        message = "Field cannot be empty!";
      else message = error.response.message;

      console.log(message);
      toast(message);

      return Promise.reject(error);
    }
  }
};

export default errorResponseHandler;
