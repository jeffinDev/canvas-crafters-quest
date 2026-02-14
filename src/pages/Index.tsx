import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { IntroScreen } from "@/components/IntroScreen";
import { LoginScreen } from "@/components/LoginScreen";
import { MainContent } from "@/components/MainContent";

type AppState = "intro" | "login" | "main";

const Index = () => {
  const [state, setState] = useState<AppState>("intro");
  const [user, setUser] = useState<{ username: string; name: string } | null>(null);

  const handleIntroComplete = useCallback(() => setState("login"), []);

  const handleLogin = useCallback((u: { username: string; name: string }) => {
    setUser(u);
    setState("main");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {state === "intro" && <IntroScreen key="intro" onComplete={handleIntroComplete} />}
        {state === "login" && <LoginScreen key="login" onLogin={handleLogin} />}
        {state === "main" && user && <MainContent key="main" user={user} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
