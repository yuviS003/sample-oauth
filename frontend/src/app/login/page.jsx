"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );
      console.log("Resp from /auth/login", res);
      if (res.ok) {
        window.location.href = "/";
      } else {
        alert("Failed to log in");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}>
        Login with Google
      </a>
    </div>
  );
}
