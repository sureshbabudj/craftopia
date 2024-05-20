import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

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
  const token = new URLSearchParams(searchParams).get("token");
  const isVerified = await verifyUser(token!);
  let body = <p className="text-7xl text-red-500">Invalid Token</p>;
  if (isVerified) {
    body = (
      <>
        <p className="text-5xl text-green-700">
          🎊 Your email has been successfully verified! 🔓
        </p>
        <Link href="/" className="mt-5 block">
          <Button>Go to home</Button>
        </Link>
      </>
    );
  }
  return (
    <div className="flex flex-col justify-between items-center h-screen">
      <Header />
      <div className="container mx-auto my-5 text-center">{body}</div>
      <Footer />
    </div>
  );
}
