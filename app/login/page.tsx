import { signIn, signOut } from "@/auth";
import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";
import { FaGoogle, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { LeftPaneImage } from "./LeftPane";
import { RightPane } from "./RightPane";
function SignIn({
  children,
  provider = "google",
}: React.PropsWithChildren<any>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        {children}
      </button>
    </form>
  );
}

export default async function Login() {
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
        <RightPane />
      </div>
    </>
  );
}
