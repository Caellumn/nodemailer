// Imports
import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import { sendEmail } from "./utils/mail.js";
import { MailData } from "./types/mailTyps.js";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow requests from your React app
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://nodemailer-alien-hairdress-salon.onrender.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  try {
    res.render("index");
  } catch (error) {
    console.error(error);
  }
});

app.post("/mail", (req: Request, res: Response) => {
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
    email,
    to_email
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
    message: formattedMessage,
    to_email: to_email || 'argaenth@gmail.com'
  };
  
  // Send the email
  sendEmail(emailData)
    .then(() => {
      // Return JSON response for React clients or regular response for form submissions
      if (req.headers['content-type']?.includes('application/json')) {
        res.status(200).json({ success: true, message: "Email sent successfully" });
      } else {
        res.status(200).end();
      }
    })
    .catch((error) => {
      console.error(error);
      
      // Return JSON error for React clients or text for form submissions
      if (req.headers['content-type']?.includes('application/json')) {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send email", 
          error: String(error) 
        });
      } else {
        res.status(500).send("Failed to send email");
      }
    });
});

// Options route for preflight requests
app.options('/mail', cors(corsOptions));

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
