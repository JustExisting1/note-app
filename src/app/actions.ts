"use server";

import { Post, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const prisma = new PrismaClient();

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

const CreatePost = PostSchema.omit({ id: true, createdAt: true });
const EditPost = PostSchema.omit({ id: true, createdAt: true, title: true });

const perPage = 7;

export type State = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
};

export type EditState = {
  errors?: {
    content?: string[];
  };
  message?: string | null;
};

export async function createPost(prevState: State, postData: FormData) {
  const validateFields = CreatePost.safeParse({
    title: postData.get("title"),
    content: postData.get("content"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create post",
    };
  }

  const { title, content } = validateFields.data;

  try {
    await prisma.post.create({
      data: {
        title: title,
        content: content,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to create post.",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function editPost(
  id: string,
  prevState: EditState,
  postData: FormData
) {
  const validateFields = EditPost.safeParse({
    content: postData.get("content"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to edit post.",
    };
  }

  const { content } = validateFields.data;

  try {
    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        content: content,
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to edit post." };
  }

  revalidatePath("/");
  redirect("/");
}

export async function fetchPosts(page: number) {
  const start = page == 1 ? 0 : (page - 1) * perPage + 1;

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      skip: start,
      take: perPage,
    });

    return posts as Post[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of posts.");
  }
}

export async function fetchPostByID(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post by id:" + id);
  }
}

export async function deletePostById(id: string) {
  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete post by id:" + id);
  }

  revalidatePath("/");
  redirect("/");
}

// async function main() {
//   // ... you will write your Prisma Client queries here
//   const upload = await prisma.post.create({
//     data: testPost,
//   });
// }

// createPost(testPost)
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
