import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const includeUser = searchParams.get("user");
    const includeCategories = searchParams.get("categories");
    const { id } = params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: includeCategories === "include",
        user: includeUser !== "exclude",
      },
    });
    return NextResponse.json(
      product ?? { message: `No product found for supplied id ${id}` },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error getting the user" },
      { status: 400 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const request = await req.json();
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: request,
    });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error updating product" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({
      message: `The product bearing id ${id} has been deleted successfully!`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error deleting product" },
      { status: 400 }
    );
  }
}
