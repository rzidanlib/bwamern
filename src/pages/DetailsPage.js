import React, { Component } from "react";
import { Fade } from "react-reveal";

import Header from "parts/Header";
import PageDetailTitle from "parts/PageDetailTitle";
import FeatureImage from "parts/FeatureImage";
import PageDetailDescription from "parts/PageDetailDescription";
import BookingForm from "parts/BookingForm";
import Catagories from "parts/Catagories";
import Testimony from "parts/Testimony";
import Footer from "parts/Footer";

import ItemDetails from "json/itemDetails.json";

export default class DetailsPage extends Component {
  componentDidMount() {
    window.title = "Details Page";
    window.scrollTo(0, 0);
  }

  render() {
    const breadcrumb = [
      { pageTitle: "Home", pageHref: "" },
      { pageTitle: "House Details", pageHref: "" },
    ];

    return (
      <>
        <Header {...this.props} />
        <PageDetailTitle breadcrumb={breadcrumb} data={ItemDetails} />
        <FeatureImage data={ItemDetails.imageUrls} />
        <section className="container">
          <div className="row">
            <div className="col-7 pr-5">
              <Fade bottom>
                <PageDetailDescription data={ItemDetails} />
              </Fade>
            </div>
            <div className="col-5">
              <Fade bottom>
                <BookingForm itemDetails={ItemDetails} />
              </Fade>
            </div>
          </div>
        </section>

        <Catagories data={ItemDetails.categories} />
        <Testimony data={ItemDetails.testimonial} />

        <Footer />
      </>
    );
  }
}
