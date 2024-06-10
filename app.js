const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Jouw gewenste poort

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint om POST-verzoeken te verwerken
app.post('/send', (req, res) => {
    // Verwerk de ontvangen formuliergegevens
    const { name, email, message } = req.body;

    // Configureer de e-mailverzender
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jouw-email@gmail.com', // Jouw e-mailadres
            pass: 'jouw-wachtwoord' // Jouw wachtwoord
        }
    });

    // Configureer de e-mailopties
    const mailOptions = {
        from: email,
        to: 'popietenzeehondenomin@gmail.com', // Ontvanger
        subject: 'Nieuw bericht van het contactformulier',
        text: `Naam: ${name}\nE-mail: ${email}\nBericht: ${message}`
    };

    // Verstuur de e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Er is een fout opgetreden bij het verzenden van de e-mail:', error);
            res.status(500).send('Er is een fout opgetreden bij het verzenden van het bericht.');
        } else {
            console.log('E-mail verzonden:', info.response);
            res.send('Je e-mail is verzonden!');
        }
    });
});

// Start de server
app.listen(port, () => {
    console.log(`Server gestart op poort 3000${port}`);
});
