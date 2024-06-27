import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import default_Img from "../assets/avatar.png";
import moment from "moment";

export default function Comment({ comment }) {
  const { currentUser } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (currentUser) {
      const getAvatar = async () => {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/user/${
          currentUser.id
        }`;
        const response = await axios.get(URL);
        setAvatar(response.data);
      };
      getAvatar();
    }
  }, [currentUser]);

  const onErrorImg = (e) => {
    e.target.src = default_Img;
  };

  useEffect(() => {
    const getUserComment = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/user/${comment.userId}`;
      try {
        const response = await axios.get(URL);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserComment();
  }, [comment]);
  return (
    <div className="flex p-4 border-b text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`}
          alt={user.name}
          onError={onErrorImg}
          className="w-10 h-10 object-cover rounded-full border border-gray-500"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <span className="font-bold mr-2 text-xs truncate">
            {currentUser ? `${user.name}` : "익명의 유저"}
          </span>
          <span className="text-xs text-gray-400">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-600 pb-2">{comment.content}</p>
      </div>
    </div>
  );
}
