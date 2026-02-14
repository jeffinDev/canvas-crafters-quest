# Canveiro Formado - Curso de Canva (Versão Melhorada)

## Visão Geral

Reconstruir o site do curso de Canva como uma aplicação React moderna, com visual impactante usando elementos 3D animados, seções de recursos úteis para designers e FAQ interativa.

## Funcionalidades

### 1. Tela de Intro Animada + Elemento 3D

- Splash screen com logo animado e barra de loading
- Personagem/objeto 3D flutuante usando React Three Fiber (ex: um cubo 3D com gradiente ou um boneco estilizado girando)
- Transição suave para a tela de login

### 2. Sistema de Login (sem backend)

- Login com usuários fixos no código (como está hoje)
- Visual moderno com inputs estilizados e animações
- Mensagem de erro elegante

### 3. Página Principal com Hero Section

- Título grande com gradiente roxo/rosa
- Elemento 3D decorativo flutuando ao lado do texto (esfera ou forma geométrica animada)
- Info do criador (Jefferson Souza / @jeffinvfx)
- Navbar fixa com avatar do usuário logado

### 4. Grade de 10 Aulas

- Cards com número da aula, título e descrição
- Botão "Assistir Aula" que abre modal de senha
- Modal para digitar senha antes de acessar o link do Google Drive
- Animações de hover nos cards

### 5. 🆕 Seção "Sites Úteis para Designers"

- Cards com links para ferramentas essenciais:
  - **Canva** (canva.com) - Plataforma principal do curso
  - **Unsplash / Pexels** - Bancos de imagens gratuitos
  - **Google Fonts** - Fontes gratuitas
  - **Coolors** - Gerador de paletas de cores
  - **Flaticon** - Ícones gratuitos
  - **Remove.bg** - Remover fundo de imagens
  - **Figma** - Design colaborativo
  - **Dribbble** - Inspiração de design
- Cada card com ícone, nome, descrição curta e link externo

### 6. 🆕 Seção de FAQ / Dúvidas Frequentes

- Accordion/sanfona interativa com perguntas e respostas:
  - "Como acessar as aulas?"
  - "Preciso pagar algo?"
  - "Como baixo o Canva?"
  - "Posso usar no celular?"
  - "Como entro em contato?"
  - E outras perguntas relevantes
- Visual limpo com animação de abrir/fechar

### 7. 🆕 Elementos 3D Decorativos

- Usar React Three Fiber (@react-three/fiber + @react-three/drei) para adicionar:
  - Formas 3D flutuantes no hero (esferas, torus, cubos com material gradiente)
  - Rotação automática suave e efeito de flutuação
  - Responsivo (menor em mobile, maior em desktop)

### 8. Footer

- Créditos do desenvolvedor
- Link para o Instagram @jeffinvfx
- Ano 2026

## Design & Estilo

- **Tema escuro** com gradientes roxo (#9C4DFF) e rosa (#FF4DE8)
- **Fonte Poppins** via Google Fonts (já disponível no Tailwind)
- Cards com glassmorphism sutil e bordas brilhantes
- Animações suaves de entrada e hover
- Totalmente responsivo (mobile-first)