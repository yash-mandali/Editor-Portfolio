import nodemailer from 'nodemailer';

const PROJECT_TYPE_LABELS = {
  reels: 'Reels / Shorts',
  youtube: 'YouTube Video',
  wedding: 'Wedding Film',
  commercial: 'Commercial / Brand',
  other: 'Other',
};

const BUDGET_LABELS = {
  '0-10': '$0 – $10',
  '10-30': '$10 – $30',
  '30-50': '$30 – $50',
  '50+': '$50+',
};

export const sendContactEmail = async ({ name, email, projectType, budget, message, submittedAt }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    pool: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const companyName = 'CineCraft';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Top accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#00d4ff,#a78bfa);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:36px 40px 24px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00d4ff;">${companyName}</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#111118;letter-spacing:-0.3px;">New Project Inquiry</h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><div style="height:1px;background:#ebebf0;"></div></td></tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 40px 32px;">

              <!-- Sender card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#f9f9fb;border:1px solid #ebebf0;border-radius:8px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="44" valign="middle">
                          <div style="width:44px;height:44px;background:linear-gradient(135deg,#00d4ff,#a78bfa);border-radius:50%;text-align:center;line-height:44px;font-size:18px;font-weight:900;color:#000;">
                            ${name.charAt(0).toUpperCase()}
                          </div>
                        </td>
                        <td style="padding-left:14px;">
                          <p style="margin:0 0 3px;font-size:15px;font-weight:700;color:#111118;">${name}</p>
                          <a href="mailto:${email}" style="font-size:13px;color:#00d4ff;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="48%" style="padding-right:8px;">
                    <div style="background:#f9f9fb;border:1px solid #ebebf0;border-radius:8px;padding:14px 16px;">
                      <p style="margin:0 0 5px;font-size:10px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#aaa;">Project Type</p>
                      <p style="margin:0;font-size:14px;font-weight:700;color:#00d4ff;">${PROJECT_TYPE_LABELS[projectType] || projectType}</p>
                    </div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="padding-left:8px;">
                    <div style="background:#f9f9fb;border:1px solid #ebebf0;border-radius:8px;padding:14px 16px;">
                      <p style="margin:0 0 5px;font-size:10px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#aaa;">Budget Range</p>
                      <p style="margin:0;font-size:14px;font-weight:700;color:#16a34a;">${BUDGET_LABELS[budget] || budget}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="background:#f9f9fb;border:1px solid #ebebf0;border-left:3px solid #00d4ff;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
                <p style="margin:0 0 8px;font-size:10px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#aaa;">Message</p>
                <p style="margin:0;font-size:14px;color:#333;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: Your Project Inquiry"
                       style="display:inline-block;padding:13px 32px;background:#111118;color:#ffffff;font-size:12px;font-weight:900;letter-spacing:2px;text-transform:uppercase;text-decoration:none;border-radius:6px;">
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 40px 24px;background:#f9f9fb;border-top:1px solid #ebebf0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td><p style="margin:0;font-size:11px;color:#aaa;">Submitted on ${new Date(submittedAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}</p></td>
                  <td align="right"><p style="margin:0;font-size:11px;color:#aaa;">${companyName} Portfolio</p></td>
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
    from: `"${name}"`,
    to: process.env.NOTIFY_EMAIL || 'aiuser4561@gmail.com',
    replyTo: email,
    subject: `New Inquiry from ${name} — ${PROJECT_TYPE_LABELS[projectType] || projectType}`,
    html,
  });

  transporter.close();
};

export const sendAutoReply = async ({ name, email }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    pool: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const websiteUrl = process.env.WEBSITE_URL || 'https://editor-portfolio-kappa-lyart.vercel.app';
  const companyName = 'CineCraft';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Top accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#00d4ff,#a78bfa);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:36px 40px 24px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00d4ff;">CineCraft</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#111118;letter-spacing:-0.3px;">We received your message</h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:#ebebf0;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 40px 32px;">
              <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.6;">Hello <strong>${name}</strong>,</p>

              <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7;">
                Thank you for contacting us through our website. We have successfully received your message and our team will review it shortly.
              </p>

              <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7;">
                Our support team will get back to you within <strong style="color:#111118;">24–48 hours</strong>.
              </p>

              <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;">
                If your request is urgent, you can also reply to this email and we will try to assist you as soon as possible.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:#ebebf0;margin-bottom:28px;"></div>

              <p style="margin:0 0 4px;font-size:14px;color:#555;">Thank you for reaching out to us.</p>
              <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#111118;">Best regards,</p>
              <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#111118;">${companyName}</p>
              <a href="${websiteUrl}" style="font-size:13px;color:#00d4ff;text-decoration:none;">${websiteUrl}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 40px 24px;background:#f9f9fb;border-top:1px solid #ebebf0;">
              <p style="margin:0;font-size:11px;color:#aaa;line-height:1.6;">
                This is an automated confirmation. Please do not reply directly to this message — instead, reply to the email above if you need urgent assistance.
              </p>
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
    from: `"${companyName}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `We received your message — ${companyName}`,
    html,
  });

  transporter.close();
};
