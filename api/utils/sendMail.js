import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const emailUser = process.env.EMAIL_USER || "anupamtiwari8090@gmail.com";
const passUser = process.env.EMAIL_PASS || "midl ojmm llwn jlgs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminEmail = process.env.EMAIL_USER || "anupamtiwari8090@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: passUser,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.join(__dirname, "../templates"),
      defaultLayout: false,
    },
    viewPath: path.join(__dirname, "../templates"),
    extName: ".hbs",
  })
);

const sendEmail = async (formData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${adminEmail}, ads.pentacodes@gmail.com`,
    subject: "New Form Submission",
    template: "formSubmission",
    context: {
      ...formData,
    },
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
