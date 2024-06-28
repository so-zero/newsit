import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser, HiUserGroup } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { persistor } from "../redux/store";
import { IoDocumentText } from "react-icons/io5";
import { BiSolidCommentDetail } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    if (tabUrl) {
      setTab(tabUrl);
    }
  }, [location.search]);

  const purge = async () => {
    window.location.reload();
    await persistor.purge();
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              프로필
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=posts">
                <Sidebar.Item
                  active={tab === "posts"}
                  icon={IoDocumentText}
                  as="div"
                >
                  글 목록
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiUserGroup}
                  as="div"
                >
                  유저 목록
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=comments">
                <Sidebar.Item
                  active={tab === "comments"}
                  icon={BiSolidCommentDetail}
                  as="div"
                >
                  댓글 목록
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            <span onClick={async () => purge()}>로그아웃</span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
