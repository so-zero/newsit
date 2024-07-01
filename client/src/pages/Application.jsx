import React from "react";
import imgApp from "../assets/app.png";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function Application() {
  return (
    <div className="min-h-[600px]">
      <div className="flex flex-col gap-4 text-center m-5 py-5 px-3">
        <h2 className="text-xl">국내외 뉴스가 궁금하다면🤔</h2>
        <h1 className="text-2xl md:text-3xl font-bold">
          Newsit 어플 다운받기🎉
        </h1>
      </div>
      <img src={imgApp} alt="appLogo" className="object-cover mx-auto mt-16" />
      <div className="flex gap-4 justify-center mt-20 ">
        <div className="flex justify-center items-center border-2 border-black rounded-lg bg-white py-3 px-5 transition hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] cursor-pointer">
          <p>구글플레이</p>
          <FaGooglePlay className="ml-2 h-5 w-5" />
        </div>
        <div className="flex justify-center items-center text-center border-2 border-black rounded-lg bg-black text-white py-3 px-5 transition hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(100,100,100)] cursor-pointer">
          <p>앱스토어</p>
          <FaApple className="ml-2 h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
