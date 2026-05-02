"use client";

interface ProgressBarProps {
  progress: number;
  total: number;
  completed: number;
  showLabel?: boolean;
  height?: number;
}

export default function ProgressBar({
  progress,
  total,
  completed,
  showLabel = true,
  height = 10,
}: ProgressBarProps) {
  const isComplete = progress === 100;

  return (
    <div style={{ width: "100%" }}>
      {showLabel && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#f1f5f9" }}>
              Course Progress
            </span>
            {isComplete && (
              <span style={{
                fontSize: "11px", fontWeight: 700,
                background: "#14532d", color: "#22c55e",
                padding: "2px 8px", borderRadius: "20px",
              }}>
                COMPLETED
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>
              {completed} / {total} lessons
            </span>
            <span style={{
              fontSize: "15px", fontWeight: 800,
              color: isComplete ? "#22c55e" : "#60a5fa",
            }}>
              {progress}%
            </span>
          </div>
        </div>
      )}

      <div style={{
        width: "100%",
        height: `${height}px`,
        background: "#0f172a",
        borderRadius: "99px",
        overflow: "hidden",
        border: "1px solid #1e293b",
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: isComplete
            ? "linear-gradient(90deg, #22c55e, #16a34a)"
            : "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          borderRadius: "99px",
          transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
        }}>
          {!isComplete && progress > 0 && (
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
              animation: "shimmer 2s infinite",
              borderRadius: "99px",
            }} />
          )}
        </div>
      </div>

      {showLabel && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "6px",
        }}>
          {[0, 25, 50, 75, 100].map((mark) => (
            <div key={mark} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: "6px", height: "6px",
                borderRadius: "50%",
                background: progress >= mark ? (isComplete ? "#22c55e" : "#3b82f6") : "#334155",
                transition: "background 0.4s ease",
              }} />
              <span style={{
                fontSize: "10px", marginTop: "3px",
                color: progress >= mark ? "#94a3b8" : "#475569",
              }}>
                {mark}%
              </span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}