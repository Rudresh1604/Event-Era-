import React, { useEffect } from "react";
import AdminNavBar from "../components/Admin Components/AdminHeader2.jsx";
import { Box, useToast, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/rootSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import ClubDataTable from "../components/Admin Components/ClubDataTable.jsx";
import ClubList from "../components/Admin Components/ClubList.jsx";

function AdminDashboardPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, selectedEvent, selectedClub } = useSelector(
    (state) => state.root
  );

  useEffect(() => {
    let token = localStorage.getItem("userInfo");
    if (!token) {
      toast({
        title: "Please Login",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      navigate("/admin");
      return;
    }
    let userDetail = JSON.parse(token);
    console.log(userDetail);
    dispatch(setUser(userDetail));
  }, [dispatch, navigate, toast]);

  return (
    <div className="w-full">
      <AdminNavBar />
      <div className="mt-5">
        <Box
          display="flex"
          justifyContent="center"
          w="100%"
          h="91.5vh"
          p="10px"
        >
          <Box
            display="flex"
            w="100%"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
          >
            <ClubList />
            {selectedEvent && <ClubDataTable />}
            {selectedClub && !selectedEvent && (
              <Box
                alignSelf="center"
                w="100%"
                h="100%"
                bg="#FFFFF0"
                border="1px"
                borderColor="#EDEADE"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                m={4}
                my={5}
              >
                <Text
                  fontFamily="Work sans"
                  fontWeight="extrabold"
                  color="purple"
                  fontSize="3xl"
                >
                  Please select event whose details are to be viewed
                </Text>
              </Box>
            )}
            {!selectedClub && (
              <Box
                alignSelf="center"
                w="100%"
                h="100%"
                bg="#FFFFF0"
                border="1px"
                borderColor="#EDEADE"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                m={4}
                my={5}
              >
                <Text
                  fontFamily="Work sans"
                  fontWeight="extrabold"
                  color="purple"
                  fontSize="3xl"
                >
                  Please select club whose details are to be viewed
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
