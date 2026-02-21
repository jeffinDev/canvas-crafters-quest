import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, User, KeyRound } from "lucide-react";
import { users } from "@/data/courseData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginScreenProps {
  onLogin: (user: { username: string; name: string }) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setError(false);
      onLogin(user);
    } else {
      setError(true);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(258_90%_62%/0.08),transparent_60%)]" />

      <motion.div
        className="relative z-10 w-[90%] max-w-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground mb-1">
            Canveiro<span className="gradient-text"> Formado</span>
          </h1>
          <p className="text-muted-foreground text-sm">Acesse sua conta para continuar</p>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-2xl p-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Usuário</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(false); }}
                  placeholder="Digite seu usuário"
                  className="h-12 pl-10 rounded-xl bg-secondary/60 border-border text-sm focus:border-primary focus:ring-1 focus:ring-primary/30"
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Senha</label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(false); }}
                  placeholder="Digite sua senha"
                  className="h-12 pl-10 rounded-xl bg-secondary/60 border-border text-sm focus:border-primary focus:ring-1 focus:ring-primary/30"
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>
          </div>

          {error && (
            <motion.p
              className="mt-4 text-sm text-destructive font-medium text-center"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Usuário ou senha incorretos
            </motion.p>
          )}

          <Button
            onClick={handleLogin}
            className="w-full h-12 mt-6 rounded-xl gradient-bg text-primary-foreground font-semibold border-0 glow-sm hover:opacity-90 transition-all duration-300 text-sm"
          >
            Entrar <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Não tem acesso? Fale com{" "}
          <a href="https://instagram.com/jeffinvfx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            @jeffinvfx
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}
