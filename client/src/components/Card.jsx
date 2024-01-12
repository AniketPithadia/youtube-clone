import { useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
const Container = styled.div`
  width: 100%;

  font-size: ${(props) => (props.type === "sm" ? "12px" : "14px")};
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
`;

const Image = styled.div`
  border-radius: 20px;
  width: ${(props) => (props.type === "sm" ? "250px" : "360px")};
  height: ${(props) => (props.type === "sm" ? "150px" : "200px")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 10px;
`;

const ChannelImage = styled.img`
  width: ${(props) => (props.type === "sm" ? "25px" : "36px")};
  height: ${(props) => (props.type === "sm" ? "25px" : "36px")};
  border-radius: 50%;
  background-color: #999;
  display: block;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  flex: 1;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 13px;
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
      <Container type={windowsSize && "sm"} recommendStyle={recommendStyle}>
        <Image type={windowsSize && "sm"}>
          <img src={video.imgUrl} alt="videoThumbnail" />
        </Image>

        <Details type={windowsSize && "sm"}>
          <ChannelImage type={windowsSize && "sm"} src={channel.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
