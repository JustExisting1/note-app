import { fetchPostByID } from "@/app/actions";
import EditPostForm from "@/app/ui/posts/edit-post";
import { notFound } from "next/navigation";

export default async function EditPostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const param = await props.params;
  const id = param.id;
  const fetchedPost = await fetchPostByID(id);

  if (!fetchedPost) {
    notFound(); //set this up
  }

  return <EditPostForm post={fetchedPost} />;
}
