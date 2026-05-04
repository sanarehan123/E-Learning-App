"use client";

import { useRouter } from "next/navigation";

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  duration: string;
  lessons: number;
  emoji: string;
  color: string;
  description: string;
}

interface CourseCardProps {
  course: Course;
  progress: number;
}

export default function CourseCard({ course, progress }: CourseCardProps) {
  const router = useRouter();

  return (
    <>
      <style>{`
        .course-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 28px rgba(0,0,0,0.3) !important;
        }
        .course-card { transition: transform 0.2s, box-shadow 0.2s; }
        @media (hover: none) {
          .course-card:hover { transform: none !important; }
        }
      `}</style>
      <div
        className="course-card"
        onClick={() => router.push(`/course/${course.id}`)}
        style={{
          background: "#1e293b",
          borderRadius: "16px",
          border: "1px solid #334155",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {/* Course Banner */}
        <div style={{
          height: "110px",
          background: course.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
        }}>
          {course.emoji}
        </div>

        {/* Content */}
        <div style={{ padding: "1.1rem" }}>
          <span style={{
            fontSize: "11px", fontWeight: 700,
            color: "#60a5fa", background: "#1e3a5f",
            padding: "3px 10px", borderRadius: "20px",
            textTransform: "uppercase", letterSpacing: "0.05em",
          }}>
            {course.category}
          </span>

          <h3 style={{
            margin: "0.5rem 0 0.25rem",
            fontSize: "0.95rem", fontWeight: 700,
            color: "#f1f5f9", lineHeight: 1.3,
          }}>
            {course.title}
          </h3>

          <p style={{
            margin: "0 0 0.6rem",
            fontSize: "13px", color: "#64748b",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {course.description}
          </p>

          <p style={{ margin: "0 0 0.6rem", fontSize: "12px", color: "#94a3b8" }}>
            👨‍🏫 {course.instructor}
          </p>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "0.8rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: "#64748b" }}>📚 {course.lessons} lessons</span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>⏱️ {course.duration}</span>
          </div>

          {/* Progress Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>Progress</span>
              <span style={{ fontSize: "12px", fontWeight: 700, color: progress === 100 ? "#22c55e" : "#60a5fa" }}>
                {progress}%
              </span>
            </div>
            <div style={{ height: "6px", background: "#0f172a", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${progress}%`,
                background: progress === 100
                  ? "linear-gradient(90deg, #22c55e, #16a34a)"
                  : "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                borderRadius: "99px",
                transition: "width 0.6s ease",
              }} />
            </div>
          </div>

          <button style={{
            width: "100%", marginTop: "0.9rem",
            padding: "0.75rem",
            minHeight: "44px", /* touch target */
            background: progress > 0 ? "transparent" : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            border: progress > 0 ? "1px solid #3b82f6" : "none",
            borderRadius: "10px",
            color: "#fff", fontSize: "13px", fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
          }}>
            {progress === 0 ? "Start Course" : progress === 100 ? "✅ Completed" : "Continue Learning"}
          </button>
        </div>
      </div>
    </>
  );
}