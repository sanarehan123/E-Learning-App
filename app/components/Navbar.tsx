"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const user = localStorage.getItem("elearn_user");
    if (user) {
      const parsed = JSON.parse(user);
      setUserName(parsed.name || "Student");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("elearn_user");
    router.push("/");
  }

  return (
    <nav style={{
      background: "#1e293b",
      borderBottom: "1px solid #334155",
      padding: "0 2rem",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div
        onClick={() => router.push("/dashboard")}
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
      >
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem",
        }}>🎓</div>
        <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
          ELearn
        </span>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: 700, color: "#fff",
          }}>
            {userName.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 500 }}>
            {userName}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            padding: "6px 14px",
            background: "transparent",
            border: "1px solid #475569",
            borderRadius: "8px",
            color: "#94a3b8",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background = "#ef4444";
            (e.target as HTMLButtonElement).style.color = "#fff";
            (e.target as HTMLButtonElement).style.borderColor = "#ef4444";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = "transparent";
            (e.target as HTMLButtonElement).style.color = "#94a3b8";
            (e.target as HTMLButtonElement).style.borderColor = "#475569";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}