import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./components/Loader.jsx";
import AdminHomePage from "./Pages/AdminHomePage.jsx";
import AdminDashboardPage from "./Pages/AdminDashboardPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import EventPage from "./Pages/EventPage.jsx";
import AllEventsPage from "./Pages/AllEventsPage.jsx";
import AuthenticationPage from "./Pages/AuthenticationPage.jsx";

function App() {
  const { loading } = useSelector((state) => state.root);
  return (
    <div className="App">
      <BrowserRouter>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminHomePage />} />

              <Route path="/admin/login" element={<AuthenticationPage />} />
              <Route path="/event/:eventId" element={<EventPage />} />
              <Route path="/admin/chats" element={<ChatPage />} />
              <Route path="/allevents" element={<AllEventsPage />} />
              <Route path="/club" element={<AdminDashboardPage />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
