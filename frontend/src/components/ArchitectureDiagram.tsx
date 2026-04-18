"use client";

import { useEffect, useRef, useState } from "react";

type NodeKey = "vercel" | "render" | "supabase";

const nodes: Record<NodeKey, { label: string; sub: string; color: string; accent: string; badge: string[] }> = {
    vercel: {
        label: "Vercel",
        sub: "Next.js (App Router)",
        color: "#EDE8FD",
        accent: "#534AB7",
        badge: ["React", "TypeScript", "Tailwind CSS"],
    },
    render: {
        label: "Render",
        sub: "FastAPI (Python)",
        color: "#D6F5EC",
        accent: "#1D9E75",
        badge: ["感情分析 AI", "フェイク検知", "ハラスメント検知", "JWT 認証"],
    },
    supabase: {
        label: "Supabase",
        sub: "PostgreSQL",
        color: "#DDEEFF",
        accent: "#185FA5",
        badge: ["ユーザーデータ", "投稿データ", "Row Level Security"],
    },
};

const LINES = [
    {
        id: "user-vercel",
        x1: 75, y1: 160, x2: 215, y2: 160,
        color: "#534AB7",
        label: "HTTPS",
        labelX: 145, labelY: 150,
    },
    {
        id: "vercel-render",
        x1: 345, y1: 160, x2: 415, y2: 160,
        color: "#1D9E75",
        label: "REST API",
        labelX: 380, labelY: 150,
    },
    {
        id: "render-supabase",
        x1: 480, y1: 230, x2: 480, y2: 290,
        color: "#185FA5",
        label: "SQL",
        labelX: 488, labelY: 263,
    },
];

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
                "user-vercel": (elapsed * 60) % 140,
                "vercel-render": (elapsed * 60 + 30) % 130,
                "render-supabase": (elapsed * 60 + 60) % 60,
            });
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <section className="my-12">
            {/* Section header */}
            <div className="mb-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-xs uppercase tracking-widest text-gray-400">
          Architecture
        </span>
                <div className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                {/* SVG diagram */}
                <div className="overflow-x-auto">
                    <svg
                        width="100%"
                        viewBox="0 0 680 400"
                        role="img"
                        aria-label="Connection App アーキテクチャ構成図"
                        className="min-w-[520px]"
                    >
                        <title>Connection App アーキテクチャ構成図</title>
                        <defs>
                            <marker
                                id="arr-purple"
                                viewBox="0 0 10 10"
                                refX="8" refY="5"
                                markerWidth="6" markerHeight="6"
                                orient="auto"
                            >
                                <path d="M2 1L8 5L2 9" fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </marker>
                            <marker
                                id="arr-teal"
                                viewBox="0 0 10 10"
                                refX="8" refY="5"
                                markerWidth="6" markerHeight="6"
                                orient="auto"
                            >
                                <path d="M2 1L8 5L2 9" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </marker>
                            <marker
                                id="arr-blue"
                                viewBox="0 0 10 10"
                                refX="8" refY="5"
                                markerWidth="6" markerHeight="6"
                                orient="auto"
                            >
                                <path d="M2 1L8 5L2 9" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </marker>
                        </defs>

                        {/* ── User ── */}
                        <g
                            className="cursor-pointer"
                            onClick={() => setActive(null)}
                            aria-label="ユーザー"
                        >
                            <rect x="10" y="125" width="110" height="70" rx="10"
                                  fill="#F1EFE8" stroke="#B4B2A9" strokeWidth="0.5" />
                            {/* person icon */}
                            <circle cx="65" cy="146" r="9" fill="none" stroke="#5F5E5A" strokeWidth="1.5" />
                            <path d="M45 178 Q65 163 85 178" fill="none" stroke="#5F5E5A" strokeWidth="1.5" strokeLinecap="round" />
                            <text x="65" y="192" textAnchor="middle" fontSize="11" fill="#5F5E5A" fontFamily="sans-serif">
                                ユーザー
                            </text>
                        </g>

                        {/* ── Animated connector dots ── */}
                        {/* user→vercel */}
                        <line x1="120" y1="155" x2="210" y2="155"
                              stroke="#534AB7" strokeWidth="1" strokeDasharray="6 4"
                              markerEnd="url(#arr-purple)" fill="none" />
                        <line x1="210" y1="167" x2="120" y2="167"
                              stroke="#534AB7" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.5"
                              markerEnd="url(#arr-purple)" fill="none" />
                        <text x="165" y="148" textAnchor="middle" fontSize="10" fill="#534AB7" fontFamily="sans-serif">HTTPS</text>
                        <circle
                            cx={120 + (dotOffsets["user-vercel"] ?? 0)}
                            cy="155" r="4" fill="#534AB7" opacity="0.85"
                        />
                        <circle
                            cx={210 - (dotOffsets["user-vercel"] ?? 0)}
                            cy="167" r="3" fill="#534AB7" opacity="0.45"
                        />

                        {/* vercel→render */}
                        <line x1="340" y1="155" x2="410" y2="155"
                              stroke="#1D9E75" strokeWidth="1" strokeDasharray="6 4"
                              markerEnd="url(#arr-teal)" fill="none" />
                        <line x1="410" y1="167" x2="340" y2="167"
                              stroke="#1D9E75" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.5"
                              markerEnd="url(#arr-teal)" fill="none" />
                        <text x="375" y="148" textAnchor="middle" fontSize="10" fill="#1D9E75" fontFamily="sans-serif">REST API</text>
                        <circle
                            cx={340 + Math.min(dotOffsets["vercel-render"] ?? 0, 70)}
                            cy="155" r="4" fill="#1D9E75" opacity="0.85"
                        />
                        <circle
                            cx={410 - Math.min(dotOffsets["vercel-render"] ?? 0, 70)}
                            cy="167" r="3" fill="#1D9E75" opacity="0.45"
                        />

                        {/* render→supabase */}
                        <line x1="480" y1="232" x2="480" y2="290"
                              stroke="#185FA5" strokeWidth="1" strokeDasharray="6 4"
                              markerEnd="url(#arr-blue)" fill="none" />
                        <line x1="466" y1="290" x2="466" y2="232"
                              stroke="#185FA5" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.5"
                              markerEnd="url(#arr-blue)" fill="none" />
                        <text x="498" y="264" fontSize="10" fill="#185FA5" fontFamily="sans-serif">SQL</text>
                        <circle
                            cx="480"
                            cy={232 + Math.min(dotOffsets["render-supabase"] ?? 0, 58)}
                            r="4" fill="#185FA5" opacity="0.85"
                        />
                        <circle
                            cx="466"
                            cy={290 - Math.min(dotOffsets["render-supabase"] ?? 0, 58)}
                            r="3" fill="#185FA5" opacity="0.45"
                        />

                        {/* ── Vercel node ── */}
                        <g
                            className="cursor-pointer"
                            onClick={() => setActive(active === "vercel" ? null : "vercel")}
                            aria-label="Vercel / Next.js"
                        >
                            <rect x="210" y="100" width="130" height="120" rx="12"
                                  fill={active === "vercel" ? "#C9C3F7" : "#EDE8FD"}
                                  stroke="#534AB7" strokeWidth={active === "vercel" ? 1.5 : 0.8}
                                  style={{ transition: "all 0.2s" }}
                            />
                            <text x="275" y="126" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3C3489" fontFamily="sans-serif">Vercel</text>
                            <text x="275" y="144" textAnchor="middle" fontSize="10" fill="#534AB7" fontFamily="sans-serif">Next.js (App Router)</text>
                            <rect x="222" y="154" width="106" height="20" rx="5" fill="#534AB7" fillOpacity="0.1" />
                            <text x="275" y="168" textAnchor="middle" fontSize="10" fill="#3C3489" fontFamily="sans-serif">React / TypeScript</text>
                            <rect x="222" y="178" width="106" height="20" rx="5" fill="#534AB7" fillOpacity="0.1" />
                            <text x="275" y="192" textAnchor="middle" fontSize="10" fill="#3C3489" fontFamily="sans-serif">Tailwind CSS</text>
                            {/* deploy label */}
                            <text x="275" y="88" textAnchor="middle" fontSize="9" fill="#534AB7" fontFamily="sans-serif">▲ vercel.com</text>
                        </g>

                        {/* ── Render node ── */}
                        <g
                            className="cursor-pointer"
                            onClick={() => setActive(active === "render" ? null : "render")}
                            aria-label="Render / FastAPI"
                        >
                            <rect x="410" y="70" width="140" height="162" rx="12"
                                  fill={active === "render" ? "#A8E8D4" : "#D6F5EC"}
                                  stroke="#1D9E75" strokeWidth={active === "render" ? 1.5 : 0.8}
                                  style={{ transition: "all 0.2s" }}
                            />
                            <text x="480" y="96" textAnchor="middle" fontSize="13" fontWeight="600" fill="#085041" fontFamily="sans-serif">Render</text>
                            <text x="480" y="114" textAnchor="middle" fontSize="10" fill="#1D9E75" fontFamily="sans-serif">FastAPI (Python)</text>
                            {["感情分析 AI", "フェイク検知", "ハラスメント検知", "JWT 認証"].map((b, i) => (
                                <g key={b}>
                                    <rect x="422" y={126 + i * 24} width="116" height="20" rx="5" fill="#1D9E75" fillOpacity="0.12" />
                                    <text x="480" y={140 + i * 24} textAnchor="middle" fontSize="10" fill="#085041" fontFamily="sans-serif">{b}</text>
                                </g>
                            ))}
                            <text x="480" y="58" textAnchor="middle" fontSize="9" fill="#1D9E75" fontFamily="sans-serif">● render.com</text>
                        </g>

                        {/* ── Supabase node ── */}
                        <g
                            className="cursor-pointer"
                            onClick={() => setActive(active === "supabase" ? null : "supabase")}
                            aria-label="Supabase / PostgreSQL"
                        >
                            <rect x="410" y="290" width="140" height="90" rx="12"
                                  fill={active === "supabase" ? "#AACFEE" : "#DDEEFF"}
                                  stroke="#185FA5" strokeWidth={active === "supabase" ? 1.5 : 0.8}
                                  style={{ transition: "all 0.2s" }}
                            />
                            <text x="480" y="316" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0C447C" fontFamily="sans-serif">Supabase</text>
                            <text x="480" y="334" textAnchor="middle" fontSize="10" fill="#185FA5" fontFamily="sans-serif">PostgreSQL</text>
                            <rect x="422" y="342" width="116" height="20" rx="5" fill="#185FA5" fillOpacity="0.12" />
                            <text x="480" y="356" textAnchor="middle" fontSize="10" fill="#0C447C" fontFamily="sans-serif">Row Level Security</text>
                            <text x="480" y="394" textAnchor="middle" fontSize="9" fill="#185FA5" fontFamily="sans-serif">◆ supabase.com</text>
                        </g>

                        {/* ── Legend ── */}
                        <g transform="translate(20, 290)">
                            <rect width="130" height="88" rx="8" fill="none" stroke="#D3D1C7" strokeWidth="0.5" />
                            <text x="10" y="18" fontSize="10" fill="#888780" fontFamily="sans-serif" fontWeight="500">凡例</text>
                            <line x1="10" y1="34" x2="40" y2="34" stroke="#534AB7" strokeWidth="1.5" strokeDasharray="6 4" />
                            <circle cx="10" cy="34" r="3.5" fill="#534AB7" />
                            <text x="48" y="38" fontSize="10" fill="#5F5E5A" fontFamily="sans-serif">リクエスト</text>
                            <line x1="10" y1="54" x2="40" y2="54" stroke="#888780" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.6" />
                            <circle cx="10" cy="54" r="2.5" fill="#888780" opacity="0.6" />
                            <text x="48" y="58" fontSize="10" fill="#5F5E5A" fontFamily="sans-serif">レスポンス</text>
                            <text x="10" y="78" fontSize="10" fill="#888780" fontFamily="sans-serif">クリックで詳細表示</text>
                        </g>
                    </svg>
                </div>

                {/* Detail panel */}
                {active && (
                    <div
                        className="mt-4 rounded-xl border p-4 text-sm transition-all"
                        style={{
                            borderColor: nodes[active].accent,
                            background: nodes[active].color,
                        }}
                    >
                        <div className="mb-2 flex items-center gap-2">
              <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: nodes[active].accent }}
              />
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
                                        background: nodes[active].accent + "20",
                                        color: nodes[active].accent,
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