require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: "192.168.132.5:3000", methods: "GET,POST,PUT,DELETE" }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 30 * 60 * 1000 }
}));

// Import Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/profile', require('./routes/profileRoutes'));
app.use('/pages', require('./routes/pageRoutes'));
app.use('/internships', require('./routes/internshipRoutes'));
app.use('/portfolio', require('./routes/portfolioRoutes'));
app.use('/admins', require('./routes/adminRoutes'));

// 404 Fallback
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'error-404.html'));
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
