import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./views/ui/Register";
import Profile from "./components/profile/profile";
import Experience from "./components/experience/experience";
import Jobs from "./components/jobs/jobs";
import Chat from "./components/feed/feed";
import Resume from "./components/resume/resume";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Landing from "./assets/extras/landingPage.pdf";
import Welcome from "./assets/extras/Welcome To Finder.png";

const App = () => {
  const [User, setUser] = useState(null);
  const readCookies = () => {
    setUser(localStorage.getItem("developerProfile"));
    console.log("Developer Profile", User);
  };
  useEffect(() => {
    readCookies();
  }, [User]);
  return (
    <div className="dark">
      <Router>
        {!User ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                <Route path="/Register" element={<Register />} />
                <Route path="/dashboard" element={<Chat />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/expereince" element={<Experience />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/resume" element={<Resume />} />
              </Routes>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
};

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
  background-color: #efefef;
`;
