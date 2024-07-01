import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Checkbox from "../components/Checkbox";
import { Alert, Spinner, TextInput } from "flowbite-react";

export default function Register() {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [service, setService] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/register`;

    try {
      const response = await axios.post(URL, data);
      await response.data;
      navigate("/login");
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="mt-20 px-3 flex flex-col max-w-screen-sm mx-auto min-h-[700px]">
      <h1 className="font-title uppercase text-5xl text-center">Newsit</h1>
      {error && (
        <Alert className="mt-10 mx-10" color="failure">
          {error}
        </Alert>
      )}
      <form className="flex flex-col gap-4 mt-10 px-10" onSubmit={handleSubmit}>
        <div>
          <TextInput
            name="email"
            type="text"
            value={data.email}
            placeholder="이메일"
            color="base"
            sizing="lg"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <TextInput
            name="name"
            type="text"
            value={data.name}
            placeholder="이름"
            color="base"
            sizing="lg"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <TextInput
            name="password"
            type="password"
            value={data.password}
            placeholder="비밀번호"
            color="base"
            sizing="lg"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <TextInput
            name="password2"
            type="password"
            value={data.password2}
            placeholder="비밀번호 확인"
            color="base"
            sizing="lg"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start gap-4 mt-4">
          <Checkbox checked={service} onChange={setService}>
            만 14세 이상 가입 동의합니다. (필수)
          </Checkbox>
          <Checkbox checked={marketing} onChange={setMarketing}>
            마케팅 정보 수신에 동의합니다. (선택)
          </Checkbox>
        </div>
        <button
          type="submit"
          disabled={!service || loading}
          className="my-5 bg-black text-white w-full py-3 rounded-md transition hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(100,100,100)]"
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">로딩중...</span>
            </>
          ) : (
            "가입하기"
          )}
        </button>
      </form>
      <div className="flex items-center gap-2 mx-auto text-sm text-gray-500">
        <span>계정이 있으신가요?</span>
        <Link to="/login" className="transition hover:underline">
          로그인
        </Link>
      </div>
    </div>
  );
}
