import Logo from "@/components/Logo";
import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { SignInGithub, SignInGoogle } from "./SignIn";
import { cookies } from "next/headers";

export async function RightPane() {
  const cookieStore = cookies();
  const csrfTokenCookie = cookieStore.get("authjs.csrf-token");
  return (
    <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <Logo className="mb-8 justify-center text-4xl" />
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">
          Sign In
        </h1>
        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
          Welcome Back!
        </h1>
        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
          <SignInGoogle />
          <SignInGithub />
        </div>
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>or with email</p>
        </div>
        <LoginForm csrfToken={csrfTokenCookie?.value} />
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>
            Does not have an account?{" "}
            <Link href="/register" className="text-black hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
