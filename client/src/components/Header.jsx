import React, { useEffect, useState } from "react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { LuSearch, LuUser2 } from "react-icons/lu";
import { useSelector } from "react-redux";
import { persistor } from "../redux/store";
import axios from "axios";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      const getAvatar = async () => {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/user/${
          currentUser.id
        }`;
        const response = await axios.get(URL, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        const { avatar } = response.data;
        setAvatar(avatar);
      };
      getAvatar();
    }
  }, [currentUser]);

  const purge = async () => {
    window.location.reload();
    await persistor.purge();
  };

  return (
    <Navbar className="p-5 md:px-6 md:py-8 lg:px-8 lg:py-10 border-black border-b bg-background">
      <Link to="/">
        <h1 className="font-title uppercase text-4xl md:text-5xl lg:text-6xl">
          Newsit
        </h1>
      </Link>
      <div className="flex items-center cursor-pointer">
        <div className="w-12 h-12 lg:w-14 lg:h-14 border border-black flex items-center justify-center">
          <Link to="/search">
            <LuSearch size={20} />
          </Link>
        </div>
        <div className="w-12 h-12 lg:w-14 lg:h-14 border border-black flex items-center justify-center">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-semibold">
                  {currentUser.name}
                </span>
              </Dropdown.Header>
              <Link to="/dashboard?tab=profile">
                <Dropdown.Item>회원정보</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item>
                <span onClick={async () => purge()}>로그아웃</span>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/login">
              <LuUser2 size={20} />
            </Link>
          )}
        </div>
      </div>
    </Navbar>
  );
}
