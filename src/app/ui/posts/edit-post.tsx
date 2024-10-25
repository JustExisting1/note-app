"use client";

import { editPost, EditState } from "@/app/actions";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useActionState } from "react";

export default function EditPostForm({ post }: { post: Post }) {
  const initialState: EditState = { message: null, errors: {} };
  const updatePostWithId = editPost.bind(null, post.id);
  const [state, formAction] = useActionState(updatePostWithId, initialState);

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

      <div className="flex flex-row gap-4 justify-end mt-4">
        <Link
          href="/"
          className="bg-buttonCancel w-24 h-10 rounded-md flex justify-center items-center">
          Cancel
        </Link>
        <button type="submit" className="bg-buttonPrimary w-24 h-10 rounded-md">
          Edit
        </button>
      </div>
    </form>
  );
}
