const nodemailer = require("nodemailer");
const emailConfig = require("../configs/email.conf");

class EmailUtils {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: emailConfig.Host,
      port: emailConfig.Port,
      secure: emailConfig.Secure, // true for 465, false for other ports
      auth: {
        user: emailConfig.User,
        pass: emailConfig.Password,
      },
    });
  }

  async sendEmail({ to, subject, text, html }) {
    const mailOptions = {
      from: emailConfig.From,
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}

module.exports = new EmailUtils();
