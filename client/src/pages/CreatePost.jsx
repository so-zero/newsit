import React from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <section className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">News 작성하기</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            id="title"
            placeholder="제목"
            required
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">✨카테고리</option>
            <option value="economy">💰경제</option>
            <option value="tech">🤖기술</option>
            <option value="environment">🍀환경</option>
            <option value="global">🌏세계</option>
            <option value="sport">⚽운동</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border border-gray-300 p-2 rounded-lg">
          <FileInput type="file" accept="png, jpg, jpeg" required />
          <Button type="button" size="sm" color="dark">
            업로드
          </Button>
        </div>
        <ReactQuill theme="snow" className="h-96 mb-12" required />
        <Button type="submit" size="lg" color="dark">
          등록하기
        </Button>
      </form>
    </section>
  );
}
