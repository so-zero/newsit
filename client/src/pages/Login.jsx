import { TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="mt-20 px-3 flex flex-col max-w-screen-sm mx-auto">
      <h1 className="font-title uppercase text-5xl text-center">Newsit</h1>
      <form className="flex flex-col gap-4 mt-10 px-10">
        <div>
          <TextInput
            type="text"
            placeholder="이메일"
            id="email"
            color="base"
            sizing="lg"
            required
          />
        </div>
        <div>
          <TextInput
            type="password"
            placeholder="비밀번호"
            id="password"
            color="base"
            sizing="lg"
            required
          />
        </div>
        <button className="my-5 bg-black text-white w-full py-3 rounded-md transition hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(100,100,100)]">
          로그인
        </button>
      </form>
      <Link
        to="/register"
        className="mx-auto text-sm text-gray-500 transition hover:underline"
      >
        회원가입
      </Link>
    </div>
  );
}
