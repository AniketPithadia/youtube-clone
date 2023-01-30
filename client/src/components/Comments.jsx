import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  border: none;
  background: transparent;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.textSoft};
  padding: 10px 20px;
  cursor: pointer;
`;
const Comments = ({ videoId, userId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId, comments]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY
  const addNewComment = async () => {
    console.log(newComment, userId);
    try {
      const res = await axios.post("/comments", { newComment, userId: userId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          placeholder="Add a comment..."
          name="comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={addNewComment}>Add Coment</Button>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
