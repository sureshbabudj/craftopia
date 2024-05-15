import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

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
    const newUser = await prisma.user.create({
      data: request,
    });
    return NextResponse.json(newUser, { status: 201, headers });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error creating user" },
      { status: 500 }
    );
  }
}
