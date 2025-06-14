# Weather App

A modern weather application built with React, Redux, and TypeScript.

## Features

- Real-time weather data
- Location-based weather information
- Responsive design
- Search history
- Clean and intuitive UI

## Technologies Used

- **React 18** - Modern React with hooks
- **Redux Toolkit** - State management
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Axios** - HTTP client for API requests
- **React Query** - Data fetching and caching

## Getting Started


### Installation

1. Clone the repository:
```bash
git clone <YOUR_REPOSITORY_URL>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run build:dev` - Build the project in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── WeatherApp.tsx  # Main weather app component
│   ├── WeatherCard.tsx # Weather display component
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── store/              # Redux store and slices
└── ...
```

## API Integration

This app uses the OpenWeatherMap API to fetch real-time weather data. 
