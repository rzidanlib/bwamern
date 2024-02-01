import Button from "elements/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkoutBooking } from "store/actions/checkout";

function ButtonSubmitBooking({ data, itemDetails }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function fnStartBooking() {
    dispatch(
      checkoutBooking({
        _id: itemDetails._id,
        duration: data.duration,
        date: {
          startDate: data.date.startDate,
          endDate: data.date.endDate,
        },
      })
    );
    navigate("/checkout");
  }

  return (
    <Button
      className="btn"
      hasShadow
      isPrimary
      isBlock
      onClick={fnStartBooking}
    >
      Continue to Book
    </Button>
  );
}

export default ButtonSubmitBooking;
