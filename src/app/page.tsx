import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { fetchPosts } from "./actions";
import { Post } from "@prisma/client";
import { PostPageSkeleton } from "./ui/skeletons";

function PostBox({ post }: { post: Post }) {
  return (
    <div className="w-2/3 h-48 bg-slate-600 p-2 rounded-lg">
      <Link href="/">
        <div className="h-8 font-bold text-lg pl-2 truncate">{post.title}</div>
      </Link>
      <div className="bg-slate-700 w-full h-32 rounded-md p-2 line-clamp-5">
        {post.content}
      </div>
      <div className="pr-2 pt-1 flex justify-end text-xs">
        {post.createdAt.toISOString().split("T")[0]}
      </div>
    </div>
  );
}

async function PostPage({ page }: { page: number }) {
  const fetchedPosts = await fetchPosts(page);

  return (
    <div className="flex flex-col place-items-center gap-4">
      {fetchedPosts.map((post) => (
        <PostBox key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col place-items-center p-4 gap-4">
      <Link href="/posts/create" className="w-2/3 h-20 outline">
        Create new post
      </Link>
      <Suspense fallback={<PostPageSkeleton />}>
        <PostPage page={0} />
      </Suspense>
    </div>
  );
}
