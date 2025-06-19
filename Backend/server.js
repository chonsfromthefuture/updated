// server.js
import express from "express";
import pool from './database.js';
import cors from 'cors';
import path from 'path';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';

// CONFIG
const PORT = 4280;
const FRONTEND_URL = 'http://localhost:5173';

// __dirname replacement for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// CORS setup
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: "Server is working properly" });
});

// Get all users
app.get("/api/users", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT ID, Name, Email, Role FROM accounts");
    res.json({ status: "success", data: rows });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ status: "error", message: "Failed to retrieve users" });
  } finally {
    if (connection) connection.release();
  }
});

// Get products
app.get("/api/products", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT Id, name, price, image_path, verified, description FROM product_tb");
    res.json({ status: "success", data: rows });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ status: "error", message: "Failed to retrieve products" });
  } finally {
    if (connection) connection.release();
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  let connection;
  try {
    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({ status: "error", message: "Username and password are required" });
    }

    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT ID, Name, Email, Password, Role FROM accounts WHERE LOWER(Name) = LOWER(?) LIMIT 1",
      [username.trim()]
    );

    const invalidCreds = { status: "error", message: "Invalid username or password" };

    if (rows.length === 0) {
      await bcrypt.compare(password, '$2b$10$invalidbcryptplaceholderdummydataaaaaaaa'); // fake compare
      return res.status(401).json(invalidCreds);
    }

    const user = rows[0];
    if (!user.Password || !user.Password.startsWith('$2')) {
      console.error('Invalid hash format for user:', user.Name);
      return res.status(500).json({ status: "error", message: "Internal error. Please contact support." });
    }

    const match = await bcrypt.compare(password, user.Password);
    if (!match) return res.status(401).json(invalidCreds);

    const { Password, ...userData } = user;
    res.json({ status: "success", message: "Login successful", user: userData });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    if (connection) connection.release();
  }
});

// Signup route
// Signup route
app.post("/api/signup", async (req, res) => {
  let connection;
  try {
    const { name, password, email, role, businessPermit } = req.body;

    if (!name?.trim() || !password?.trim() || !email?.trim() || !role?.trim()) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ status: "error", message: "Password must be at least 8 characters long" });
    }

    const allowedRoles = ['Admin', 'Seller', 'Customer'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ status: "error", message: "Invalid role" });
    }

    connection = await pool.getConnection();

    const [exists] = await connection.query(
      "SELECT ID FROM accounts WHERE LOWER(Name) = LOWER(?) OR LOWER(Email) = LOWER(?) LIMIT 1",
      [name.trim(), email.trim()]
    );
    if (exists.length > 0) {
      return res.status(409).json({ status: "error", message: "User already exists" });
    }

    if (role === 'Seller') {
      if (!businessPermit?.trim()) {
        return res.status(400).json({ status: "error", message: "Business permit required for sellers" });
      }

      const [permitExists] = await connection.query(
        "SELECT ID FROM accounts WHERE Business_Permit = ? LIMIT 1",
        [businessPermit.trim()]
      );
      if (permitExists.length > 0) {
        return res.status(400).json({ status: "error", message: "This business permit already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const [insert] = await connection.query(
      "INSERT INTO accounts (Name, Password, Email, Role, Business_Permit) VALUES (?, ?, ?, ?, ?)",
      [
        name.trim(),
        hashedPassword,
        email.trim(),
        role.trim(),
        role === 'Seller' ? businessPermit.trim() : null
      ]
    );

    res.status(201).json({
      status: "success",
      message: "Signup successful",
      userId: insert.insertId
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    if (connection) connection.release();
  }
});


// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔗 CORS allowed from: ${FRONTEND_URL}`);
});
