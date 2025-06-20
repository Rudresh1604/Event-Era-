import Lottie from "lottie-react";
import Register from "../../resources/Register.json";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/rootSlice.jsx";
import axios from "axios";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EventForm = ({ event }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      // const data = new FormData();
      // data.append("file", pics);
      // data.append("upload_preset", "chat-app");
      // data.append("cloud_name", "piyushproj");
      // fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
      //   method: "post",
      //   body: data,
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setPic(data.url.toString());
      //     console.log(data.url.toString());
      // setPicLoading(false);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setPicLoading(false);
      //   });
      setFile(event.target.files[0]);
      setPicLoading(false);
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };
  // submit form handler
  const submitForm = async (values) => {
    let site;
    console.log(file);
    const formData = new FormData();
    formData.append("reciept", file);
    // Append other form values
    Object.keys(values).forEach((key) => {
      if (key !== "reciept") {
        formData.append(key, values[key]);
      }
    });
    let response;
    try {
      dispatch(showLoading());
      response = await axios.post(
        `${backendUrl}/api/general/student/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(hideLoading());
      console.log(response);

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(hideLoading());
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(response.data.message);
    }
  };

  return (
    <div>
      <hr className="border-blue-700 mx-11 my-4" />

      <div className="md:flex mt-5 px-4 justify-between items-center ml-8">
        <div className="w-[50%]">
          <Box>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-7 gap-y-1">
              <FormControl
                name="email"
                rules={[{ required: true, message: "Please provide email" }]}
              >
                <label
                  for="email-address-icon"
                  className="block mb-2 text-sm font-medium w-full text-gray-900 dark:text-white"
                >
                  Your Email :
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="email-address-icon"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@flowbite.com"
                    />
                  </div>
                </label>
              </FormControl>
              <FormControl
                name="fullname"
                rules={[{ required: true, message: "Please provide fullname" }]}
              >
                <label
                  for="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Fullname :
                  <input
                    name="fullname"
                    type="text"
                    id="email-address-icon"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Firstname Middlename Lastname"
                  />
                </label>
              </FormControl>
              <FormControl
                name="mobile"
                rules={[
                  { required: true, message: "Please provide mobile number" },
                ]}
              >
                <label
                  for="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Mobile Number :
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Mobile Number"
                  />
                </label>
              </FormControl>
              <FormControl
                name="department"
                rules={[
                  { required: true, message: "Please select department" },
                ]}
              >
                <label
                  for="department"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department :
                  <select
                    id="department"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                  >
                    <option selected>Choose your department</option>
                    <option value="Computer">Cmputer</option>
                    <option value="AIDS">AIDS</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Chemical">Chemical</option>
                  </select>
                </label>
              </FormControl>
              <FormControl
                name="class"
                rules={[{ required: true, message: "Please select class" }]}
              >
                <label
                  for="class"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Class :
                  <select
                    id="class"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                  >
                    <option selected>Choose your class</option>
                    <option value="FE">FE</option>
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                  </select>
                </label>
              </FormControl>
              <FormControl
                name="reciept"
                rules={[
                  { required: true, message: "Please upload screenshot" },
                ]}
              >
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                  type="file"
                  p={1.5}
                  accept="image/*"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </FormControl>
            </div>
            <Button
              onClick={submitForm}
              className="text-white m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </Button>
          </Box>
        </div>
        <Lottie
          animationData={Register}
          loop={true}
          className="w-[350px] h-[375px] hidden md:inline"
        ></Lottie>
      </div>
    </div>
  );
};

export default EventForm;
