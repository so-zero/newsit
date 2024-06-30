import React from "react";
import { Checkbox, Label, TextInput } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import imgBanner from "../assets/banner.png";

export default function Banner() {
  return (
    <section className="bg-primary py-10 px-10 lg:px-20 border-b border-black flex flex-col-reverse items-center lg:justify-around lg:flex-row ">
      <div className="flex flex-col justify-center max-w-screen-2xl">
        <div>
          <p className="font-bold leading-relaxed text-center">
            🎉 지금 구독하면 오늘 꼭 알아야 할 국내외 뉴스를 요약해 드려요!
          </p>
        </div>
        <form className="flex max-w-md flex-col gap-4 mt-6">
          <div>
            <TextInput
              id="email"
              type="email"
              sizing="lg"
              placeholder="이메일 주소"
              color="base"
              required
            />
          </div>
          <div>
            <TextInput
              id="name"
              type="text"
              sizing="lg"
              placeholder="닉네임"
              color="base"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="agree"
              color="dark"
              className="hover:cursor-pointer"
            />
            <Label htmlFor="agree" className="flex">
              개인정보 수집·이용에 동의합니다.
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="agree"
              color="dark"
              className="hover:cursor-pointer"
            />
            <Label htmlFor="agree" className="flex">
              광고성 정보 수신에 동의합니다.
            </Label>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <button
              type="submit"
              className="text-center border-2 border-black rounded-lg bg-white py-3 px-5 transition hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)]"
            >
              뉴스레터 무료로 구독하기
            </button>
            <button
              type="submit"
              className="flex justify-center items-center text-center border-2 border-black rounded-lg bg-black text-white py-3 px-5 transition hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(100,100,100)]"
            >
              <p>앱 다운로드하기</p>
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
      <div>
        <img src={imgBanner} alt="Banner" className="object-cover" />
      </div>
    </section>
  );
}
