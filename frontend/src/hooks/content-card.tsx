"use client"; // クライアントコンポーネントとして扱う

import { ReactNode } from "react";
import { AlertTriangle, ShieldAlert, AlertCircle, CheckCircle } from "lucide-react";
import { ModerationResult, getSentimentColor, getSentimentBadge } from "@utils/content-moderation";
import { useSettingsStore  } from "@lib/settings_context";
import { User } from "@data/mock-data";
export { api } from "@api/client";


interface ContentCardProps {
    children: ReactNode;
    moderationResult: ModerationResult;
    author?: User;
    className?: string;
    }
//ここではユーザーの検証情報が欲しい
export function ContentCard({ children, moderationResult, author, className = "" }: ContentCardProps) {
    const { safeMode, showSentimentAnalysis, showModerationFlags, showFakeNewsWarnings, showVerifiedBadges } = useSettingsStore();

    // セーフモードで有害なコンテンツをフィルタリング
    if (safeMode && moderationResult.toxicityLevel > 50) {
        return (
        <div className={`rounded-xl border-2 border-red-200 bg-red-50 p-6 ${className}`}>
            <div className="flex items-start gap-3">
            <ShieldAlert className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
                <div className="font-semibold text-red-900">このコンテンツは非表示になっています</div>
                <div className="text-sm text-red-700">
                不適切な内容が含まれている可能性があります。設定でセーフモードをオフにすると表示されます。
                </div>
            </div>
            </div>
        </div>
        );
    }

    const sentimentColor = showSentimentAnalysis ? getSentimentColor(moderationResult.sentiment) : "";

    return (
        <div className={`rounded-xl bg-white shadow-sm ${className}`}>
        {/* モデレーションフラグと警告 */}
        {showModerationFlags && moderationResult.flags.length > 0 && (
            <div className="border-b border-gray-100 p-4">
            <div className="flex flex-wrap gap-2">
                {moderationResult.isInappropriate && (
                <div className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    <AlertCircle className="h-3.5 w-3.5" />
                    不適切な表現
                </div>
                )}
                {moderationResult.isHarassment && (
                <div className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    パワハラの可能性
                </div>
                )}
                {moderationResult.isDiscriminatory && (
                <div className="flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                    <AlertCircle className="h-3.5 w-3.5" />
                    差別的表現
                </div>
                )}
            </div>
            </div>
        )}

        {/* デマ警告 */}
        {showFakeNewsWarnings && moderationResult.isPotentialFakeNews && (
            <div className="border-b border-amber-200 bg-amber-50 p-4">
            <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <div className="flex-1">
                <div className="font-semibold text-amber-900">要検証情報</div>
                <div className="text-sm text-amber-700">
                    この投稿には未確認の情報が含まれている可能性があります。
                    公式な情報源で確認することをおすすめします。
                </div>
                </div>
            </div>
            </div>
        )}

        {/* メインコンテンツ */}
        <div className={`border-2 ${sentimentColor} p-6`}>
            {/* 検証済みバッジとユーザー情報 */}
            {author && showVerifiedBadges && author.isVerified && (
            <div className="mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">デジタル署名検証済み</span>
            </div>
            )}

            {children}

            {/* 感情分析バッジ */}
            {showSentimentAnalysis && moderationResult.sentiment !== "neutral" && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <span>感情:</span>
                <span className="font-medium">{getSentimentBadge(moderationResult.sentiment)}</span>
            </div>
            )}
        </div>
        </div>
    );
}