import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components & Styles

import Navbar from "../../components/navbar";
import { rocket } from "../../components/navbar";
import "./signin.css";

// Firebase
import firebase from "../../config/firebase";
import "firebase/auth";

function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const [msg, setMsg] = useState();

  const dispatch = useDispatch();
  async function doSignin() {
    setLoading("true");
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((r) => {
          setMsg("success");
          setLoading("false");
          setTimeout(() => {
            dispatch({ type: "LOG_IN", userEmail: email });
          }, 2000);
        })
        .catch((e) => {
          setMsg("error");
          setLoading("false");
        });
    } catch {
      setLoading("false");
    }
  }
  return (
    <>
      {useSelector((state) =>
        state.isSignin > 0 ? <Redirect to="/" /> : null
      )}
      <Navbar />
      <div className=" d-flex align-items-center signin-content">
        <form
          className="form-signin mx-auto col-sm-4"
          onKeyUp={(e) => (e.key === "Enter" ? doSignin() : null)}
        >
          <div className="text-center mx-auto my-auto">
            <img alt="logo spx" src={rocket} width="50" className="my-2"></img>
            <h1 className="h3 mb-3 font-weight-bold text-dark">
              Entre com suas credenciais
            </h1>
          </div>
          <div className="col-auto">
            <label className="sr-only" for="email">
              Email
            </label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </div>
              </div>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="col-auto">
            <label className="sr-only" for="password">
              Email
            </label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-key"></i>
                </div>
              </div>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-auto text-center font-weight-bold text-white">
            <button
              type="button"
              onClick={doSignin}
              className="btn btn-lg btn-block btn-signin"
            >
              {loading === "true" ? (
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <span>Iniciar Sessão</span>
              )}
            </button>
            <Link to="/signup" className="my-4 text-dark">
              <small>Novo por aqui? Crie sua conta agora.</small>
            </Link>
          </div>
          <div className="msg-login  text-center my-4">
            {msg === "success" && (
              <div className="alert alert-success" role="alert">
                <span>
                  <strong>Login efetuado com sucesso, Redirecionando...</strong>
                </span>
              </div>
            )}
            {msg === "error" && (
              <span>
                <div className="alert alert-danger" role="alert">
                  Ops! Usuario ou senha incorretos
                  <span role="img" aria-label="emoji error">
                    &#128373;
                  </span>
                </div>
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Signin;
