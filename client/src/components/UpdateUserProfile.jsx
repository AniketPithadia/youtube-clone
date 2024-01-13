import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { auth, provider } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout, setCurrentUser } from "../redux/userSlice";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  z-index: 1000;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: auto;
  height: 350px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-radius: 20px;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.soft};
  padding: 10px 14px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;
const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 20px;
  padding: 10px 12px;
  padding-left: 20px;
  font-size: 18px;
  background-color: transparent;
  width: 100%;
  margin: 10px 0px;
  &:n-th-child(3) {
    padding: 10px 12px;
  }
`;

const ImageUpload = styled.form`
  font-size: 18px;
  background-color: transparent;
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  & > input: {
    border: 1px solid ${({ theme }) => theme.soft};
    border-right: 0px;
    color: ${({ theme }) => theme.text};
    border-radius: 20px;
    padding: 10px 12px;
    padding-left: 20px;
    font-size: 18px;
    background-color: transparent;
    width: 100%;
    margin: 10px 0px;
  }
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const ImageButton = styled.button`
  border-top: 1px solid ${({ theme }) => theme.soft};
  border-right: 1px solid ${({ theme }) => theme.soft};
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  border-left: 0px;
  color: ${({ theme }) => theme.text};
  background-color: transparent;

  outline: none;
  border-radius: 3px;
  padding: 13px 5px;
  font-weight: 500;
  cursor: pointer;
  font-size: 16px;
`;

const UpdateUserProfile = ({ setOpenUpdateProfile }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState(undefined);
  const [profileDownloadUrl, setProfileDownloadUrl] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const navigate = useNavigate();

  const uploadFile = (file) => {
    const storage = getStorage(app);

    const fileName = new Date().getTime() + file.file.name;

    const storageRef = ref(storage, `/UpdatedUserProfileImages/${fileName}`);
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
  const handleImageUpload = (e) => {
    e.preventDefault();
    uploadFile({ file: profileImg });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/users/${currentUser._id}`, {
      name,
      email,
      img: profileDownloadUrl,
    });
    setOpenUpdateProfile(false);
    dispatch(logout());
    res.status === 200 && navigate(`/signin`);
  };
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpenUpdateProfile(false)}>X</Close>

        <Title>Upload Your Profile</Title>
        <InputBlock>
          <Input
            type="text"
            placeholder="Username"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {imgPerc > 0 ? (
            "Uploading:" + imgPerc + "%"
          ) : (
            <ImageUpload onSubmit={handleImageUpload}>
              <Input
                type="file"
                accept="image/*"
                name="profileImg"
                onChange={(e) => setProfileImg(e.target.files[0])}
              />
            </ImageUpload>
          )}
        </InputBlock>
        <Button onClick={handleUpdate}>Update</Button>
      </Wrapper>
    </Container>
  );
};

export default UpdateUserProfile;
