import { fetchPostByID } from "@/app/actions";
import { Post } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function ViewPost(props: {
  params: Promise<{ id: string }>;
}) {
  const param = await props.params;
  const id = param.id;
  const fetchedPost = await fetchPostByID(id);

  if (!fetchedPost) {
    notFound(); //set this up
  }
  return (
    <div className="px-8 pt-8 flex flex-col">
      <div>
        <div className="w-full py-2 px-4 bg-primaryBgD rounded-md">
          {fetchedPost.title}
        </div>
      </div>

      <div className="w-full mt-8 py-2 px-4 rounded-md bg-primaryBgD">
        {fetchedPost.content}
      </div>
    </div>
  );
}
