import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../components/navbar";
import firebase from "../../config/firebase";
import CardEvent from "../../components/cardevent";
function Home() {
  const [events, setEvents] = useState([]);
  let listEvents = [];

  useEffect(() => {
    firebase
      .firestore()
      .collection("events")
      .get()
      .then(async (r) => {
        r.docs.forEach((doc) => {
          listEvents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setEvents(listEvents);
      });
  });
  return (
    <>
      <Navbar />
      <h2 className="header-title">Proximos Eventos: </h2>
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
export default Home;
