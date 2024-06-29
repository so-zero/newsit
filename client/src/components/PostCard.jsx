import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="border border-black">
      <Link to={`/post/${post.slug}`}>
        <img
          src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post?.thumbnail}`}
          alt={post.title}
          className="h-[260px] w-full object-cover border-b border-black grayscale transition hover:grayscale-0"
        />
      </Link>
      <Link to={`/post/${post.slug}`}>
        <div className="flex flex-col gap-5 py-5 px-3">
          <p className="text-lg font-semibold text-center line-clamp-2">
            {post.title}
          </p>
          <div className="flex justify-between items-center text-sm">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="uppercase">{post.category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
