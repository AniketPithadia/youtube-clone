import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
`;
const ChannelHeader = styled.div`
  display: flex;
  gap: 14px;
  color: ${({ theme }) => theme.text};
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  & > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    h3 {
      font-size: 16px;
      font-weight: 500;
    }
    p {
      font-size: 14px;
      font-weight: 300;
    }
  }
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
`;
const VideoList = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 20px;
  padding: 10px 0;
`;

const YourChannel = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `/videos/currentUserVideos/${currentUser._id}`
      );
      setUserVideos(res.data);
    };
    fetchVideos();
  }, [currentUser._id, setUserVideos]);

  return (
    <>
      <Container>
        <ChannelHeader>
          <img src={currentUser?.img} alt="" />
          <div>
            <h3>{currentUser?.name}</h3>
            <p>{currentUser?.subscribers} subscribers</p>
            <p>Total Videos : {userVideos?.length}</p>
          </div>
        </ChannelHeader>
        <VideoList>
          {userVideos?.map((video) => (
            <Card key={video._id} video={video} />
          ))}
        </VideoList>
      </Container>
    </>
  );
};

export default YourChannel;
