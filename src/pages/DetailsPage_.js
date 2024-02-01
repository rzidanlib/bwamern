import Activities from "parts/Activities";
import BookingForm from "parts/BookingForm_";
import FeatureImage from "parts/FeatureImage";
import Footer from "parts/Footer";
import Header from "parts/Header";
import PageDetailDescription from "parts/PageDetailDescription";
import PageDetailTitle from "parts/PageDetailTitle";
import Testimony from "parts/Testimony";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "react-reveal";
import { useParams } from "react-router-dom";
import { fetchPage } from "store/actions/page";

function DetailsPage() {
  const page = useSelector((state) => state.page);
  const { id } = useParams();
  const dispatch = useDispatch();

  const breadcrumb = [
    { pageTitle: "Home", pageHref: "/" },
    { pageTitle: "House Details", pageHref: "" },
  ];

  const fnLoadPage = useCallback(
    async (id) => {
      if (!page[id]) {
        try {
          const response = await dispatch(fetchPage(`/detail-page/${id}`, id));
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [dispatch, page]
  );

  useEffect(() => {
    const fetchData = async () => {
      await fnLoadPage(id);
      window.scrollTo(0, 0);
    };

    document.title = `Staycation | Details Page`;

    // fnLoadPage(id);
    fetchData();
  }, [id, fnLoadPage]);

  if (!page[id]) return null;

  return (
    <>
      <Header />
      <PageDetailTitle breadcrumb={breadcrumb} />
      <FeatureImage />

      <section
        className="container"
        style={{ marginBottom: "160px", zIndex: 1 }}
      >
        <div className="row">
          <div className="col-7 pr-5">
            <Fade bottom>
              <PageDetailDescription data={page[id]} />
            </Fade>
          </div>
          <div className="col-5">
            <Fade bottom>
              <BookingForm itemDetails={page[id]} />
            </Fade>
          </div>
        </div>
      </section>

      <Activities data={page[id].activityId} />
      <Testimony data={page[id].testimonial} />

      <Footer />
    </>
  );
}

export default DetailsPage;
