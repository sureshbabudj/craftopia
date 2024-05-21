import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function verifyForgotPasswordToken(
  token: string
): Promise<User | null> {
  // Find the user by the verification token
  const user = await prisma.user.findFirst({
    where: {
      forgotPasswordToken: token,
    },
  });

  if (user) {
    return user;
  }

  return null;
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
    const user = await verifyForgotPasswordToken(token);
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    return NextResponse.json(
      {
        message: "Token verified",
        verificationStatus: true,
        email: user.email,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error verifying the user" },
      { status: 400 }
    );
  }
}
