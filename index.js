const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static files from the public directory
app.use(express.static(path.join(__dirname, "page")));

// Serve the index.html file at the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "page", "index.html"));
});

app.post("/send-email", (req, res) => {
  const { from, to, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amanullamulla394@gmail.com",
      pass: "my password :)",
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Email could not be sent.");
    } else {
      console.log("Email sent: " + info.response);
      res.redirect("/");
    }
  });
});

// Initializing web server
app.listen(port, () => console.log(`Server is running at port ${port}`));
