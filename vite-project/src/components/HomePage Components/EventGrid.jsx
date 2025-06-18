import {
  Grid,
  GridItem,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Image,
  Stack,
  Box,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import { ButtonGroup } from "flowbite-react";

import React from "react";
import { useNavigate } from "react-router-dom";

const EventGrid = ({ events }) => {
  const navigate = useNavigate();
  const handleRegister = (eventId) => {
    navigate(`/event/${eventId}`);
  };
  return (
    <div>
      <Box mx={{ base: 5, md: 8 }} mb={7}>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
          gap={6}
        >
          {events?.map((event, i) => (
            <GridItem w="100%" h="20%" key={event._id}>
              <Card maxW="sm" bg="#F0F0F0">
                <CardBody>
                  <Image
                    src={event?.image}
                    alt={event?.name}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{event?.name} </Heading>
                    <Text>
                      {event.description} love a chic design with a sprinkle of
                      vintage design.
                    </Text>
                    <Text color="blue.600" fontSize="2xl">
                      Rs : {event.price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      onClick={() => handleRegister(event._id)}
                    >
                      Register Now
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default EventGrid;
