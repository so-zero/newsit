import React from "react";
import { TextInput } from "flowbite-react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Search() {
  return (
    <div className="max-w-screen-sm mx-auto pt-5 px-4">
      <form>
        <TextInput
          id="large"
          type="text"
          sizing="lg"
          placeholder="궁금한 이슈를 물어보세요!"
          icon={HiOutlineArrowSmLeft}
          color="black"
        />
      </form>
      <section className="mt-10">
        <h2 className="uppercase font-bold">Newsit 추천 카테고리</h2>
        <ul className="my-4 text-sm">
          <li className="py-2 ">
            <Link>경제</Link>
          </li>
          <li className="py-2">
            <Link>테크</Link>
          </li>
          <li className="py-2">
            <Link>환경</Link>
          </li>
          <li className="py-2">
            <Link>사회</Link>
          </li>
          <li className="py-2">
            <Link>문화</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
