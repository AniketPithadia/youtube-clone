import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-items: center;
  gap: 20px;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);
  const { currentVideo } = useSelector((state) => state.video);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos
        .filter((video) => video._id !== currentVideo._id)
        .map((video) => (
          <Card key={video._id} video={video} recommendStyle={true} />
        ))}
    </Container>
  );
};

export default Recommendation;
