import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function verifyForgotPassword(token: string): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      forgotPasswordToken: token,
    },
  });

  if (user) {
    return true;
  }

  return false;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }
    const isVerified = await verifyForgotPassword(token);
    if (!isVerified) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    return NextResponse.json(
      { message: "forgot password request verified", verificationStatus: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message ?? "Error verifying the forgot password request",
      },
      { status: 400 }
    );
  }
}
