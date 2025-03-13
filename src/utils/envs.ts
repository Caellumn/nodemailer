import "dotenv/config";

// Get environment variables
const { SMTP_USER, SMTP_PASS } = process.env;

// Validate required environment variables
if (!SMTP_USER || !SMTP_PASS) {
  throw new Error("SMTP_USER and SMTP_PASS environment variables are required");
}

// Export for use in other files
export const SMTP_HOST = "smtp.gmail.com"; // Gmail SMTP server
export const smtpEmail = SMTP_USER;
export const smtpPassword = SMTP_PASS;
