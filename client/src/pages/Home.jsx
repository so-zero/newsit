import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Posts from "./Posts";
import Description from "../components/Description";

export default function Home() {
  return (
    <main>
      <Banner />
      <Categories />
      <Posts />
      <Description />
    </main>
  );
}
