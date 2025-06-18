import React, { useState } from "react";
import { Tooltip, Text, Link, useDisclosure } from "@chakra-ui/react";
import SideEventSearch from "./SideEventSearch";
import "../../App.css";
import { useNavigate } from "react-router-dom";
function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const handleNavigation = (event) => {
    if (event === "home") {
      navigate("/");
    } else if (event === "all") {
      navigate("/allevents");
    }
  };
  return (
    <div>
      <nav className=" border-gray-200 bg-color relative p-3">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 text-white">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mt-1"
              alt="Flowbite Logo"
            />
            <Text fontSize="3xl" fontWeight="bold" mt={2} color="white">
              College Event Era
            </Text>
          </a>
          <button
            onClick={handleToggle}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isExpanded}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isExpanded ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse text-white md:mt-0 md:border-0 bg-color border-gray-700">
              <Link
                color="#1a56db"
                onClick={() => {
                  handleNavigation("home");
                }}
                fontWeight="bold"
                _hover={{ textDecoration: "none", color: "white" }}
                fontSize={{ base: "xl", md: "2xl" }}
              >
                Home
              </Link>
              <Link
                color="white"
                fontWeight="bold"
                onClick={() => {
                  handleNavigation("all");
                }}
                _hover={{ textDecoration: "none", color: "#1a56db" }}
                fontSize={{ base: "xl", md: "2xl" }}
              >
                All Events
              </Link>

              <Tooltip label="Search Event">
                <Link
                  color="white"
                  onClick={onOpen}
                  fontWeight="bold"
                  _hover={{ textDecoration: "none", color: "#1a56db" }}
                  fontSize={{ base: "xl", md: "2xl" }}
                >
                  Serach Event
                </Link>
              </Tooltip>
              <SideEventSearch isOpen={isOpen} onClose={onClose} />
            </ul>
          </div>
        </div>
      </nav>
      <div class="custom-shape-divider-top-1720983779 top-20">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Header;
