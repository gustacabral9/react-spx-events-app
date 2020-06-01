import React, { useState } from "react";
import rocket from "./rocket.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  return (
    <div>
      {useSelector((state) =>
        state.isSignin > 0 ? (
          <nav className="navbar navbar-expand-lg navbar-light navbar-logged">
            <Link className="navbar-brand" to="/">
              <img alt="logo spx" src={rocket} width="30"></img>
              <span className="ml-2 my-logo text-white font-weight-bold">
                Spx Events
              </span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="text-white">
                <i className="fas fa-caret-down "></i>
              </span>
            </button>
            <div
              className="collapse colap-nav-logged  navbar-collapse ml-md-4 ml-sm-0 "
              id="navbarTogglerDemo01"
            >
              <form className="form-inline d-flex ml-2 w-75">
                <input
                  className="form-control mr-sm-2 w-75 "
                  type="search"
                  placeholder="Procurar evento"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn my-2 my-sm-0 nav-new-event text-white"
                  type="button"
                >
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <div
              className="collapse colap-nav-logged  navbar-collapse justify-content-end"
              id="navbarTogglerDemo01"
            >
              <ul className="navbar-nav  align-self-end ul-logged">
                <li className="nav-item active nav-new-event mx-1">
                  <Link
                    to="/user/publish"
                    className="nav-link  text-white font-weight-bold"
                  >
                    Publicar Evento {search}
                  </Link>
                </li>
                <li className="nav-item active nav-new-event mx-1">
                  <Link
                    to="/user/events"
                    className="nav-link  text-white font-weight-bold"
                  >
                    Meus Eventos
                  </Link>
                </li>
                <li className="nav-item logout active  nav-new-event mx-1">
                  <Link
                    to=""
                    onClick={() => dispatch({ type: "LOG_OUT" })}
                    className="nav-link text-white font-weight-bold"
                  >
                    Sair
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-expand-lg d-flex navbar-main">
            <Link className="navbar-brand" to="/">
              <img alt="logo spx" src={rocket} width="30"></img>
              <span className="ml-2 my-logo text-white font-weight-bold">
                Spx Events
              </span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="text-white">
                <i className="fas fa-caret-down"></i>
              </span>
            </button>
            <div
              className="collapse colap-nav  navbar-collapse ml-md-4 ml-sm-0 "
              id="navbarTogglerDemo01"
            >
              <form className="form-inline d-flex ml-2 w-75">
                <input
                  className="form-control mr-sm-2 w-75 "
                  type="search"
                  placeholder="Procurar evento"
                  aria-label="Search"
                />
                <button
                  className="btn my-2 my-sm-0 nav-new-event text-white"
                  type="button"
                >
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <div
              className="collapse colap-nav  navbar-collapse justify-content-end"
              id="navbarTogglerDemo01"
            >
              <ul className="navbar-nav  align-self-end">
                <li className="nav-item active nav-new-event mx-1">
                  <Link
                    to="/signup"
                    className="nav-link text-white font-weight-bold"
                  >
                    Registrar-se
                  </Link>
                </li>
                <li className="nav-item active nav-new-event mx-1">
                  <Link
                    to="/signin"
                    className="nav-link text-white font-weight-bold"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )
      )}
    </div>
  );
}
export { rocket };
export default Navbar;
