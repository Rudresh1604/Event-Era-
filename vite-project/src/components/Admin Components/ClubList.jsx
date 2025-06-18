import {
  Box,
  Spinner,
  useToast,
  Text,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ClubListItem from "./ClubListItem.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedClub, setSelectedEvent } from "../../redux/rootSlice.jsx";
import { ArrowLeftIcon } from "@chakra-ui/icons";

function ClubList() {
  const [isCreateClub, setIsCreateClub] = useState(false);
  const [allClub, setAllClub] = useState(null);
  const { user, selectedEvent, selectedClub } = useSelector(
    (state) => state.root
  );
  const [loading, setLoading] = useState(true);
  const [newClubName, setNewClubName] = useState(null);
  const [newClubPresident, setNewClubPresident] = useState(null);
  const [newClubDescription, setNewClubDescription] = useState(null);
  const [newClubSecret, setNewClubSecret] = useState(null);
  const [newEventHead, setNewEventHead] = useState(null);
  const [newEventDescription, setNewEventDescription] = useState(null);
  const [newEventPrice, setNewEventPrice] = useState(null);
  const [newEventDate, setNewEventDate] = useState(null);
  const [newEventName, setNewEventName] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchClub();
  }, [user]);

  const fetchClub = async () => {
    if (!user) {
      return;
    }
    console.log("selected club is ");
    console.log(selectedClub);

    if (selectedClub) {
      fetchAllEventOfClub();
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get("/api/admin/club", config);
      setAllClub(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occurred!",
        description: error.message,
        duration: 5000,
        status: "error",
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const getClubDetails = async (clubId) => {
    if (!clubId) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authentication: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/admin/club/${user.club}`, config);
    } catch (error) {
      console.log(error);
    }
  };

  const createEventHandler = async () => {
    if (isCreateClub) {
      return;
    }
    if (
      !newEventDescription ||
      !newEventName ||
      !newEventHead ||
      !newEventPrice ||
      !newEventDate
    ) {
      toast({
        title: "All fields are required!",
        duration: 5000,
        status: "warning",
        position: "top",
        isClosable: true,
      });
      return;
    }
    try {
      setFormLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/admin/event/create",
        {
          name: newEventName,
          description: newEventDescription,
          eventHead: newEventHead,
          organiser: user.club._id,
          price: newEventPrice,
          date: newEventDate,
          userId: user._id,
        },
        config
      );
      if (!data) {
        toast({
          title: "Oops something went wrong!",
          duration: 5000,
          position: "top",
          isClosable: true,
          status: "info",
        });
        setFormLoading(false);
        return;
      }
      toast({
        title: "Event created successfully!",
        duration: 5000,
        position: "top",
        isClosable: true,
        status: "success",
      });
      setFormLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occurred!",
        description: error.message,
        duration: 5000,
        status: "error",
        isClosable: true,
        position: "top",
      });
      setFormLoading(false);
    }
  };

  const createClubHandler = async () => {
    if (
      !newClubDescription ||
      !newClubName ||
      !newClubPresident ||
      !newClubSecret
    ) {
      toast({
        title: "All fields are required!",
        duration: 5000,
        status: "warning",
        position: "top",
        isClosable: true,
      });
      return;
    }

    try {
      setFormLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/admin/club/create",
        {
          clubName: newClubName,
          description: newClubDescription,
          president: newClubPresident,
          secretKey: newClubSecret,
          userId: user._id,
        },
        config
      );
      console.log(data);

      if (!data) {
        toast({
          title: "Oops something went wrong!",
          duration: 5000,
          position: "top",
          isClosable: true,
          status: "info",
        });
        setFormLoading(false);
        return;
      }
      toast({
        title: "Club created successfully!",
        duration: 5000,
        position: "top",
        isClosable: true,
        status: "success",
      });
      fetchClub();
      setFormLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Oops something went wrong!",
        description: error.message,
        duration: 5000,
        position: "top",
        isClosable: true,
        status: "error",
      });
      setFormLoading(false);
    }
  };

  const fetchAllEventOfClub = async () => {
    if (!selectedClub) {
      return;
    }
    if (selectedEvent) {
      return;
    }
    try {
      const clubId = selectedClub._id;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/admin/club/details",
        { clubId: clubId },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = async () => {
    if (selectedClub && !selectedEvent) {
      dispatch(setSelectedClub(null));
    } else if (selectedClub && selectedEvent) {
      dispatch(setSelectedEvent(null));
    }
  };

  const handleCreateForm = () => {
    if (isCreateClub) {
      createClubHandler();
    } else {
      createEventHandler();
    }
  };

  useEffect(() => {
    if (user?.isMainAdmin) {
      setIsCreateClub(true);
      if (selectedClub) {
        fetchAllEventOfClub();
      } else {
        fetchClub();
      }
    } else {
      dispatch(setSelectedClub(user?.club));
      setIsCreateClub(false);
    }
  }, [user, selectedClub, dispatch]);

  return (
    <Box
      display={{ base: !allClub ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "auto" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Button colorScheme="teal" mb={2} onClick={onOpen}>
          {isCreateClub ? `Create A New Club` : `Create A New Event`}
        </Button>
        {!selectedClub && (
          <Text
            fontWeight="bold"
            fontFamily="Work sans"
            fontSize="2xl"
            color="purple"
            mb={3}
            textAlign="center"
          >
            Here all clubs of our campus:
          </Text>
        )}
        {selectedClub && (
          <Text
            mb={2}
            fontWeight="bold"
            fontFamily="Work sans"
            fontSize="2xl"
            color="purple"
            textAlign="center"
          >
            Here All Events of our club
          </Text>
        )}

        <IconButton
          icon={<ArrowLeftIcon />}
          display={selectedClub || selectedEvent ? "flex" : "none"}
          onClick={handleBack}
          w={50}
        />
      </Box>
      {loading ? (
        <Spinner w={50} h={50} my={6} />
      ) : (
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          {selectedClub ? (
            <>
              <Stack gap={5} mt={5} w="100%">
                {selectedClub.events.length > 0 &&
                  selectedClub?.events?.map((c) => (
                    <ClubListItem event={c} key={c?.events?._id} />
                  ))}
                {selectedClub?.events?.length === 0 && (
                  <Text
                    fontFamily="Work sans"
                    fontSize="2xl"
                    textAlign="center"
                  >
                    Sorry, No Events are present
                  </Text>
                )}
              </Stack>
            </>
          ) : (
            <>
              <Stack gap={5} mt={5} w="100%">
                {allClub?.map((c) => (
                  <ClubListItem club={c} key={c._id} />
                ))}
              </Stack>
            </>
          )}
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily="Work sans"
            textColor="purple"
            textAlign="center"
            fontSize="2xl"
          >
            {isCreateClub ? `Create A New Club` : `Create A New Event`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="start"
            >
              <FormLabel fontWeight="bold">
                {isCreateClub ? "Club Name" : "Event Name"}:
              </FormLabel>
              <Input
                placeholder={
                  isCreateClub ? "Enter new Club name" : "Enter new Event name"
                }
                mb={3}
                value={isCreateClub ? newClubName : newEventName}
                onChange={(e) => {
                  isCreateClub
                    ? setNewClubName(e.target.value)
                    : setNewEventName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="start"
            >
              <FormLabel fontWeight="bold">
                {isCreateClub ? "Club Description" : "Event Description"}:
              </FormLabel>
              <Input
                placeholder={
                  isCreateClub
                    ? "Enter Club Description"
                    : "Enter Event Description"
                }
                mb={3}
                onChange={(e) => {
                  isCreateClub
                    ? setNewClubDescription(e.target.value)
                    : setNewEventDescription(e.target.value);
                }}
              />
            </FormControl>
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="start"
            >
              <FormLabel fontWeight="bold">
                {isCreateClub ? "Club Secret Key" : "Event Date"}:
              </FormLabel>
              <Input
                placeholder={
                  isCreateClub ? "Enter Club Secret Key" : "Enter Event Date"
                }
                mb={3}
                onChange={(e) => {
                  isCreateClub
                    ? setNewClubSecret(e.target.value)
                    : setNewEventDate(e.target.value);
                }}
              />
            </FormControl>
            <FormControl
              display={isCreateClub ? "none" : "flex"}
              flexDirection="column"
              alignItems="start"
            >
              <FormLabel fontWeight="bold">Event Price:</FormLabel>
              <Input
                placeholder="Enter Event price"
                mb={3}
                onChange={(e) => setNewEventPrice(e.target.value)}
              />
            </FormControl>
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="start"
            >
              <FormLabel fontWeight="bold">
                {isCreateClub ? "Club President" : "Event Head"}:
              </FormLabel>
              <Input
                placeholder={
                  isCreateClub ? "Enter Club President" : "Enter Event Head"
                }
                mb={3}
                onChange={(e) => {
                  isCreateClub
                    ? setNewClubPresident(e.target.value)
                    : setNewEventHead(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              isLoading={formLoading}
              loadingText="Creating"
              onClick={handleCreateForm}
              colorScheme="green"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ClubList;
