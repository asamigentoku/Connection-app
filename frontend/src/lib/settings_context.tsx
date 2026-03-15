import { create } from "zustand";
interface SettingsContextType {
    safeMode: boolean;
    showSentimentAnalysis: boolean;
    showModerationFlags: boolean;
    showFakeNewsWarnings: boolean;
    showVerifiedBadges: boolean;
    toggleSafeMode: () => void;
    toggleSentimentAnalysis: () => void;
    toggleModerationFlags: () => void;
    toggleFakeNewsWarnings: () => void;
    toggleVerifiedBadges: () => void;
}

export const useSettingsStore = create<SettingsContextType>((set) => ({
    //初期状態が記載されているので初期化はいらない
    safeMode: true,
    showSentimentAnalysis: true,
    showModerationFlags: true,
    showFakeNewsWarnings: true,
    showVerifiedBadges: true,
    // トグル関数
    toggleSafeMode: () => set((state) => ({ safeMode: !state.safeMode })),
    toggleSentimentAnalysis: () =>
        set((state) => ({ showSentimentAnalysis: !state.showSentimentAnalysis })),
    toggleModerationFlags: () =>
        set((state) => ({ showModerationFlags: !state.showModerationFlags })),
    toggleFakeNewsWarnings: () =>
        set((state) => ({ showFakeNewsWarnings: !state.showFakeNewsWarnings })),
    toggleVerifiedBadges: () =>
        set((state) => ({ showVerifiedBadges: !state.showVerifiedBadges })),
}));
