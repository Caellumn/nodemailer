// Imports
import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import { sendEmail } from "./utils/mail.js";
import { MailData } from "./types/mailTyps.js";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));
app.use(express.json());

// Routes
app.get("/", async (req: Request, res: Response) => {
  try {
    res.render("index");
  } catch (error) {
    console.error(error);
  }
});

app.post("/mail", async (req: Request, res: Response) => {
  try {
    // Get all form data
    const { 
      name, 
      voornaam, 
      date, 
      haarkleur, 
      lengte, 
      gender, 
      subject, 
      message,
      email 
    } = req.body;
    
    // Build a more comprehensive message with all form fields
    const formattedMessage = `
      Name: ${name}
      Voornaam: ${voornaam}
      Appointment Date: ${date}
      Hair Color: ${haarkleur}
      Length: ${lengte}
      Gender: ${gender}
      
      Message: ${message}
    `;
    
    // Create email data object with all required fields
    const emailData: MailData = {
      from_email: email || `${name}.${voornaam}@example.com`,
      subject: `Alien Haircut Appointment: ${subject || 'New Appointment'}`,
      name: name || '',
      voornaam: voornaam || '',
      date: date || '',
      haarkleur: haarkleur || '',
      lengte: lengte || '',
      gender: gender || '',
      message: formattedMessage
    };
    
    // Send the email
    await sendEmail(emailData);
    
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
