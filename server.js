const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const USERS_FILE = path.join(__dirname, "data", "users.json");

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "codeorbit_secret_key";

// Middleware
app.use(express.json());

// Read users from JSON file
function getUsers() {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data);
}

// Save users to JSON file
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "CodeOrbit Authentication API is running successfully!",
        endpoints: {
            signup: "POST /api/auth/signup",
            login: "POST /api/auth/login",
            profile: "GET /api/auth/profile"
        }
    });
});

// Signup
app.post("/api/auth/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const users = getUsers();

        // Check existing user
        const existingUser = users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        };

        users.push(newUser);
        saveUsers(users);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// Login
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const users = getUsers();

        const user = users.find(
            user => user.email === email.toLowerCase().trim()
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Access token required"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

// Protected profile route
app.get("/api/auth/profile", authenticateToken, (req, res) => {
    const users = getUsers();

    const user = users.find(user => user.id === req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.json({
        success: true,
        data: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Authentication API is running on http://localhost:${PORT}`);
});