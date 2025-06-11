"use client";

import Posts from "@/components/Posts";
import { Post } from "@/lib/types";
import { useQuery, useMutation } from "@tanstack/react-query";

// Get posts data from API
async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();

}


export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })

  return (
    <div >
      <Posts posts={data} isLoading={isLoading} />
    </div>
  );
}
