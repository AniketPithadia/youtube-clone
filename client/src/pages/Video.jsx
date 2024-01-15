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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import { useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import EditVideo from "../components/EditVideo";

const Container = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: ${(props) => (props.windowSize === "sm" ? "column" : "row")};
  font-size: ${(props) => (props.windowSize === "sm" ? "12px" : "14px")};
`;

const Content = styled.div`
  flex: 5;
  height: 100%;
`;
const VideoWrapper = styled.div`
  border-radius: 10px;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;

  object-fit: cover;
  border-radius: 20px;
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
  display: flex;
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
  background-color: ${(props) => (props.subscribed ? "#cc1a00" : "gray")};
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 25px;
  height: max-content;
  font-size: ${(props) => (props.windowSize === "sm" ? "12px" : "14px")};
  padding: ${(props) => (props.windowSize === "sm" ? "8px 10px" : "10px 30px")};

  cursor: pointer;
`;
const ActionButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  font-size: ${(props) => (props.windowSize === "sm" ? "12px" : "14px")};
  display: flex;
  justify-content: center;

  align-items: center;
  border-radius: 25px;
  padding: 10px;
  cursor: pointer;
  cursor: pointer;
  height: max-content;
  &:nth-child(1):hover {
    background-color: #c1bec4;
  }
  &:nth-child(2):hover {
    background-color: #cc1a00;
  }
`;

const ShareIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [copied, setCopied] = useState(false);
  const windowSize = useMediaQuery("(max-width:800px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const checkIsSubscribed = currentUser.subscribedUsers?.includes(channel._id);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [videoUpdated, setVideoUpdated] = useState(false);
  useEffect(() => {
    const incrementView = async () => {
      await axios.put(`/videos/view/${path}`);
    };
    incrementView();
  }, [path]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch, channel.subscribedUsers, videoUpdated]);

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };
  const handleDelete = async () => {
    await axios.delete(`/videos/${currentVideo._id}`);
    navigate("/");
  };
  return (
    <>
      <Container windowSize={windowSize ? "sm" : ""}>
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
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 2000);
                    }}
                  >
                    {copied ? (
                      <span> Copied!</span>
                    ) : (
                      <ShareIcon>
                        <ReplyOutlinedIcon /> Share
                      </ShareIcon>
                    )}
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
                  <ActionButtonContainer>
                    <ActionButton
                      onClick={() => setOpenEditForm(!openEditForm)}
                    >
                      <EditIcon />
                    </ActionButton>
                    <ActionButton
                      windowSize={windowSize ? "sm" : ""}
                      onClick={handleDelete}
                    >
                      <DeleteIcon />
                    </ActionButton>
                  </ActionButtonContainer>
                ) : (
                  <Subscribe
                    onClick={handleSub}
                    windowSize={windowSize ? "sm" : ""}
                    subscribed={checkIsSubscribed}
                  >
                    {checkIsSubscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
                  </Subscribe>
                )}
              </Channel>
              <Hr />
              <Comments videoId={currentVideo._id} userId={currentUser._id} />
            </Content>
            <Recommendation tags={currentVideo.tags} />
          </>
        ) : (
          <h1>Nothing here</h1>
        )}
      </Container>
      {openEditForm && (
        <EditVideo
          setVideoUpdated={setVideoUpdated}
          setOpenEditForm={setOpenEditForm}
        />
      )}
    </>
  );
};

export default Video;
