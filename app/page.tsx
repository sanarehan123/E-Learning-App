"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const DEMO_USER = { email: "student@elearn.com", password: "learn123" };

  function validate() {
    const e: typeof errors = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password.trim()) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleLogin() {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      if (form.email === DEMO_USER.email && form.password === DEMO_USER.password) {
        localStorage.setItem("elearn_user", JSON.stringify({ email: form.email, name: "Student" }));
        router.push("/dashboard");
      } else {
        setErrors({ password: "Invalid email or password. Use demo credentials below." });
        setLoading(false);
      }
    }, 1000);
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .login-input:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
        }
        .login-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .login-btn { transition: all 0.2s; }
      `}</style>
      <div style={{
        minHeight: "100vh",
        minHeight: "100dvh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: "1.25rem",
      }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <div style={{
              width: "60px", height: "60px", borderRadius: "16px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.8rem", margin: "0 auto 0.75rem",
            }}>🎓</div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 5vw, 1.8rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
              ELearn
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#94a3b8" }}>
              Your gateway to knowledge
            </p>
          </div>

          {/* Card */}
          <div style={{
            background: "#1e293b",
            borderRadius: "20px",
            padding: "clamp(1.25rem, 5vw, 2rem)",
            border: "1px solid #334155",
            boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
          }}>
            <h2 style={{ margin: "0 0 1.25rem", fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9" }}>
              Sign in to your account
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Email */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: "6px" }}>
                  Email Address
                </label>
                <input
                  className="login-input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  onKeyDown={handleKey}
                  placeholder="student@elearn.com"
                  style={{
                    width: "100%", padding: "0.8rem 0.9rem",
                    border: `1.5px solid ${errors.email ? "#ef4444" : "#334155"}`,
                    borderRadius: "10px", fontSize: "16px", /* 16px prevents iOS zoom */
                    fontFamily: "inherit",
                    background: "#0f172a", color: "#f1f5f9", outline: "none",
                    boxSizing: "border-box", transition: "border-color 0.2s",
                    WebkitAppearance: "none",
                  }}
                />
                {errors.email && <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#ef4444" }}>{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: "6px" }}>
                  Password
                </label>
                <input
                  className="login-input"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  onKeyDown={handleKey}
                  placeholder="••••••••"
                  style={{
                    width: "100%", padding: "0.8rem 0.9rem",
                    border: `1.5px solid ${errors.password ? "#ef4444" : "#334155"}`,
                    borderRadius: "10px", fontSize: "16px",
                    fontFamily: "inherit",
                    background: "#0f172a", color: "#f1f5f9", outline: "none",
                    boxSizing: "border-box", transition: "border-color 0.2s",
                    WebkitAppearance: "none",
                  }}
                />
                {errors.password && <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#ef4444" }}>{errors.password}</p>}
              </div>

              {/* Button */}
              <button
                className="login-btn"
                onClick={handleLogin}
                disabled={loading}
                style={{
                  width: "100%", padding: "0.9rem",
                  background: loading ? "#475569" : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "#fff", border: "none", borderRadius: "10px",
                  fontSize: "15px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "inherit", marginTop: "0.5rem",
                  minHeight: "48px", /* touch target */
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            {/* Demo credentials */}
            <div style={{
              marginTop: "1.5rem", padding: "0.9rem",
              background: "#0f172a", borderRadius: "10px",
              border: "1px dashed #334155",
            }}>
              <p style={{ margin: "0 0 4px", fontSize: "12px", fontWeight: 700, color: "#60a5fa" }}>
                Demo Credentials
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>
                Email: <span style={{ color: "#f1f5f9" }}>student@elearn.com</span>
              </p>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" }}>
                Password: <span style={{ color: "#f1f5f9" }}>learn123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


