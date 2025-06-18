import { Avatar, Box, Text } from "@chakra-ui/react";

const EventListItem = ({ event }) => {
  return (
    <Box
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Box>
        <Text fontWeight="bold">{event.name}</Text>
        <Text fontSize="sm">
          {<b>Event Head : </b>}
          {event?.eventHead?.name}
        </Text>
        <Text fontSize="sm">
          {<b>Organising Club : </b>}
          {event?.organiser?.clubName}
        </Text>
      </Box>
    </Box>
  );
};

export default EventListItem;
