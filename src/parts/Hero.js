import React from "react";
import Fade from "react-reveal/Fade";

import ImageHero from "assets/images/img-hero.jpg";
import ImageHero_ from "assets/images/img-hero-frame.jpg";

import Button from "elements/Button";

import formatNumber from "utils/formatNumber";

export default function Hero(props) {
  function showMostPicked() {
    window.scrollTo({
      top: props.refMostPicked.current.offsetTop - 30,
      behavior: "smooth",
    });
  }

  return (
    <Fade bottom>
      <section className="container">
        <div className="row align-items-center">
          <div
            className="col-12 col-lg-auto pr-lg-5 mb-5 mb-lg-0"
            style={{ width: 530 }}
          >
            <h1 className="font-weight-bold line-height-1 mb-3">
              Forget Busy Work, <br />
              Start Next Vacation
            </h1>
            <p
              className="mb-4 font-weight-light text-gray-500 w-75"
              style={{ lineHeight: "170%" }}
            >
              We provide what you need to enjoy your holiday with family. Time
              to make another memorable moments.
            </p>
            <Button
              className="btn px-5"
              hasShadow
              isPrimary
              onClick={showMostPicked}
            >
              Show Me Now
            </Button>
            <div className="row" style={{ marginTop: 80 }}>
              <div className="col-auto">
                <img
                  width="36"
                  height="36"
                  src="/images/icons/icon_traveler.svg"
                  alt={`${props.data.traveller} Travelers`}
                />
                <h6 className="mt-3">
                  {formatNumber(props.data.traveller)}{" "}
                  <span className="text-gray-500 font-weight-light">
                    travelers
                  </span>
                </h6>
              </div>

              <div className="col-auto">
                <img
                  width="36"
                  height="36"
                  src="/images/icons/icon_treasure.svg"
                  alt={`${props.data.treasure} Treasures`}
                />
                <h6 className="mt-3">
                  {formatNumber(props.data.treasure)}{" "}
                  <span className="text-gray-500 font-weight-light">
                    treasures
                  </span>
                </h6>
              </div>

              <div className="col-auto">
                <img
                  width="36"
                  height="36"
                  src="/images/icons/icon_cities.svg"
                  alt={`${props.data.city} Cities`}
                />
                <h6 className="mt-3">
                  {formatNumber(props.data.city)}{" "}
                  <span className="text-gray-500 font-weight-light">
                    cities
                  </span>
                </h6>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 pt-3">
            <div className="image-hero-placeholder position-relative">
              <img
                src={ImageHero}
                alt="Room with couches"
                className="img-fluid position-relative"
                style={{ zIndex: 2 }}
              />
              <img
                src={ImageHero_}
                alt="Room with couches frame"
                className="img-fluid position-absolute"
              />
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
}
