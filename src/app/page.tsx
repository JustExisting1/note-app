import Link from "next/link";
import { Suspense } from "react";

export type Post = {
  id: string;
  data: {
    title: string;
    content: string;
  };
  date: string;
};
const title =
  "Post Title this is way way too long for the text box to display or is it? lets see";
const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
   It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged.
     It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
`;

const test: Post = {
  id: "1a23s4d",
  data: {
    title: title,
    content: text,
  },
  date: "01/01/2024",
};

function Post({ post }: { post: Post }) {
  return (
    <div className="w-2/3 h-44 bg-slate-600 p-2 rounded-lg z-0">
      <Link href="/">
        <div className="h-8 center font-bold text-lg pl-2 truncate">
          {post.data.title}
        </div>
      </Link>
      <div className="bg-slate-700 w-full h-32 rounded-md p-2 line-clamp-5 pointer-events-auto z-10">
        {post.data.content}
      </div>
    </div>
  );
}

export default function Home() {
  //fetch posts pass into posts
  return (
    <div className="flex flex-col place-items-center p-4 gap-4">
      <div className="w-2/3 h-20 outline">Create new post</div>
      <Suspense>
        {/* Map posts here */}
        <Post post={test} />
      </Suspense>
    </div>
  );
}
