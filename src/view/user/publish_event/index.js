import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// Firebase
import firebase from "../../../config/firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// Components & Styles
import Navbar from "../../../components/navbar";
import "./publish_event.css";

function PublishEvent() {
  const storage = firebase.storage();
  const db = firebase.firestore();
  const [eventTitle, setEventTitle] = useState();
  const [eventType, setEventType] = useState();
  const [company, setCompany] = useState();
  const [data, setData] = useState();
  const [hour, setHour] = useState();
  const [description, setDescription] = useState();
  const [banner, setBanner] = useState();
  const [address, setAddress] = useState();
  const [access, setAccess] = useState();
  const [loading, setLoading] = useState();
  const [msg, setMsg] = useState();
  const [save, setSave] = useState();
  const email = useSelector((state) => state.userEmail);
  function Newname(min, max) {
    if (max == null) {
      max = min == null ? Number.MAX_SAFE_INTEGER : min;
      min = 0;
    }

    min = Math.ceil(min); // inclusive min
    max = Math.floor(max); // exclusive max

    if (min > max - 1) {
      throw new Error("Incorrect Args");
    }

    return min + Math.floor((max - min) * Math.random());
  }
  async function doPost() {
    setLoading("true");
    const randomName = Newname();

    try {
      const bannerName = randomName + banner.name;
      if (eventType === "Online") {
        await storage
          .ref(`images/${bannerName}`)
          .put(banner)
          .then(() =>
            db
              .collection("events")
              .add({
                title: eventTitle,
                banner: bannerName,
                type: eventType,
                company: company,
                data: data,
                hour: hour,
                description: description,
                address: "null",
                access: access,
                email: email,
              })
              .then((r) => {
                console.log(r);
                setLoading("false");
                setMsg("success");
                setTimeout(() => {
                  setSave(1);
                }, 1000);
              })
              .catch((e) => {
                console.log(e);
                setLoading("false");
                setMsg("error");
              })
          )
          .catch((e) => {
            console.log(e);
            setLoading("false");
            setMsg("error");
          });
      }
    } catch {
      setLoading("false");
      setMsg("error");
    }
    try {
      const bannerName = randomName + banner.name;
      if (eventType === "Presencial") {
        await storage
          .ref(`banners/${bannerName}`)
          .put(banner)
          .then(() =>
            db
              .collection("events")
              .add({
                title: eventTitle,
                banner: bannerName,
                type: eventType,
                company: company,
                data: data,
                hour: hour,
                description: description,
                address: address,
                access: "null",
                email: email,
              })
              .then((r) => {
                setLoading("false");
                setMsg("success");
                setTimeout(() => {
                  setSave(1);
                }, 1000);
              })
              .catch((e) => {
                setLoading("false");
                setMsg("error");
              })
          )
          .catch((e) => {
            setLoading("false");
            setMsg("error");
          });
      }
    } catch {
      setLoading("false");
      setMsg("error");
    }
  }
  return (
    <>
      {useSelector((state) =>
        state.isSignin === 0 ? <Redirect to="/signin" /> : null
      )}
      <Navbar />
      {save === 1 ? <Redirect to="/user/events" /> : null}
      <div className="jumbotron">
        <div className="row ">
          <div className="col-md-4">
            <h1 className="font-weight-bolder detail-event">
              Detalhes do seu evento
            </h1>
            <article className="detail-info">
              Vamos precisar algumas informações básicas sobre o seu primeiro
              evento.
            </article>
          </div>
          <div className="col-md-8 main-publish">
            <form className="my-2">
              <div className="row form-group">
                <div className="col-md-6">
                  <label htmlFor="eventtitle">Titulo: </label>
                  <input
                    className="form-control"
                    id="eventtitle"
                    placeholder="Ex: Futebol com amigos"
                    type="text"
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="typeevent">Tipo de evento:</label>
                  <select
                    className="form-control"
                    id="typeevent"
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option disabled value selected>
                      --- Selecione ---
                    </option>
                    <option>Online</option>
                    <option>Presencial</option>
                  </select>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-md-6">
                  <label htmlFor="company">Responsável: </label>
                  <input
                    className="form-control"
                    id="company"
                    placeholder="Você também será atribuido como responsável!"
                    type="text"
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                {eventType === "Presencial" && (
                  <div className="col-md-6">
                    <label htmlFor="address">Local: </label>
                    <input
                      className="form-control"
                      id="address"
                      placeholder="O mais detalhado possível!"
                      type="text"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                )}
                {eventType === "Online" && (
                  <div className="col-md-6">
                    <label htmlFor="link">Link/Acesso: </label>
                    <input
                      className="form-control"
                      id="link"
                      placeholder="Link da stream, youtube, facebook etc..."
                      type="url"
                      onChange={(e) => setAccess(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="row form-group">
                <div className="col-md-6 col-7">
                  <label htmlFor="data">Data: </label>
                  <input
                    className="form-control"
                    id="data"
                    type="date"
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>
                <div className="col-md-6 col-5">
                  <label htmlFor="time">Horario: </label>
                  <input
                    className="form-control"
                    id="time"
                    type="time"
                    onChange={(e) => setHour(e.target.value)}
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-md-12">
                  <label htmlFor="descripton">Descrição: </label>
                  <textarea
                    className="form-control"
                    id="descripton"
                    rows="4"
                    placeholder="Seja criativo! Boas descrições atraem mais pessoas "
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroupFileAddon01"
                      >
                        Upload
                      </span>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        onChange={(e) => setBanner(e.target.files[0])}
                      />
                      {banner === undefined ? (
                        <label
                          className="custom-file-label"
                          htmlFor="inputGroupFile01"
                        >
                          Banner do evento
                        </label>
                      ) : (
                        <label
                          className="custom-file-label"
                          htmlFor="inputGroupFile01"
                        >
                          {banner.name}
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="msg-login  text-center my-4">
                    {msg === "success" && (
                      <div className="alert alert-success" role="alert">
                        <span>
                          <strong>Evento criado com sucesso!</strong>
                        </span>
                      </div>
                    )}
                    {msg === "error" && (
                      <span>
                        <div className="alert alert-danger" role="alert">
                          Ops! Ocorreu um erro, tente novamente mais tarde ou
                          preencha corretamente os campos acima
                          <span role="img" aria-label="emoji error">
                            &#128373;
                          </span>
                        </div>
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={doPost}
                    className="btn btn-lg btn-block btn-publish"
                  >
                    {loading === "true" ? (
                      <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <span>Publicar</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublishEvent;
