import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);
  const { currentVideo } = useSelector((state) => state.video);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `https://youtube2-0-api.onrender.com/api/videos/tags?tags=${tags}`
      );
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos
        .filter((video) => video._id !== currentVideo._id)
        .map((video) => (
          <Card type="sm" key={video._id} video={video} />
        ))}
    </Container>
  );
};

export default Recommendation;
