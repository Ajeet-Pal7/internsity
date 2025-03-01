require('dotenv').config();
const express = require('express');
const otherUtils = require('./utils/otherUtils.js');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');

// Initialize app
const app = express();

// Connect to database
// connectDB();

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: "https://internsity-production.up.railway.app", methods: "GET,POST,PUT,DELETE" }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, httpOnly: true, maxAge: 30 * 60 * 1000 }
// }));

app.get('/', async (req, res) => {
    await otherUtils.sendFileWithFallback(
                res,
                path.join(process.cwd(), 'public', 'index.html'),
                path.join(process.cwd(), 'public', 'error-404.html')
            );
});

// app.get('/pages/about', async (req, res) => {
//     console.log("Function Working");
//     await otherUtils.sendFileWithFallback(
//                 res,
//                 path.join(process.cwd(), 'public', 'about-us.html'),
//                 path.join(process.cwd(), 'public', 'error-404.html')
//             );
// });

// Import Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/profile', require('./routes/profileRoutes'));
app.use('/pages', require('./routes/pageRoutes'));
app.use('/internships', require('./routes/internshipRoutes'));
app.use('/portfolio', require('./routes/portfolioRoutes'));
app.use('/admins', require('./routes/adminRoutes'));

// 404 Fallback
app.use(async (req, res) => {
    await otherUtils.sendFileWithFallback(
                res,
                path.join(process.cwd(), 'public', 'error-404.html'),
                path.join(process.cwd(), 'public', 'error-404.html')
            );
});

// Start server
const PORT = process.env.PORT;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
    console.log(`Server is running on PORT : ${PORT}`);
});

