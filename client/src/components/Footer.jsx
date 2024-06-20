import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="py-5 px-10 lg:px-28 border-t border-black">
        <div className="md:flex md:items-center md:justify-between">
          <Link to="/">
            <h1 className="font-title uppercase text-2xl md:text-3xl lg:text-4xl">
              Newsit
            </h1>
          </Link>
          <div className="text-xs flex gap-10 mt-3 text-gray-800">
            <div className="leading-loose cursor-pointer">
              <p>인스타그램</p>
              <p>페이스북</p>
              <p>X</p>
            </div>
            <div className="leading-loose cursor-pointer">
              <p>서비스 이용약관</p>
              <p>개인정보처리방침</p>
              <p>제휴 문의</p>
              <p>고객센터</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-xs py-3 px-10 border-t border-black text-gray-600 md:text-center">
        ⓒ NEWSIT Co., Ltd.
      </div>
    </footer>
  );
}
