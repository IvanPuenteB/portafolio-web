require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

const rateLimit = require("express-rate-limit");

const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Máximo 5 solicitudes por IP en 15 minutos
    message: "Demasiadas solicitudes, intenta más tarde."
});

app.use("/send-email", emailLimiter);


// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Debes generar una "contraseña de aplicación" en Gmail
    },
});

app.post("/send-email", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, // Cambia esto
            subject: `Nuevo mensaje de ${name}`,
            text: `Nombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Correo enviado con éxito" });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ success: false, error: "Error al enviar correo" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
