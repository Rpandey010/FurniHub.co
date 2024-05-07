const jwt = require("jsonwebtoken");
const Users = require('../model/user.model');
const admin = require('firebase-admin');
const firebase = require('firebase');

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBvKxi2XnnbDc8V8NaSMeFyiAc3jFpBEKo",
        authDomain: "furnihub-52977.firebaseapp.com",
        projectId: "furnihub-52977",
        storageBucket: "furnihub-52977.appspot.com",
        messagingSenderId: "719022156889",
        appId: "1:719022156889:web:d62dd324ccb99ccbedd548",
        measurementId: "G-91QP5YJH38"
    });
}

if (!admin.apps.length) {
    const serviceAccount = require('../furnihub-52977-firebase-adminsdk-qf5i9-bc6404b042.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

// Middleware to fetch user from database
const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET || "secret_ecom");
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ errors: "Invalid token" });
    }
};

const login = async (req, res) => {
    console.log("Login");
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, errors: "Invalid email/password" });
        }
        const passCompare = req.body.password === user.password;
        if (!passCompare) {
            return res.status(400).json({ success: false, errors: "Invalid email/password" });
        }
        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET || "secret_ecom");
        res.json({ success: true, token, user }); // Include user details in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
};

const signup = async (req, res) => {
    console.log("Sign Up");
    try {
        const check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "User already exists with this email" });
        }
        const cart = Array(300).fill(0); // Initialize cart with 300 zeros
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });
        await user.save();
        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET || "secret_ecom");
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
};

const googleLogin = async (req, res) => {
    const { idToken, username } = req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log(decodedToken); // Log the decoded token
        const { uid, email } = decodedToken;

        let user = await Users.findOne({ uid: uid });

        if (!user) {
            user = new Users({ uid: uid, email: email, username: username });
        } else {
            if (!user.email) {
                user.email = email;
            }
        }

        // Save the user and log any errors
        await user.save().catch(err => console.error(err));

        return res.json({ success: true, uid: uid, email: email, username: username });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};



module.exports = { fetchUser, login, signup, googleLogin }; // Exporting all functions together
