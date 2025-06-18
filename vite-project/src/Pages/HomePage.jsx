import React from "react";
import Header from "../components/HomePage Components/Header";
import Intro from "../components/HomePage Components/Intro";
import EventTypes from "../components/HomePage Components/EventTypes";
import Benefits from "../components/HomePage Components/Benefits";
import EventList from "../components/HomePage Components/EventList";
import Sponsors from "../components/HomePage Components/Sponsors";
import Footer from "../components/HomePage Components/Footer";

function HomePage() {
  return (
    <div>
      <Header />
      <Intro />
      <EventTypes />
      <Benefits />

      {/* <EventList /> */}
      <Sponsors />
      <Footer />
    </div>
  );
}

export default HomePage;
