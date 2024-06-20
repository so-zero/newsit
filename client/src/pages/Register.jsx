import { Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
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
            type="text"
            placeholder="이름"
            id="name"
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
        <div>
          <TextInput
            type="password"
            placeholder="비밀번호 확인"
            id="password2"
            color="base"
            sizing="lg"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" color="dark" className="hover:cursor-pointer" />
          <Label htmlFor="agree" className="flex">
            만 14세 이상 가입 동의
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" color="dark" className="hover:cursor-pointer" />
          <Label htmlFor="agree" className="flex">
            이용약관 동의
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" color="dark" className="hover:cursor-pointer" />
          <Label htmlFor="agree" className="flex">
            개인정보 수집/이용 동의
          </Label>
        </div>
        <button className="my-5 bg-black text-white w-full py-3 rounded-md transition hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(100,100,100)]">
          가입하기
        </button>
      </form>
      <div className="flex items-center gap-2 mx-auto text-sm text-gray-500">
        <span>계정이 있으신가요?</span>
        <Link to="/login" className="transition hover:underline">
          로그인
        </Link>
      </div>
    </div>
  );
}
