import React from "react";
import Header from "../components/HomePage Components/Header";
import Intro from "../components/HomePage Components/Intro";
import EventTypes from "../components/HomePage Components/EventTypes";
import Benefits from "../components/HomePage Components/Benefits";
import EventList from "../components/HomePage Components/EventList";
import Sponsors from "../components/HomePage Components/Sponsors";
import Footer from "../components/HomePage Components/Footer";

// const Header = React.lazy(() =>
//   import("../components/HomePage Components/Header")
// );
// const EventTypes = React.lazy(() =>
//   import("../components/HomePage Components/EventTypes")
// );
// const Intro = React.lazy(() =>
//   import("../components/HomePage Components/Intro")
// );
// const Benefits = React.lazy(() =>
//   import("../components/HomePage Components/Benefits")
// );
// const EventList = React.lazy(() =>
//   import("../components/HomePage Components/EventList")
// );
// const Sponsors = React.lazy(() =>
//   import("../components/HomePage Components/Sponsors")
// );
// const Footer = React.lazy(() =>
//   import("../components/HomePage Components/Footer")
// );

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
