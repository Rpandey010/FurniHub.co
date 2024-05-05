// auth.controller.js
const express = require("express");
const jwt = require("jsonwebtoken");
const Users = require('../model/user.model');

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
    return res.status(401).json({ errors: "Invalid or expired token" });
  }
};

exports.login = async (req, res) => {
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

exports.signup = async (req, res) => {
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
