import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

export default function PostDetail() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(postSlug);
  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      const URL = `${import.meta.env.VITE_BACKEND_URL}/post?slug=${postSlug}`;

      try {
        const response = await axios.get(URL);
        setPost(response.data[0]);
      } catch (error) {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    };
    getPost();
  }, [postSlug]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <Link
        to={`/category?category=${post?.category}`}
        className="mt-8 mb-5 text-center"
      >
        <p className="text-lg">{post?.category}</p>
      </Link>
      <h1 className="text-3xl p-3 text-center max-w-3xl mx-auto lg:text-4xl lineHeight-12">
        {post?.title}
      </h1>
      <div className="flex justify-center flex-col items-center gap-3 mt-5 text-sm text-gray-700">
        <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
        <span className="text-xs">{`읽는 시간 약 ${(
          post.content.length / 1000
        ).toFixed(0)}분`}</span>
      </div>
      <img
        src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post?.thumbnail}`}
        alt={post?.title}
        className="mt-10 p-3 max-h-[500px] w-full object-cover object-center"
      />
      <div
        className="p-3 mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
    </main>
  );
}
