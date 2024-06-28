import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import { IoTrashBin } from "react-icons/io5";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postDelete, setPostDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/post?userId=${
        currentUser.id
      }`;

      try {
        const response = await axios.get(URL);
        setPosts(response?.data.posts);
        if (response.data.posts.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [currentUser.id]);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const URL = `${import.meta.env.VITE_BACKEND_URL}/post?userId=${
      currentUser.id
    }&startIndex=${startIndex}`;
    try {
      const response = await axios.get(URL);
      setPosts((prev) => [...prev, ...response.data.posts]);
      if (response.data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setShowModal(false);
    const URL = `${import.meta.env.VITE_BACKEND_URL}/post/delete/${postDelete}`;
    try {
      const response = await axios.delete(URL, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });

      if (response.status === 200) {
        setPosts((prev) => prev.filter((post) => post._id !== postDelete));
      } else {
        console.log(response.data.message);
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
              <Table.Body
                key={post._id}
                className="divide-y overflow-hidden whitespace-nowrap"
              >
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
                        className="max-w-[100px] max-h-[50px] object-cover "
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <p className="font-medium text-black max-w-[150px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                        {post.title}
                      </p>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostDelete(post._id);
                      }}
                      className="transition hover:text-red-500 cursor-pointer"
                    >
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
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <IoTrashBin className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              게시글을 삭제하시겠습니까?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                삭제하기
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                취소하기
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}
