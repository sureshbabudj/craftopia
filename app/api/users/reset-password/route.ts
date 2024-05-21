import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const request = await req.json();
    const { email, password } = request;
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: `The User bearing email ${email} does not exist` },
        { status: 400 }
      );
    }

    // Encrypt the password
    const encryptedPassword = bcrypt.hashSync(password, 10);

    // Update the user
    const { id, updatedAt, createdAt } = await prisma.user.update({
      where: { email },
      data: { password: encryptedPassword, forgotPasswordToken: null },
    });

    return NextResponse.json(
      { email, id, updatedAt, createdAt },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error creating user" },
      { status: 500 }
    );
  }
}
