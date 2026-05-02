"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import ProgressBar from "../../components/ProgressBar";

const COURSES_DATA: Record<string, {
  title: string;
  instructor: string;
  emoji: string;
  color: string;
  lessons: { id: number; title: string; duration: string; videoId: string }[];
}> = {
  "1": {
    title: "Complete JavaScript for Beginners",
    instructor: "Sarah Johnson",
    emoji: "⚡",
    color: "linear-gradient(135deg, #f59e0b, #d97706)",
    lessons: [
      { id: 1, title: "Introduction to JavaScript", duration: "8:24", videoId: "W6NZfCO5SIk" },
      { id: 2, title: "Variables & Data Types", duration: "12:10", videoId: "edlFjlzxkSI" },
      { id: 3, title: "Functions & Scope", duration: "15:30", videoId: "xUI5Tsl2JpY" },
      { id: 4, title: "Arrays & Objects", duration: "18:45", videoId: "oigfaZ5ApsM" },
      { id: 5, title: "DOM Manipulation", duration: "20:00", videoId: "y17RuWkWdn8" },
      { id: 6, title: "Events & Listeners", duration: "14:20", videoId: "XF1_MlZ5l6M" },
      { id: 7, title: "ES6 Arrow Functions", duration: "10:15", videoId: "h33Srr5J9nY" },
      { id: 8, title: "Promises & Async/Await", duration: "22:00", videoId: "V_Kr9OSfDeU" },
      { id: 9, title: "Fetch API & JSON", duration: "16:40", videoId: "Oive66jrwBs" },
      { id: 10, title: "Final Project", duration: "30:00", videoId: "PkZNo7MFNFg" },
    ],
  },
  "2": {
    title: "React & Next.js Masterclass",
    instructor: "Ahmed Khan",
    emoji: "⚛️",
    color: "linear-gradient(135deg, #06b6d4, #0284c7)",
    lessons: [
      { id: 1, title: "What is React?", duration: "10:00", videoId: "Tn6-PIqc4UM" },
      { id: 2, title: "JSX & Components", duration: "14:30", videoId: "7fPXI_MnBOY" },
      { id: 3, title: "Props & State", duration: "18:00", videoId: "IYvD9oBCuJI" },
      { id: 4, title: "useEffect Hook", duration: "16:20", videoId: "0ZJgIjIuY7U" },
      { id: 5, title: "React Router", duration: "20:10", videoId: "Law7wfdg2NM" },
      { id: 6, title: "Context API", duration: "22:00", videoId: "5LrDIWkK_Bc" },
      { id: 7, title: "Next.js Introduction", duration: "15:00", videoId: "mTz0GXj8NN0" },
      { id: 8, title: "Next.js Routing", duration: "18:30", videoId: "9P8mASSREYM" },
      { id: 9, title: "API Routes", duration: "20:00", videoId: "vrR3MmGDmSE" },
      { id: 10, title: "Deployment on Vercel", duration: "12:00", videoId: "2HBIzEx6IZA" },
      { id: 11, title: "Performance Tips", duration: "14:00", videoId: "0fONene3OIA" },
      { id: 12, title: "Final Project", duration: "35:00", videoId: "PkZNo7MFNFg" },
    ],
  },
  "3": {
    title: "Python for Data Science",
    instructor: "Dr. Emily Chen",
    emoji: "🐍",
    color: "linear-gradient(135deg, #22c55e, #15803d)",
    lessons: [
      { id: 1, title: "Python Basics", duration: "12:00", videoId: "_uQrJ0TkZlc" },
      { id: 2, title: "Lists & Dictionaries", duration: "14:00", videoId: "W8KRzm-HUcc" },
      { id: 3, title: "NumPy Fundamentals", duration: "20:00", videoId: "QUT1VevkS_o" },
      { id: 4, title: "Pandas DataFrames", duration: "22:00", videoId: "vmEHCJofslg" },
      { id: 5, title: "Data Visualization", duration: "18:00", videoId: "a9UrKTVEeZA" },
      { id: 6, title: "Intro to Machine Learning", duration: "25:00", videoId: "ukzFI9rgwfU" },
      { id: 7, title: "Linear Regression", duration: "20:00", videoId: "NUXdtN1W1FU" },
      { id: 8, title: "Final Project", duration: "30:00", videoId: "PkZNo7MFNFg" },
    ],
  },
  "4": {
    title: "UI/UX Design Fundamentals",
    instructor: "Marco Rivera",
    emoji: "🎨",
    color: "linear-gradient(135deg, #ec4899, #9333ea)",
    lessons: [
      { id: 1, title: "Design Thinking", duration: "10:00", videoId: "a7sEoEvT8l8" },
      { id: 2, title: "Color Theory", duration: "12:00", videoId: "AvgCkHrcj7g" },
      { id: 3, title: "Typography Basics", duration: "14:00", videoId: "hnPFxVRFOEQ" },
      { id: 4, title: "Wireframing", duration: "16:00", videoId: "qpH7-KFWZRI" },
      { id: 5, title: "Figma Basics", duration: "20:00", videoId: "FTFaQWZBqQ8" },
      { id: 6, title: "Prototyping", duration: "18:00", videoId: "lTIeZ2ahEkQ" },
      { id: 7, title: "User Testing", duration: "14:00", videoId: "0pBNdSJ7oMU" },
      { id: 8, title: "Design Systems", duration: "22:00", videoId: "Dtd27grIBiY" },
      { id: 9, title: "Final Project", duration: "30:00", videoId: "PkZNo7MFNFg" },
    ],
  },
  "5": {
    title: "Node.js & Express Backend",
    instructor: "James Wilson",
    emoji: "🖥️",
    color: "linear-gradient(135deg, #6366f1, #4338ca)",
    lessons: [
      { id: 1, title: "Node.js Introduction", duration: "10:00", videoId: "TlB_eWDSMt4" },
      { id: 2, title: "Modules & NPM", duration: "12:00", videoId: "xHLd36QoS4k" },
      { id: 3, title: "Express Setup", duration: "15:00", videoId: "L72fhGm1tfE" },
      { id: 4, title: "REST API Design", duration: "18:00", videoId: "lsMQRaeKNDk" },
      { id: 5, title: "Middleware", duration: "14:00", videoId: "lY6icfhap2o" },
      { id: 6, title: "MongoDB & Mongoose", duration: "22:00", videoId: "-56x56UppqQ" },
      { id: 7, title: "Authentication & JWT", duration: "25:00", videoId: "mbsmsi7l3r4" },
      { id: 8, title: "Error Handling", duration: "12:00", videoId: "w1V2SdzdQBs" },
      { id: 9, title: "File Uploads", duration: "16:00", videoId: "wIOpe8S2Mk8" },
      { id: 10, title: "Deployment", duration: "14:00", videoId: "2HBIzEx6IZA" },
      { id: 11, title: "Final Project", duration: "35:00", videoId: "PkZNo7MFNFg" },
    ],
  },
  "6": {
    title: "Machine Learning A-Z",
    instructor: "Dr. Aisha Patel",
    emoji: "🤖",
    color: "linear-gradient(135deg, #f43f5e, #e11d48)",
    lessons: [
      { id: 1, title: "What is ML?", duration: "10:00", videoId: "ukzFI9rgwfU" },
      { id: 2, title: "Types of ML", duration: "12:00", videoId: "1AVYVHgFyKU" },
      { id: 3, title: "Linear Regression", duration: "20:00", videoId: "NUXdtN1W1FU" },
      { id: 4, title: "Logistic Regression", duration: "18:00", videoId: "yIYKR4sgzI8" },
      { id: 5, title: "Decision Trees", duration: "16:00", videoId: "7VeUPuFGJHk" },
      { id: 6, title: "Neural Networks", duration: "25:00", videoId: "aircAruvnKk" },
      { id: 7, title: "Deep Learning", duration: "28:00", videoId: "6M5VXKLf4D4" },
      { id: 8, title: "Natural Language Processing", duration: "22:00", videoId: "CMrHM8a3hqw" },
      { id: 9, title: "Model Evaluation", duration: "18:00", videoId: "LbX4X71-TFI" },
      { id: 10, title: "Scikit-Learn", duration: "20:00", videoId: "pqNCD_5r0IU" },
      { id: 11, title: "Real World Projects", duration: "30:00", videoId: "i_LwzRVP7bg" },
      { id: 12, title: "Deployment of ML Models", duration: "24:00", videoId: "2HBIzEx6IZA" },
      { id: 13, title: "Ethics in AI", duration: "14:00", videoId: "aGwYtUzMQUk" },
      { id: 14, title: "Final Project", duration: "40:00", videoId: "PkZNo7MFNFg" },
    ],
  },
};

