import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import CancelIcon from "@mui/icons-material/Cancel";
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

const CommentButtons = styled.button`
  color: ${({ theme }) => theme.textSoft};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.textSoft};
  outline: none;
  padding: 8px;
  border-radius: 25px;
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
  svg {
    font-size: 16px;
  }
`;
const CommentContainer = styled.div`
  psotion: relative;
`;
const NoCommentText = styled.p`
  color: ${({ theme }) => theme.textSoft};
  margin-top: 10px;
  font-size: 18px;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
`;
const Comments = ({ videoId, userId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId, comments]);

  //ADD NEW COMMENT FUNCTIONALITY
  const addNewComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/comments", {
        text,
        userId,
        videoId,
      });
      setComments([...comments, res.data]);
      setText("");
      setOpenComment(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Form onSubmit={addNewComment}>
          <Input
            placeholder="Add a comment..."
            name="comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form>
      </NewComment>
      {comments.length === 0 && <NoCommentText>No comments yet</NoCommentText>}

      {!openComment && comments.length > 0 && (
        <CommentButtons onClick={() => setOpenComment(!openComment)}>
          Show Comments
        </CommentButtons>
      )}
      {openComment && comments.length > 0 && (
        <CommentContainer>
          <CommentButtons onClick={() => setOpenComment(!openComment)}>
            <CancelIcon /> Hide Comments
          </CommentButtons>
          {comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </CommentContainer>
      )}
    </Container>
  );
};

export default Comments;
