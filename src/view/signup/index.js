import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../../config/firebase";
import "firebase/auth";
import Navbar from "../../components/navbar";
import { rocket } from "../../components/navbar";
import "./signup.css";

// import { Container } from './styles';

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const [msg, setMsg] = useState();
  function enterPressed(event) {
    if (event.key === "Enter") {
      doSignup();
    }
  }
  async function doSignup() {
    setLoading("true");
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((r) => {
          setLoading("false");
          setMsg("success");
        })
        .catch((e) => {
          setLoading("false");
          setMsg("error");
        });
    } catch {
      setLoading("false");
      setMsg("error");
    }
  }
  return (
    <div className="conteiner">
      <Navbar />
      <div className=" d-flex align-items-center signin-content">
        <form
          className="form-signin mx-auto  col-sm-4"
          onKeyUp={(e) => (e.key === "Enter" ? doSignup() : null)}
        >
          <div className="text-center ">
            <img alt="logo spx" src={rocket} width="50" className="my-2"></img>
            <h1 className="h3 mb-3 font-weight-bold text-dark">
              Vamos criar sua conta
            </h1>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInputGroup">
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
                id="inlineFormInputGroup"
                placeholder="Seu melhor e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInputGroup">
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
                id="inlineFormInputGroup"
                placeholder="Senha"
                onKeyPress={enterPressed}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-auto text-center font-weight-bold text-white">
            <button
              type="button"
              onClick={doSignup}
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
            <Link to="/signin" className="my-4 text-dark">
              <small>Já tem uma conta? Faça login</small>
            </Link>
          </div>
          <div className="msg-login  text-center my-4">
            {msg === "success" && (
              <div className="alert alert-success" role="alert">
                <span>
                  <strong>Conta criada com sucesso, Redirecionando...</strong>
                </span>
              </div>
            )}
            {msg === "error" && (
              <span>
                <div className="alert alert-danger" role="alert">
                  Ops! Ocorreu um erro inesperado
                  <span role="img" aria-label="emoji error">
                    &#128373;
                  </span>
                </div>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
