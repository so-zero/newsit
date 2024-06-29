import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/post?limit=9`;
    try {
      const getPost = async () => {
        const response = await axios.get(URL);
        setPosts(response.data.posts);
      };
      getPost();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5 md:px-6 md:py-8 lg:px-8 lg:py-10">
        {posts &&
          posts.length > 0 &&
          posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
