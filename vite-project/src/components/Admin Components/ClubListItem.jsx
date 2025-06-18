import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedClub, setSelectedEvent } from "../../redux/rootSlice.jsx";

function ClubListItem({ club, handleFunction, event }) {
  const dispatch = useDispatch();
  const handleSelectedItem = () => {
    console.log("Club is :");
    console.log(club);
    console.log("Event is");
    console.log(event);

    if (club) {
      dispatch(setSelectedClub(club));
    } else {
      dispatch(setSelectedEvent(event));
    }
  };
  console.log(event);

  return (
    <>
      <Box
        onClick={handleSelectedItem}
        cursor="pointer"
        bg="#E8E8E8"
        _hover={{
          background: "#38B2AC",
          color: "white",
        }}
        w="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={2}
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
      >
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={club ? club.clubName : event.name}
          src={club ? club.pic : ""}
        />
        <Box>
          <Text>{club ? club?.clubName : event.name}</Text>
          <Text fontSize="sm">
            {club ? <b>President : </b> : <b>Event Head : </b>}
            {club ? club?.president?.name : event?.eventHead}
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default ClubListItem;
