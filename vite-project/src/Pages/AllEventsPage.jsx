import React, { useEffect, useState } from "react";
import { Box, Text, useToast } from "@chakra-ui/react";
import EventCarousel from "../components/HomePage Components/EventCarousel";
import Header from "../components/HomePage Components/Header";
import axios from "axios";
import EventGrid from "../components/HomePage Components/EventGrid";
import Footer from "../components/HomePage Components/Footer";

const backendUrl = import.meta.env.BACKEND_URL;

const AllEventsPage = () => {
  const toast = useToast();
  const [events, setEvents] = useState(null);
  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/general/student/events/?search=all`
      );
      console.log(data);
      setEvents(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured !",
        duration: 6000,
        position: "top",
        isClosable: true,
        description: error.message,
      });
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div>
      <Header />
      <Box mt={260}>
        <Text textAlign="center" mb={7} fontSize="3xl">
          Welcome ! Here are all ongoing events
        </Text>
        <EventCarousel events={events} />
        <Text textAlign="center" mt={7} mb={7} fontSize="3xl">
          Welcome ! You may like this too
        </Text>
        <EventGrid events={events} />
      </Box>
      <Footer />
    </div>
  );
};

export default AllEventsPage;
