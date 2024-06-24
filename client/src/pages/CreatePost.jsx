import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

export default function CreatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("content", content);
    postData.set("thumbnail", thumbnail);

    const URL = `${import.meta.env.VITE_BACKEND_URL}/post/create`;

    try {
      const response = await axios.post(URL, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });

      if (response.status === 201) {
        return navigate(`/post/${response.data.slug}`);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">News 작성하기</h1>
      {error && (
        <Alert className="mt-10 mx-10" color="failure">
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
            required
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
            required
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </div>
        <ReactQuill
          theme="snow"
          className="h-96 mb-12"
          required
          value={content}
          onChange={setContent}
        />
        <Button type="submit" size="lg" color="dark">
          등록하기
        </Button>
      </form>
    </section>
  );
}
