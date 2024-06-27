import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import default_Img from "../assets/avatar.png";
import axios from "axios";
import { Alert, Textarea } from "flowbite-react";
import Comment from "./Comment";

export default function CommentList({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const getAvatar = async () => {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/user/${
          currentUser.id
        }`;
        const response = await axios.get(URL, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        const { avatar } = response.data;
        setAvatar(avatar);
      };
      getAvatar();
    }
  }, [currentUser]);

  const onErrorImg = (e) => {
    e.target.src = default_Img;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      return;
    }

    const URL = `${import.meta.env.VITE_BACKEND_URL}/comment/create`;
    let data = { content: comment, postId, userId: currentUser.id };

    try {
      const response = await axios.post(URL, data, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setComment("");
      setComments([response.data, ...comments]);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/comment/${postId}`;
      try {
        const response = await axios.get(URL);
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-3 text-sm">
      {currentUser ? (
        <div className="flex items-center gap-2 my-5 text-gray-500">
          <p>다음 계정으로 로그인 되었습니다: </p>
          <img
            src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`}
            alt={currentUser.name}
            onError={onErrorImg}
            className="w-8 h-8 object-cover rounded-full border border-gray-500"
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-black font-semibold"
          >
            {currentUser.name}
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-2 my-5 text-gray-500 text-sm">
          <p>로그인 후 댓글을 등록하실 수 있습니다.</p>
          <Link to="/login" className="font-bold transition hover:underline">
            로그인
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-gray-400 p-3 rounded-md"
        >
          <Textarea
            placeholder="댓글을 입력해주세요."
            rows="4"
            maxLength="200"
            color="base"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-400">
              <span className="text-black">{comment.length}</span> / 200
            </p>
            <button
              type="submit"
              className="py-1 px-2 bg-gray-400 rounded-sm text-white transition hover:bg-black"
            >
              등록
            </button>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">댓글이 없습니다.</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center">
            <p className="font-bold">{comments.length}</p>
            <p>개의 댓글</p>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onEdit={handleEdit} />
          ))}
        </>
      )}
    </div>
  );
}
