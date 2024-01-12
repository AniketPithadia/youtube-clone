import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
const Container = styled.div`
  flex: ${({ windowSize }) => (windowSize ? "0.6" : "1")};

  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  width: ${({ windowSize }) => (windowSize ? "40px" : "100%")};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  left: 0;
  a {
    text-decoration: none;
    color: inherit;
  }
`;
const Wrapper = styled.div`
  padding: ${({ windowSize }) => (windowSize ? "10px 20px" : "18px 26px")};
  a {
    width: ${({ windowSize }) => (windowSize ? "100%" : "auto")};
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: ${({ windowSize }) =>
    windowSize ? "center" : "flex-start"}};
      align-items: center;
  gap: ${({ windowSize }) => (windowSize ? "10px" : "20px")};
  cursor: pointer;
  padding: 7.5px 6px;
  border-radius: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
  svg {
    font-size: ${({ windowSize }) => (windowSize ? "10px" : "24px")};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const LinkText = styled.span`
  font-size: 14px;
  display: ${({ windowSize }) => (windowSize ? "none" : "inline-block")};
`;
const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  const mediaWidth = useMediaQuery("(max-width: 500px)");

  return (
    <Container>
      <Wrapper windowSize={mediaWidth}>
        <Link to="/">
          <Item>
            <HomeIcon />
            <LinkText windowSize={mediaWidth}>Home</LinkText>
          </Item>
        </Link>
        <Link to="trends">
          <Item>
            <ExploreOutlinedIcon />
            <LinkText windowSize={mediaWidth}>Explore</LinkText>
          </Item>
        </Link>
        <Link to="subscriptions">
          <Item>
            <SubscriptionsOutlinedIcon />
            <LinkText windowSize={mediaWidth}>Subscriptions</LinkText>
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          <LinkText windowSize={mediaWidth}>Library</LinkText>
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          <LinkText windowSize={mediaWidth}>History</LinkText>
        </Item>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Item>
          <LibraryMusicOutlinedIcon />

          <LinkText windowSize={mediaWidth}>Music</LinkText>
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />

          <LinkText windowSize={mediaWidth}>Sports</LinkText>
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />

          <LinkText windowSize={mediaWidth}>Gaming</LinkText>
        </Item>
        <Item>
          <MovieOutlinedIcon />

          <LinkText windowSize={mediaWidth}>Movies</LinkText>
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          <LinkText windowSize={mediaWidth}>News</LinkText>
        </Item>
        <Item>
          <LiveTvOutlinedIcon />

          <LinkText windowSize={mediaWidth}>Live</LinkText>
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          <LinkText windowSize={mediaWidth}>Settings</LinkText>
        </Item>
        <Item>
          <FlagOutlinedIcon />

          <LinkText windowSize={mediaWidth}>Report</LinkText>
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />

          <LinkText windowSize={mediaWidth}>Help</LinkText>
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          <LinkText windowSize={mediaWidth}>
            {" "}
            {darkMode ? "Light" : "Dark"} Mode
          </LinkText>
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
