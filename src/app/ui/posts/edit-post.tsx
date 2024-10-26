"use client";

import { deletePostById, editPost, EditState } from "@/app/actions";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useActionState } from "react";

export default function EditPostForm({ post }: { post: Post }) {
  const initialState: EditState = { message: null, errors: {} };
  const updatePostWithId = editPost.bind(null, post.id);
  const [state, formAction] = useActionState(updatePostWithId, initialState);

  const deletePost = async() => {
    const choice = window.confirm("Are you sure you want to delete this post");
    if (choice) {
      //run delete function
      await deletePostById(post.id)
      console.log("Deleted Post");
    } else {
      console.log("Canceled");
    }
  };

  return (
    <form action={formAction} className="px-8 pt-8 flex flex-col">
      <div>
        <div className="w-full py-2 px-4 bg-primaryBgD rounded-md">
          {post.title}
        </div>
      </div>

      <textarea
        className="w-full mt-8 py-2 px-4 rounded-md bg-primaryBgD"
        id="content"
        name="content"
        defaultValue={post.content}
        placeholder="Enter text here..."
        rows={10}
      />

      <div className="flex flex-row gap-4 mt-4">
        <button
          className="bg-red-700 rounded-md shrink-0 h-10 w-24 item justify-center items-center"
          type="button"
          onClick={deletePost}>
          Delete
        </button>
        <div className="flex flex-row gap-4 w-full place-content-end">
          <Link
            href="/"
            className="bg-buttonCancel w-24 h-10 rounded-md flex justify-center items-center">
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-buttonPrimary w-24 h-10 rounded-md">
            Edit
          </button>
        </div>
      </div>
    </form>
  );
}
