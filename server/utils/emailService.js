import nodemailer from 'nodemailer';

const PROJECT_TYPE_LABELS = {
  reels: 'Reels / Shorts',
  youtube: 'YouTube Video',
  wedding: 'Wedding Film',
  commercial: 'Commercial / Brand',
  other: 'Other',
};

const BUDGET_LABELS = {
  '50-200': '$50 – $200',
  '200-500': '$200 – $500',
  '500-1000': '$500 – $1,000',
  '1000+': '$1,000+',
};

export const sendContactEmail = async ({ name, email, projectType, budget, message, submittedAt }) => {
  // Create a fresh transporter per call with pool:false so Gmail sends immediately
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    pool: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Project Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0d0d14 0%,#111118 100%);border:1px solid rgba(0,212,255,0.2);border-bottom:none;padding:40px 40px 32px;border-radius:12px 12px 0 0;">
              <div style="display:inline-block;padding:6px 14px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.25);border-radius:20px;margin-bottom:20px;">
                <span style="color:#00d4ff;font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;">New Inquiry</span>
              </div>
              <h1 style="margin:0 0 8px;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:-0.5px;">New Project Request</h1>
              <p style="margin:0;color:#6b6b80;font-size:14px;">Someone wants to work with you. Here are the details.</p>
            </td>
          </tr>

          <!-- Cyan top border line -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#00d4ff,#a78bfa,transparent);"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#111118;border:1px solid rgba(255,255,255,0.05);border-top:none;border-bottom:none;padding:32px 40px;">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);border-radius:8px;padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48" valign="top">
                          <div style="width:44px;height:44px;background:linear-gradient(135deg,#00d4ff,#a78bfa);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#000;text-align:center;line-height:44px;">
                            ${name.charAt(0).toUpperCase()}
                          </div>
                        </td>
                        <td style="padding-left:16px;">
                          <p style="margin:0 0 4px;color:#ffffff;font-size:16px;font-weight:700;">${name}</p>
                          <a href="mailto:${email}" style="color:#00d4ff;font-size:13px;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Details grid -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td width="48%" style="padding-right:8px;">
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:16px 18px;">
                      <p style="margin:0 0 6px;color:#6b6b80;font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;">Project Type</p>
                      <p style="margin:0;color:#00d4ff;font-size:14px;font-weight:700;">${PROJECT_TYPE_LABELS[projectType] || projectType}</p>
                    </div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="padding-left:8px;">
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:16px 18px;">
                      <p style="margin:0 0 6px;color:#6b6b80;font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;">Budget Range</p>
                      <p style="margin:0;color:#34d399;font-size:14px;font-weight:700;">${BUDGET_LABELS[budget] || budget}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-left:3px solid #00d4ff;border-radius:0 8px 8px 0;padding:20px 24px;margin-bottom:28px;">
                <p style="margin:0 0 10px;color:#6b6b80;font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;">Project Brief</p>
                <p style="margin:0;color:#d0d0e0;font-size:14px;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
              </div>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: Your Project Inquiry"
                       style="display:inline-block;padding:14px 36px;background:#00d4ff;color:#000000;font-size:12px;font-weight:900;letter-spacing:2px;text-transform:uppercase;text-decoration:none;border-radius:4px;">
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0d14;border:1px solid rgba(255,255,255,0.05);border-top:none;padding:24px 40px;border-radius:0 0 12px 12px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;color:#3a3a50;font-size:11px;">Submitted on ${new Date(submittedAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}</p>
                  </td>
                  <td align="right">
                    <p style="margin:0;color:#3a3a50;font-size:11px;">CineCraft Portfolio</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

  await transporter.sendMail({
    from: `"CineCraft Portfolio" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL || 'aiuser4561@gmail.com',
    replyTo: email,
    subject: `🎬 New Project Inquiry from ${name} — ${PROJECT_TYPE_LABELS[projectType] || projectType}`,
    html,
  });

  // Force close so Gmail flushes immediately — prevents the "delayed by 1 submission" bug
  transporter.close();
};
