import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

export default function UpdatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/post/${id}`;

      try {
        const response = await axios.get(URL);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("content", content);
    postData.set("thumbnail", thumbnail);

    const URL = `${import.meta.env.VITE_BACKEND_URL}/post/update/${id}`;

    try {
      const response = await axios.patch(URL, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });

      if (response.status === 200) {
        return navigate(`/post/${response.data.slug}`);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">News 수정하기</h1>
      {error && (
        <Alert className="my-5 " color="failure">
          {error}
        </Alert>
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            className="flex-1"
          />
          <Select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="uncategorized">✨카테고리</option>
            <option value="economy">💰경제</option>
            <option value="tech">🤖기술</option>
            <option value="environment">🍀환경</option>
            <option value="global">🌏세계</option>
            <option value="sport">⚽운동</option>
          </Select>
        </div>
        <div>
          <FileInput
            type="file"
            accept="png, jpg, jpeg"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </div>
        <ReactQuill
          theme="snow"
          className="h-96 mb-12"
          value={content}
          onChange={setContent}
        />
        <Button type="submit" size="lg" color="dark">
          수정하기
        </Button>
      </form>
    </section>
  );
}
