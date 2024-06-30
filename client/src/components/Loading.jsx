import React from "react";
import imgLoading from "../assets/loading.png";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <img
        src={imgLoading}
        alt="loading"
        className="animate-bounce w-[300px] h-[300px]"
      />
    </div>
  );
}
