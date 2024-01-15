import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import YourChannel from "./pages/YourChannel";
import { SnackbarProvider } from "notistack";
import ErrorPage from "./pages/ErrorPage";

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.bg};
  @media (max-width: 500px) {
  }
`;

const Wrapper = styled.div`
  padding: 22px 40px;
  flex: 8;
  @media (max-width: 900px) {
    padding: 15px;
    flex: 3;
  }
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:4000/api";
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <SnackbarProvider>
        <BrowserRouter>
          <Navbar />

          <Main>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="channel" element={<YourChannel />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="signin" element={<SignIn />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
