import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "../redux/userSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ windowSize }) => (windowSize ? "flex-start" : "center")};
  justify-content: center;
  height: calc(100vh - 120px);
  font-size: 16px;

  margin-top: 20px;

  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: ${({ windowSize }) => (windowSize ? "10px 20px" : "20px 40px")};
  width: ${({ windowSize }) => (windowSize ? "230px" : "450px")};
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const SubTitle = styled.h2`
  font-size: 16px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 20px;
  padding: 10px;
  padding-left: 20px;

  background-color: transparent;
  width: 90%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 20px;
  border: none;
  padding: 10px 30px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const ImageUpload = styled.div`
  background-color: transparent;
  margin: 0;
  padding: 0px 10px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.soft};

  & > input {
    border: none;
    color: ${({ theme }) => theme.text};
    border-radius: 20px;
    padding: 0;

    background-color: transparent;
    width: 90%;
    margin: 10px 0px;
    &::placeholder {
      padding-left: 10px;
    }
  }
`;
const GoogleSignInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  padding: 7.5px 9px;
  border-radius: 20px;
  background-color: #3d3d3d;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
  svg {
    font-size: ${({ windowSize }) => (windowSize ? "16px" : "24px")};
  }
`;
const ImageButton = styled.button`
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  border: none;
  border-left: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};

  outline: none;
  border-radius: 3px;
  padding: 13px 5px;
  font-weight: 500;
  cursor: pointer;
`;
const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const windowSize = useMediaQuery("(max-width: 600px)");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(undefined);
  const [profileDownloadUrl, setProfileDownloadUrl] = useState("");
  const [imgPerc, setImgPerc] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", {
        email,
        password,
      });
      console.log(res.data);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      toast.error("Wrong Credentials ", { autoClose: 2000 });
      dispatch(loginFailure());
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
        img: profileDownloadUrl,
      });
      console.log(res.data);
      dispatch(registerSuccess(res.data), loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      toast.error("Enter valid information", { autoClose: 2000 });
      dispatch(registerFailure());
    }
  };
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    try {
      signInWithPopup(auth, provider).then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
            credentials: "include",
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate("/");
          });
      });
    } catch (err) {
      toast.error("You're not registered");
      dispatch(loginFailure());
      navigate("/signin");
    }
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    uploadFile({ file: img });
  };
  const uploadFile = (file) => {
    const storage = getStorage(app);

    const fileName = new Date().getTime() + file.file.name;

    const storageRef = ref(storage, `/UserProfileImages/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImgPerc(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfileDownloadUrl(downloadURL);
        });
      }
    );
  };

  return (
    <Container windowSize={windowSize}>
      <Wrapper windowSize={windowSize}>
        <Title>Sign in</Title>
        <SubTitle>to continue to YouTube</SubTitle>
        <Input
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <GoogleSignInContainer
          onClick={signInWithGoogle}
          windowSize={windowSize}
        >
          <FcGoogle />
          <span>Sign in with Google</span>
        </GoogleSignInContainer>
        <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <ImageUpload>
            <Input
              type="file"
              accept="image/*"
              name="profileImg"
              required
              onChange={(e) => setImg(e.target.files[0])}
            />
            <ImageButton onClick={handleImageUpload}>Upload</ImageButton>
          </ImageUpload>
        )}
        <Button onClick={handleRegister}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
      <ToastContainer />
    </Container>
  );
};

export default SignIn;
