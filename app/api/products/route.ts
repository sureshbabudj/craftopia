import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const headers: HeadersInit = {};
    const products = await prisma.product.findMany();
    return NextResponse.json(products, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const headers: HeadersInit = {};
    const request = await req.json();
    const newProduct = await prisma.product.create({
      data: request,
    });
    return NextResponse.json(newProduct, { status: 201, headers });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error creating product" },
      { status: 500 }
    );
  }
}
