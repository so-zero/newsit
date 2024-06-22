import React from "react";
import { useSelector } from "react-redux";
import avatarImg from "../assets/avatar.png";
import { TextInput } from "flowbite-react";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-xl">프로필</h1>
      <form className="flex flex-col gap-4">
        <div className="w-28 h-28 self-center cursor-pointer ">
          <img
            src={currentUser.avatar ? currentUser.avatar : avatarImg}
            alt="avatar"
            className=" w-full h-full object-cover rounded-full overflow-hidden bg-white border-4 border-gray-400"
          />
        </div>
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
