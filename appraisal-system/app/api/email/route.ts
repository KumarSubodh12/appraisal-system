import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { to, name, score, grade, period } = await req.json()

    const { data, error } = await resend.emails.send({
      from: 'AppraisalAI <noreply@yourdomain.com>',
      to: [to],
      subject: `Your ${period} Appraisal Results — AppraisalAI`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: 'DM Sans', Arial, sans-serif; background: #0a0a0f; color: #e2e2e5; margin: 0; padding: 0; }
            .container { max-width: 560px; margin: 40px auto; }
            .card { background: #1a1a2e; border: 1px solid rgba(226,184,36,0.15); border-radius: 16px; padding: 40px; }
            .logo { font-size: 24px; color: #e2b824; margin-bottom: 32px; letter-spacing: 1px; }
            h1 { font-size: 28px; color: #fff; font-weight: 300; margin: 0 0 8px; }
            .score { font-size: 64px; color: #e2b824; font-weight: 300; margin: 24px 0 8px; }
            .grade { color: #9d9daa; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; }
            .bar-bg { background: #0a0a0f; border-radius: 4px; height: 6px; margin: 24px 0; }
            .bar-fill { background: linear-gradient(90deg, #c49a18, #e2b824); border-radius: 4px; height: 6px; }
            p { color: #9d9daa; font-size: 14px; line-height: 1.7; }
            .footer { text-align: center; margin-top: 32px; color: #4a4a5a; font-size: 12px; }
            .btn { display: inline-block; background: #e2b824; color: #0a0a0f; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="logo">AppraisalAI</div>
              <h1>Hello, ${name}</h1>
              <p>Your ${period} performance appraisal has been completed. Here are your results:</p>
              <div class="score">${score}</div>
              <div class="grade">${grade}</div>
              <div class="bar-bg">
                <div class="bar-fill" style="width: ${score}%"></div>
              </div>
              <p>Your ML-powered score reflects a comprehensive evaluation across performance, productivity, teamwork, leadership, innovation, and communication.</p>
              <a href="${process.env.NEXTAUTH_URL}/dashboard" class="btn">View Full Report</a>
            </div>
            <div class="footer">
              Made by Kumar Subodh · AppraisalAI © 2025<br/>
              This is an automated message. Please do not reply.
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) return NextResponse.json({ error }, { status: 400 })
    return NextResponse.json({ success: true, data })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
