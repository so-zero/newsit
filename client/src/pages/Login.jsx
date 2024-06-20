import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput, Alert, Spinner } from "flowbite-react";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;

    try {
      const response = await axios.post(URL, data);
      await response.data;
      navigate("/");
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 px-3 flex flex-col max-w-screen-sm mx-auto">
      <h1 className="font-title uppercase text-5xl text-center">Newsit</h1>
      {error && (
        <Alert className="mt-10 mx-10" color="failure">
          {error}
        </Alert>
      )}
      <form className="flex flex-col gap-4 mt-10 px-10" onSubmit={handleSubmit}>
        <div>
          <TextInput
            type="text"
            placeholder="이메일"
            name="email"
            value={data.email}
            onChange={handleChange}
            color="base"
            sizing="lg"
            required
          />
        </div>
        <div>
          <TextInput
            type="password"
            placeholder="비밀번호"
            name="password"
            value={data.password}
            onChange={handleChange}
            color="base"
            sizing="lg"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="my-5 bg-black text-white w-full py-3 rounded-md transition hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(100,100,100)]"
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">로딩중...</span>
            </>
          ) : (
            "로그인"
          )}
        </button>
      </form>
      <Link
        to="/register"
        className="mx-auto text-sm text-gray-500 transition hover:underline"
      >
        회원가입
      </Link>
    </div>
  );
}
