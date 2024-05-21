"use server";

import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LeftPaneImage } from "../components/LeftPane";
import { RightPane } from "../login/RightPane";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { Button } from "@/components/ui/button";

async function verifyForgotPasswordToken(
  token: string
): Promise<{ verificationStatus: boolean; email?: string }> {
  try {
    const api = axios.create({
      baseURL: "http://localhost:8102",
      withCredentials: true, // Include credentials (cookies) in requests
    });

    const url = `/api/users/forgot-password/verify?token=${token}`;
    const {
      data: { verificationStatus, email },
    } = await api.get(url);
    return { verificationStatus, email };
  } catch (error) {
    return { verificationStatus: false };
  }
}

export default async function Verify({ searchParams }: any) {
  const { token } = searchParams;
  const { verificationStatus: isTokenValid, email } =
    await verifyForgotPasswordToken(token!);
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
        <RightPane title="Reset password" subtitle="">
          <>
            {isTokenValid && email ? (
              <ResetPasswordForm
                email={email}
                callback={async () => {
                  "use server";
                  redirect(`/login`);
                }}
              />
            ) : (
              <div className="text-center my-6">
                <p className="text-3xl text-red-500">❌ Invalid Token ❗</p>
                <Link href="/login" className="mt-8 block">
                  <Button>Login</Button>
                </Link>
              </div>
            )}
          </>
        </RightPane>
      </div>
    </>
  );
}
