import Link from "next/link";

export default async function Profile() {
  return (
    <ul className="z-10">
      <li>
        <Link href="/login">Login</Link>
      </li>
    </ul>
  );
}
