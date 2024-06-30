import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Posts from "./Posts";

export default function Home() {
  return (
    <main>
      <Banner />
      <Categories />
      <Posts />
    </main>
  );
}
