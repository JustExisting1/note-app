import Link from "next/link";
import { Suspense } from "react";
import { Post } from "@prisma/client";
import { PostPageSkeleton } from "./ui/skeletons";
import PostBox from "./ui/post-box";
import PostPage from "./ui/post-page";

const testpost: Post = {
  id: "test",
  title: "This is the title",
  content: "This is the content",
  createdAt: new Date(),
};

export default async function Home() {
  return (
    <div className="flex flex-col place-items-center p-4 gap-4">
      <Link href="/posts/create" className="w-2/3 h-20 outline">
        Create new post
      </Link>

      {/* <PostBox post={testpost}></PostBox> */}
      <Suspense fallback={<PostPageSkeleton />}>
        <PostPage page={0} />
      </Suspense>
    </div>
  );
}
