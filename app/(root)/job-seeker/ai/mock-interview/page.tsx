"use client";

import { useVapi } from "@/hooks/useVapi";

export default function MockInterviewPage() {
  const {
    startCall,
    isSpeaking,
    transcript,
    endCall,
    isConnected,
    transcriptEndRef,
  } = useVapi();

  const waveBars = [6, 14, 22, 14, 18, 10, 6];
  const waveDelays = [0, 0.1, 0.2, 0.3, 0.15, 0.25, 0.35];

  if (!isConnected) {
    return (
      <div style={s.page}>
        <div style={s.idleCard}>
          <div style={s.idleAvatar}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="12" r="5" fill="#d87943" />
              <path
                d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10"
                stroke="#d87943"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 style={s.idleTitle}>AI Mock Interview</h1>
          <p style={s.idleSub}>
            Practice with Nova, your AI coach. Get real-time feedback and a
            final score after each session.
          </p>
          <div style={s.tips}>
            {[
              "10–15 questions tailored to your role",
              "Motivational feedback after each answer",
              "Score out of 10 + performance summary",
            ].map((tip, i) => (
              <div key={i} style={s.tip}>
                <div style={s.tipDot} />
                <span style={s.tipText}>{tip}</span>
              </div>
            ))}
          </div>
          <button style={s.startBtn} onClick={startCall}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3" fill="white" />
              <circle cx="8" cy="8" r="6.5" stroke="white" strokeWidth="1.5" />
            </svg>
            Start Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.activeLayout}>
        {/* Two video cards */}
        <div style={s.videoGrid}>
          {/* Nova card */}
          <div style={s.videoCard}>
            <div style={s.videoInner}>
              {/* speaking glow ring */}
              {isSpeaking && <div style={s.glowRing} />}

              {/* avatar */}
              <div
                style={{
                  ...s.avatar,
                  borderColor: isSpeaking ? "#d87943" : "var(--color-border)",
                  boxShadow: isSpeaking
                    ? "0 0 0 3px rgba(216,121,67,0.2)"
                    : "none",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="12" r="5" fill="#d87943" />
                  <path
                    d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10"
                    stroke="#d87943"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p style={s.cardName}>Nova</p>
              <p style={s.cardRole}>AI Interviewer</p>

              {/* speaking indicator */}
              <div
                style={{
                  ...s.indicator,
                  borderColor: isSpeaking ? "#d87943" : "var(--color-border)",
                }}
              >
                <div
                  style={{
                    ...s.indicatorDot,
                    background: isSpeaking
                      ? "#d87943"
                      : "var(--color-muted-foreground)",
                    animation: isSpeaking
                      ? "pulse 1.2s ease-in-out infinite"
                      : "none",
                  }}
                />
                <span style={s.indicatorText}>
                  {isSpeaking ? "Speaking..." : "Listening..."}
                </span>
              </div>

              {/* wave bars */}
              {isSpeaking && (
                <div style={s.waveRow}>
                  {waveBars.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 3,
                        height: h,
                        borderRadius: 3,
                        background: "#d87943",
                        animation: `wavePulse 0.9s ease-in-out ${waveDelays[i]}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* You card */}
          <div style={s.videoCard}>
            <div style={s.videoInner}>
              <div style={s.avatar}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="10" r="6" fill="#527575" />
                  <path
                    d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12"
                    stroke="#527575"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p style={s.cardName}>You</p>
              <p style={s.cardRole}>Candidate</p>

              <div style={s.indicator}>
                <div
                  style={{
                    ...s.indicatorDot,
                    background: "var(--color-muted-foreground)",
                  }}
                />
                <span style={s.indicatorText}>Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full transcript below — Nova left, You right */}
        {transcript.length > 0 && (
          <div style={s.transcriptCard}>
            <p style={s.transcriptHeading}>Conversation</p>
            <div style={s.transcriptBody}>
              {transcript.map((msg, i) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={i}
                    style={{
                      ...s.msgRow,
                      justifyContent: isUser ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        ...s.msgBlock,
                        alignItems: isUser ? "flex-end" : "flex-start",
                      }}
                    >
                      <p
                        style={{
                          ...s.msgLabel,
                          color: isUser
                            ? "#d87943"
                            : "var(--color-muted-foreground)",
                          textAlign: isUser ? "right" : "left",
                        }}
                      >
                        {isUser ? "You" : "Nova"}
                      </p>
                      <p
                        style={{
                          ...s.msgText,
                          textAlign: isUser ? "right" : "left",
                          color: "var(--color-foreground)",
                          opacity: isUser ? 0.8 : 1,
                        }}
                      >
                        {msg.text}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={transcriptEndRef} />
            </div>
          </div>
        )}

        {/* End call */}
        <div style={s.controls}>
          <button style={s.endCallBtn} onClick={endCall}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
                fill="white"
              />
            </svg>
            End Call
          </button>
        </div>
      </div>

      <style>{`
        @keyframes wavePulse {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.2); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "var(--color-background)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
  },

  /* idle */
  idleCard: {
    background: "var(--color-card)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-lg)",
    padding: "2.5rem 2rem",
    maxWidth: 420,
    width: "100%",
    textAlign: "center",
    boxShadow: "var(--shadow-md)",
  },
  idleAvatar: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "var(--color-muted)",
    border: "1px solid var(--color-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.25rem",
  },
  idleTitle: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 8,
    color: "var(--color-foreground)",
  },
  idleSub: {
    fontSize: 14,
    color: "var(--color-muted-foreground)",
    marginBottom: "1.75rem",
    lineHeight: 1.65,
  },
  tips: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: "1.75rem",
    textAlign: "left",
  },
  tip: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "var(--color-muted)",
    borderRadius: "var(--radius-md)",
    padding: "10px 14px",
  },
  tipDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#d87943",
    flexShrink: 0,
  },
  tipText: {
    fontSize: 13,
    color: "var(--color-muted-foreground)",
  },
  startBtn: {
    width: "100%",
    padding: 14,
    background: "#d87943",
    color: "#ffffff",
    border: "none",
    borderRadius: "var(--radius-md)",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  /* active layout */
  activeLayout: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 780,
    width: "100%",
  },

  /* video grid */
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },

  videoCard: {
    background: "var(--color-card)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  videoInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px 20px 20px",
    position: "relative",
    minHeight: 200,
  },

  glowRing: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at center, rgba(216,121,67,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "var(--color-muted)",
    border: "2px solid var(--color-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    transition: "border-color 0.3s, box-shadow 0.3s",
  },

  cardName: {
    fontSize: 16,
    fontWeight: 600,
    color: "var(--color-foreground)",
    margin: 0,
  },

  cardRole: {
    fontSize: 12,
    color: "var(--color-muted-foreground)",
    marginTop: 3,
    marginBottom: 12,
  },

  indicator: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 12px",
    borderRadius: 999,
    border: "1px solid var(--color-border)",
    background: "var(--color-muted)",
    transition: "border-color 0.3s",
  },

  indicatorDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    transition: "background 0.3s",
  },

  indicatorText: {
    fontSize: 11,
    color: "var(--color-muted-foreground)",
  },

  waveRow: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    marginTop: 12,
    height: 28,
  },

  /* latest script inside video card */
  cardScript: {
    borderTop: "1px solid #d87943",
    padding: "12px 16px",
    background: "var(--color-muted)",
  },

  cardScriptText: {
    fontSize: 12.5,
    lineHeight: 1.65,
    color: "var(--color-foreground)",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  },

  /* transcript */
  transcriptCard: {
    background: "var(--color-card)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
  },

  transcriptHeading: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "var(--color-muted-foreground)",
    padding: "12px 20px",
    borderBottom: "1px solid var(--color-border)",
    margin: 0,
  },

  transcriptBody: {
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    maxHeight: 280,
    overflowY: "auto",
    scrollBehavior: "smooth",
  },

  msgRow: {
    display: "flex",
    width: "100%",
    animation: "fadeUp 0.25s ease-out both",
  },

  msgBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    maxWidth: "70%",
  },

  msgLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
  },

  msgText: {
    fontSize: 14,
    lineHeight: 1.75,
    margin: 0,
    wordBreak: "break-word" as const,
  },

  /* controls */
  controls: {
    display: "flex",
    justifyContent: "center",
  },

  endCallBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 28px",
    background: "#e53e3e",
    color: "#ffffff",
    border: "none",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
};
