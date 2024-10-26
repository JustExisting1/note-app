import { Post } from "@prisma/client";
import Link from "next/link";

export default function PostBox({ post }: { post: Post }) {
  return (
    <div className="w-2/3 h-48 bg-slate-600 p-2 rounded-lg">
      <Link href="/">
        <div className="h-8 font-bold text-lg pl-2 truncate">{post.title}</div>
      </Link>
      <div className="bg-slate-700 w-full h-32 rounded-md p-2 line-clamp-5">
        {post.content}
      </div>
      <div className="flex flex-row w-full pt-1 items-center gap-4 justify-end">
        <Link
          className="text-xs hover:underline"
          href={`/posts/${post.id}/edit`}>
          Edit post
        </Link>
        <div className="text-xs">
          {post.createdAt.toISOString().split("T")[0]}
        </div>
      </div>
    </div>
  );
}
