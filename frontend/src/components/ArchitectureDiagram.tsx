"use client";

import { useEffect, useRef, useState } from "react";

type NodeKey = "vercel" | "render" | "supabase";

const nodes: Record<NodeKey, { label: string; sub: string; color: string; accent: string; badge: string[] }> = {
    vercel: {
        label: "Vercel",
        sub: "Next.js (App Router)",
        color: "#EDE8FD",
        accent: "#534AB7",
        badge: ["React", "TypeScript", "Tailwind CSS", "WebSocket client"],
    },
    render: {
        label: "Render",
        sub: "FastAPI (Python)",
        color: "#D6F5EC",
        accent: "#1D9E75",
        badge: ["感情分析 AI", "フェイク検知", "ハラスメント検知", "JWT 認証", "WebSocket server"],
    },
    supabase: {
        label: "Supabase",
        sub: "PostgreSQL",
        color: "#DDEEFF",
        accent: "#185FA5",
        badge: ["ユーザーデータ", "投稿データ", "Row Level Security"],
    },
};

const WS_COLOR = "#BA7517";
const WS_COLOR_LIGHT = "#FAEEDA";

export default function ArchitectureDiagram() {
    const [active, setActive] = useState<NodeKey | null>(null);
    const [dotOffsets, setDotOffsets] = useState<Record<string, number>>({});
    const rafRef = useRef<number | null>(null);
    const startRef = useRef<number | null>(null);

    useEffect(() => {
        const animate = (ts: number) => {
            if (!startRef.current) startRef.current = ts;
            const elapsed = (ts - startRef.current) / 1000;
            setDotOffsets({
                "user-vercel":        (elapsed * 55) % 88,
                "vercel-render-rest": (elapsed * 55 + 20) % 70,
                "vercel-render-ws":   (elapsed * 40 + 10) % 70,
                "render-supabase":    (elapsed * 55 + 40) % 46,
            });
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const o = dotOffsets;

    return (
        <section className="my-12">
            <div className="mb-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-xs uppercase tracking-widest text-gray-400">Architecture</span>
                <div className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="overflow-x-auto">
                    <svg
                        width="100%"
                        viewBox="0 0 680 440"
                        role="img"
                        aria-label="Connection App アーキテクチャ構成図"
                        className="min-w-[540px]"
                    >
                        <title>Connection App アーキテクチャ構成図</title>
                        <defs>
                            {(["purple", "teal", "blue", "amber"] as const).map((c) => {
                                const colors: Record<string, string> = {
                                    purple: "#534AB7", teal: "#1D9E75", blue: "#185FA5", amber: WS_COLOR,
                                };
                                return (
                                    <marker
                                        key={c}
                                        id={`arr-${c}`}
                                        viewBox="0 0 10 10"
                                        refX="8" refY="5"
                                        markerWidth="6" markerHeight="6"
                                        orient="auto"
                                    >
                                        <path d="M2 1L8 5L2 9" fill="none" stroke={colors[c]}
                                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </marker>
                                );
                            })}
                        </defs>

                        {/* ── User ── */}
                        <g className="cursor-pointer" onClick={() => setActive(null)}>
                            <rect x="14" y="150" width="106" height="68" rx="10"
                                  fill="#F1EFE8" stroke="#B4B2A9" strokeWidth="0.5" />
                            <circle cx="67" cy="170" r="8" fill="none" stroke="#5F5E5A" strokeWidth="1.4" />
                            <path d="M48 200 Q67 186 86 200" fill="none" stroke="#5F5E5A" strokeWidth="1.4" strokeLinecap="round" />
                            <text x="67" y="213" textAnchor="middle" fontSize="10" fill="#5F5E5A" fontFamily="sans-serif">ユーザー</text>
                        </g>

                        {/* ── HTTPS: user → vercel ── */}
                        <line x1="120" y1="178" x2="208" y2="178"
                              stroke="#534AB7" strokeWidth="1" strokeDasharray="6 4"
                              markerEnd="url(#arr-purple)" fill="none" />
                        <line x1="208" y1="190" x2="120" y2="190"
                              stroke="#534AB7" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.45"
                              markerEnd="url(#arr-purple)" fill="none" />
                        <text x="164" y="170" textAnchor="middle" fontSize="9" fill="#534AB7" fontFamily="sans-serif">HTTPS</text>
                        <circle cx={120 + Math.min(o["user-vercel"] ?? 0, 88)} cy="178" r="4" fill="#534AB7" opacity="0.9" />
                        <circle cx={208 - Math.min(o["user-vercel"] ?? 0, 88)} cy="190" r="3" fill="#534AB7" opacity="0.4" />

                        {/* ── REST API: vercel → render (upper lane) ── */}
                        <line x1="338" y1="165" x2="408" y2="165"
                              stroke="#1D9E75" strokeWidth="1" strokeDasharray="6 4"
                              markerEnd="url(#arr-teal)" fill="none" />
                        <line x1="408" y1="175" x2="338" y2="175"
                              stroke="#1D9E75" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.45"
                              markerEnd="url(#arr-teal)" fill="none" />
                        <text x="373" y="155" textAnchor="middle" fontSize="9" fill="#1D9E75" fontFamily="sans-serif">REST API</text>
                        <circle cx={338 + Math.min(o["vercel-render-rest"] ?? 0, 70)} cy="165" r="4" fill="#1D9E75" opacity="0.9" />
                        <circle cx={408 - Math.min(o["vercel-render-rest"] ?? 0, 70)} cy="175" r="3" fill="#1D9E75" opacity="0.4" />

                        {/* ── WebSocket: vercel ↔ render (lower lane) ── */}
                        <line x1="338" y1="200" x2="408" y2="200"
                              stroke={WS_COLOR} strokeWidth="1.4" strokeDasharray="3 3"
                              markerEnd="url(#arr-amber)" fill="none" />
                        <line x1="408" y1="212" x2="338" y2="212"
                              stroke={WS_COLOR} strokeWidth="1.4" strokeDasharray="3 3"
                              markerEnd="url(#arr-amber)" fill="none" />
                        {/* WS label badge */}
                        <rect x="348" y="216" width="52" height="14" rx="4" fill={WS_COLOR_LIGHT} />
                        <text x="374" y="226" textAnchor="middle" fontSize="9" fill={WS_COLOR}
                              fontFamily="sans-serif" fontWeight="600">WebSocket</text>
                        {/* both directions animate simultaneously */}
                        <circle cx={338 + Math.min(o["vercel-render-ws"] ?? 0, 70)} cy="200" r="4" fill={WS_COLOR} opacity="0.95" />
                        <circle cx={408 - Math.min(o["vercel-render-ws"] ?? 0, 70)} cy="212" r="4" fill={WS_COLOR} opacity="0.95" />

                        {/* ── SQL: render → supabase ── */}
                        <line x1="480" y1="262" x2="480" y2="308"
                              stroke="#185FA5" strokeWidth="1" strokeDasharray="6 4"
                              markerEnd="url(#arr-blue)" fill="none" />
                        <line x1="466" y1="308" x2="466" y2="262"
                              stroke="#185FA5" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.45"
                              markerEnd="url(#arr-blue)" fill="none" />
                        <text x="498" y="288" fontSize="9" fill="#185FA5" fontFamily="sans-serif">SQL</text>
                        <circle cx="480" cy={262 + Math.min(o["render-supabase"] ?? 0, 46)} r="4" fill="#185FA5" opacity="0.9" />
                        <circle cx="466" cy={308 - Math.min(o["render-supabase"] ?? 0, 46)} r="3" fill="#185FA5" opacity="0.4" />

                        {/* ── Vercel node ── */}
                        <g className="cursor-pointer" onClick={() => setActive(active === "vercel" ? null : "vercel")}>
                            <rect x="208" y="108" width="130" height="134" rx="12"
                                  fill={active === "vercel" ? "#C9C3F7" : "#EDE8FD"}
                                  stroke="#534AB7" strokeWidth={active === "vercel" ? 1.5 : 0.8}
                                  style={{ transition: "all 0.2s" }}
                            />
                            <text x="273" y="132" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3C3489" fontFamily="sans-serif">Vercel</text>
                            <text x="273" y="150" textAnchor="middle" fontSize="10" fill="#534AB7" fontFamily="sans-serif">Next.js (App Router)</text>
                            {["React / TypeScript", "Tailwind CSS", "WebSocket client"].map((b, i) => (
                                <g key={b}>
                                    <rect x="220" y={160 + i * 24} width="106" height="20" rx="5"
                                          fill={b === "WebSocket client" ? WS_COLOR : "#534AB7"}
                                          fillOpacity={b === "WebSocket client" ? 0.15 : 0.1}
                                    />
                                    <text x="273" y={174 + i * 24} textAnchor="middle" fontSize="10"
                                          fill={b === "WebSocket client" ? WS_COLOR : "#3C3489"}
                                          fontFamily="sans-serif"
                                          fontWeight={b === "WebSocket client" ? "600" : "400"}
                                    >{b}</text>
                                </g>
                            ))}
                            <text x="273" y="96" textAnchor="middle" fontSize="9" fill="#534AB7" fontFamily="sans-serif">▲ vercel.com</text>
                        </g>

                        {/* ── Render node ── */}
                        <g className="cursor-pointer" onClick={() => setActive(active === "render" ? null : "render")}>
                            <rect x="408" y="74" width="148" height="188" rx="12"
                                  fill={active === "render" ? "#A8E8D4" : "#D6F5EC"}
                                  stroke="#1D9E75" strokeWidth={active === "render" ? 1.5 : 0.8}
                                  style={{ transition: "all 0.2s" }}
                            />
                            <text x="482" y="100" textAnchor="middle" fontSize="13" fontWeight="600" fill="#085041" fontFamily="sans-serif">Render</text>
                            <text x="482" y="118" textAnchor="middle" fontSize="10" fill="#1D9E75" fontFamily="sans-serif">FastAPI (Python)</text>
                            {["感情分析 AI", "フェイク検知", "ハラスメント検知", "JWT 認証"].map((b, i) => (
                                <g key={b}>
                                    <rect x="420" y={130 + i * 24} width="128" height="20" rx="5" fill="#1D9E75" fillOpacity="0.12" />
                                    <text x="484" y={144 + i * 24} textAnchor="middle" fontSize="10" fill="#085041" fontFamily="sans-serif">{b}</text>
                                </g>
                            ))}
                            {/* WebSocket server badge */}
                            <rect x="420" y="226" width="128" height="20" rx="5" fill={WS_COLOR} fillOpacity="0.18" />
                            <text x="484" y="240" textAnchor="middle" fontSize="10" fill={WS_COLOR}
                                  fontFamily="sans-serif" fontWeight="600">WebSocket server</text>
                            <text x="482" y="62" textAnchor="middle" fontSize="9" fill="#1D9E75" fontFamily="sans-serif">● render.com</text>
                        </g>

                        {/* ── Supabase node ── */}
                        <g className="cursor-pointer" onClick={() => setActive(active === "supabase" ? null : "supabase")}>
                            <rect x="408" y="308" width="148" height="96" rx="12"
                                  fill={active === "supabase" ? "#AACFEE" : "#DDEEFF"}
                                  stroke="#185FA5" strokeWidth={active === "supabase" ? 1.5 : 0.8}
                                  style={{ transition: "all 0.2s" }}
                            />
                            <text x="482" y="334" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0C447C" fontFamily="sans-serif">Supabase</text>
                            <text x="482" y="352" textAnchor="middle" fontSize="10" fill="#185FA5" fontFamily="sans-serif">PostgreSQL</text>
                            <rect x="420" y="360" width="128" height="20" rx="5" fill="#185FA5" fillOpacity="0.12" />
                            <text x="484" y="374" textAnchor="middle" fontSize="10" fill="#0C447C" fontFamily="sans-serif">Row Level Security</text>
                            <text x="482" y="414" textAnchor="middle" fontSize="9" fill="#185FA5" fontFamily="sans-serif">◆ supabase.com</text>
                        </g>

                        {/* ── Legend ── */}
                        <g transform="translate(14, 316)">
                            <rect width="250" height="112" rx="8" fill="none" stroke="#D3D1C7" strokeWidth="0.5" />

                            <text x="10" y="18" fontSize="10" fill="#888780" fontFamily="sans-serif" fontWeight="500">凡例</text>

                            <line x1="10" y1="36" x2="38" y2="36" stroke="#534AB7" strokeWidth="1.5" strokeDasharray="6 4" />
                            <circle cx="10" cy="36" r="3.5" fill="#534AB7" />
                            <text x="46" y="40" fontSize="10" fill="#5F5E5A" fontFamily="sans-serif">HTTP リクエスト / レスポンス</text>

                            <line x1="10" y1="58" x2="38" y2="58" stroke={WS_COLOR} strokeWidth="1.5" strokeDasharray="3 3" />
                            <circle cx="10" cy="58" r="3.5" fill={WS_COLOR} />
                            <text x="46" y="62" fontSize="10" fill={WS_COLOR} fontFamily="sans-serif" fontWeight="600">WebSocket（双方向・常時接続）</text>

                            <line x1="10" y1="80" x2="38" y2="80" stroke="#185FA5" strokeWidth="1.5" strokeDasharray="6 4" />
                            <circle cx="10" cy="80" r="3.5" fill="#185FA5" />
                            <text x="46" y="84" fontSize="10" fill="#5F5E5A" fontFamily="sans-serif">SQL クエリ / 結果</text>

                            <text x="10" y="104" fontSize="9" fill="#B4B2A9" fontFamily="sans-serif">ノードをクリックで詳細表示</text>
                        </g>
                    </svg>
                </div>

                {/* Detail panel */}
                {active && (
                    <div
                        className="mt-4 rounded-xl border p-4 text-sm"
                        style={{ borderColor: nodes[active].accent, background: nodes[active].color }}
                    >
                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full" style={{ background: nodes[active].accent }} />
                            <span className="font-semibold" style={{ color: nodes[active].accent }}>
                {nodes[active].label}
              </span>
                            <span className="text-xs text-gray-500">{nodes[active].sub}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {nodes[active].badge.map((b) => (
                                <span
                                    key={b}
                                    className="rounded-md px-2 py-0.5 text-xs font-medium"
                                    style={{
                                        background: b.includes("WebSocket") ? WS_COLOR + "22" : nodes[active].accent + "22",
                                        color: b.includes("WebSocket") ? WS_COLOR : nodes[active].accent,
                                    }}
                                >
                  {b}
                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}