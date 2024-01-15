import { useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
const Container = styled.div`
  width: 100%;
  justify-content: flex-start;
  font-size: ${(props) => (props.type === "sm" ? "12px" : "14px")};
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: ${(props) =>
    props.recommendStyle && props.type !== "sm" ? "center" : "flex-start"};
  flex-direction: ${(props) => {
    if (props.recommendStyle && props.type === "sm") return "column";
    if (props.recommendStyle) return "row";
    if (props.type === "sm") return "column";
    return "column";
  }};
  gap: 15px;
`;

const Image = styled.div`
  border-radius: 20px;

  width: ${(props) => {
    if (props.recommendStyle && props.type === "sm") return "220px";
    if (props.recommendStyle) return "220px";
    if (props.type === "sm") return "265px";
    return "360px";
  }};
  height: ${(props) => {
    if (props.recommendStyle && props.type === "sm") return "130px";
    if (props.recommendStyle) return "110px";
    if (props.type === "sm") return "160px";
    return "200px";
  }};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const Details = styled.div`
  display: flex;

  gap: 10px;
  width: ${(props) =>
    props.recommendStyle && props.type !== "sm" ? "50%" : "100%"};
`;

const ChannelImage = styled.img`
  width: ${(props) => (props.type === "sm" ? "25px" : "36px")};
  height: ${(props) => (props.type === "sm" ? "25px" : "36px")};
  border-radius: 50%;
  background-color: #999;
  display: ${(props) =>
    props.recommendStyle && props.type !== "sm" ? "none" : "block"};
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Title = styled.h1`
  font-size: ${(props) =>
    props.recommendStyle && props.type !== "sm" ? "13px" : "14px"};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: ${(props) =>
    props.recommendStyle && props.type !== "sm" ? "13px" : "14px"};
  color: ${({ theme }) => theme.textSoft};
  margin: 5px 0px;
`;

const Info = styled.div`
  font-size: ${(props) =>
    props.recommendStyle && props.type !== "sm" ? "12px" : "13px"};
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ recommendStyle, video }) => {
  const [channel, setChannel] = useState({});
  const windowsSize = useMediaQuery("(max-width:800px)");
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId, channel]);

  return (
    <Link
      to={!currentUser ? "signin" : `/video/${video._id}`}
      style={{ textDecoration: "none" }}
    >
      <Container type={windowsSize ? "sm" : ""} recommendStyle={recommendStyle}>
        <Image type={windowsSize ? "sm" : ""} recommendStyle={recommendStyle}>
          <img src={video.imgUrl} alt="videoThumbnail" />
        </Image>

        <Details type={windowsSize ? "sm" : ""} recommendStyle={recommendStyle}>
          <ChannelImage
            type={windowsSize ? "sm" : ""}
            src={channel.img}
            recommendStyle={recommendStyle}
          />
          <Texts>
            <Title recommendStyle={recommendStyle}>{video.title}</Title>
            <ChannelName recommendStyle={recommendStyle}>
              {channel.name}
            </ChannelName>
            <Info recommendStyle={recommendStyle}>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
