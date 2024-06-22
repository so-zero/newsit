import React from "react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { LuSearch, LuUser2 } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Navbar className="p-5 md:px-6 md:py-8 lg:px-8 lg:py-10 border-black border-b bg-background">
      <Link to="/">
        <h1 className="font-title uppercase text-4xl md:text-5xl lg:text-6xl">
          Newsit
        </h1>
      </Link>
      <div className="flex items-center cursor-pointer">
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 border border-black flex items-center justify-center">
          <Link to="/search">
            <LuSearch size={20} />
          </Link>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 border border-black flex items-center justify-center">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.avatar && currentUser.avatar}
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
              <Dropdown.Item>로그아웃</Dropdown.Item>
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
