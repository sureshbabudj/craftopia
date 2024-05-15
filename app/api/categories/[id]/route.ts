import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const isAdmin = true; // TODO: update logic to handle this scenario

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const includeProducts = searchParams.get("products");
    const { id } = params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: {
        products: includeProducts === "include",
      },
    });
    return NextResponse.json(
      category ?? { message: `No category found for supplied id ${id}` },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error getting the category" },
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
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const request = await req.json();
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: request,
    });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error updating category" },
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
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 400 });
    }
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({
      message: `The category bearing id ${id} has been deleted successfully!`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error deleting category" },
      { status: 400 }
    );
  }
}
