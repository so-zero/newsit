import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextInput, Select, Button } from "flowbite-react";
import axios from "axios";
import { LuSearch } from "react-icons/lu";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [keywordData, setKeywordData] = useState({
    keyword: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchUrl = urlParams.get("keyword");
    const sortUrl = urlParams.get("sort");
    const categoryUrl = urlParams.get("category");

    if (searchUrl || sortUrl || categoryUrl) {
      setKeywordData((k) => ({
        ...k.keywordData,
        keyword: searchUrl,
        sort: sortUrl,
        category: categoryUrl,
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const URL = `${import.meta.env.VITE_BACKEND_URL}/post?${searchQuery}`;
      try {
        const response = await axios.get(URL);

        if (response.status === 200) {
          setPosts(response.data.posts);
          setLoading(false);

          if (response.data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "keyword") {
      setKeywordData({ ...keywordData, keyword: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setKeywordData({ ...keywordData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setKeywordData({ ...keywordData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("keyword", keywordData.keyword);
    urlParams.set("sort", keywordData.sort);
    urlParams.set("category", keywordData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const URL = `${import.meta.env.VITE_BACKEND_URL}/post?${searchQuery}`;
    const response = await axios.get(URL);

    if (response.status === 200) {
      setPosts([...posts, ...response.data.posts]);
      if (response.data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:border-b-0 md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label
              htmlFor="keyword"
              className="whitespace-nowrap font-semibold"
            >
              검색:
            </label>
            <TextInput
              type="text"
              id="keyword"
              icon={LuSearch}
              color="black"
              value={keywordData.keyword}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-semibold">
              정렬:
            </label>
            <Select
              onChange={handleChange}
              value={keywordData.sort}
              id="sort"
              color="black"
            >
              <option value="desc">최신순</option>
              <option value="asc">오래된순</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="category" className="font-semibold">
              카테고리:
            </label>
            <Select
              onChange={handleChange}
              value={keywordData.category}
              id="category"
              color="black"
            >
              <option value="uncategorized">✨카테고리</option>
              <option value="economy">💰경제</option>
              <option value="tech">🤖기술</option>
              <option value="environment">🍀환경</option>
              <option value="global">🌏세계</option>
              <option value="sport">⚽운동</option>
            </Select>
          </div>
          <Button type="submit" color="dark">
            검색하기
          </Button>
        </form>
      </div>
      <div className="w-full">
        <div className="text-2xl border-b border-gray-500 py-6 px-7 flex justify-center ">
          <h1 className="font-semibold">
            {keywordData.keyword}
            <span className="text-gray-600 ml-2">검색 결과</span>
          </h1>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5 md:px-6 md:py-8 lg:px-8 lg:py-10">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-center">loading..</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
        {showMore && (
          <button
            onClick={handleShowMore}
            className="w-full self-center text-sm py-7 transition hover:font-bold"
          >
            더보기
          </button>
        )}
      </div>
    </div>
  );
}
