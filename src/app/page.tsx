"use client";

import PostForm from "@/components/Form";
import Posts from "@/components/Posts";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Get posts data from API
async function getPosts(): Promise<Post[] | null> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();

}


export default function Home() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="mb-4 p-auto hover:cursor-pointer bg-amber-700 hover:bg-amber-600 hover:text-white text-md text-white border border-transparent font-semibold shadow">
        Add new post
      </Button>
      <PostForm open={open} setOpen={setOpen} />
      <Posts posts={data} isLoading={isLoading} />
    </div>
  );
}
