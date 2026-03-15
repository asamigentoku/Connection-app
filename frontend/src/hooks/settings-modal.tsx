"use client";

import { useSettingsStore } from "../lib/settings_context";
import { X, Shield, Smile, AlertTriangle, CheckCircle, ShieldCheck } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const {
    safeMode,
    showSentimentAnalysis,
    showModerationFlags,
    showFakeNewsWarnings,
    showVerifiedBadges,
    toggleSafeMode,
    toggleSentimentAnalysis,
    toggleModerationFlags,
    toggleFakeNewsWarnings,
    toggleVerifiedBadges,
  } = useSettingsStore();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">安全設定</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">

          {/* セーフモード */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                <Shield className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <div className="font-semibold text-gray-900">セーフモード</div>
                <div className="text-sm text-gray-500">
                  不適切なコンテンツを自動的にフィルタリング
                </div>
              </div>
            </div>

            <button
              onClick={toggleSafeMode}
              className={`relative h-8 w-14 rounded-full transition-colors ${
                safeMode ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                  safeMode ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* 感情分析 */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Smile className="h-5 w-5 text-purple-600" />
              </div>

              <div>
                <div className="font-semibold text-gray-900">感情分析表示</div>
                <div className="text-sm text-gray-500">
                  メッセージの感情を自動分析して表示
                </div>
              </div>
            </div>

            <button
              onClick={toggleSentimentAnalysis}
              className={`relative h-8 w-14 rounded-full transition-colors ${
                showSentimentAnalysis ? "bg-purple-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                  showSentimentAnalysis ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          

          {/* 以下同じ構造 */}
          {/* モデレーション */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <ShieldCheck className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">モデレーションフラグ</div>
                <div className="text-sm text-gray-500">不適切な表現やパワハラを検知</div>
              </div>
            </div>
            <button
              onClick={toggleModerationFlags}
              className={`relative h-8 w-14 rounded-full transition-colors ${
                showModerationFlags ? "bg-red-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                  showModerationFlags ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {/* デマ検知 */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">デマ検知警告</div>
                <div className="text-sm text-gray-500">偽情報の可能性がある投稿に警告を表示</div>
              </div>
            </div>
            <button
              onClick={toggleFakeNewsWarnings}
              className={`relative h-8 w-14 rounded-full transition-colors ${
                showFakeNewsWarnings ? "bg-amber-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                  showFakeNewsWarnings ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {/* 検証バッジ */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">検証済みバッジ</div>
                <div className="text-sm text-gray-500">デジタル署名検証済みユーザーの表示</div>
              </div>
            </div>
            <button
              onClick={toggleVerifiedBadges}
              className={`relative h-8 w-14 rounded-full transition-colors ${
                showVerifiedBadges ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                  showVerifiedBadges ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
        <div className="mt-6 rounded-xl bg-blue-50 p-4">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />

            <div className="text-sm text-blue-900">
              これらの機能は、コミュニティを安全に保つために自動的にコンテンツを分析します。
              不適切なコンテンツを発見した場合は、報告機能をご利用ください。
            </div>
          </div>
        </div>

      </div>
    </>
  );
}