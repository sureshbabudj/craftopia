import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const includeProducts = searchParams.get("products");
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        products: includeProducts === "include",
      },
    });
    return NextResponse.json(
      user ?? { message: `No user found for supplied id ${id}` },
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
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: request,
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error updating user" },
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
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({
      message: `The user bearing id ${id} has been deleted successfully!`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error deleting user" },
      { status: 400 }
    );
  }
}
