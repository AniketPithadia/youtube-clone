import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;

  gap: 24px;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 5;
  height: 100vh;
`;
const VideoWrapper = styled.div`
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 500px) {
    align-items: flex-start;
    gap: 15px;
    flex-direction: column;
  }
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
  @media (max-width: 500px) {
    display: flex;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;

  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const DeleteVideoButton = styled.button`
  background-color: #d1c8c8;
  color: #00000a;
  font-weight: 500;
  font-size: 14px;

  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #cc1a00;
  }
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;
const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname.split("/")[2];
  const [readyForRender, setReadyForRender] = useState(false);
  const [channel, setChannel] = useState({});

  useEffect(() => {
    console.log("useEffect Calling");
    const incrementView = async () => {
      await axios.put(
        `https://youtube2-0-api.onrender.com/api/videos/view/${path}`
      );
    };
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          `https://youtube2-0-api.onrender.com/api/videos/find/${path}`
        );
        const channelRes = await axios.get(
          `https://youtube2-0-api.onrender.com/api/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setReadyForRender(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    incrementView();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(
      `https://youtube2-0-api.onrender.com/api/users/like/${currentVideo._id}`
    );
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(
      `https://youtube2-0-api.onrender.com/api/users/dislike/${currentVideo._id}`
    );
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(
          `https://youtube2-0-api.onrender.com/api/users/unsub/${channel._id}`
        )
      : await axios.put(
          `https://youtube2-0-api.onrender.com/api/users/sub/${channel._id}`
        );
    dispatch(subscription(channel._id));
  };
  const handleDelete = async () => {
    await axios.delete(
      `https://youtube2-0-api.onrender.com/api/videos/${currentVideo._id}`
    );
    navigate("/");
  };
  return (
    <Container>
      {currentVideo ? (
        <>
          <Content>
            <VideoWrapper>
              <VideoFrame src={currentVideo.videoUrl} controls />
            </VideoWrapper>
            <Title>{currentVideo.title}</Title>
            <Details>
              <Info>
                {currentVideo.views} views • {format(currentVideo.createdAt)}
              </Info>
              <Buttons>
                <Button onClick={handleLike}>
                  {currentVideo.likes?.includes(currentUser?._id) ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbUpOutlinedIcon />
                  )}
                  {currentVideo.likes?.length}
                </Button>
                <Button onClick={handleDislike}>
                  {currentVideo.dislikes?.includes(currentUser?._id) ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}
                  Dislike
                </Button>
                <Button>
                  <ReplyOutlinedIcon /> Share
                </Button>
                <Button>
                  <AddTaskOutlinedIcon /> Save
                </Button>
              </Buttons>
            </Details>
            <Hr />
            <Channel>
              <ChannelInfo>
                <Image src={channel.img} />
                <ChannelDetail>
                  <ChannelName>{channel.name}</ChannelName>
                  <ChannelCounter>
                    {channel.subscribers} subscribers
                  </ChannelCounter>
                  <Description>{currentVideo.desc}</Description>
                </ChannelDetail>
              </ChannelInfo>{" "}
              {currentUser._id === currentVideo.userId ? (
                <DeleteVideoButton onClick={handleDelete}>
                  Delete Video
                </DeleteVideoButton>
              ) : (
                <Subscribe onClick={handleSub}>
                  {currentUser.subscribedUsers?.includes(channel._id)
                    ? "SUBSCRIBED"
                    : "SUBSCRIBE"}
                </Subscribe>
              )}
            </Channel>
            <Hr />
            {/* <Comments videoId={currentVideo._id} userId={currentUser._id} /> */}
          </Content>
          <Recommendation tags={currentVideo.tags} />
        </>
      ) : (
        <h1>Nothing here</h1>
      )}
    </Container>
  );
};

export default Video;
