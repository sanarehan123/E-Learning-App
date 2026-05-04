"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import CourseCard, { Course } from "../components/CourseCard";

const COURSES: Course[] = [
  {
    id: "1", title: "Complete JavaScript for Beginners", instructor: "Sarah Johnson",
    category: "Programming", duration: "12 hours", lessons: 10, emoji: "⚡",
    color: "linear-gradient(135deg, #f59e0b, #d97706)",
    description: "Learn JavaScript from scratch. Covers variables, functions, DOM manipulation and modern ES6+ features.",
  },
  {
    id: "2", title: "React & Next.js Masterclass", instructor: "Ahmed Khan",
    category: "Web Dev", duration: "18 hours", lessons: 12, emoji: "⚛️",
    color: "linear-gradient(135deg, #06b6d4, #0284c7)",
    description: "Build modern web apps with React and Next.js. Includes hooks, routing, API integration and deployment.",
  },
  {
    id: "3", title: "Python for Data Science", instructor: "Dr. Emily Chen",
    category: "Data Science", duration: "15 hours", lessons: 8, emoji: "🐍",
    color: "linear-gradient(135deg, #22c55e, #15803d)",
    description: "Master Python for data analysis. Learn pandas, numpy, matplotlib and machine learning basics.",
  },
  {
    id: "4", title: "UI/UX Design Fundamentals", instructor: "Marco Rivera",
    category: "Design", duration: "10 hours", lessons: 9, emoji: "🎨",
    color: "linear-gradient(135deg, #ec4899, #9333ea)",
    description: "Design beautiful user interfaces. Covers Figma, design principles, wireframing and prototyping.",
  },
  {
    id: "5", title: "Node.js & Express Backend", instructor: "James Wilson",
    category: "Backend", duration: "14 hours", lessons: 11, emoji: "🖥️",
    color: "linear-gradient(135deg, #6366f1, #4338ca)",
    description: "Build robust REST APIs with Node.js and Express. Includes authentication, databases and deployment.",
  },
  {
    id: "6", title: "Machine Learning A-Z", instructor: "Dr. Aisha Patel",
    category: "AI / ML", duration: "20 hours", lessons: 14, emoji: "🤖",
    color: "linear-gradient(135deg, #f43f5e, #e11d48)",
    description: "Comprehensive machine learning course. Covers supervised learning, neural networks and real projects.",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Student");
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(COURSES.map((c) => c.category)))];

  useEffect(() => {
    const user = localStorage.getItem("elearn_user");
    if (!user) { router.push("/"); return; }
    setUserName(JSON.parse(user).name || "Student");

    const map: Record<string, number> = {};
    COURSES.forEach((course) => {
      const saved = localStorage.getItem(`progress_${course.id}`);
      if (saved) {
        const { completed, total } = JSON.parse(saved);
        map[course.id] = Math.round((completed / total) * 100);
      } else {
        map[course.id] = 0;
      }
    });
    setProgressMap(map);
  }, [router]);

  const filteredCourses = filter === "All" ? COURSES : COURSES.filter((c) => c.category === filter);
  const totalCompleted = Object.values(progressMap).filter((p) => p === 100).length;
  const inProgress = Object.values(progressMap).filter((p) => p > 0 && p < 100).length;
  const overallProgress = COURSES.length
    ? Math.round(Object.values(progressMap).reduce((a, b) => a + b, 0) / COURSES.length)
    : 0;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .filter-btn:active { transform: scale(0.96); }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <Navbar />

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.5rem 1rem" }}>

          <div style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.4rem, 5vw, 1.8rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
              Welcome back, {userName} 👋
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#64748b" }}>
              Keep learning — you're doing great!
            </p>
          </div>

          {/* Stats — 2 columns on mobile, 4 on desktop */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "10px", marginBottom: "1.5rem",
          }}>
            {[
              { label: "Total Courses", value: COURSES.length, icon: "📚", color: "#3b82f6" },
              { label: "In Progress", value: inProgress, icon: "▶️", color: "#f59e0b" },
              { label: "Completed", value: totalCompleted, icon: "✅", color: "#22c55e" },
              { label: "Overall Progress", value: `${overallProgress}%`, icon: "📊", color: "#8b5cf6" },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: "#1e293b", borderRadius: "14px",
                padding: "1rem", border: "1px solid #334155",
              }}>
                <div style={{ fontSize: "1.3rem", marginBottom: "4px" }}>{stat.icon}</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filter pills — horizontally scrollable on mobile */}
          <div style={{
            display: "flex", gap: "8px",
            overflowX: "auto", paddingBottom: "4px",
            marginBottom: "1.25rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
            {categories.map((cat) => (
              <button
                className="filter-btn"
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "20px", flexShrink: 0,
                  border: `1.5px solid ${filter === cat ? "#3b82f6" : "#334155"}`,
                  background: filter === cat ? "#1e3a5f" : "transparent",
                  color: filter === cat ? "#60a5fa" : "#64748b",
                  fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                  minHeight: "36px",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "1rem",
          }}>
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progress={progressMap[course.id] ?? 0}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}