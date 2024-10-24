const shimmer = "animate-pulse";
export function PostBoxSkeleton() {
  return (
    <div className={`w-2/3 h-48 bg-gray-600 p-2 rounded-lg`}>
      <div className={`${shimmer} h-8 font-bold text-lg pb-1 truncate`}>
        <div className="bg-gray-700 w-2/3 h-full rounded-xl" />
      </div>
      <div
        className={`bg-gray-700 w-full h-32 rounded-md p-2 gap-2 flex flex-col line-clamp-5`}>
        <div className={`${shimmer} bg-gray-600 h-4 w-2/3 rounded-xl`} />
        <div className={`${shimmer} bg-gray-600 h-4 w-3/4 rounded-xl`} />
        <div className={`${shimmer} bg-gray-600 h-4 w-1/4 rounded-xl`} />
        <div className={` h-4 w-5/6 rounded-xl`} />
        <div className={`${shimmer} bg-gray-600 h-4 w-5/6 rounded-xl`} />
      </div>
      <div
        className={`${shimmer} w-1/6 h-4 place-self-end  bg-gray-700 pr-2 pt-1 flex mt-1 rounded-xl justify-end text-xs`}
      />
    </div>
  );
}

export function PostPageSkeleton() {
  return (
    <div className="w-full flex flex-col place-items-center gap-4">
      <PostBoxSkeleton />
      <PostBoxSkeleton />
      <PostBoxSkeleton />
      <PostBoxSkeleton />
      <PostBoxSkeleton />
      <PostBoxSkeleton />
    </div>
  );
}
