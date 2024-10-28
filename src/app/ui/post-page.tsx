"use client";

import { useEffect, useState } from "react";
import { fetchPosts } from "../actions";
import PostCard from "./post-card";
import { Post } from "@prisma/client";

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

  //Fetch new page of posts and add to the post[]
  const fetch = async () => {
    const fetchedPosts = await fetchPosts(page);
    /**ISSUE
     * when reloading page from another link
     * it fetches the pages again, maybe store the pages that have been fetched and dont double fetch them?
     */

    setPosts((prev) => [...prev, ...fetchedPosts]);
  };

  //Fetch new page of posts every time page changes
  useEffect(() => {
    fetch();
  }, [page]);

  return (
    <div className="flex flex-col place-items-center gap-4">
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          isLast={index === posts.length - 1}
          newLimit={() => setPage(page + 1)}
        />
      ))}
    </div>
  );
}
