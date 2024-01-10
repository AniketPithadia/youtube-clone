import { useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
const Container = styled.div`
  width: ${(props) => (props.type === "sm" ? "220px" : "350px")};

  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => props.type === "sm" && "column"};
  gap: 10px;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

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
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ video }) => {
  const [channel, setChannel] = useState({});
  const windowsSize = useMediaQuery("(max-width:800px)");
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    console.log(channel);
    fetchChannel();
  }, [video.userId]);

  return (
    <Link
      to={!currentUser ? "signin" : `/video/${video._id}`}
      style={{ textDecoration: "none" }}
    >
      <Container type={windowsSize ? "sm" : ""}>
        <Image type={windowsSize ? "sm" : ""} src={video.imgUrl} />

        <Details type={windowsSize ? "sm" : ""}>
          <ChannelImage type={windowsSize ? "sm" : ""} src={channel.img} />
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
