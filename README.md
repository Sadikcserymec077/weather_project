# Weather Application - React

A modern, responsive weather application built with React, Vite, and WeatherAPI.com.

## Features

- **Real-Time Weather**: View current temperature, condition, humidity, wind, UV index, and more.
- **Forecasts**: 
  - **3-Day Forecast**: Daily summary with max/min temps and rain chances.
  - **24-Hour Forecast**: Hourly scrolling forecast with temperature and conditions.
- **Weather History**: Look up historical weather data for any date (dependent on API tier).
- **Interactive Map**: View the location on an embedded map.
- **Advanced Data**: 
  - **Air Quality**: Real-time AQI metrics (PM2.5, PM10, etc.).
  - **Astronomy**: Sunrise, sunset, moonrise, moonset, and moon phases.
  - **Weather Alerts**: view severe weather warnings.
- **Location Search**: Autocomplete search for cities worldwide.
- **Theme**: Beautiful glassmorphism UI with dynamic weather-based gradients and animations.
- **Responsive**: Fully optimized for desktop, tablet, and mobile.

## Technology Stack

- **Frontend**: React 18, Vite
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS (Variables, Flexbox, Grid, Animations)
- **State Management**: Context API (`WeatherContext`)
- **API**: [WeatherAPI.com](https://www.weatherapi.com/)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1.  Clone the repository or navigate to the project directory.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### API Key configuration

The application comes with a configured API key in `src/utils/api.js`.

If you experience API errors or limit reached messages, please sign up for a free key at [WeatherAPI.com](https://www.weatherapi.com/) and update the `API_KEY` constant in `src/utils/api.js`.

## Project Structure

- `src/components`: Reusable UI components (Navbar, CurrentWeather, etc.)
- `src/pages`: Page components (HomePage, HistoryPage, FeaturesPage)
- `src/context`: Global state management
- `src/utils`: API helpers and utility functions
- `src/hooks`: Custom hooks
