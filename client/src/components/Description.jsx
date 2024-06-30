import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgDescription from "../assets/description.png";
import imgDescription2 from "../assets/description2.png";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";

export default function Description() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/user`;
      try {
        const response = await axios.get(URL);
        if (response.status === 200) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPosts = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/post`;
      try {
        const response = await axios.get(URL);
        if (response.status === 200) {
          setPosts(response.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-background border border-black">
        <div className="flex justify-center items-center py-12 relative">
          <img
            src={imgDescription}
            alt="image"
            className="h-[250px] absolute bottom-0 right-10 hidden lg:block"
          />
          <img
            src={imgDescription2}
            alt="image"
            className="h-[250px] absolute bottom-0 left-0 lg:left-10 hidden md:block"
          />
          <div className="flex flex-col justify-center gap-6">
            <h1 className="text-xl font-semibold md:text-3xl text-center">
              5분만에 하루가 보입니다.
            </h1>
            <p className="px-12 text-center md:px-2">
              오늘까지 <span className="font-bold">{posts.length}회</span>의
              뉴스레터를 발행했고,
              <span className="font-bold"> {users.length}명</span>이 구독했어요!
            </p>
          </div>
        </div>
      </div>
      <div className="bg-primary">
        <div className="flex items-center gap-5 justify-center py-10">
          <Link className="text-xl">어플 다운로드하기</Link>
          <BsArrowRight size={30} />
        </div>
      </div>
    </div>
  );
}
