import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { BellIcon, ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "../miscallenous/ProfileModal.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import ChatLoading from "../ChatLoading";
import UserListItem from "../User Avatar/UserListItem.jsx";
import {
  setSelectedChat,
  setChats,
  setNotifications,
  setUser,
  setSelectedClub,
} from "../../redux/rootSlice.jsx";
// import { getSender } from "../../config/chatLogics";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

function AdminNavBar() {
  const { user, selectedClub, chats, notification } = useSelector(
    (state) => state.root
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  // console.log(user);

  // ! logout handler
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    console.log("Logged out");
    navigate("/");
  };

  // ! search handler
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: "800",
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);

      toast({
        title: "Error Occured!",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  // ! access Chat handler
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      console.log(data);
      if (!chats?.find((c) => c._id == data._id)) {
        dispatch(setChats([data, ...chats]));
      }

      dispatch(setSelectedChat(data));
      setLoadingChat(false);
      onClose();
    } catch (error) {
      console.log(error);

      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 700,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="w-full">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search a club to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search Club
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          College Event ERA
        </Text>
        <div>
          <Menu>
            <Link href="/admin/chats" px={2}>
              <MenuButton p={1}>Chat</MenuButton>
              <ChatIcon />
            </Link>
          </Menu>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>

            <MenuList pl={5}>
              {!notification.length
                ? "No New Messages"
                : notification.map((noti) => (
                    <MenuItem
                      key={noti._id}
                      onClick={() => {
                        // dispatch(setSelectedChat(noti.chat));
                        // dispatch(
                        //   setNotifications(
                        //     notification.filter((n) => n !== noti)
                        //   )
                        // );
                      }}
                    >
                      {/* {noti.chat.isGroupChat
                        ? `New Message in ${noti.chat.chatName}`
                        : `New Message from `} */}
                    </MenuItem>
                  ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor="pointer"
                name={user?.name}
                src={user?.pic}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>

              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search a Club</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb="2">
              <Input
                placeholder="Search a user from club"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button
                backgroundColor="blue.500"
                textColor="white"
                onClick={handleSearch}
              >
                Go
              </Button>
            </Box>

            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default AdminNavBar;
