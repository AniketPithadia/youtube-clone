import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const H1Text = styled.h1`
  color: ${({ theme }) => theme.text};
  margin-top: 20px;
  margin-bottom: 10px;

  font-weight: 400;
  width: 100%;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos.length > 0 ? (
        videos.map((video) => <Card key={video._id} video={video} />)
      ) : (
        <H1Text>No videos match the search result!</H1Text>
      )}
    </Container>
  );
};

export default Search;
