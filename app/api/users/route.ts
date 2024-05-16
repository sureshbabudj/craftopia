import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const headers: HeadersInit = {};
    const users = await prisma.user.findMany();
    return NextResponse.json(users, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error fetching users" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const headers: HeadersInit = {};
    const request = await req.json();
    const { name, email, password } = request;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Encrypt the password
    const encryptedPassword = bcrypt.hashSync(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
      },
    });
    return NextResponse.json(newUser, { status: 201, headers });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error creating user" },
      { status: 500 }
    );
  }
}
