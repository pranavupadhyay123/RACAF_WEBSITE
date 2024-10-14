const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mysql = require('mysql2');

const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Setting up session middleware
// app.use(session({
//     secret: 'ParryHotter',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true } // Set to true if using HTTPS
// }));

// // MySQL Connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '12345', // Your MySQL password
//     database: 'Racaf' // Your MySQL database
// });

// connection.connect(err => {
//     if (err) throw err;
//     console.log('Connected to the database!');
// });

app.use(bodyParser.json());
app.use(cors());

// Serve static files (your HTML, CSS, JS files)
app.use(express.static(path.join(__dirname)));

// Root route to serve event.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'event.html'));
});

// Route to add event to cart (temporary in-memory cart)
let cart = [];
app.post('/add-to-cart', (req, res) => {
    const event = req.body.eventName;
    if (event) {
        cart.push(event);
        res.json({ success: true, cart });
    } else {
        res.status(400).json({ success: false, message: "No event provided" });
    }
});

// Route to get cart details
app.get('/cart', (req, res) => {
    res.json({ cart });
});

// Route to handle transactions
app.post('/checkout', (req, res) => {
    // Clear the cart after checkout
    cart = []; 
    res.json({ success: true, message: "Transaction complete. Cart is empty now." });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Route to register an event (Node.js backend)
app.post('/register-event', (req, res) => {
    const userId = req.session.user_id; // Assuming the user is logged in and session holds user ID
    const { event_id } = req.body;

    if (!userId) {
        return res.status(401).json({ success: false, message: "User not logged in" });
    }

    const query = 'INSERT INTO participation (p_id, event_id) VALUES (?, ?)';
    connection.query(query, [userId, event_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        res.json({ success: true, message: "Event registered successfully!" });
    });
});

// Fetch registered events route
app.get('/get-registered-events', (req, res) => {
    const userId = req.session.user_id;

    if (!userId) {
        return res.status(401).json({ success: false, message: "User not logged in" });
    }

    const query = `
        SELECT events.event_name AS name, events.event_price AS price
        FROM participation
        JOIN events ON participation.event_id = events.event_id
        WHERE participation.p_id = ?
    `;

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        let totalAmount = 0;
        const events = results.map(event => {
            totalAmount += event.price;
            return {
                name: event.name,
                price: event.price
            };
        });

        res.json({ success: true, events, totalAmount });
    });
});
