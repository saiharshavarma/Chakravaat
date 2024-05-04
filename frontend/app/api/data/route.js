import { NextResponse, NextRequest } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  const username = process.env.NEXT_PUBLIC_EMAIL;
  const password = process.env.NEXT_PUBLIC_APP_PASSWORD;

  const formData = await request.formData();
  console.log(formData);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");
  const sender = formData.get("sender");
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: username,
      pass: password,
    },
  });
  try {
    const mail = await transporter.sendMail({
      from: username,
      to: email,
      replyTo: email,
      subject: `[FROM ${sender}]: ${subject}`,
      html: `
      <div style="background: rgb(28,4,143); background: linear-gradient(143deg, rgba(28,4,143,1) 0%, rgba(113,9,121,1) 49%, rgba(255,0,136,1) 100%); padding: 1rem;color: white">
        <p>Hello ${name}!</p>
        <br />
        <p>Message: ${message} </p>
    </div>
        `,
    });

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.log(error);
    NextResponse.status(500).json({ message: "Error" });
  }
}
