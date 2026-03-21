# 🌦️ Premium Weather Dashboard

A sophisticated, highly interactive weather application built with **React**, **Vite**, and **Tailwind CSS**. This project demonstrates advanced frontend engineering skills, including complex animations, real-time API integration, and performance optimization.

---

## 🚀 Key Technical Highlights

### 🎨 Advanced UI/UX & Animations
- **Realistic Weather Effects**: Custom-built animations for **Snow, Rain, Storms, and Sun Rays** using **Framer Motion**.
- **Performance Optimized**: Achieved smooth 60fps animations by leveraging **GPU acceleration** (`will-change`, `translateZ(0)`) and optimizing SVG rendering paths.
- **Modern Design System**: Implemented a consistent **Glassmorphism** aesthetic with dynamic theme-switching between Light and Dark modes.

### 🔍 Intelligent Search System
- **Hierarchical Search**: A custom-designed search flow allowing users to filter by **Country** before selecting a **City**.
- **Dynamic Suggestions**: Integrates the OpenWeatherMap Geocoding API with logic to display popular cities, search history, and real-time suggestions.
- **Pinned Locations**: A persistent "Favorites" system using specialized hooks for quick access to frequently checked cities.

### 🏗️ Architecture & State Management
- **Context API**: Managed internationalization (i18n) and user favorites globally using React Context.
- **Custom Hooks**: Encapsulated complex logic for weather themes, API fetching, and local storage persistence into reusable hooks (`useWeatherTheme`, `useFavorites`, etc.).
- **Responsive Grid**: A complex multi-column layout that adapts seamlessly from mobile devices to large desktop screens.

---

## 🛠️ Tech Stack

- **Core**: React 18, Vite
- **Styling**: Tailwind CSS (Vanilla CSS for custom components)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Fetching**: Axios + OpenWeatherMap API
- **State**: React Context API
- **Persistence**: LocalStorage API

---

## 📦 Features

- [x] **Real-time Weather**: Current conditions, temperature, and atmospheric data.
- [x] **5-Day Forecast**: Detailed 3-hour interval data with visual trends.
- [x] **Multi-Language Support**: Full support for **English** and **Vietnamese**.
- [x] **Interactive Maps**: (Optional integration demonstrated in structure).
- [x] **Recent History**: Quick access to previously searched cities.
- [x] **Optimized for Recruiter Review**: Clean, modular code structure following best practices.

---

## ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   Create a `.env` file in the root and add your OpenWeatherMap API Key:
   ```env
   VITE_WEATHER_API_KEY=your_key_here
   ```
4. **Run development server**:
   ```bash
   npm run dev
   ```

---

## 👨‍💻 Developer Skills Demonstrated

- **Problem Solving**: Identifying and fixing performance bottlenecks in web animations.
- **API Integration**: Handling complex asynchronous data flows and error states.
- **Styling Proficiency**: Creating a premium feel using only modern CSS and Tailwind.
- **Attention to Detail**: Implementing micro-interactions (hover effects, scrollbars) that enhance user experience.
