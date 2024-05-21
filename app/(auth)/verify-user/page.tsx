import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { LeftPaneImage } from "../components/LeftPane";
import { RightPane } from "../login/RightPane";
import { LogIn } from "lucide-react";

async function verifyUser(token: string): Promise<boolean> {
  try {
    const api = axios.create({
      baseURL: "http://localhost:8102",
      withCredentials: true, // Include credentials (cookies) in requests
    });

    const url = `/api/users/verify?token=${token}`;
    const {
      data: { verificationStatus },
    } = await api.get(url);
    return verificationStatus;
  } catch (error) {
    return false;
  }
}

export default async function Verify({ searchParams }: any) {
  const { token } = searchParams;
  const isVerified = await verifyUser(token!);
  let body = <p className="text-3xl text-red-500">❌ Invalid Token ❗</p>;
  if (isVerified) {
    body = (
      <>
        <p className="text-3xl text-green-700">
          🎊 Your email has been successfully verified! 🔓
        </p>
      </>
    );
  }
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
        <RightPane title="Verifying your Email!" subtitle="">
          <div className="text-center my-6">
            <>
              {body}
              <Link href="/login" className="mt-8 block">
                <Button>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
            </>
          </div>
        </RightPane>
      </div>
    </>
  );
}
