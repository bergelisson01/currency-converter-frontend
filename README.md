# 💱 Currency Converter Frontend

This is the frontend application for the Currency Converter project, built with **React** and **TypeScript**. It interacts with a backend API to convert currency values and display recent transactions.

## 🚀 Tech Stack

- React 18
- TypeScript
- Axios
- TailwindCSS
- Cypress (E2E Testing)
- Vite (for fast development builds)

## 📦 Installation

```bash
cd frontend
npm install

## 🏃 Running the App

```bash
npm run dev
```
The app will start at: `http://localhost:3001`
> Make sure the backend API is running and accessible (default: `http://localhost:3000`).

## 🧪 Testing with Cypress

```bash
npx cypress open
```
Run E2E tests against a running backend.

## 🔍 Features

- Currency conversion form with API integration
- Shows converted amount and rate
- Lists recent transactions by `userId`
- Error handling and loading states