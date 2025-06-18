"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  useToast,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const EventCarousel = ({ events }) => {
  const [slider, setSlider] = useState();
  const navigate = useNavigate();
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  const handleRegister = (eventId) => {
    // console.log(eventId);

    navigate(`/event/${eventId}`);
  };

  //   const events = [
  //     {
  //       _id: "6702316e94a4dc7a234e8781",
  //       name: "Tech Conference 2024",
  //       description:
  //         "An annual tech conference featuring the latest in AI and machine learning.",
  //       organiser: {
  //         _id: "64cfc60f35af4f001ce6d9ea",
  //         name: "Tech Innovators Club",
  //         contactNumber: "+1-234-567-8901",
  //         email: "organiser@techinnovators.com",
  //       },
  //       price: "100",
  //       eventHead: {
  //         _id: "64d0e81d56fa7f001cd4e38c",
  //         name: "John Doe",
  //         contactNumber: "+1-987-654-3210",
  //         email: "johndoe@techconference.com",
  //       },
  //       startDate: "2024-11-12T10:00:00Z",
  //       image:
  //         "https://media.istockphoto.com/id/493958679/photo/audience-at-the-conference-hall.jpg?s=612x612&w=is&k=20&c=QPXOOsYS4GS4ic8PXFCuLBfiW1B0Q4BfWf4RpinHgEg=",
  //       eventLink: "https://events.google.com/io/",
  //     },
  //     {
  //       _id: "6702316e94a4dc7a234e8781",
  //       name: "Art and Culture Festival",
  //       description:
  //         "A vibrant festival celebrating arts and culture from around the world.",
  //       organiser: {
  //         _id: "64d0e89f56fa7f001cd4e39d",
  //         name: "Creative Arts Club",
  //         contactNumber: "+1-222-333-4444",
  //         email: "organiser@creativearts.com",
  //       },
  //       price: "50",
  //       eventHead: {
  //         _id: "64d0e90556fa7f001cd4e38f",
  //         name: "Jane Smith",
  //         contactNumber: "+1-555-666-7777",
  //         email: "janesmith@artfestival.com",
  //       },
  //       startDate: "2024-12-05T09:00:00Z",
  //       image:
  //         "https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_640.jpg",
  //       eventLink: "https://events.google.com/artandculture/",
  //     },
  //     {
  //       _id: "6702316e94a4dc7a234e8781",
  //       name: "Music Gala 2024",
  //       description:
  //         "A night of classical and modern music performances by renowned artists.",
  //       organiser: {
  //         _id: "64d0e81d56fa7f001cd4e38d",
  //         name: "Music Enthusiasts Club",
  //         contactNumber: "+1-888-999-0000",
  //         email: "organiser@musicgala.com",
  //       },
  //       price: "75",
  //       eventHead: {
  //         _id: "64d0e81d56fa7f001cd4e38a",
  //         name: "Emily Johnson",
  //         contactNumber: "+1-444-555-6666",
  //         email: "emilyjohnson@musicgala.com",
  //       },
  //       startDate: "2024-11-20T18:00:00Z",
  //       image:
  //         "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
  //       eventLink: "https://events.google.com/musicfestival/",
  //     },
  //   ];

  return (
    <Box
      position={"relative"}
      height={"600px"}
      width={"full"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {events?.map((card, index) => (
          <Box
            key={index}
            height={"6xl"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            {card.name}
            {/* This is the block you need to change, to customize the caption */}
            <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={6}
                w={"full"}
                maxW={"lg"}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
              >
                <Heading
                  color="#D4D4D4"
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                >
                  {card.name}
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }} color="#ABABAB">
                  {card.description}
                </Text>
                <Button
                  w="30%"
                  onClick={() => {
                    handleRegister(card._id);
                  }}
                >
                  Register
                </Button>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default EventCarousel;
