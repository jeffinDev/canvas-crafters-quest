import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Lock, ExternalLink, Instagram, BookOpen, Compass, HelpCircle } from "lucide-react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }),
};

function SectionHeader({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  return (
    <motion.div
      className="text-center mb-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
        {badge}
      </span>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">{title}</h2>
      <p className="text-muted-foreground max-w-md mx-auto text-sm">{subtitle}</p>
    </motion.div>
  );
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
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 glass-strong">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-lg">
            Canveiro<span className="gradient-text"> Formado</span>
          </span>
          <div className="flex items-center gap-2.5 bg-secondary/60 rounded-xl px-3 py-1.5 border border-border">
            <span className="text-xs font-medium text-muted-foreground hidden sm:block truncate max-w-[100px]">
              {user.name.split(" ")[0]}
            </span>
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
              {initials}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,hsl(258_90%_62%/0.08),transparent_60%)]" />
        <HeroScene />
        <div className="container mx-auto px-4 relative z-10 max-w-2xl">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
              <BookOpen size={12} /> Curso Completo
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-[1.1] tracking-tight">
              Domine o Canva <br />
              <span className="gradient-text">como um Profissional</span>
            </h1>

            <p className="text-muted-foreground text-base max-w-lg leading-relaxed">
              Do básico ao avançado — aprenda a criar designs incríveis, construir sua identidade visual e transformar criatividade em resultados.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Button
                onClick={() => document.getElementById("aulas")?.scrollIntoView({ behavior: "smooth" })}
                className="h-11 px-6 rounded-xl gradient-bg text-primary-foreground border-0 glow-sm hover:opacity-90 transition-all duration-300 font-medium text-sm"
              >
                <Play size={14} /> Começar Agora
              </Button>
              <a
                href="https://instagram.com/jeffinvfx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram size={16} /> @jeffinvfx
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lessons */}
      <section id="aulas" className="py-20 md:py-28 relative noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader badge="Aulas" title="Conteúdo do Curso" subtitle="10 aulas práticas do básico ao avançado em design gráfico" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((lesson, i) => (
              <motion.div
                key={i}
                className="group relative bg-card rounded-xl border border-border p-6 card-hover"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center font-display font-bold text-primary-foreground text-sm shrink-0 glow-sm">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-foreground text-sm leading-snug">{lesson.title}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground text-xs leading-relaxed mb-5 pl-14">{lesson.description}</p>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openLesson(lesson.videoLink)}
                  className="ml-14 h-9 rounded-lg border-border/60 text-xs font-medium hover:gradient-bg hover:text-primary-foreground hover:border-transparent transition-all duration-300"
                >
                  <Play size={12} /> Assistir Aula
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Useful Sites */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Recursos" title="Ferramentas para Designers" subtitle="Sites e ferramentas essenciais para turbinar seus projetos" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {usefulSites.map((site, i) => {
              const IconComp = (LucideIcons as any)[site.icon] || LucideIcons.Link;
              return (
                <motion.a
                  key={i}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-card rounded-xl border border-border p-4 card-hover no-underline"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <IconComp size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-medium text-foreground text-sm">{site.name}</h3>
                      <ExternalLink size={11} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-muted-foreground text-xs mt-0.5 truncate">{site.description}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 relative noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <SectionHeader badge="FAQ" title="Dúvidas Frequentes" subtitle="Tudo que você precisa saber sobre o curso" />
          
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border px-5 overflow-hidden data-[state=open]:border-primary/20 transition-colors"
              >
                <AccordionTrigger className="text-foreground font-medium text-sm hover:no-underline py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display font-semibold text-foreground text-sm mb-2">
            Canveiro<span className="gradient-text"> Formado</span>
          </p>
          <p className="text-muted-foreground text-xs">
            © 2026 — Desenvolvido por Jefferson Souza ·{" "}
            <a
              href="https://instagram.com/jeffinvfx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @jeffinvfx
            </a>
          </p>
        </div>
      </footer>

      {/* Password Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="glass-strong border-border rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold text-foreground">Acesso à Aula</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Digite a senha para acessar o conteúdo
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-1">
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                value={lessonPassword}
                onChange={e => { setLessonPassword(e.target.value); setPasswordError(false); }}
                placeholder="Senha da aula"
                className="h-12 pl-10 rounded-xl bg-secondary/60 border-border text-sm"
                onKeyDown={e => e.key === "Enter" && checkPassword()}
                autoFocus
              />
            </div>
            {passwordError && (
              <p className="text-destructive text-xs font-medium">Senha incorreta</p>
            )}
            <Button
              onClick={checkPassword}
              className="w-full h-11 rounded-xl gradient-bg text-primary-foreground font-medium border-0 hover:opacity-90 text-sm"
            >
              Acessar Aula
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
