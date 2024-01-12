import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import YouTube from "../img/logo.png";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Upload from "./Upload";
import { loginSuccess, logout } from "../redux/userSlice";
import UpdateUserProfile from "./UpdateUserProfile";
import axios from "axios";

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.bgLighter};
  hieght: auto;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 10px 20px;
  position: relative;
`;

const Search = styled.form`
  width: ${({ mediaWidth }) => (mediaWidth ? "50%" : "35%")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border: 1px solid #bbb;
  border-radius: 25px;
  cursor: pointer;
  button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
    svg {
      color: ${({ theme }) => theme.text};
    }
  }
`;

const Input = styled.input`
  color: ${({ theme }) => theme.text};
  border: none;
  width: 100%;
  background-color: transparent;
  outline: none;
  padding-left: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const UserOptions = styled.div`
  display: flex;
  align-items: center;

  gap: 5px;
`;
const NavButtons = styled.div`
  position: absolute;
  top: 100%;
  right: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const NavButton = styled.button`
  outline: none;
  width: 100%;
  border: none;
  padding: 10px 70px;
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.soft};
  cursor: pointer;
  font-size: 15px;
  background-color: ${({ theme }) => theme.bgLighter};
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const Img = styled.img`
  height: 25px;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [openUpload, setOpenUpload] = useState(false);
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [q, setQ] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const dispatch = useDispatch();
  let menuRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const mediaWidth = useMediaQuery("(max-width: 500px)");
  const LogoutHandler = async () => {
    console.log("Logout");
    const res = await axios.post("/auth/signout");
    console.log(res);
    dispatch(logout());
    setOpenProfile(!openProfile);
    navigate("/");
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${q}`);
  };
  useEffect(() => {
    dispatch(loginSuccess(currentUser));
  }, [currentUser, dispatch]);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <>
      <Container>
        <Wrapper>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={YouTube} />
              {mediaWidth ? "" : <span>YouTube</span>}
            </Logo>
          </Link>
          <Search onSubmit={handleSearchSubmit}>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <button type="submit">
              <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
            </button>
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon
                fontSize={`${mediaWidth ? "medium" : "large"}`}
                onClick={() => setOpenUpload(!openUpload)}
              />
              <UserOptions
                ref={menuRef}
                onClick={() => setOpenProfile(!openProfile)}
              >
                <Avatar src={currentUser.img} />

                {openProfile && (
                  <NavButtons>
                    <NavButton>{currentUser.name}</NavButton>
                    <NavButton onClick={LogoutHandler}>Logout</NavButton>
                    <NavButton
                      onClick={() => {
                        setOpenProfile(!openProfile);
                        setOpenUpdateProfile(!openUpdateProfile);
                      }}
                    >
                      Update Profile
                    </NavButton>
                  </NavButtons>
                )}
              </UserOptions>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {openUpload && <Upload setOpen={setOpenUpload} />}
      {openUpdateProfile && (
        <UpdateUserProfile setOpenUpdateProfile={setOpenUpdateProfile} />
      )}
    </>
  );
};

export default Navbar;
