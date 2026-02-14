import { useState } from "react";
import { motion } from "framer-motion";
import { users } from "@/data/courseData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="glass rounded-3xl p-10 md:p-14 w-[90%] max-w-md text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold gradient-text mb-10">
          Canveiro Formado
        </h1>

        <div className="space-y-6 text-left">
          <div className="space-y-2">
            <Label className="text-foreground font-medium text-base">Usuário</Label>
            <Input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              className="h-14 rounded-xl bg-secondary/50 border-border text-base focus:border-primary focus:ring-primary"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground font-medium text-base">Senha</Label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="h-14 rounded-xl bg-secondary/50 border-border text-base focus:border-primary focus:ring-primary"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
          </div>
        </div>

        <Button
          onClick={handleLogin}
          className="w-full h-14 mt-8 rounded-xl text-lg font-semibold gradient-bg text-primary-foreground border-0 hover:opacity-90 glow-shadow transition-all duration-300 hover:-translate-y-1"
        >
          Entrar no Curso
        </Button>

        {error && (
          <motion.div
            className="mt-5 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive font-medium text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Usuário ou senha incorretos!
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
