import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import EventListItem from "./EventListItem";
import ChatLoading from "../ChatLoading";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SideEventSearch = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // ! handle search for events
  const handleSearch = async (query) => {
    if (!query) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 800,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setSearch(query);
      setLoadingList(true);

      const { data } = await axios.get(
        `${backendUrl}/api/general/student/events/?search=${query}`
      );
      // console.log(data);

      setLoadingList(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occurred!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setSearchResult([]);
      setLoadingList(false);
    }
  };

  // ! handle selected events
  const handleSelectedEvent = async (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Search an Event</DrawerHeader>
        <DrawerBody>
          <Box display="flex" pb="2">
            <Input
              placeholder="Search by event name"
              mr={2}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button
              backgroundColor="blue.500"
              textColor="white"
              onClick={handleSearch}
            >
              Go
            </Button>
          </Box>
          {loading ? (
            <Spinner ml="auto" />
          ) : (
            <Stack>
              {searchResult.map((e) => (
                <Box onClick={() => handleSelectedEvent(e._id)}>
                  <EventListItem key={e._id} event={e} />
                </Box>
              ))}
            </Stack>
          )}
          {loadingList && <ChatLoading />}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideEventSearch;
