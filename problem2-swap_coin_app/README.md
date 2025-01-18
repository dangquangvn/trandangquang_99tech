# Swapcoin App 💱

A modern cryptocurrency swap interface built with **React**, **TypeScript**, **TailwindCSS**, and **React Hook Form**. The app allows users to swap between different cryptocurrencies with real-time price updates and a sleek user interface.

## Demo

You can view the live version of the app here:

**[Live Demo](https://dangquangvn.github.io/swapcoin-app/)**

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Next Steps](#next-steps)

## Features

- 💱 **Real-time Crypto Prices**: Fetches current cryptocurrency prices from the Switcheo API
- 🔄 **Instant Swap**: Smooth cryptocurrency swapping interface
- ✨ **Modern UI**: Clean and responsive design with glassmorphism effects
- 📱 **Mobile-Responsive**: Works seamlessly across all devices
- 🔍 **Token Search**: Quick token search with filtering capabilities
- ⚡ **Live Conversion**: Real-time conversion rates between cryptocurrencies
- ✅ **Form Validation**: Robust form validation with Yup and React Hook Form
- 🌀 **Loading States**: Clear loading indicators for better UX
- 🎯 **Error Handling**: Comprehensive error handling with toast notifications

## Project Structure

Here is the folder structure for the project:

```
├── src
│   ├── api
│   │   └── crypto.api.ts      # API request to Switcheo
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

- **React**: UI library for building the interface
- **TypeScript**: For type safety and better development experience
- **TailwindCSS**: Utility-first CSS framework for styling
- **React Hook Form**: For form handling and validation
- **Yup**: Schema validation
- **Axios**: HTTP client for API requests
- **React Toastify**: Toast notifications
- **Web3Icons**: Cryptocurrency icons

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/dangquangvn/swapcoin-app.git
```

2. Navigate to the project directory:

### Next Steps

1. Add Testing: Implement unit tests with Jest and React Testing Library
2. Wallet Integration: Add support for connecting cryptocurrency wallets
3. Transaction History: Add a history of past swaps
4. Price Charts: Add price charts for tokens
5. Multiple Languages: Add i18n support
6. Dark Mode: Add theme switching capability
7. Gas Fee Estimation: Add estimated gas fees for transactions
8. Price Alerts: Add price alert functionality
9. Slippage Control: Add slippage tolerance settings
10. Trade Analytics: Add analytics for swap transactions
