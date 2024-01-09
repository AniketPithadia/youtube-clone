import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: grid;
  grid-column-gap: 30px;
  hieght: 100vh;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1025px) {
    grid-row-gap: 15px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 800px) {
    z-index: 100;
    place-items: center;
    grid-row-gap: 15px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log("useEffect Calling!!!!");
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);

      setVideos(res.data);
      console.log(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {Array.isArray(videos) ? (
        videos.map((video) => <Card key={video._id} video={video} />)
      ) : (
        <h1>Nothing to see</h1>
      )}
    </Container>
  );
};

export default Home;
