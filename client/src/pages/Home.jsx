import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: center;

  flex-wrap: wrap;
  gap: 30px;
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
