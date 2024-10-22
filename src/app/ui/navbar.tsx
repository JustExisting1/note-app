import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center place-content-evenly gap-4 outline w-full h-16 p-4">
        <Link href="/">
          <div>Home</div>
        </Link>
        <Link href="/">
          <div>Feed</div>
        </Link>
        <Link href="/">
          <div>Home</div>
        </Link>
      </div>
    </div>
  );
}
