"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Resp from /auth/user", data);
        setUser(data.user);
      })
      .catch((err) => {
        console.log("Error from /auth/user", err);
      });
  }, []);

  if (!user) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user.name}</div>;
}
