import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

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

export async function sendMail({
  sendTo,
  html,
  subject,
}: {
  sendTo: string;
  html: string;
  subject: string;
}) {
  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 587,
    auth: {
      user: process.env.YAHOO_MAIL_USERNAME,
      pass: process.env.YAHOO_MAIL_PASSWORD,
    },
  });

  // Send the email
  await transporter.sendMail({
    from: '"Craftopia" <sureshofcbe@yahoo.com>',
    to: sendTo,
    subject,
    html,
  });
}

export async function generateToken(user: User) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hashSync(`${user.email}${user.name}${salt}`, 10);
}

export async function sendVerificationEmail(user: User): Promise<string> {
  // Generate a unique token for email verification
  const token = await generateToken(user);
  const link = `${process.env.HOST}/verify-user?token=${token}`;

  // Save the token in the database with an expiration date
  await prisma.user.update({
    where: { email: user.email },
    data: {
      verificationToken: token,
      verificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  await sendMail({
    sendTo: user.email,
    html: `<h1>🎨 Craftopia</h1>
      <h2>Please click this link to verify your email:</h2> 
      <br /><br />
      <p><a href="${link}">${link}</a></p>`,
    subject: "Verify your email",
  });

  return link;
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

    await sendVerificationEmail(newUser);

    return NextResponse.json(newUser, { status: 201, headers });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Error creating user" },
      { status: 500 }
    );
  }
}
