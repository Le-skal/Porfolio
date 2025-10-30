// Vercel serverless function to send emails via Gmail API
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

  const { name, email, message, language, subject: providedSubject, html: providedHtml } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Create transporter using Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, // Your Gmail address
                pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
            },
        });

        // Get current date
        const date = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

  // Helper to produce a header (includes big headline and optional subtitle) and footer for the beautiful template.
  const makeHeader = (headline, subtitle = '') => `
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
                                ${headline}
                              </td>
                            </tr>
                            ${subtitle ? `
                            <tr>
                              <td style="padding-top:6px;font-family:Georgia,'Times New Roman',serif;font-size:13px;font-style:italic;color:#666;letter-spacing:0.3px;text-align:center">
                                ${subtitle}
                              </td>
                            </tr>
                            ` : ''}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <!-- Content placeholder (we will inject innerHtml here) -->
`;

        const makeFooter = () => `
            <!-- Footer -->
            <tr>
              <td style="padding:20px 30px;background:#fafaf8;border-top:3px double #2d6a4f;text-align:center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td style="font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#999;line-height:1.6;text-align:center">
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

  // Helper to wrap an inner HTML fragment into the full template and optionally set the headline + subtitle
  const wrapInTemplate = (innerHtml, headline = 'Portfolio Contact', subtitle = '') => makeHeader(headline, subtitle) + innerHtml + makeFooter();

        // Owner inner content (message/details) - this remains the detailed message section
        const ownerInner = `
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
`;

        // Email to you (portfolio owner) - use the ownerInner wrapped in the template
        const mailToOwner = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `Portfolio Contact: ${name}`,
            html: wrapInTemplate(ownerInner),
        };

  // Log received language and a short request preview for debugging
  console.log('[send-email] received language:', language);
  // Normalize language to `en` or `fr` for headline/subtitle maps
  const shortLang = (language || 'en').toString().slice(0, 2).toLowerCase() === 'fr' ? 'fr' : 'en';

  const headlineMap = { en: 'Thank You!', fr: 'Merci !' };
  const subtitleMap = { en: 'Your message has been received', fr: 'Votre message a bien été reçu' };
  // If the client provided a subject and HTML body, use them (they are localized by the front-end)
        // but wrap them in the same beautiful template so the sender receives the preferred layout.
        let mailToSender;
        if (providedSubject && providedHtml) {
            // providedHtml is expected to be a fragment representing the confirmation message body (from LanguageContext)
            // We'll inject it as the inner content so the header/footer remain consistent with owner email.
            // Log a short preview for debugging (safe: not logging full PII)
            console.log('[send-email] Using client-provided subject/html for confirmation. subject:', providedSubject);
            console.log('[send-email] providedHtml preview:', providedHtml?.slice(0, 200));

            // Sanitize the provided HTML so the server-controlled big header (Thank You! / Merci !) is shown
            // Remove any top-level heading tags that the client fragment might have inserted and strip
            // direct occurrences of the providedSubject (so it doesn't appear twice as the headline).
            let safeHtml = String(providedHtml || '');
            try {
                // Remove any <h1>..</h1> .. <h6>..</h6> tags
                safeHtml = safeHtml.replace(/<h[1-6][\s\S]*?>[\s\S]*?<\/h[1-6]>/gi, '');
                // Remove the providedSubject if present (escape for regex)
                if (providedSubject) {
                    const esc = providedSubject.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const re = new RegExp(esc, 'gi');
                    safeHtml = safeHtml.replace(re, '');
                }
                // Trim leftover empty tags or excessive whitespace at the start
                safeHtml = safeHtml.replace(/^\s+/, '');
            } catch (e) {
                console.warn('[send-email] HTML sanitization failed, using original providedHtml', e);
                safeHtml = providedHtml;
            }

      // Use a short static headline + subtitle based on language for the big header (don't use full subject as headline)
      mailToSender = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: providedSubject,
        html: wrapInTemplate(safeHtml, headlineMap[shortLang], subtitleMap[shortLang]),
      };
        } else {
            // Fallback: use simple English default templates
            mailToSender = {
                from: process.env.GMAIL_USER,
                to: email,
                subject: `Thank you for contacting me, ${name}!`,
                html: wrapInTemplate(`<tr><td style="padding:30px 30px"><p>Hi ${name},</p><p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p><p>Best regards,<br/>Raphaël Martin</p></td></tr>`),
            };
        }

        // Send both emails
        await Promise.all([
            transporter.sendMail(mailToOwner),
            transporter.sendMail(mailToSender)
        ]);

        return res.status(200).json({ success: true, message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
}

