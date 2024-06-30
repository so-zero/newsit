import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div className="border-b border-black p-3 text-nowrap">
      <ul className="p-5 md:px-6 md:py-8 lg:px-8 lg:py-10 flex gap-4 md:gap-10 justify-center font-semibold text-sm md:text-lg">
        <li>
          <Link to="/" className="text-blue-500">
            전체
          </Link>
        </li>
        <li className="transition hover:text-blue-500">
          <Link to="/post/categories/economy">💰경제</Link>
        </li>
        <li className="transition hover:text-blue-500">
          <Link to="/post/categories/tech">🤖기술</Link>
        </li>
        <li className="transition hover:text-blue-500">
          <Link to="/post/categories/environment">🍀환경</Link>
        </li>
        <li className="transition hover:text-blue-500">
          <Link to="/post/categories/global">🌏세계</Link>
        </li>
        <li className="transition hover:text-blue-500">
          <Link to="/post/categories/sport">⚽운동</Link>
        </li>
      </ul>
    </div>
  );
}
