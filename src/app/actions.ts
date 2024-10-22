import { Post, PrismaClient } from "@prisma/client";

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

const testPost: Post = {
  id: "1a23s4d",
  title: title,
  content: text,
  createdAt: new Date(),
};

async function main() {
  // ... you will write your Prisma Client queries here
  const upload = await prisma.post.create({
    data: testPost,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
