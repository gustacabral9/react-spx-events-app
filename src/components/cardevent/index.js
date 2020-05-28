import React from "react";
import { Link } from "react-router-dom";
import "./cardevent.css";
// import { Container } from './styles';

function CardEvent() {
  return (
    <div className="conteiner">
      <div class="card card-event">
        <img
          src="https://via.placeholder.com/100x50"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardEvent;
