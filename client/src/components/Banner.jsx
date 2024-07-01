import React, { useState } from "react";
import { TextInput } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import Checkbox from "./Checkbox";
import imgBanner from "../assets/banner.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Banner() {
  const [data, setData] = useState({
    email: "",
    name: "",
  });
  const [service, setService] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/newsletter`;

    try {
      const response = await axios.post(URL, data);
      await response.data;
      navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="py-10 px-10 lg:px-20 border-b border-black flex flex-col-reverse items-center lg:justify-around lg:flex-row relative">
      <div className="flex flex-col justify-center max-w-screen-2xl">
        <div>
          <p className="font-bold text-center md:text-left md:text-2xl leading-12">
            🎉 지금 구독하면 오늘 꼭 알아야 하는&nbsp;
            <span className="md:block md:ml-[38px]">
              국내외 뉴스를 요약해 드려요!
            </span>
          </p>
        </div>
        <form
          className="flex max-w-md flex-col gap-4 mt-6"
          onSubmit={handleSubmit}
        >
          <div>
            <TextInput
              type="email"
              name="email"
              value={data.email}
              sizing="lg"
              placeholder="이메일 주소"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <TextInput
              type="text"
              name="name"
              value={data.name}
              sizing="lg"
              placeholder="닉네임"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Checkbox checked={service} onChange={setService}>
              개인정보 수집·이용에 동의합니다. (필수)
            </Checkbox>
            <Checkbox checked={marketing} onChange={setMarketing}>
              광고성 정보 수신에 동의합니다. (선택)
            </Checkbox>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <button
              type="submit"
              disabled={!service}
              className="text-center border-2 border-black rounded-lg bg-white py-3 px-5 transition hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)]"
            >
              뉴스레터 무료로 구독하기
            </button>
            <Link
              type="submit"
              className="flex justify-center items-center text-center border-2 border-black rounded-lg bg-black text-white py-3 px-5 transition hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(100,100,100)]"
            >
              <p>앱 다운로드하기</p>
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </form>
      </div>
      <div>
        <img
          src={imgBanner}
          alt="Banner"
          className="object-cover h-[400px] mb-6 md:mb-0 md:h-[430px] lg:w-[450px]  md:object-top"
        />
      </div>
    </section>
  );
}
