import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table } from "flowbite-react";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/post?userId=${
        currentUser._id
      }`;

      try {
        const response = await axios.get(URL);
        setPosts(response?.data);
        if (response.data.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const URL = `${import.meta.env.VITE_BACKEND_URL}/post?userId=${
      currentUser._id
    }&startIndex=${startIndex}`;
    try {
      const response = await axios.get(URL);
      setPosts((prev) => [...prev, ...response.data]);
      if (response.data.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {currentUser.isAdmin && posts.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>날짜</Table.HeadCell>
              <Table.HeadCell>이미지</Table.HeadCell>
              <Table.HeadCell>제목</Table.HeadCell>
              <Table.HeadCell>카테고리</Table.HeadCell>
              <Table.HeadCell>삭제</Table.HeadCell>
              <Table.HeadCell>
                <span>수정</span>
              </Table.HeadCell>
            </Table.Head>
            {posts.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                <Table.Row>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${
                          post.thumbnail
                        }`}
                        alt={post.title}
                        className="w-20 h-10 object-cover"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/post/${post.slug}`}
                      className="font-medium text-black"
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="transition hover:text-red-500 cursor-pointer">
                      삭제하기
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/update-post/${post._id}`}
                      className="transition hover:text-black"
                    >
                      <span>수정하기</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full self-center text-sm py-7"
            >
              더보기
            </button>
          )}
        </>
      ) : (
        <p>NEWSIT에 대한 글을 작성하세요!</p>
      )}
    </section>
  );
}
