import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";

export default function CategoryPost() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      const URL = `${
        import.meta.env.VITE_BACKEND_URL
      }/post/categories/${category}`;

      try {
        const response = await axios.get(URL);
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [category]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mx-10 p-6 min-h-screen">
      <h1 className="mt-6 uppercase font-semibold text-2xl text-center">
        {category}
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5 md:px-6 md:py-8 lg:px-8 lg:py-10">
        {!isLoading &&
          posts &&
          posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
      {!isLoading && posts.length === 0 && (
        <p className="text-xl text-gray-500 text-center">
          게시글을 찾을 수 없습니다.
        </p>
      )}
    </div>
  );
}
