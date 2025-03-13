import nodemailer from "nodemailer";
import { MailData } from "../types/mailTyps.js";
import { smtpEmail, smtpPassword } from "./envs.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: smtpEmail,
      pass: smtpPassword,
    }
});

export const sendEmail = async (data:MailData) => {
    const mailOptions = {
        from: data.from_email,
        to: "inesdoggen6@gmail.com",
        subject: data.subject,
        html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Alien Hairdresser Salon - Email Confirmation</title>
</head>
<body style="font-family: 'Arial', sans-serif; background-color: #0a0b1e; color: #ffffff; margin: 0; padding: 20px;">
    <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #1e2140; padding: 0; border-radius: 16px; box-shadow: 0 0 15px rgba(0, 242, 255, 0.3); border: 1px solid rgba(0, 242, 255, 0.2); position: relative; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(90deg, #00f2ff, #b700ff); color: #ffffff; text-align: center; padding: 20px; font-family: 'Arial', sans-serif; font-size: 22px; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; border-radius: 16px 16px 0 0; position: relative; text-shadow: 0 0 5px #00f2ff;">
            ALIEN HAIRDRESSER SALON
        </div>
        
        <!-- Content -->
        <div style="padding: 25px; font-size: 16px; color: rgba(255, 255, 255, 0.9); line-height: 1.6;">
            <p style="margin-bottom: 15px;">Beste ${data.name} 🤖,</p>
            <p style="margin-bottom: 15px;">Bedankt voor je interesse in Alien hairdress Salon 👾</p>
            <p style="margin-bottom: 15px;">Thanks voor je aanvraag 🚀, we zullen contact opnemen om de afspraak te bevestigen 🛸</p>
            
            <div style="margin-bottom: 15px; padding: 15px; background-color: rgba(0, 242, 255, 0.05); border-radius: 10px; border: 1px solid rgba(0, 242, 255, 0.2);">
                <p style="margin-bottom: 10px; font-weight: bold; color: #00f2ff;">APPOINTMENT DETAILS:</p>
                <p style="margin-bottom: 5px;">Naam: ${data.name}</p>
                <p style="margin-bottom: 5px;">Voornaam: ${data.voornaam}</p>
                <p style="margin-bottom: 5px;">Datum: ${data.date}</p>
                <p style="margin-bottom: 5px;">Haarkleur: <span style="color: ${data.haarkleur} ">■</span> ${data.haarkleur}</p>
                <p style="margin-bottom: 5px;">Lengte: ${data.lengte}</p>
                <p style="margin-bottom: 5px;">Gender: ${data.gender}</p>
            </div>
            
            <p style="margin-bottom: 15px; padding: 10px; background-color: rgba(183, 0, 255, 0.05); border-radius: 10px; border-left: 3px solid #b700ff;">${data.message}</p>
            
            <p style="margin-bottom: 15px;">Indien je nog iets vergeten bent laat het ons gerust weten en we komen er zo snel op terug het kan wel enkele lichtjaren duren voor we terug komen</p>
            <p style="margin-bottom: 15px;">Als je nog vragen hebt 🔫 zullen we er zo snel mogelijk op antwoorden ☄️🌠</p>
            
            <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid rgba(0, 242, 255, 0.2);">
                <p style="margin-bottom: 5px;">Met vriendelijke groet,</p>
                <p style="margin-bottom: 5px; font-weight: bold; color: #00f2ff;">Het Alien Hairdress Salon Team 🖖</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; font-size: 12px; color: rgba(255, 255, 255, 0.6); margin-top: 10px; padding: 15px; border-top: 1px solid rgba(0, 242, 255, 0.2);">
            &copy; 2025 Alien Hairdresser Salon | <a href="https://syntra.be" style="color: #00f2ff; text-decoration: none;">Website</a>
        </div>
    </div>
</body>
</html>`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent! 🚀")
    } catch (error) {
        throw error;
    }
}