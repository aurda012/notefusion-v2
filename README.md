<div align="center">
  <br />
      <img src="https://raw.githubusercontent.com/aurda012/notefusion-v2/main/public/images/notefusion-banner.png" style="border-radius: 20px" alt="Project Banner">  
  <br />

  <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://shields.io/badge/supabase-black?logo=supabase&style=for-the-badge" alt="supabase" />
    <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white" alt="shieldio" />
    <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" alt="stripe" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">NoteFusion</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Assets & Code](#snippets)
6. 🚀 [More](#more)

## <a name="introduction">🤖 Introduction</a>

Built with the latest Next.js and TypeScript, NoteFusion is more than just a note-taking app - it's an innovative workspace that brings all your ideas, tasks, and notes together in one seamless interface. Discover the freedom to create, collaborate, and organize with unparalleled ease and efficiency.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Supabase
- Socket.io
- Stripe
- shadcn
- Tailwind CSS

## <a name="features">🔋 Features</a>

- 🤯 Real-time cursors
- 📝 Real-time text selection
- ⏱️ Real-time database and collaboration
- 🟢 Real-time presence
- 🗑️ Move to trash functionality
- 😜 Custom emoji picker
- 🌙 Light mode dark mode
- 🚨 Next.js 13 app router
- 🗺️ Creating free plan restrictions
- 💰 Take monthly payments
- 📧 Custom email 2FA invitation
- ⚡️ Supabase Row level policy
- 👨‍👨‍👧‍👦 Real-time Collaboration
- 👾 Deployment
- 🤑 Custom Rich text editor
- 📚 Update profile settings
- 📍 Manage payments in a portal
- 🔐 Custom Authentication
- ✳️ Websockets
- 📣 Optimistic UI
- 📱 Responsive design

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/aurda012/notefusion.git
cd notefusion
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SERVICE_ROLE_KEY=

NEXT_PUBLIC_SITE_URL=


NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Replace the placeholder values with your actual Clerk & getstream credentials. You can obtain these credentials by signing up with [Clerk](https://clerk.com/) and [GetStream](https://getstream.io/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>app/globals.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  height: 100%;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 224 71.4% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;
    --primary: 266, 100%, 50%;
    --primary-foreground: 210 20% 98%;
    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;
    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220.9 39.3% 11%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 262.1 83.3% 57.8%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 249 100% 3.9%;
    --foreground: 248 100% 88%;
    --card: 224 71.4% 4.1%;
    --card-foreground: 210 20% 98%;
    --popover: 224 71.4% 4.1%;
    --popover-foreground: 210 20% 98%;
    --primary: 266, 100%, 50%;
    --primary-foreground: 210 20% 98%;
    --secondary: 215 27.9% 16.9%;
    --secondary-foreground: 210 20% 98%;
    --muted: 215 27.9% 16.9%;
    --muted-foreground: 217.9 10.6% 30.9%;
    --accent: 215 27.9% 16.9%;
    --accent-foreground: 210 20% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 20% 98%;
    --border: 247, 18.3%, 18.2%;
    --input: 215 27.9% 16.9%;
    --ring: 263.4 70% 50.4%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

.animate-slide {
  animation: 15s slide linear infinite;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.ce-popover-item:hover {
  @apply bg-muted/40 transition-all !important;
}

.ce-popover--opened {
  @apply bg-card outline-none border-border dark:text-muted;
}

.ce-popover-item__icon {
  @apply dark:bg-background text-white font-medium shadow-none dark:border-[1px] !important;
}

.ce-popover-item__title {
  @apply dark:text-Neutrals/neutrals-7 font-normal;
}

.cdx-search-field {
  @apply bg-background;
}

.ce-toolbar__content,
.ce-block__content {
  max-width: 750px;
}

.editorFocus {
  @apply border-none outline-none;
}

/* .dotPattern {
  background-image: radial-gradient(rgb(25, 25, 25) 1px, transparent 1px);
  background-size: 30px 30px;
} */

.ql-toolbar::-webkit-scrollbar {
  display: none;
}

.ql-toolbar {
  @apply flex flex-wrap items-center justify-center dark:bg-background/70 bg-white/40 backdrop-blur-md z-40 sticky top-0 !border-none left-0 right-0;
}

.ql-formats {
  @apply flex flex-shrink-0;
}

.ql-container {
  @apply !border-none;
}

.ql-editor > p,
ol,
ul {
  @apply dark:text-washed-purple-700;
}
```

</details>

<details>
<summary><code>tailwind.config.ts</code></summary>

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "washed-blue-50": "#f0f3ff",
        "washed-blue-100": "#d0daff",
        "washed-blue-200": "#bac9ff",
        "washed-blue-300": "#9ab0ff",
        "washed-blue-400": "#86a1ff",
        "washed-blue-500": "#6889ff",
        "washed-blue-600": "#5f7de8",
        "washed-blue-700": "#4a61b5",
        "washed-blue-800": "#394b8c",
        "washed-blue-900": "#2c3a6b",
        "washed-purple-50": "#f8f7ff",
        "washed-purple-100": "#e8e7ff",
        "washed-purple-200": "#dddcff",
        "washed-purple-300": "#cecbff",
        "washed-purple-400": "#c5c1ff",
        "washed-purple-500": "#b6b2ff",
        "washed-purple-600": "#a6a2e8",
        "washed-purple-700": "#817eb5",
        "washed-purple-800": "#64628c",
        "washed-purple-900": "#4c4b6b",
        "primary-blue-50": "#e6f0ff",
        "primary-blue-100": "#b2d1ff",
        "primary-blue-200": "#8cbaff",
        "primary-blue-300": "#589bff",
        "primary-blue-400": "#3787ff",
        "primary-blue-500": "#0569ff",
        "primary-blue-600": "#0560e8",
        "primary-blue-700": "#044bb5",
        "primary-blue-800": "#033a8c",
        "primary-blue-900": "#022c6b",
        "primary-purple-50": "#f1e6ff",
        "primary-purple-100": "#d3b0ff",
        "primary-purple-200": "#bd8aff",
        "primary-purple-300": "#9f54ff",
        "primary-purple-400": "#8d33ff",
        "primary-purple-500": "#7000ff",
        "primary-purple-600": "#6600e8",
        "primary-purple-700": "#5000b5",
        "primary-purple-800": "#3e008c",
        "primary-purple-900": "#2f006b",
        "Neutrals/neutrals-1": "#ffffff",
        "Neutrals/neutrals-2": "#fcfcfd",
        "Neutrals/neutrals-3": "#f5f5f6",
        "Neutrals/neutrals-4": "#f0f0f1",
        "Neutrals/neutrals-5": "#d9d9dc",
        "Neutrals/neutrals-6": "#c0bfc4",
        "Neutrals/neutrals-7": "#8d8c95",
        "Neutrals/neutrals-8": "#5b5966",
        "Neutrals/neutrals-9": "#464553",
        "Neutrals/neutrals-10": "#282637",
        "Neutrals/neutrals-11": "#201f30",
        "Neutrals/neutrals-12": "#161427",
        "Neutrals/neutrals-13": "#020014",
        "brand-washedPurple": "#b5b2ff",
        "brand-washedBlue": "#6889ff",
        "brand-primaryBlue": "#0469ff",
        "brand-primaryPurple": "#7000ff",
        "brand-dark": "#030014",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

</details>
