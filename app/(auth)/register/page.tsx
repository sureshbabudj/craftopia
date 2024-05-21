import React from "react";

import { LeftPane } from "../components/LeftPane";
import { RightPane } from "../login/RightPane";
import { SignInGoogle, SignInGithub } from "../login/SignIn";
import { SignUpForm } from "./RegisterForm";
import Link from "next/link";

export default async function Login() {
  return (
    <>
      <div className="flex h-screen">
        <LeftPane />
        <RightPane
          title="Sign Up"
          subtitle="Join to Our Community with all time access and free "
        >
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
            <SignInGoogle />
            <SignInGithub />
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or with email</p>
          </div>
          <SignUpForm />
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-black hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </RightPane>
      </div>
    </>
  );
}
