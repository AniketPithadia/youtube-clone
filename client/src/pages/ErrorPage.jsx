import React from "react";
import errorAnimation from "../img/errorAnimation.json";
import Lottie from "lottie-react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Make sure to import Link if you're using React Router
const Text = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin-top: 10px;
  a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimationContainer = styled.div`
width : 200px;
    margin-bottom: 20px;
    }   
    background-color: ${({ theme }) => theme.text};
    border-radius: 50%;
    padding: 20px;
`;
const ErrorPage = () => {
  return (
    <Container>
      <AnimationContainer>
        <Lottie animationData={errorAnimation} height={200} width={200} />
      </AnimationContainer>
      <Text>Oops! Something went wrong.</Text>
      <Text>
        <Link to="/">Click here for homepage</Link>
      </Text>
    </Container>
  );
};

export default ErrorPage;
