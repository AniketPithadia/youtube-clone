import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useMediaQuery } from "@mui/material";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.windowSize ? "center" : "flex-start")};
  flex-wrap: wrap;
  gap: 20px;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const windowSize = useMediaQuery("(max-width: 600px)");
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);

      setVideos(res.data);
      console.log(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container windowSize={windowSize}>
      {Array.isArray(videos) ? (
        videos.map((video) => <Card key={video._id} video={video} />)
      ) : (
        <h1>Nothing to see</h1>
      )}
    </Container>
  );
};

export default Home;
