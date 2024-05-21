import { NextResponse } from "next/server";
import { generateToken, sendMail } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const request = await req.json();
    const { email } = request;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not exists" }, { status: 400 });
    }

    const forgotPasswordToken = await generateToken(existingUser);

    await prisma.user.update({
      where: { email },
      data: {
        forgotPasswordToken,
      },
    });

    const link = `${process.env.HOST}/reset-password?token=${forgotPasswordToken}`;

    await sendMail({
      sendTo: existingUser.email,
      html: `<!DOCTYPE html>
    <html>
    <head>
      <title>Reset Your Password</title>
      <style>
        /* Add some basic styling to make the email look better */
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          background-color: #3498db;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <p>Hello,</p>
      <p>You recently requested to reset your password for your account. Click the button below to reset it.</p>
      <a href="${link}" class="button">Reset your password</a>
      <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
      <p>Thanks,<br>The Team<br>  🎨 Craftopia </p>
    </body>
    </html>
    `,
      subject: "Reset Your Password",
    });

    return NextResponse.json(
      { message: "Password reset email sent." },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error creating user" },
      { status: 500 }
    );
  }
}
