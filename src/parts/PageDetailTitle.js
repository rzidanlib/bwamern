import React from "react";
import Fade from "react-reveal/Fade";

import Breadcrumb from "elements/Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function PageDetailTitle({ breadcrumb }) {
  const page = useSelector((state) => state.page);
  const { id } = useParams();

  const data = page?.[id] || {};

  return (
    <section className="container">
      <Fade bottom>
        <div className="row align-item-center">
          <div className="col">
            <Breadcrumb data={breadcrumb} />
          </div>
          <div className="col-auto text-center">
            <h1 className="h2">{data.title}</h1>
            <span className="text-gray-400">
              {data.city}, {data.country}
            </span>
          </div>
          <div className="col"></div>
        </div>
      </Fade>
    </section>
  );
}
