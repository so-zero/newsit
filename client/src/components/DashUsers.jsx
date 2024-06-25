import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import { IoTrashBin } from "react-icons/io5";
import default_Img from "../assets/avatar.png";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userDelete, setUserDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/user`;

      try {
        const response = await axios.get(URL);
        setUsers(response.data.users);
        if (response.data.users.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleShowMore = async () => {
    const startIndex = users.length;
    const URL = `${
      import.meta.env.VITE_BACKEND_URL
    }/user?startIndex=${startIndex}`;
    try {
      const response = await axios.get(URL);
      setUsers((prev) => [...prev, ...response.data.users]);
      if (response.data.users.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onErrorImg = (e) => {
    e.target.src = default_Img;
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    const URL = `${import.meta.env.VITE_BACKEND_URL}/user/delete/${userDelete}`;
    try {
      const response = await axios.delete(URL, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });

      if (response.status === 200) {
        setUsers((prev) => prev.filter((user) => user._id !== userDelete));
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>날짜</Table.HeadCell>
              <Table.HeadCell>이미지</Table.HeadCell>
              <Table.HeadCell>이름</Table.HeadCell>
              <Table.HeadCell>이메일</Table.HeadCell>
              <Table.HeadCell>관리자</Table.HeadCell>
              <Table.HeadCell>삭제</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body key={user._id} className="divide-y">
                <Table.Row>
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${
                        user.avatar
                      }`}
                      alt={user.name}
                      onError={onErrorImg}
                      className="w-10 h-10 object-cover rounded-full border border-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ? "isAdmin" : ""}</Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserDelete(user._id);
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
        <p>유저가 없습니다!</p>
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
              유저를 삭제하시겠습니까?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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
