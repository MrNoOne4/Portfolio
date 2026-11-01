import nodemailer from "nodemailer"

interface Props {
  name?: string
  email: string
  message: string
  inquiryType?: string
}

function escapeHtml(value: string = "") {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }

    return entities[char]
  })
}

function buildContactEmail({
  name,
  email,
  message,
  inquiryType,
}: Props): string {
  const year = new Date().getFullYear()

  const safeName = escapeHtml(name || "Someone")
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message)
  const safeInquiry = escapeHtml(inquiryType || "General Inquiry")

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Portfolio Inquiry</title>
</head>

<body style="
  margin:0;
  padding:40px 16px;
  background-color:#09090b;
  font-family:Arial,Helvetica,sans-serif;
  color:#fafafa;
">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0"
          border="0"
          style="
            max-width:520px;
            background-color:#0c0d10;
            border:1px solid #27272a;
            border-radius:16px;
            overflow:hidden;
          ">

          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 20px;">

              <h2 style="
                margin:0 0 10px;
                font-size:21px;
                font-weight:600;
                color:#fafafa;
              ">
                You have a new message!
              </h2>

              <p style="
                margin:0;
                font-size:14px;
                line-height:1.6;
                color:#a1a1aa;
              ">
                Someone has reached out through your portfolio contact form.
              </p>

            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:0 32px 32px;">

              <h2 style="
                margin:12px 0 8px;
                font-size:20px;
                color:#fafafa;
              ">
                New Portfolio Inquiry
              </h2>

              <p style="
                margin:0 0 28px;
                font-size:14px;
                color:#a1a1aa;
              ">
                Here are the details of the message.
              </p>

              <!-- Sender -->
              <p style="
                margin:0 0 8px;
                font-size:13px;
                font-weight:600;
                color:#fafafa;
              ">
                Name
              </p>

              <div style="
                padding:12px;
                margin-bottom:20px;
                background:#121316;
                border:1px solid #27272a;
                border-radius:9px;
                color:#d4d4d8;
                font-size:14px;
              ">
                ${safeName}
              </div>

              <!-- Email -->
              <p style="
                margin:0 0 8px;
                font-size:13px;
                font-weight:600;
                color:#fafafa;
              ">
                Email
              </p>

              <div style="
                padding:12px;
                margin-bottom:20px;
                background:#121316;
                border:1px solid #27272a;
                border-radius:9px;
                color:#d4d4d8;
                font-size:14px;
              ">
                ${safeEmail}
              </div>

              <!-- Inquiry Type -->
              <p style="
                margin:0 0 8px;
                font-size:13px;
                font-weight:600;
                color:#fafafa;
              ">
                Inquiry Type
              </p>

              <div style="
                padding:12px;
                margin-bottom:20px;
                background:#121316;
                border:1px solid #27272a;
                border-radius:9px;
                color:#d4d4d8;
                font-size:14px;
              ">
                ${safeInquiry}
              </div>

              <!-- Message -->
              <p style="
                margin:0 0 8px;
                font-size:13px;
                font-weight:600;
                color:#fafafa;
              ">
                Message
              </p>

              <div style="
                padding:16px;
                min-height:100px;
                background:#121316;
                border:1px solid #27272a;
                border-radius:9px;
                color:#d4d4d8;
                font-size:14px;
                line-height:1.7;
                white-space:pre-wrap;
              ">${safeMessage}</div>

              <!-- Reply Button -->
              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${safeEmail}"
                  style="
                    display:inline-block;
                    padding:13px 24px;
                    background:#fafafa;
                    color:#09090b;
                    text-decoration:none;
                    font-size:14px;
                    font-weight:600;
                    border-radius:8px;
                  ">
                  Reply to Message
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              padding:20px 32px;
              border-top:1px solid #27272a;
              text-align:center;
            ">
              <p style="
                margin:0 0 6px;
                font-size:12px;
                color:#71717a;
              ">
                Sent from your Portfolio Contact Form
              </p>

              <p style="
                margin:0;
                font-size:12px;
                color:#52525b;
              ">
                &copy; ${year} Portfolio. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `
}

export async function sendVerificationEmail({
  name,
  email,
  message,
  inquiryType,
}: Props) {
  try {
    if (!email || !message) {
      throw new Error("Missing required fields")
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Inquiry: ${inquiryType || "General Inquiry"}`,
      html: buildContactEmail({
        name,
        email,
        message,
        inquiryType,
      }),
    })
  } catch (error) {
    console.error("Email sending error:", error)
    throw error
  }
}
