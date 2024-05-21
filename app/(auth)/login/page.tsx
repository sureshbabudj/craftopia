import React from "react";
import { LeftPaneImage } from "../components/LeftPaneImage";
import { RightPane } from "../components/RightPane";
import { LoginForm } from "./LoginForm";
import { SignInGoogle, SignInGithub } from "../components/SignIn";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Login({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { error } = searchParams;
  if (error) {
    console.log(error);
  }
  const cookieStore = cookies();
  const csrfTokenCookie = cookieStore.get("authjs.csrf-token");
  return (
    <>
      {/* component */}
      <div className="flex h-screen">
        {/* Left Pane */}
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <div className="max-w-md text-center">
            <LeftPaneImage />
          </div>
        </div>
        {/* Right Pane */}
        <RightPane err={error}>
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

            <p className="mt-3">
              <Link
                href="/forgot-password"
                className="text-black hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
        </RightPane>
      </div>
    </>
  );
}
