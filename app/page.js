export default function Home() {
  const tools = [
    {
      href: "/air-permit",
      banner: "#1a4a2e",
      bannerEnd: "#2a7a4e",
      iconBg: "#e8f2ec",
      icon: "🗺️",
      tagColor: "#1a4a2e",
      tag: "Permitting · WA · MT · NV · ID",
      title: "Air Permit Applicability Roadmap",
      description:
        "Step-by-step permitting pathway tool covering NSR thresholds, federal overlays, and agency-specific requirements across Washington, Montana, Nevada, and Idaho.",
      chips: ["WAC 173-400", "ARM 17.8", "PSD / NSR"],
      chipStyle: { background: "#e8f2ec", color: "#1a4a2e" },
      arrowStyle: { background: "#e8f2ec", color: "#1a4a2e" },
    },
    {
      href: "/emergency-engine-air-tool.html",
      banner: "#1a3a5c",
      bannerEnd: "#2a5a8c",
      iconBg: "#eaf0f7",
      icon: "⚡",
      tagColor: "#1a3a5c",
      tag: "Stationary Engines · WA · MT",
      title: "Emergency Engine Air Applicability Tool",
      description:
        "9-question wizard that determines federal, state, and local air permit requirements for stationary emergency engines. Includes a PTE calculator and printable compliance report.",
      chips: ["Subpart IIII/JJJJ", "ZZZZ NESHAP", "WAC 173-400-930"],
      chipStyle: { background: "#eaf0f7", color: "#1a3a5c" },
      arrowStyle: { background: "#eaf0f7", color: "#1a3a5c" },
    },
  ];

  return (
    <div style={{ background: "#f4f1ec", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* HEADER */}
      <header style={{
        background: "#1a3a5c", color: "#fff", padding: "0 32px",
        height: 64, display: "flex", alignItems: "center", gap: 14,
        boxShadow: "0 2px 10px rgba(0,0,0,.2)", position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{
          width: 36, height: 36, border: "1.5px solid rgba(255,255,255,.3)",
          borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "monospace", fontSize: 11, fontWeight: 500,
          background: "rgba(255,255,255,.08)", flexShrink: 0
        }}>ET</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Environmental Compliance Tools</div>
          <div style={{ fontFamily: "monospace", fontSize: 10, opacity: 0.5, marginTop: 1 }}>
            Pacific Northwest &amp; Montana &mdash; Air Quality &middot; Permitting &middot; Compliance
          </div>
        </div>
      </header>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #1a3a5c 0%, #1e4a78 100%)",
        color: "#fff", padding: "56px 32px 52px", textAlign: "center"
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>
          Air Quality Compliance Tools
        </h1>
        <p style={{ fontSize: 15, opacity: 0.72, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
          Screening-level applicability tools for air quality permitting and environmental
          compliance in Washington State and Montana.
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 18 }}>
          {["Federal (EPA)", "Washington State", "Montana", "Local Air Agencies"].map((b) => (
            <span key={b} style={{
              padding: "4px 12px", borderRadius: 20,
              border: "1px solid rgba(255,255,255,.22)",
              background: "rgba(255,255,255,.1)",
              fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,.85)"
            }}>{b}</span>
          ))}
        </div>
      </div>

      {/* TOOLS */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{
          fontFamily: "monospace", fontSize: 10, textTransform: "uppercase",
          letterSpacing: ".1em", color: "#7a7268", marginBottom: 20
        }}>Available Tools</div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20
        }}>
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              style={{
                background: "#fff", border: "1px solid #d6cfc4", borderRadius: 12,
                overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,.07)",
                display: "flex", flexDirection: "column", textDecoration: "none",
                color: "inherit", transition: "all .2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,.12)";
                e.currentTarget.style.borderColor = "#b0c8de";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.07)";
                e.currentTarget.style.borderColor = "#d6cfc4";
              }}
            >
              {/* Banner */}
              <div style={{
                height: 8,
                background: `linear-gradient(90deg, ${tool.banner}, ${tool.bannerEnd})`
              }} />

              <div style={{ padding: "24px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Icon */}
                <div style={{
                  width: 42, height: 42, borderRadius: 9,
                  background: tool.iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, marginBottom: 14, flexShrink: 0
                }}>{tool.icon}</div>

                {/* Tag */}
                <div style={{
                  fontFamily: "monospace", fontSize: 9, textTransform: "uppercase",
                  letterSpacing: ".08em", color: tool.tagColor, marginBottom: 6
                }}>{tool.tag}</div>

                {/* Title */}
                <h2 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3, marginBottom: 8, color: "#1a1714" }}>
                  {tool.title}
                </h2>

                {/* Description */}
                <p style={{ fontSize: 13, color: "#7a7268", lineHeight: 1.6, flex: 1 }}>
                  {tool.description}
                </p>

                {/* Footer */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  marginTop: 18, paddingTop: 14, borderTop: "1px solid #eae6df"
                }}>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {tool.chips.map((chip) => (
                      <span key={chip} style={{
                        fontFamily: "monospace", fontSize: 9,
                        padding: "2px 7px", borderRadius: 3, fontWeight: 500,
                        ...tool.chipStyle
                      }}>{chip}</span>
                    ))}
                  </div>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, flexShrink: 0, ...tool.arrowStyle
                  }}>&#8594;</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Coming Soon */}
        <div style={{ marginTop: 40 }}>
          <div style={{
            fontFamily: "monospace", fontSize: 10, textTransform: "uppercase",
            letterSpacing: ".1em", color: "#7a7268", marginBottom: 16
          }}>Coming Soon</div>
          <div style={{
            background: "#faf8f5", border: "1px dashed #d6cfc4", borderRadius: 12,
            padding: "24px 26px", display: "flex", alignItems: "center", gap: 16, color: "#7a7268"
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8, background: "#eae6df",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0
            }}>🔧</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#46413c", marginBottom: 3 }}>
                More tools in development
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.5 }}>
                Additional screening tools for construction compliance (NPDES, Section 404/401, ESA),
                GHG reporting, and facility-specific permit tracking are being developed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        background: "#fff", borderTop: "1px solid #d6cfc4",
        padding: "16px 32px", fontFamily: "monospace", fontSize: 9, color: "#7a7268",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8
      }}>
        <span>Environmental Compliance Tools &mdash; Screening level only. Always verify with applicable regulatory agencies.</span>
        <span>Regulations reviewed April 2026</span>
      </footer>

    </div>
  );
}
