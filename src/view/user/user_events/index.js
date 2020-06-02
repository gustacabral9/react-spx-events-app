import React, { useState, useEffect } from "react";

import firebase from "../../../config/firebase";
import CardEvent from "../../../components/cardevent";
import { useSelector } from "react-redux";

// Components & Styles
import Navbar from "../../../components/navbar";
import "./user_events.css";

function UserEvents() {
  const email = useSelector((state) => state.userEmail);
  const [events, setEvents] = useState([]);

  let listEvents = [];
  const searchSelector = useSelector((state) => state.search);
  useEffect(() => {
    firebase
      .firestore()
      .collection("events")
      .get()
      .then((r) => {
        r.docs.forEach((doc) => {
          if (doc.data().email === email) {
            listEvents.push({
              id: doc.id,
              ...doc.data(),
            });
          }
        });
        setEvents(listEvents);
      });
  });
  return (
    <>
      <Navbar />
      <h2 className="header-title">Gerenciar eventos</h2>
      <div className="row">
        {events.map((item) => (
          <CardEvent
            key={item.id}
            img={item.banner}
            title={item.title}
            data={item.data}
            hour={item.hour}
          />
        ))}
      </div>
    </>
  );
}

export default UserEvents;
