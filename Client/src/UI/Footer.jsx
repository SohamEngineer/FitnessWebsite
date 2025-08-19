import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/footer.css";
import logo from "../assets/img/Health___Fitness.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" data-aos-duration="1100" data-aos="fade-up">
      <div className="container">
        <div className="footer__wrapper">
          {/* Logo and description */}
          <div className="footer__box">
            <div className="logo">
              <div className="logo__img">
                <img src={logo} alt="Health & Fitness Logo" />
              </div>
              <h2>Health & Fitness</h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis itaque fugit nam mollitia nulla soluta.
            </p>
          </div>

          {/* Company */}
          <div className="footer__box">
            <h4 className="footer__title">Company</h4>
            <ul className="footer__links">
              <li>
                <NavLink to="/programs">Our Programs</NavLink>
              </li>
              <li>
                <NavLink to="/meal-plans">Meal Plans</NavLink>
              </li>
              <li>
                <NavLink to="/membership">Become a member</NavLink>
              </li>
            </ul>
          </div>

          {/* Healthy Living */}
          <div className="footer__box">
            <h4 className="footer__title">Healthy Living</h4>
            <ul className="footer__links">
              <li>
                <NavLink to="/fitness">Fitness</NavLink>
              </li>
              <li>
                <NavLink to="/nutrition">Nutrition</NavLink>
              </li>
              <li>
                <NavLink to="/experts">Experts</NavLink>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer__box">
            <h4 className="footer__title">Quick Links</h4>
            <ul className="footer__links">
              <li>
                <NavLink to="/about">About us</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact us</NavLink>
              </li>
              <li>
                <NavLink to="/support">Support</NavLink>
              </li>
            </ul>
          </div>
        </div>

        <p className="copyright">
          Copyright - {year} developed by Soham. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
