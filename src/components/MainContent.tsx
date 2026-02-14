import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Lock, ExternalLink, Instagram, ChevronDown } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { HeroScene } from "./Scene3D";
import { lessons, usefulSites, faqItems } from "@/data/courseData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MainContentProps {
  user: { username: string; name: string };
}

export function MainContent({ user }: MainContentProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState("");
  const [lessonPassword, setLessonPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const openLesson = (videoLink: string) => {
    setCurrentLink(videoLink);
    setLessonPassword("");
    setPasswordError(false);
    setModalOpen(true);
  };

  const checkPassword = () => {
    if (lessonPassword === "jeff1932") {
      window.open(currentLink, "_blank");
      setModalOpen(false);
    } else {
      setPasswordError(true);
    }
  };

  const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold">
              <span className="gradient-text">Canveiro</span>
              <span className="text-foreground">Formado</span>
            </span>
          </div>
          <div className="flex items-center gap-3 glass rounded-xl px-3 py-2">
            <span className="text-sm font-medium text-foreground hidden sm:block truncate max-w-[120px]">
              Olá, {user.name.split(" ")[0]}
            </span>
            <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-primary-foreground glow-shadow shrink-0">
              {initials}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,hsl(270_100%_65%/0.12),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(312_100%_64%/0.08),transparent_50%)]" />
        </div>
        <HeroScene />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold gradient-text mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Domine o Canva como um Profissional
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Curso completo do básico ao avançado para criar designs incríveis e transformar sua criatividade
          </motion.p>

          <motion.div
            className="glass rounded-2xl p-6 max-w-md mx-auto flex items-center gap-5 mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full gradient-bg flex items-center justify-center text-2xl md:text-3xl glow-shadow shrink-0">
              🎨
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-foreground">Jefferson Souza</h3>
              <a
                href="https://instagram.com/jeffinvfx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:text-accent transition-colors text-sm font-medium"
              >
                <Instagram size={16} /> @jeffinvfx
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={() => document.getElementById("aulas")?.scrollIntoView({ behavior: "smooth" })}
              className="h-14 px-10 rounded-xl text-lg font-semibold gradient-bg text-primary-foreground border-0 glow-shadow hover:opacity-90 transition-all duration-300 hover:-translate-y-1"
            >
              <Play size={20} /> Começar Agora
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Lessons */}
      <section id="aulas" className="py-20 md:py-28 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mb-4">Conteúdo do Curso</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              10 aulas práticas para você se tornar um expert em Canva
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, i) => (
              <motion.div
                key={i}
                className="glass rounded-2xl p-7 relative overflow-hidden group transition-all duration-300 hover:-translate-y-3 glow-shadow-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 gradient-bg" />
                <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center font-bold text-primary-foreground text-lg mb-5 glow-shadow">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{lesson.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{lesson.description}</p>
                <Button
                  variant="outline"
                  onClick={() => openLesson(lesson.videoLink)}
                  className="w-full h-12 rounded-xl border-border/50 hover:gradient-bg hover:text-primary-foreground hover:border-transparent transition-all duration-300 font-semibold"
                >
                  <Play size={16} /> Assistir Aula
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Useful Sites */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mb-4">Sites Úteis para Designers</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Ferramentas essenciais para turbinar seus projetos de design
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {usefulSites.map((site, i) => {
              const IconComp = (LucideIcons as any)[site.icon] || LucideIcons.Link;
              return (
                <motion.a
                  key={i}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-6 flex items-start gap-4 group transition-all duration-300 hover:-translate-y-2 glow-shadow-hover no-underline"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0 glow-shadow">
                    <IconComp size={22} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{site.name}</h3>
                      <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-muted-foreground text-sm">{site.description}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mb-4">Dúvidas Frequentes</h2>
            <p className="text-muted-foreground text-lg">
              Tudo que você precisa saber sobre o curso
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass rounded-xl border-0 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-foreground font-medium text-base md:text-lg hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border text-center">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground text-sm mb-2">
            © 2026 Canveiro Formado - Todos os direitos reservados
          </p>
          <p className="text-muted-foreground text-sm">
            Desenvolvido por Jefferson Souza |{" "}
            <a
              href="https://instagram.com/jeffinvfx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors"
            >
              @jeffinvfx
            </a>
          </p>
        </div>
      </footer>

      {/* Password Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="glass border-border rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="gradient-text text-xl font-bold">Acesso à Aula</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Digite a senha para acessar o conteúdo desta aula
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                value={lessonPassword}
                onChange={e => { setLessonPassword(e.target.value); setPasswordError(false); }}
                placeholder="Senha da aula"
                className="h-14 pl-12 rounded-xl bg-secondary/50 border-border text-base"
                onKeyDown={e => e.key === "Enter" && checkPassword()}
                autoFocus
              />
            </div>
            {passwordError && (
              <p className="text-destructive text-sm font-medium">Senha incorreta! Tente novamente.</p>
            )}
            <Button
              onClick={checkPassword}
              className="w-full h-12 rounded-xl gradient-bg text-primary-foreground font-semibold border-0 hover:opacity-90"
            >
              Acessar Aula
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
