require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// create transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: (process.env.SMTP_SECURE === 'true'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/send-contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required' });

    // Build email
    const to = process.env.DEFAULT_TO || 'ishasreeayurvedic@gmail.com';

    // Some SMTP servers reject arbitrary From addresses. We attempt to set From to the user's email per your request,
    // but also set Reply-To and include authenticated DEFAULT_FROM as fallback.
    const fromAddress = email || process.env.DEFAULT_FROM;
    const fallbackFrom = process.env.DEFAULT_FROM || process.env.SMTP_USER;

    const mailOptions = {
      from: fromAddress,
      to,
      subject: `Website contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || '-'}</p>
             <hr/>
             <p>${message}</p>`,
      replyTo: email
    };

    // If the SMTP server disallows using arbitrary "from" addresses we can set the authenticated account as the From
    // and the visitor email as Reply-To. Many hosting SMTP servers require this.
    // We'll attempt the requested From first, but if it fails we'll retry with fallbackFrom.
    try {
      await transporter.sendMail(mailOptions);
      return res.json({ ok: true });
    } catch (err) {
      console.error('Send failed with user From, retrying with fallback From', err && err.message);
      // retry with fallback
      const retryOptions = { ...mailOptions, from: fallbackFrom };
      await transporter.sendMail(retryOptions);
      return res.json({ ok: true, note: 'sent with fallback from address' });
    }

  } catch (err) {
    console.error('Error in /api/send-contact', err);
    res.status(500).json({ error: 'sending failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Mail API listening on http://localhost:${PORT}`);
});
