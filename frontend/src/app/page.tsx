// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
      <div className="relative min-h-screen overflow-hidden bg-white">
        {/* 背景グリッド */}
        <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
        />
        {/* アクセントブロブ */}
        <div className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-indigo-100 opacity-50 blur-3xl" />
        <div className="absolute bottom-10 -left-10 h-48 w-48 rounded-full bg-emerald-100 opacity-40 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 py-10">
          {/* Nav */}
          <nav className="mb-14 flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <div className="h-2 w-2 rounded-full bg-indigo-600" />
              Connection-app
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">Beta</span>
          </nav>

          {/* Hero */}
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-emerald-600">次世代型SNSアプリ</p>
            <h1 className="mb-4 text-5xl font-bold leading-tight text-gray-900">
              つながりを、<span className="text-indigo-600">もっと安心に。</span>
            </h1>
            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-gray-500">
              AIによる感情分析・フェイクニュース検知・パワハラ検知を搭載した、安全でリアルなコミュニケーションプラットフォーム。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                  href="/login"
                  className="rounded-lg bg-indigo-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                ログインして始める
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {features.map((f) => (
                <div key={f.title} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg text-sm ${f.bg}`}>
                    {f.icon}
                  </div>
                  <h3 className="mb-1 text-sm font-medium text-gray-900">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-500">{f.desc}</p>
                </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs uppercase tracking-widest text-gray-400">Tech Stack</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          {/* 技術スタック */}
          <div className="mb-8 space-y-5">
            {stackCategories.map((cat) => (
                <div key={cat.label}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gray-400">{cat.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.tags.map((tag) => (
                        <span
                            key={tag}
                            className="flex items-center gap-1.5 rounded-md border border-gray-100 px-3 py-1.5 text-xs text-gray-700"
                        >
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
                          {tag}
                                    </span>
                    ))}
                  </div>
                </div>
            ))}
          </div>

          {/* GitHubリンク */}

         < a href="https://github.com/asamigentoku/Connection-app"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-10 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50"
          >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub でソースを見る
        </a>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">© 2026 Connection App · asamigentoku</p>
      </div>
</div>
);
}

const features = [
  { title: "感情分析", desc: "投稿の感情をAIが絵文字で可視化", bg: "bg-indigo-50", icon: "✦" },
  { title: "フェイク検知", desc: "デマの可能性がある投稿に警告表示", bg: "bg-red-50", icon: "⚠" },
  { title: "本人確認", desc: "JWT認証 + 検証済みバッジで安心", bg: "bg-emerald-50", icon: "✓" },
  { title: "ハラスメント検知", desc: "パワハラ・差別発言を自動検出", bg: "bg-amber-50", icon: "⚑" },
];

const stackCategories = [
  {
    label: "フロントエンド",
    color: "#534AB7",
    tags: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Figma"],
  },
  {
    label: "バックエンド",
    color: "#1D9E75",
    tags: ["Python", "FastAPI", "Ormar (ORM)", "JWT認証"],
  },
  {
    label: "データベース / インフラ",
    color: "#BA7517",
    tags: ["PostgreSQL", "Docker", "pnpm / uv"],
  },
  {
    label: "AI / 自然言語処理",
    color: "#A32D2D",
    tags: ["感情分析", "フェイクニュース検知", "パワハラ検知", "ユーザー推薦最適化"],
  },
];