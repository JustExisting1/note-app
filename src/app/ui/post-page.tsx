import { fetchPosts } from "../actions";
import PostBox from "./post-box";

export default async function PostPage({ page }: { page: number }) {
  const fetchedPosts = await fetchPosts(page);

  return (
    <div className="flex flex-col place-items-center gap-4">
      {fetchedPosts.map((post) => (
        <PostBox key={post.id} post={post} />
      ))}
    </div>
  );
}
