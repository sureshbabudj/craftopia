import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function verifyEmail(token: string): Promise<boolean> {
  // Find the user by the verification token
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
      verificationTokenExpiry: {
        gt: new Date(),
      },
    },
  });

  if (user) {
    // Set emailVerified to true and clear the verification token and its expiration
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });
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
    const isVerified = await verifyEmail(token);
    if (!isVerified) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    return NextResponse.json(
      { message: "User verified", verificationStatus: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error verifying the user" },
      { status: 400 }
    );
  }
}
