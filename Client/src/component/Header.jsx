import React, { useEffect, useRef, useState } from "react";
import "../styles/header.css";
import logo from "../assets/img/Health___Fitness.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const nav__links = [
  {
    path: "/",
    display: "Home",
  },
  {
    display: (
      <span className="arrow">
        Programs <i className="ri-arrow-down-s-line"></i>
      </span>
    ),
    children: [
      { path: "/homeworkout", display: "Home Workout" },
      { path: "/gymworkout", display: "Gym Workout" },
      { path: "/mealsection", display: "Meal Plan" },
    ],
  },
  {
    path: "/membership",
    display: "Membership",
  },
  {
    path: "/track",
    display: "Track your fitness",
  },
];

const Header = () => {
  const { authUser, logout } = useAuth();

  // Fallback: get from localStorage if authUser not available
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = authUser || storedUser;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const headerRef = useRef(null);
  const headerFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerFunc);
    return () => window.removeEventListener("scroll", headerFunc);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">
          <div className="logo">
            <div className="logo__img">
              <img src={logo} alt="" />
            </div>
            <h2>Health & Fitness</h2>
          </div>

          <div className="navigation">
            <ul className="menu">
              {nav__links.map((item) => (
                <li className="nav__item" key={item.path || item.display}>
                  {item.path ? (
                    <NavLink to={item.path}>{item.display}</NavLink>
                  ) : (
                    item.display
                  )}

                  {/* Dropdown if children exist */}
                  {item.children && (
                    <ul className="dropdown">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink to={child.path}>{child.display}</NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right">
            {user ? (
              <>
                <Avatar
                  onClick={handleAvatarClick}
                  style={{ cursor: "pointer" }}
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <NavLink to="/userprofile">Profile</NavLink>
                  </MenuItem>

                  {/* Optional Admin Panel */}
                  {/* {user.role === "admin" && (
                    <MenuItem onClick={handleClose}>
                      <NavLink to="/admin">Admin Panel</NavLink>
                    </MenuItem>
                  )} */}

                  <MenuItem
                    onClick={() => {
                      logout();
                      handleClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <NavLink to="/login">
                <button className="register__btn">Log In</button>
              </NavLink>
            )}

            <span className="mobile__menu">
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
