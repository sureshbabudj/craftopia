import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const isAdmin = true; // TODO: update logic to handle this scenario

export async function GET() {
  try {
    const headers: HeadersInit = {};
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error fetching categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const headers: HeadersInit = {};
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden", status: 403 });
    }
    const request = await req.json();
    const newCategory = await prisma.category.create({
      data: request,
    });
    return NextResponse.json(newCategory, { status: 201, headers });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error creating category" },
      { status: 500 }
    );
  }
}
