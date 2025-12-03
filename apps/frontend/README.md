# QR Factorization Frontend

A modern, elegant frontend application for the QR Factorization system, built with Next.js 15, React 19, and Tailwind CSS.

## Features

- **Elegant Dark UI**: A sophisticated dark theme using a Zinc color palette, designed for clarity and visual appeal.
- **Interactive Matrix Input**: Dynamic matrix input component that allows resizing and easy data entry.
- **Real-time Results**: Displays QR factorization results (Q and R matrices) and calculated statistics.
- **Smooth Animations**: Powered by `framer-motion` for fluid transitions and engaging user interactions.
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop and mobile devices.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/              # App Router pages and layouts
│   ├── globals.css   # Global styles and theme definitions
│   └── page.tsx      # Main application page
├── components/       # Reusable UI components
│   ├── ui/           # Generic UI elements (Card, Button)
│   ├── MatrixInput.tsx
│   ├── ResultDisplay.tsx
│   └── LoadingSpinner.tsx
├── services/         # API integration services
└── types/            # TypeScript type definitions
```

## Environment Variables

Create a `.env.local` file in the root directory if you need to configure API endpoints (defaults to localhost).

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```
