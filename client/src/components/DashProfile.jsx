import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import default_Img from "../assets/avatar.png";
import { TextInput } from "flowbite-react";
import axios from "axios";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("");
  const [isAvatarClick, setIsAvatarClick] = useState(false);

  const handleClick = async () => {
    setIsAvatarClick(false);
    const URL = `${import.meta.env.VITE_BACKEND_URL}/user/change-avatar`;
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(URL, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setAvatar(response?.data?.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const onErrorImg = (e) => {
    e.target.src = default_Img;
  };

  useEffect(() => {
    const getAvatar = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/user/${currentUser.id}`;
      const response = await axios.get(URL, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      const { avatar } = response.data;
      setAvatar(avatar);
    };
    getAvatar();
  }, [currentUser.id, currentUser.token]);

  return (
    <div className="max-w-lg mx-auto p-3 w-full relative">
      <h1 className="my-7 text-center font-semibold text-xl">프로필</h1>
      <div className="relative">
        <div className="w-28 h-28 flex flex-col justify-center items-center mb-4 mx-auto">
          <img
            src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar} `}
            className="w-full h-full object-cover rounded-full overflow-hidden bg-white border-4 border-gray-400"
            onError={onErrorImg}
          />
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="png, jpg, jpeg"
            onChange={(e) => setAvatar(e.target.files[0])}
            hidden
          />
          <label
            htmlFor="avatar"
            onClick={() => setIsAvatarClick(true)}
            className="bg-black text-white w-fit mx-auto p-1 rounded-md text-sm absolute bottom-0 right-2/4 translate-x-2/4 cursor-pointer"
          >
            선택하기
          </label>
        </div>
        {isAvatarClick && (
          <button
            className="bg-black text-white w-fit mx-auto p-1 rounded-md text-sm absolute bottom-0 right-2/4 translate-x-2/4"
            onClick={handleClick}
          >
            변경하기
          </button>
        )}
      </div>
      <form className="flex flex-col gap-4">
        <TextInput
          id="name"
          type="text"
          defaultValue={currentUser.name}
          placeholder="이름"
          color="base"
        />
        <TextInput
          id="email"
          type="email"
          defaultValue={currentUser.email}
          placeholder="이메일"
          color="base"
        />
        <TextInput
          id="password"
          type="password"
          placeholder="비밀번호"
          color="base"
        />
        <TextInput
          id="password2"
          type="password"
          placeholder="비밀번호 확인"
          color="base"
        />
        <button
          type="submit"
          className=" bg-black text-white w-full py-3 rounded-md transition hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(100,100,100)]"
        >
          업데이트
        </button>
      </form>
      <div className="text-gray-600  mt-5 flex justify-between">
        <span className="cursor-pointer text-sm hover:text-red-600 transition">
          탈퇴하기
        </span>
        <span className="cursor-pointer text-sm">로그아웃</span>
      </div>
    </div>
  );
}
