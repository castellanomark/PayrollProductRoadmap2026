# 2026 Payroll Product Roadmap

An interactive roadmap application with drag-and-drop functionality, built with React, TypeScript, and Tailwind CSS.

## Features

- **Swim Lane Layout**: Categories organized as horizontal rows with PI (Planning Increment) columns
- **Drag & Drop**: Move cards between different PI columns and categories
- **CRUD Operations**: Create, edit, and delete roadmap items
- **Color-Coded Categories**: 
  - Payroll Data Foundation (Orange)
  - Deduction Code Configuration (Blue)
  - Pension Support (Green)
  - Tech Debt (Purple)
  - Small Enhancements (Gray)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd payroll-roadmap
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Deployment to GitHub Pages

1. Update the `base` property in `vite.config.ts` to match your repository name:
```typescript
base: '/your-repo-name/',
```

2. Build and deploy:
```bash
npm run deploy
```

This will build the app and deploy it to the `gh-pages` branch of your repository.

3. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Select `gh-pages` branch as the source
   - Your site will be published at `https://your-username.github.io/your-repo-name/`

## Built With

- React 18
- TypeScript
- Vite
- Tailwind CSS
- react-dnd (Drag and Drop)
- shadcn/ui components
- Lucide React (Icons)

## License

MIT
