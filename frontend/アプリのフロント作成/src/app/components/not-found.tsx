import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold text-gray-800">404</h1>
        <p className="mb-6 text-xl text-gray-600">ページが見つかりません</p>
        <Link
          to="/"
          className="inline-block rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-white shadow-md transition-all hover:shadow-lg"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}