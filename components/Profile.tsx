"use server";
import { signIn } from "@/auth";

export default async function Profile() {
  return (
    <ul className="z-10">
      <li>
        <button
          onClick={async () => {
            "use server";
            await signIn("google");
          }}
        >
          Sign in with Google
        </button>
      </li>
    </ul>
  );
}
