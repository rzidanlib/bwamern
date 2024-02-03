import React, { useState } from "react";
import Fade from "react-reveal/Fade";

import Button from "elements/Button";
import BrandIcon from "parts/IconText";
import { useLocation } from "react-router-dom";

export default function Header({ isCentered }) {
  const [isActive, setIsActive] = useState(false);

  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? " active" : "";
  };

  if (isCentered) {
    return (
      <Fade>
        <header className="bg-white">
          <div className="container">
            <div className="navbar navbar-expand-lg navbar-light py-4">
              <Button className="brand-text-icon mx-auto" href="/" type="link">
                Stay<span className="text-gray-900">cation</span>
              </Button>
            </div>
          </div>
        </header>
      </Fade>
    );
  }

  return (
    <Fade>
      <header className="bg-white">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light py-4">
            <BrandIcon />

            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setIsActive(!isActive)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={` navbar-collapse collapse ${isActive ? "show" : ""}`}
            >
              <ul className="navbar-nav ml-auto">
                <li className={`nav-item ${getNavLinkClass("/")}`}>
                  <Button className="nav-link" type="link" href="/">
                    Home
                  </Button>
                </li>
                <li className={`nav-item ${getNavLinkClass("/browse-by")}`}>
                  <Button className="nav-link" type="link" href="/browse-by">
                    Browse By
                  </Button>
                </li>
                <li className={`nav-item ${getNavLinkClass("/stories")}`}>
                  <Button className="nav-link" type="link" href="/stories">
                    Stories
                  </Button>
                </li>
                <li className={`nav-item ${getNavLinkClass("/agents")}`}>
                  <Button className="nav-link" type="link" href="/agents">
                    Agents
                  </Button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </Fade>
  );
}
