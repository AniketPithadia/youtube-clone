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
  width: 300px;
  height: 340px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 20px;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.soft};
  background-color: #a3a1a1;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
`;
const Title = styled.h1`
  margin-top: 20px;
  text-align: center;
`;
const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100%;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 20px;
  padding: 10px 12px;
  font-size: 18px;
  background-color: transparent;
  min-width: 100%;
`;

const ImageUploadForm = styled.form`
  background-color: transparent;
  display: flex;
  justify-content: center;
  width: 100%;
  & > input {
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 20px;
    padding: 8px 10px;

    font-size: 18px;
    background-color: transparent;
  }
`;
const Button = styled.button`
  border-radius: 20px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
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
            <ImageUploadForm onSubmit={handleImageUpload}>
              <Input
                type="file"
                accept="image/*"
                name="profileImg"
                onChange={(e) => setProfileImg(e.target.files[0])}
              />
            </ImageUploadForm>
          )}
        </InputBlock>
        <Button onClick={handleUpdate}>Update</Button>
      </Wrapper>
    </Container>
  );
};

export default UpdateUserProfile;
