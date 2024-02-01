import Button from "elements/Button";
import { InputDate, InputNumber } from "elements/Form";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { checkoutBooking } from "store/actions/checkout";

function BookingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    duration: 1,
    date: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  });

  const page = useSelector((state) => state.page);
  const { id } = useParams();

  const itemDetails = page?.[id] || {};

  function updateData(e) {
    const { name, value } = e.target;

    if (name === "duration") {
      const startDate = new Date(data.date.startDate);
      const endDate = new Date(
        startDate.setDate(startDate.getDate() + +value - 1)
      );

      setData({
        ...data,
        [name]: value,
        date: {
          ...data.date,
          endDate: endDate,
        },
      });
    }

    if (name === "date") {
      const startDate = new Date(value.startDate);
      const endDate = new Date(value.endDate);
      const countDuration = new Date(endDate - startDate).getDate();

      setData({
        ...data,
        [name]: value,
        duration: countDuration,
      });
    }
  }

  function startBooking() {
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
    <div className="card bordered" style={{ padding: "60px 80px" }}>
      <h4 className="mb-3">Start Booking</h4>
      <h5 className="h2 text-teal mb-4">
        {itemDetails.price}{" "}
        <span className="text-gray-500 font-weight-light">
          per {itemDetails.unit}
        </span>
      </h5>

      <label htmlFor="duration">How long you will stay?</label>
      <InputNumber
        max={30}
        suffix={" night"}
        isSuffixPlural
        onChange={updateData}
        name="duration"
        value={data.duration}
      />

      <label htmlFor="date">Pick a date</label>
      <InputDate onChange={updateData} name="date" value={data.date} />

      <h6
        className="text-gray-500 font-weight-light"
        style={{ marginBottom: 40 }}
      >
        you will pay{" "}
        <span className="text-gray-900">
          {itemDetails.price * data.duration} USD
        </span>{" "}
        per{" "}
        <span className="text-gray-900">
          {data.duration} {itemDetails.unit}
        </span>
      </h6>

      <Button
        className="btn"
        hasShadow
        isPrimary
        isBlock
        onClick={startBooking}
      >
        Continue to Book
      </Button>
    </div>
  );
}

export default BookingForm;
