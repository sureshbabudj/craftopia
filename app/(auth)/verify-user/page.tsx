import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { LeftPaneImage } from "../components/LeftPaneImage";
import { RightPane } from "../login/RightPane";
import { LogIn } from "lucide-react";
import { LeftPane } from "../components/LeftPane";

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
      <div className="flex h-screen">
        <LeftPane />
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
