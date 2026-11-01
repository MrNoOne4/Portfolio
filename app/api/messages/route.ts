import { NextRequest, NextResponse } from "next/server"
import { sendVerificationEmail } from "@/lib/message"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, inquiryType } = await request.json()

    if ( !email || !message || !inquiryType) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      )
    }

    await sendVerificationEmail({
      name,
      email,
      message,
      inquiryType,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending verification email:", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while sending your message. Please try again later.",
      },
      { status: 500 }
    )
  }
}
