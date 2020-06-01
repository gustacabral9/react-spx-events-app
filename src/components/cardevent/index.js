import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cardevent.css";
import firebase from "../../config/firebase";
// import { Container } from './styles';
function CardEvent({ key, img, title, data, hour }) {
  const [urlBanner, setUrlBanner] = useState();

  useEffect(
    (a) => {
      firebase
        .storage()
        .ref(`banners/${img}`)
        .getDownloadURL()
        .then((url) => setUrlBanner(url));
    },
    [img, urlBanner]
  );

  return (
    <a href="#1" className="main-cards">
      <div class="card card-event mx-2 my-2 ">
        <img src={urlBanner} class="card-img-top img-card-width" alt="..." />
        <div class="card-body">
          <h5 class="card-title font-weight-bold text-center">{title}</h5>
          <h5 class="card-title text-center font-weight-bold card-datecolor">
            às {hour} do dia {data}
          </h5>
        </div>
      </div>
    </a>
  );
}

export default CardEvent;
