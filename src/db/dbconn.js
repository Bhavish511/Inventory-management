// const mysql2 = require('mysql2/promise');


// const db = mysql2.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: "Bhavish12345",
//     database: 'pantry'
// });

// console.log("Connected!!!!");

// module.exports = db;


const mysql2 = require('mysql2/promise');

// Read database configuration from environment variables
const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Optional: Add a check to ensure environment variables are set (good practice)
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error("Database environment variables are not set!");
    // You might want to exit or throw an error here in a real application
} else {
    console.log("Database config loaded from environment variables.");
    // Optional: Ping the database to confirm connection is possible (be careful with startup timing)
    db.getConnection()
      .then(connection => {
        console.log("Connected to Database!!!");
        connection.release(); // Release the connection immediately
      })
      .catch(err => {
        console.error("Failed to connect to database:", err.stack);
      });
     console.log("Attempting to connect to Database..."); // More accurate log before actual connection attempts happen later
}

module.exports = db;