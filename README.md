# ADmyBRAND Insights – AI-Powered Analytics Dashboard

A modern, visually stunning analytics dashboard for digital marketing agencies. Built with Next.js, shadcn/ui, Tailwind CSS, and Recharts.

---

## 🚀 Overview
ADmyBRAND Insights is a fictional analytics platform that provides real-time, interactive insights for marketing campaigns. The dashboard is designed for clarity, speed, and a beautiful user experience on any device.

---

## ✨ Features
- **Overview Page** with key metrics cards (Revenue, Users, Conversions, Growth %)
- **Interactive Charts**: Line, Bar, and Donut/Pie charts (accent color sync)
- **Data Table**: Sorting, filtering, pagination, CSV export
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Modern UI/UX**: Accent color picker, dark/light mode, smooth animations
- **Real-time Updates**: Simulated with intervals
- **Loading Skeletons**: For cards, charts, and tables
- **Profile Avatar**: Modern user representation

---

## 🛠 Tech Stack
- **Framework**: Next.js (App Router)
- **UI Library**: shadcn/ui, Tailwind CSS
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Mock Data**: Easily extensible for demo/testing

---

## 🖥️ Demo
![Dashboard Screenshot](./screenshot.png)

---

## 📦 Setup Instructions
1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/admybrand-insights.git
   cd admybrand-insights
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🎨 Customization
- **Accent Color:** Use the color picker in the header to instantly change the dashboard’s accent color.
- **Dark/Light Mode:** Toggle in the header for instant theme switching.
- **Profile Avatar:** Easily swap the demo image in `components/dashboard/header.tsx`.

---

## 🌟 Bonus Features
- Real-time metric/chart updates
- CSV export for table data
- Mobile swipe gestures for chart navigation
- Animated loading skeletons
- Accent color theming across all UI elements

---

## 📈 Extending the Dashboard
- Add PDF export, advanced filters, or onboarding tours for even more polish.
- Integrate with a real API for live data.
- Add user authentication and settings.

---

## 📄 License
MIT 