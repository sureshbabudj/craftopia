"use server";

import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LeftPane } from "../components/LeftPane";
import { RightPane } from "../components/RightPane";
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
      <div className="flex h-screen">
        <LeftPane />
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
