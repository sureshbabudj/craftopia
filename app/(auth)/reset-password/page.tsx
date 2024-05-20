import axios from "axios";
import Link from "next/link";
import { LeftPaneImage } from "../components/LeftPane";
import { RightPane } from "../login/RightPane";
import { SignInGoogle, SignInGithub } from "../login/SignIn";

async function verifyForgotPasswordToken(token: string): Promise<boolean> {
  try {
    const api = axios.create({
      baseURL: "http://localhost:8102",
      withCredentials: true, // Include credentials (cookies) in requests
    });

    const url = `/api/users/verify/forgot-password?token=${token}`;
    const {
      data: { verificationStatus },
    } = await api.get(url);
    return verificationStatus;
  } catch (error) {
    return false;
  }
}

export default async function Verify({ searchParams }: any) {
  const token = new URLSearchParams(searchParams).get("token");
  const isTokenValid = await verifyForgotPasswordToken(token!);
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
        <RightPane>
          <>{isTokenValid ? <p>Super</p> : <p className="">Invalid token</p>}</>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Does not have an account?{" "}
              <Link href="/register" className="text-black hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </RightPane>
      </div>
    </>
  );
}
