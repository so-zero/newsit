import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import CommentList from "../components/CommentList";
import PostCard from "../components/PostCard";

export default function PostDetail() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [latestPosts, setLatestPosts] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      const URL = `${import.meta.env.VITE_BACKEND_URL}/post?slug=${postSlug}`;

      try {
        const response = await axios.get(URL);
        setPost(response.data.posts[0]);
      } catch (error) {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    };
    getPost();
  }, [postSlug]);

  useEffect(() => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/post?limit=3`;
    try {
      const getLatestPost = async () => {
        const response = await axios.get(URL);
        setLatestPosts(response.data.posts);
      };
      getLatestPost();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <Link
        to={`/post/categories/${post?.category}`}
        className="mt-8 mb-5 text-center"
      >
        <p className="text-lg uppercase">{post?.category}</p>
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
      <CommentList postId={post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-lg mt-5">최신 포스트</h1>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5">
          {latestPosts &&
            latestPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
