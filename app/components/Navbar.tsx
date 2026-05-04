"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState("Student");
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      <style>{`
        .nav-logout:hover {
          background: #ef4444 !important;
          color: #fff !important;
          border-color: #ef4444 !important;
        }
        .nav-logout { transition: all 0.2s; }
      `}</style>
      <nav style={{
        background: "#1e293b",
        borderBottom: "1px solid #334155",
        padding: "0 1rem",
        height: "60px",
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
          style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
        >
          <div style={{
            width: "34px", height: "34px", borderRadius: "10px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem", flexShrink: 0,
          }}>🎓</div>
          <span style={{ fontSize: "1rem", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            ELearn
          </span>
        </div>

        {/* Desktop right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px", fontWeight: 700, color: "#fff", flexShrink: 0,
            }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500, display: "block" }}>
              {userName}
            </span>
          </div>

          <button
            className="nav-logout"
            onClick={handleLogout}
            style={{
              padding: "6px 12px",
              background: "transparent",
              border: "1px solid #475569",
              borderRadius: "8px",
              color: "#94a3b8",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              minHeight: "36px",
              whiteSpace: "nowrap",
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}