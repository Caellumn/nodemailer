import "dotenv/config";

// Get environment variables
const { SMTP_USER, SMTP_PASS } = process.env;

// Only log a warning in production, don't throw an error
if (!SMTP_USER || !SMTP_PASS) {
  console.warn("Warning: SMTP_USER and/or SMTP_PASS environment variables are missing");
  if (process.env.NODE_ENV === 'production') {
    console.error("Email functionality will not work without these variables being set!");
  }
}

// Export for use in other files
export const SMTP_HOST = "smtp.gmail.com"; // Gmail SMTP server
export const smtpEmail = SMTP_USER || "defaultemail@example.com";
export const smtpPassword = SMTP_PASS || "defaultpassword";
