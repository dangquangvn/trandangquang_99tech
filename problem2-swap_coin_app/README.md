# Weather App 🌤️

A fully responsive, modern weather application built with **React**, **TypeScript**, **TailwindCSS**, **Framer Motion**, and **AOS.js** for smooth animations and transitions. The app uses the **OpenWeatherMap API** to fetch real-time weather data for different cities, and it includes features like search history, theme switching (dark/light mode), and a mobile-friendly design.

## Demo

You can view the live version of the app here:

**[Live Demo](https://dangquangvn.github.io/weather-app/)**

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Next Steps](#next-steps)

## Features

- 🌍 **Real-time Weather Data**: Fetches the current weather for any city using the OpenWeatherMap API.
- 🔍 **Search History**: Keeps track of previous city searches with smooth animations and allows users to re-fetch data.
- 🎨 **Theme Switcher**: Toggle between dark and light mode.
- 📱 **Mobile-Responsive**: Fully responsive design to work seamlessly across all devices.
- 🚀 **Smooth Animations**: Transitions and animations are handled using **Framer Motion** and **AOS.js** for a modern UI experience.
- 💾 **Local Storage Integration**: Saves search history to `localStorage`, so the data persists even after page reloads.
- 🌀 **Loading Spinner**: Displays a loading spinner while fetching data from the API.
- **🔄 Debounce Input**: Prevents user spam by debouncing the search input, ensuring that API calls are only made after the user has finished typing, reducing unnecessary requests.

## Project Structure

Here is the folder structure for the project:

```
├── public
│   ├── index.html             # The main HTML file
│   └── assets                 # Images (backgrounds, icons)
│       ├── bg-light.png
│       ├── bg-dark.png
├── src
│   ├── api
│   │   └── weather.api.ts      # API request to OpenWeatherMap
│   ├── components
│   │   ├── SearchBar.tsx       # Search input component
│   │   ├── WeatherDisplay.tsx  # Displays weather data
│   │   ├── SearchHistory.tsx   # Displays search history with animations
│   │   ├── HistoryItem.tsx     # Displays history
│   │   ├── ThemeSwitcher.tsx   # Toggle between light/dark modes
│   │   └── LoadingSpinner.tsx  # Spinner while fetching data
│   ├── hooks
│   │   └── useSearch.ts        # Custom hook for managing search and history logic
│   ├── utils
│   │   └── localStorageUtil.ts # Utility for interacting with localStorage
│   ├── App.tsx                 # Main App component
│   ├── main.tsx                # React entry point
```

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Adds type safety to JavaScript, helping to prevent bugs.
- **TailwindCSS**: A utility-first CSS framework for building custom designs without writing CSS.
- **Framer Motion**: A library for animations and transitions in React.
- **AOS (Animate On Scroll)**: Provides animations that trigger when elements scroll into view.
- **OpenWeatherMap API**: Provides real-time weather data.
- **LocalStorage**: Used to store search history on the client.

## Getting Started

Follow the instructions below to get a copy of the project running on your local machine.

### Prerequisites

Ensure you have the following tools installed on your development machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/weather-app.git
```

2. Navigate into the project directory:

```sh
cd weather-app
```

3. Install the dependencies:

```sh
npm install
# OR
yarn install
```

4. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

```sh
REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key
```

5. Run the development server:

```sh
npm run dev
# OR
yarn dev
```

6. Open your browser and visit `http://localhost:3000` to see the app in action.

## Next Steps

Here are a few recommendations for future improvements:

1. **Add Unit Tests**: Use **Jest** or **React Testing Library** to ensure the components and functions behave correctly.
2. **Enhance Error Handling**: Currently, error handling is basic (e.g., showing a toast). Consider adding more detailed error messages or fallbacks.
3. **Optimize API Requests**: Use caching for weather data to reduce unnecessary API requests, or use a library like `react-query` for better data fetching.
4. **Internationalization (i18n)**: Add support for multiple languages using libraries like **react-i18next**.
5. **Persistent Data with Database**: Store search history in a database (e.g., **MongoDB**, **PostgreSQL**) for cross-device access.
6. **Pagination**: Implement pagination or infinite scroll for large search histories to improve performance.
7. **Visual Representation**: Use charts (e.g., **Chart.js**) to display weather data trends and enhance large list views.
