import express from "express";
import passport from "../middlewares/passport.js";

const router = express.Router();

// Route to handle email/password login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json(user);
    });
  })(req, res, next);
});

// Route to initiate Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route to handle Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    successRedirect: process.env.FRONTEND_URL,
  })
);

// Route to handle user logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.redirect(`${process.env.FRONTEND_URL}`);
  });
});

// Route to get the authenticated user's information
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

export default router;
