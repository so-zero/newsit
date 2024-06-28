import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiUserGroup, HiArrowUp } from "react-icons/hi";
import { IoDocumentText } from "react-icons/io5";
import { BiSolidCommentDetail } from "react-icons/bi";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashAdmin() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/user?limit=5`;
      try {
        const response = await axios.get(URL);
        if (response.status === 200) {
          setUsers(response.data.users);
          setTotalUsers(response.data.totalUsers);
          setLastMonthUsers(response.data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPosts = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/post?limit=5`;
      try {
        const response = await axios.get(URL);
        if (response.status === 200) {
          setPosts(response.data.posts);
          setTotalPosts(response.data.totalPosts);
          setLastMonthPosts(response.data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/comment?limit=5`;
      try {
        const response = await axios.get(URL);
        if (response.status === 200) {
          setComments(response.data.comments);
          setTotalComments(response.data.totalComments);
          setLastMonthComments(response.data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md">총 사용자</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiUserGroup className="bg-sky-400 text-white rounded-full text-5xl p-3" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-sky-500 flex items-center">
              <HiArrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">지난 달</div>
          </div>
        </div>
        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md">총 게시글</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <IoDocumentText className="bg-blue-400 text-white rounded-full text-5xl p-3" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-blue-500 flex items-center">
              <HiArrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">지난 달</div>
          </div>
        </div>
        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md">총 댓글수</h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <BiSolidCommentDetail className="bg-indigo-400 text-white rounded-full text-5xl p-3" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-indigo-500 flex items-center">
              <HiArrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">지난 달</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">사용자</h1>
            <button className="bg-sky-400 text-white py-2 px-4 rounded-md hover:bg-sky-500 transition">
              <Link to="/dashboard?tab=users">All</Link>
            </button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>이름</Table.HeadCell>
              <Table.HeadCell>이메일</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">게시글</h1>
            <button className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition">
              <Link to="/dashboard?tab=posts">All</Link>
            </button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>제목</Table.HeadCell>
              <Table.HeadCell>카테고리</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row>
                    <Table.Cell className="max-w-[180px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                      {post.title}
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">댓글</h1>
            <button className="bg-indigo-400 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition">
              <Link to="/dashboard?tab=comments">All</Link>
            </button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>댓글</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row>
                    <Table.Cell className="max-w-[280px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                      {comment.content}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
