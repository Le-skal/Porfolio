// Local development server for email API
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email endpoint
app.post('/api/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Create transporter using Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Get current date
        const date = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Beautiful HTML email template
        const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,sans-serif">
        <table role="presentation" width="700" cellpadding="0" cellspacing="0" style="width:700px;max-width:700px;background:#ffffff;margin:0 auto">
          <tbody>
            <!-- Header -->
            <tr>
              <td style="padding:24px 30px 20px 30px;background:#ffffff;border-bottom:4px double #2d6a4f">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td style="padding-bottom:12px;border-bottom:1px solid #2d6a4f">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td style="padding-bottom:8px;font-family:Georgia,'Times New Roman',serif;font-size:11px;font-weight:400;text-transform:uppercase;letter-spacing:1px;color:#666;text-align:center">
                                ${date}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family:Georgia,'Times New Roman',serif;font-size:42px;font-weight:700;letter-spacing:-0.5px;line-height:1.1;color:#2d6a4f;text-align:center">
                                Portfolio Contact
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top:6px;font-family:Georgia,'Times New Roman',serif;font-size:13px;font-style:italic;color:#666;letter-spacing:0.3px;text-align:center">
                                New message from your portfolio website
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:12px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#666;text-align:center">
                        <span style="font-weight:600;color:#2d6a4f">NEW INQUIRY</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <!-- Contact Info Section -->
            <tr>
              <td style="padding:20px 30px;background:#fafaf8;border-bottom:1px solid #e0e0e0">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td style="padding-bottom:8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#2d6a4f">
                        Contact Information
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:1.6;color:#333">
                        <strong>Name:</strong> ${name}<br>
                        <strong>Email:</strong> <a href="mailto:${email}" style="color:#2d6a4f;text-decoration:none">${email}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <!-- Message Section -->
            <tr>
              <td style="padding:30px 30px">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td style="padding:0 0 18px 0">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                          <tbody>
                            <tr>
                              <td style="border-top:2px solid #1b1b1b;height:0;font-size:0;line-height:0">&nbsp;</td>
                            </tr>
                            <tr>
                              <td style="padding:10px 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#1b1b1b">
                                Message
                              </td>
                            </tr>
                            <tr>
                              <td style="border-bottom:1px solid #d8d2c7;height:0;font-size:0;line-height:0">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:16px 0 18px 0">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:#2e2a25;white-space:pre-wrap">
                                ${message}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 30px;background:#fafaf8;border-top:3px double #2d6a4f;text-align:center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td style="padding-bottom:8px;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#333">
                        This message was sent via your portfolio contact form
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#999;line-height:1.6">
                        © ${new Date().getFullYear()} Portfolio · All rights reserved
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>
    `;

        // Email to owner
        const mailToOwner = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `Portfolio Contact: ${name}`,
            html: htmlContent,
        };

        // Confirmation email to sender
        const mailToSender = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: `Thank you for contacting me, ${name}!`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,sans-serif">
          <table role="presentation" width="700" cellpadding="0" cellspacing="0" style="width:700px;max-width:700px;background:#ffffff;margin:0 auto">
            <tbody>
              <tr>
                <td style="padding:24px 30px 20px 30px;background:#ffffff;border-bottom:4px double #2d6a4f">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tbody>
                      <tr>
                        <td style="font-family:Georgia,'Times New Roman',serif;font-size:36px;font-weight:700;letter-spacing:-0.5px;line-height:1.1;color:#2d6a4f;text-align:center">
                          Thank You!
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:6px;font-family:Georgia,'Times New Roman',serif;font-size:13px;font-style:italic;color:#666;letter-spacing:0.3px;text-align:center">
                          Your message has been received
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:30px;background:#fafaf8">
                  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#333;margin:0 0 16px 0">
                    Hi ${name},
                  </p>
                  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#333;margin:0 0 16px 0">
                    Thank you for reaching out! I've received your message and will get back to you as soon as possible.
                  </p>
                  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#333;margin:0">
                    Best regards,<br>
                    <strong style="color:#2d6a4f">Raphaël Martin</strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 30px;background:#fafaf8;border-top:3px double #2d6a4f;text-align:center">
                  <p style="font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#999;margin:0">
                    © ${new Date().getFullYear()} Portfolio · All rights reserved
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
        </html>
      `,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(mailToOwner),
            transporter.sendMail(mailToSender)
        ]);

        res.json({ success: true, message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Email API server running on http://localhost:${PORT}`);
    console.log(`📧 Ready to send emails from ${process.env.GMAIL_USER}`);
});
