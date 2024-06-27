import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import default_Img from "../assets/avatar.png";
import moment from "moment";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onEdit }) {
  const { currentUser } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

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

  const handleEdit = async () => {
    setEdit(true);
    setEditContent(comment.content);
  };

  const handleSave = async () => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/comment/edit/${
      comment._id
    }`;
    let data = { content: editContent };
    try {
      const response = await axios.patch(URL, data, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });

      await response.data;
      setEdit(false);
      onEdit(comment, editContent);
    } catch (error) {
      console.log(error);
    }
  };
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
        <div className="flex items-center mb-1">
          <span className="font-bold mr-2 text-xs truncate">
            {currentUser ? `${user.name}` : "익명의 유저"}
          </span>
          <span className="text-xs text-gray-400">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {edit ? (
          <>
            <Textarea
              className="mb-2"
              color="base"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs items-center">
              <Button type="button" size="sm" color="blue" onClick={handleSave}>
                저장
              </Button>
              <Button
                type="button"
                size="sm"
                color="dark"
                onClick={() => setEdit(false)}
              >
                취소
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 pb-2">{comment.content}</p>
            <div>
              {currentUser &&
                (currentUser.id === comment.userId || currentUser.isAdmin) && (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="text-gray-400 transition hover:text-blue-500 text-xs"
                  >
                    수정
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
