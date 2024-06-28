import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import { IoTrashBin } from "react-icons/io5";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentDelete, setCommentDelete] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/comment`;

      try {
        const response = await axios.get(URL);
        setComments(response.data.comments);
        if (response.data.comments.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, []);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    const URL = `${
      import.meta.env.VITE_BACKEND_URL
    }/comment?startIndex=${startIndex}`;
    try {
      const response = await axios.get(URL);
      setComments((prev) => [...prev, ...response.data.comments]);
      if (response.data.comments.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    const URL = `${
      import.meta.env.VITE_BACKEND_URL
    }/comment/delete/${commentDelete}`;
    try {
      const response = await axios.delete(URL, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });

      if (response.status === 200) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentDelete)
        );
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>날짜</Table.HeadCell>
              <Table.HeadCell>댓글</Table.HeadCell>
              <Table.HeadCell>PostID</Table.HeadCell>
              <Table.HeadCell>UserID</Table.HeadCell>
              <Table.HeadCell>삭제</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body
                key={comment._id}
                className="divide-y overflow-hidden whitespace-nowrap"
              >
                <Table.Row>
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="max-w-[150px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                    {comment.content}
                  </Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentDelete(comment._id);
                      }}
                      className="transition hover:text-red-500 cursor-pointer"
                    >
                      삭제하기
                    </span>
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
        <p>댓글이 없습니다!</p>
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
              댓글을 삭제하시겠습니까?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
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
