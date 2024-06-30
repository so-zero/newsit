import React, { useEffect, useState } from "react";
import { Navbar, Dropdown } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuUser2, LuSearch } from "react-icons/lu";
import { useSelector } from "react-redux";
import { persistor } from "../redux/store";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchUrl = urlParams.get("keyword");

    if (searchUrl) {
      setKeyword(searchUrl);
      setKeyword("");
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("keyword", keyword);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

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
        <form onSubmit={handleSubmit}>
          <div className="relative flex items-center">
            <LuSearch className="w-5 h-5 absolute ml-3" />
            <input
              type="text"
              className="w-[84px] h-12 md:w-32 lg:w-50 lg:h-14 border border-black pr-3 pl-10 focus:ring-0"
              placeholder="검색하기"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </form>
        <div className="w-12 h-12 lg:w-14 lg:h-14 border border-black border-l-0 flex items-center justify-center">
          {currentUser ? (
            <Dropdown arrowIcon={false} inline label={<LuUser2 size={20} />}>
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
