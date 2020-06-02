import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../components/navbar";
import firebase from "../../config/firebase";
import CardEvent from "../../components/cardevent";
import { useSelector, useDispatch } from "react-redux";
function Home() {
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
          if (
            doc.data().title.indexOf(searchSelector) >= 0 ||
            doc.data().data.indexOf(searchSelector) >= 0
          ) {
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
      <h2 className="header-title">Proximos Eventos:</h2>
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
