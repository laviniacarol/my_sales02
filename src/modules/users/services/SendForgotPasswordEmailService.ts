import { usersRepositories } from "../database/repositories/UsersRepositories";
import AppError from "@shared/errors/AppError";
import { userTokenRepositories } from "../database/repositories/UserTokensRepositories";
import { sendEmail } from "@config/email";


interface IForgotPassword {
  email: string;
}

export default class SendForgotPasswordEmailService {
  async execute(email: string): Promise<void> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    const token = await userTokenRepositories.generate(user.id);

    if (!token) {
      throw new AppError("Error generating reset token", 500);
    }

    sendEmail({
      to: email,
      subject: 'My Sales Recovery Password',
      body: `
      <div style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f6f8; padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:10px; overflow:hidden;">
                <tr>
                  <td style="background:#007bff; padding:20px 24px;">
                    <h1 style="margin:0; font-size:22px; color:#ffffff;">My Sales</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 24px; color:#333333;">
                    <h2 style="margin:0 0 12px 0; font-size:20px; color:#1f2937;">Password recovery</h2>
                    <p style="margin:0 0 12px 0; line-height:1.6; color:#4b5563;">
                      We received a request to reset your password.
                    </p>
                    <p style="margin:0 0 20px 0; line-height:1.6; color:#4b5563;">
                      Click the button below to create a new password. This link expires in 2 hours.
                    </p>

                    <a
                      href="http://localhost:3000/reset-password?token=${token.token}"
                      style="display:inline-block; background:#007bff; color:#ffffff; text-decoration:none; padding:12px 20px; border-radius:6px; font-weight:600;"
                    >
                      Reset password
                    </a>

                    <p style="margin:24px 0 8px 0; line-height:1.6; color:#6b7280; font-size:14px;">
                      If the button does not work, copy and paste this link into your browser:
                    </p>
                    <p style="margin:0; word-break:break-all; font-size:14px;">
                      <a href="http://localhost:3000/reset-password?token=${token.token}" style="color:#007bff; text-decoration:none;">
                        http://localhost:3000/reset-password?token=${token.token}
                      </a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px 24px 24px; border-top:1px solid #e5e7eb; color:#6b7280; font-size:13px; line-height:1.6;">
                    If you did not request this change, you can safely ignore this email.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
      `,
    })
  }
}
