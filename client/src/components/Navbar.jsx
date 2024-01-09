import React, { useEffect, useState } from "react";
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

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 30%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
  cursor: pointer;

  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  width: 100%;
  background-color: transparent;
  outline: none;
  padding-left: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
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
const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;
const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [q, setQ] = useState("");
  const [openLogout, setOpenLogout] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const mediaWidth = useMediaQuery("(max-width: 500px)");
  const setLogoutHandler = async () => {
    dispatch(logout());
    navigate("/");
  };
  useEffect(() => {
    dispatch(loginSuccess(currentUser));
  }, [currentUser]);

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
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon
                fontSize="large"
                onClick={() => setOpen(true)}
              />
              <UserOptions onClick={() => setOpenLogout(!openLogout)}>
                <Avatar src={currentUser.img} />
                {currentUser.name}
                {openLogout && (
                  <NavButtons>
                    <NavButton onClick={setLogoutHandler}>Logout</NavButton>
                    <NavButton onClick={() => setOpenUpdateProfile(true)}>
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
      {open && <Upload setOpen={setOpen} />}
      {openUpdateProfile && (
        <UpdateUserProfile setOpenUpdateProfile={setOpenUpdateProfile} />
      )}
    </>
  );
};

export default Navbar;