export default function CoursePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const course = COURSES_DATA[id];

  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [activeLesson, setActiveLesson] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("elearn_user");
    if (!user) { router.push("/"); return; }

    const saved = localStorage.getItem(`progress_${id}`);
    if (saved) {
      const { completedIds } = JSON.parse(saved);
      setCompletedLessons(new Set(completedIds));
    }
  }, [id, router]);

  if (!course) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#f1f5f9", fontSize: "18px" }}>Course not found.</p>
      </div>
    );
  }

  const total = course.lessons.length;
  const completed = completedLessons.size;
  const progress = Math.round((completed / total) * 100);
  const currentLesson = course.lessons[activeLesson];

  function toggleLesson(lessonId: number) {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      localStorage.setItem(`progress_${id}`, JSON.stringify({
        completed: next.size,
        total,
        completedIds: Array.from(next),
      }));
      return next;
    });
  }

  function goNext() {
    if (activeLesson < course.lessons.length - 1) {
      setActiveLesson((p) => p + 1);
    }
  }

  function goPrev() {
    if (activeLesson > 0) setActiveLesson((p) => p - 1);
  }

  function markAndNext() {
    toggleLesson(currentLesson.id);
    goNext();
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 1rem" }}>

        {/* Back button + title */}
        <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              background: "#1e293b", border: "1px solid #334155",
              borderRadius: "8px", padding: "6px 14px",
              color: "#94a3b8", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            ← Back
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "#f1f5f9" }}>
              {course.emoji} {course.title}
            </h1>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>by {course.instructor}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: "#1e293b", borderRadius: "14px",
          padding: "1.25rem 1.5rem", marginBottom: "1.25rem",
          border: "1px solid #334155",
        }}>
          <ProgressBar progress={progress} total={total} completed={completed} />
        </div>

        {/* Main Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.25rem" }}>

          {/* Left — Video Player */}
          <div>
            {/* Video */}
            <div style={{
              background: "#000", borderRadius: "16px",
              overflow: "hidden", aspectRatio: "16/9",
              border: "1px solid #334155",
            }}>
              <iframe
                key={currentLesson.videoId}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentLesson.videoId}?autoplay=0&rel=0`}
                title={currentLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none", display: "block" }}
              />
            </div>

            {/* Lesson info */}
            <div style={{
              background: "#1e293b", borderRadius: "14px",
              padding: "1.25rem 1.5rem", marginTop: "1rem",
              border: "1px solid #334155",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Lesson {activeLesson + 1} of {total}
                  </p>
                  <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "#f1f5f9" }}>
                    {currentLesson.title}
                  </h2>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#64748b" }}>
                    ⏱️ {currentLesson.duration}
                  </p>
                </div>

                {/* Mark complete button */}
                <button
                  onClick={() => toggleLesson(currentLesson.id)}
                  style={{
                    padding: "8px 18px",
                    background: completedLessons.has(currentLesson.id) ? "#14532d" : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    border: completedLessons.has(currentLesson.id) ? "1px solid #22c55e" : "none",
                    borderRadius: "10px",
                    color: completedLessons.has(currentLesson.id) ? "#22c55e" : "#fff",
                    fontSize: "13px", fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                >
                  {completedLessons.has(currentLesson.id) ? "✅ Completed" : "Mark as Complete"}
                </button>
              </div>

              {/* Navigation buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                <button
                  onClick={goPrev}
                  disabled={activeLesson === 0}
                  style={{
                    flex: 1, padding: "0.65rem",
                    background: "transparent",
                    border: "1px solid #334155",
                    borderRadius: "10px", color: "#94a3b8",
                    fontSize: "13px", fontWeight: 600,
                    cursor: activeLesson === 0 ? "not-allowed" : "pointer",
                    opacity: activeLesson === 0 ? 0.4 : 1,
                    fontFamily: "inherit",
                  }}
                >
                  ← Previous
                </button>
                <button
                  onClick={markAndNext}
                  disabled={activeLesson === total - 1}
                  style={{
                    flex: 2, padding: "0.65rem",
                    background: activeLesson === total - 1 ? "#1e293b" : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    border: "none", borderRadius: "10px",
                    color: "#fff", fontSize: "13px", fontWeight: 700,
                    cursor: activeLesson === total - 1 ? "not-allowed" : "pointer",
                    opacity: activeLesson === total - 1 ? 0.4 : 1,
                    fontFamily: "inherit",
                  }}
                >
                  Complete & Next →
                </button>
              </div>
            </div>
          </div>

          {/* Right — Lesson List */}
          <div style={{
            background: "#1e293b", borderRadius: "16px",
            border: "1px solid #334155", overflow: "hidden",
            height: "fit-content",
          }}>
            <div style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid #334155",
              background: "#0f172a",
            }}>
              <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#f1f5f9" }}>
                Course Lessons
              </h3>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#64748b" }}>
                {completed} of {total} completed
              </p>
            </div>

            <div style={{ maxHeight: "520px", overflowY: "auto" }}>
              {course.lessons.map((lesson, index) => {
                const isActive = index === activeLesson;
                const isDone = completedLessons.has(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setActiveLesson(index)}
                    style={{
                      padding: "0.9rem 1.25rem",
                      borderBottom: "1px solid #0f172a",
                      cursor: "pointer",
                      background: isActive ? "#1e3a5f" : "transparent",
                      display: "flex", alignItems: "center", gap: "10px",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "#263548";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent";
                    }}
                  >
                    {/* Status icon */}
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                      background: isDone ? "#14532d" : isActive ? "#1e3a8a" : "#0f172a",
                      border: `2px solid ${isDone ? "#22c55e" : isActive ? "#3b82f6" : "#334155"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: 700,
                      color: isDone ? "#22c55e" : isActive ? "#60a5fa" : "#475569",
                    }}>
                      {isDone ? "✓" : index + 1}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        margin: 0, fontSize: "13px", fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#f1f5f9" : isDone ? "#94a3b8" : "#cbd5e1",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {lesson.title}
                      </p>
                      <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#475569" }}>
                        {lesson.duration}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}