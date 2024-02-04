# React Todo/Tasks App

Simple todo/tasks application which is keyboard and screen reader accessible.

Demo: https://react-tasks-app-six.vercel.app/

## How the project was initially setup

1. Creating the project: https://vitejs.dev/guide/#scaffolding-your-first-vite-project
2. Intalling and configuring Tailwindcss: https://tailwindcss.com/docs/guides/vite

## Usage

1. Clone project `git clone https://github.com/amroczeK/react-tasks-app`
2. Install dependencies `npm install`
3. Run application `npm run dev`
4. Navigate to http://localhost:5173/

## Testing setup walk through

1. Install vitest dependencies `npm i --save-dev vitest @vitest/ui jsdom`
2. Install testing-library dependencies `npm i --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event`
3. Install types `npm i --save-dev @types/react @types/react-dom`
4. Add `/// <reference types="vitest" />` and `/// <reference types="vite/client" />` to vite.config.ts
5. Add `"types": ["vitest/globals"]` to tsconfig.json
