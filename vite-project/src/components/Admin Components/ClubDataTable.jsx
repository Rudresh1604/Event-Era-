import { Box, Button, Link, Spinner, Text, useToast } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEvent } from "../../redux/rootSlice.jsx";

const clubDetails = [
  {
    name: "Computer Society Of India",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, officia inventore! Adipisci quas natus perferendis aliquam nostrum quo",
    president: "Abc mslf",
    key: "csi",
  },
];

function getClubDetail(club) {
  return (club = clubDetails.find((c) => c.name === club));
}

function ClubDataTable({ club }) {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState(null);
  const { selectedEvent, user } = useSelector((state) => state.root);
  const toast = useToast();
  const dispatch = useDispatch();
  const getEventDetails = async () => {
    try {
      console.log(selectedEvent);

      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      let detail = { eventId: selectedEvent, userId: user._id };
      console.log(detail);

      const { data } = await axios.post(
        "/api/admin/event/data",
        detail,
        config
      );
      // console.log(data);
      setTableData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);

      toast({
        title: "Error fetching Data !",
        description: error.message,
        duration: 5000,
        position: "top",
        isClosable: true,
        status: "error",
      });
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getEventDetails();
  }, [selectedEvent]);

  return (
    <div>
      {tableData ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          w="auto"
          bg="white"
          borderRadius="lg"
          gap={5}
        >
          <Text
            fontSize="3xl"
            mt={3}
            color="purple"
            fontFamily="Work sans"
            fontWeight="bold"
          >
            {tableData?.name}
          </Text>
          <p>{tableData?.description}</p>
          <Text
            fontFamily="Work sans"
            fontWeight="medium"
            fontSize="2xl"
            color="black"
          >
            Here are total details of registration of our club
          </Text>

          <Box mx={7} alignSelf="center" w="100%" h="100%">
            {loading ? (
              <div className="flex w-full justify-center mb-5">
                <Spinner h={50} w={50} />
              </div>
            ) : (
              <>
                <Box>
                  <TableContainer>
                    <Table variant="striped" colorScheme="teal">
                      <TableCaption placement="top">
                        <b> {tableData?.organiser?.clubName}</b>
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Sr.No.</Th>
                          <Th>Student Name</Th>
                          <Th>Class</Th>
                          <Th>Department</Th>
                          <Th>Email</Th>
                          <Th>Mobile</Th>
                          <Th>Reciept</Th>

                          <Th isNumeric>Amount</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {tableData.participants.length > 0 &&
                          tableData?.participants?.map((st, i) => (
                            <Tr key={i}>
                              <Td>{i + 1} </Td>
                              <Td>{st.name} </Td>
                              <Td>{st.class} </Td>
                              <Td>{st.department} </Td>
                              <Td>{st.email} </Td>
                              <Td>{st.mobile} </Td>

                              <Td>
                                <Button colorScheme="blue">
                                  <Link href={st.reciept} isExternal>
                                    View
                                  </Link>
                                </Button>{" "}
                              </Td>
                              <Td isNumeric>{tableData.price} </Td>
                            </Tr>
                          ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th>
                            Total Registrations :{" "}
                            {tableData.participants.length}{" "}
                          </Th>

                          <Th>
                            Total Amount:{" "}
                            {tableData.participants.length * tableData.price}
                          </Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                  <Box
                    my={3}
                    bg="#D3D3D3"
                    w="30%"
                    p={2}
                    borderRadius="lg"
                    pl={4}
                  >
                    <Text>
                      <b>Event Head Name : </b> {tableData?.eventHead?.name}
                    </Text>
                    <Text>
                      <b>Event Head Email : </b>
                      {tableData?.eventHead?.email}{" "}
                    </Text>
                    <Text>
                      <b>Event Head Contact : </b>
                      {tableData?.eventHead?.contact}{" "}
                    </Text>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      ) : (
        <Box></Box>
      )}
    </div>
  );
}

export default ClubDataTable;
