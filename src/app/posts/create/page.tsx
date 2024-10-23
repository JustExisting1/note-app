"use client";

import { createPost, State } from "@/app/actions";
import Link from "next/link";
import { useActionState } from "react";

export default function CreatePage() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createPost, initialState);

  return (
    <form action={formAction} className="px-8 pt-8 flex flex-col">
      <div>
        <input
          className="w-full py-2 px-4 bg-primaryBgD rounded-md"
          id="title"
          name="title"
          type="text"
          placeholder="Enter post title..."
        />
      </div>

      <textarea
        className="w-full mt-8 py-2 px-4 rounded-md bg-primaryBgD"
        id="content"
        name="content"
        placeholder="Enter text here..."
        rows={10}
      />

      <div className="flex flex-row gap-4 justify-end mt-4">
        <Link href="/" className="bg-buttonCancel w-24 h-10 rounded-md flex justify-center items-center">
          Cancel
        </Link>
        <button type="submit" className="bg-buttonPrimary w-24 h-10 rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
}

/**
 * Title area
 * text area
 * cancel button
 * submit button
 */
