import React, { useEffect, useState } from "react";
import Header from "../components/HomePage Components/Header";
import EventInfo from "../components/HomePage Components/EventInfo";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import EventForm from "../components/HomePage Components/EventRegisterForm";

// const EventForm = React.lazy(() =>
//   import("../components/HomePage Components/EventRegisterForm")
// );

function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const toast = useToast();

  const getEventDetails = async () => {
    if (!eventId) {
      toast({
        title: "Failed to load this page !",
        duration: 5000,
        position: "top",
        status: "info",
      });
      return;
    }
    try {
      console.log(eventId);

      const { data } = await axios.get(
        `/api/general/student/access/event/?eventId=${eventId}`
      );
      setEvent(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to load this page !",
        description: error.response.message,
        duration: 5000,
        position: "top",
        status: "error",
      });

      return;
    }
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  return (
    <div>
      <Header />
      {event && <EventInfo event={event} />}
      {event && <EventForm event={event} />}
    </div>
  );
}

export default EventPage;
