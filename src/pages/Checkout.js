import React, { Component } from "react";
import Fade from "react-reveal";
import { connect } from "react-redux";

import Header from "parts/Header";
import Button from "elements/Button";
import Stepper, {
  Numbering,
  Meta,
  MainContent,
  Controller,
} from "elements/Stepper";
import BookingInformation from "parts/Checkout/BookingInformation";
import Payment from "parts/Checkout/Payment";
import Completed from "parts/Checkout/Completed";

import { submitBooking } from "store/actions/checkout";
import { useNavigate } from "react-router-dom";

class Checkout extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      proofPayment: "",
      bankName: "",
      bankHolder: "",
    },
  };

  onChange = (event) => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value,
      },
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = "Staycation | Checkout";
  }

  _Submit = (nextStep) => {
    const { data } = this.state;
    const { checkout } = this.props;

    const payload = new FormData();
    payload.append("firstName", data.firstName);
    payload.append("lastName", data.lastName);
    payload.append("email", data.email);
    payload.append("phoneNumber", data.phone);
    payload.append("itemId", checkout._id);
    payload.append("duration", checkout.duration);
    payload.append("bookingStartDate", checkout.date.startDate);
    payload.append("bookingEndDate", checkout.date.endDate);
    payload.append("accountHolder", data.bankHolder);
    payload.append("bankFrom", data.bankName);
    payload.append("image", data.proofPayment[0]);
    // payload.append("bankId", checkout.bankId);

    this.props.submitBooking(payload).then(() => {
      nextStep();
    });
  };

  render() {
    const { data } = this.state;
    const { checkout, page } = this.props;
    if (!checkout) {
      return (
        <div className="container">
          <div
            className="row align-items-center justify-content-center text-center"
            style={{ height: "100vh" }}
          >
            <div className="col-3">
              Pilih Kamar Dulu
              <div>
                <Button
                  className="btn mt-5"
                  type="button"
                  onClick={() => window.history.back()}
                  isLight
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const steps = {
      bookingInformation: {
        title: "Booking Information",
        description: "Please fill up the blank fields below",
        content: (
          <BookingInformation
            data={data}
            checkout={checkout}
            ItemDetails={page[checkout._id]}
            onChange={this.onChange}
          />
        ),
      },
      payment: {
        title: "Payment",
        description: "kindly follow the instructions below",
        content: (
          <Payment
            data={data}
            checkout={checkout}
            ItemDetails={page[checkout._id]}
            onChange={this.onChange}
          />
        ),
      },
      completed: {
        title: "Yay! Completed",
        description: null,
        content: <Completed />,
      },
    };

    return (
      <>
        <Header isCentered />

        <Stepper steps={steps}>
          {(prevStep, nextStep, CurrentStep, steps) => (
            <>
              <Numbering
                data={steps}
                current={CurrentStep}
                style={{ marginBottom: 50 }}
              />

              <Meta data={steps} current={CurrentStep} />

              <MainContent data={steps} current={CurrentStep} />

              {CurrentStep === "bookingInformation" && (
                <Controller>
                  {data.firstName !== "" &&
                    data.lastName !== "" &&
                    data.email !== "" &&
                    data.phone !== "" && (
                      <Fade>
                        <ButtonSteps
                          isPrimary
                          hasShadow
                          stepsTo={nextStep}
                          text="Continue To Book"
                        />
                      </Fade>
                    )}
                  <ButtonSteps isLight text="Cancel" />
                </Controller>
              )}

              {CurrentStep === "payment" && (
                <Controller>
                  {data.proofPayment !== "" &&
                    data.bankName !== "" &&
                    data.bankHolder !== "" && (
                      <Fade>
                        <ButtonSteps
                          isPrimary
                          hasShadow
                          stepsTo={() => this._Submit(nextStep)}
                          text="Continue to Book"
                        />
                      </Fade>
                    )}
                  <ButtonSteps
                    isLight
                    stepsTo={prevStep}
                    text="Previous Step"
                  />
                </Controller>
              )}

              {CurrentStep === "completed" && (
                <Controller>
                  <ButtonSteps isPrimary hasShadow text="Back to Home" />
                </Controller>
              )}
            </>
          )}
        </Stepper>
      </>
    );
  }
}

function ButtonSteps(props) {
  const { text, isLight, isPrimary, hasShadow, stepsTo } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (stepsTo) {
      stepsTo();
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Button
        className="btn mb-3"
        type="button"
        isBlock
        isLight={isLight}
        isPrimary={isPrimary}
        hasShadow={hasShadow}
        onClick={handleClick}
      >
        {text}
      </Button>
    </>
  );
}

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  page: state.page,
});

export default connect(mapStateToProps, { submitBooking })(Checkout);
