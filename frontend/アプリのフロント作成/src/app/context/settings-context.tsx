import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [safeMode, setSafeMode] = useState(true);
  const [showSentimentAnalysis, setShowSentimentAnalysis] = useState(true);
  const [showModerationFlags, setShowModerationFlags] = useState(true);
  const [showFakeNewsWarnings, setShowFakeNewsWarnings] = useState(true);
  const [showVerifiedBadges, setShowVerifiedBadges] = useState(true);

  useEffect(() => {
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSafeMode(settings.safeMode ?? true);
      setShowSentimentAnalysis(settings.showSentimentAnalysis ?? true);
      setShowModerationFlags(settings.showModerationFlags ?? true);
      setShowFakeNewsWarnings(settings.showFakeNewsWarnings ?? true);
      setShowVerifiedBadges(settings.showVerifiedBadges ?? true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "appSettings",
      JSON.stringify({
        safeMode,
        showSentimentAnalysis,
        showModerationFlags,
        showFakeNewsWarnings,
        showVerifiedBadges,
      })
    );
  }, [safeMode, showSentimentAnalysis, showModerationFlags, showFakeNewsWarnings, showVerifiedBadges]);

  return (
    <SettingsContext.Provider
      value={{
        safeMode,
        showSentimentAnalysis,
        showModerationFlags,
        showFakeNewsWarnings,
        showVerifiedBadges,
        toggleSafeMode: () => setSafeMode(!safeMode),
        toggleSentimentAnalysis: () => setShowSentimentAnalysis(!showSentimentAnalysis),
        toggleModerationFlags: () => setShowModerationFlags(!showModerationFlags),
        toggleFakeNewsWarnings: () => setShowFakeNewsWarnings(!showFakeNewsWarnings),
        toggleVerifiedBadges: () => setShowVerifiedBadges(!showVerifiedBadges),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
