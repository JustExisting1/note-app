import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-row gap-4 items-center shrink-0 justify-between outline w-full h-16 px-4">
      <Link className="outline" href="/">
        <div>Home Logo</div>
      </Link>
      <Link href="/" className="outline">
        <div>Search Box</div>
      </Link>
      <div className="outline">Login</div>
    </div>
  );
}
