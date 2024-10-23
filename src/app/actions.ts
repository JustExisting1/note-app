"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const prisma = new PrismaClient();

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

const testPost = {
  title: title,
  content: text,
};

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

const CreatePost = PostSchema.omit({ id: true, createdAt: true });

const perPage = 6;

export type State = {
  errors?: {
    title?: string[];
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

  // revalidatePath("/")
  redirect("/");
}

// async function fetchPosts(page: number) {
//   const posts = await prisma.post.findMany({});
// }

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
