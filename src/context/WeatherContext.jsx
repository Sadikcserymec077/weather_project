import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchCurrentWeather, fetchForecast, fetchAstronomy } from '../utils/api';

const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
    const [city, setCity] = useState(() => localStorage.getItem('weather_city') || null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [astronomy, setAstronomy] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [unit, setUnit] = useState(() => localStorage.getItem('weather_unit') || 'C'); // C or F
    const [recentCities, setRecentCities] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('weather_recent') || '[]');
        } catch {
            return [];
        }
    });

    const loadWeather = useCallback(async (query) => {
        setLoading(true);
        setError(null);
        try {
            const [currentData, forecastData, astroData] = await Promise.all([
                fetchCurrentWeather(query),
                fetchForecast(query, 3),
                fetchAstronomy(query),
            ]);

            // Check if currentData contains valid location info
            if (!currentData || !currentData.location) {
                throw new Error("Invalid weather data received");
            }

            setCurrentWeather(currentData);
            setForecast(forecastData);
            setAstronomy(astroData);

            // Update recent cities
            const cityName = currentData.location.name;
            setCity(cityName);
            localStorage.setItem('weather_city', cityName);

            setRecentCities((prev) => {
                const unique = prev.filter((c) => c !== cityName);
                const updated = [cityName, ...unique].slice(0, 8);
                localStorage.setItem('weather_recent', JSON.stringify(updated));
                return updated;
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const toggleUnit = useCallback(() => {
        setUnit((prev) => {
            const next = prev === 'C' ? 'F' : 'C';
            localStorage.setItem('weather_unit', next);
            return next;
        });
    }, []);

    // Load weather on mount
    useEffect(() => {
        if (city) {
            loadWeather(city);
        } else {
            // Try to get user's location
            if (navigator.geolocation) {
                setLoading(true);
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        loadWeather(`${latitude},${longitude}`);
                    },
                    (err) => {
                        console.warn("Geolocation denied or failed:", err);
                        loadWeather('Bangalore'); // Fallback default
                    }
                );
            } else {
                loadWeather('Bangalore'); // Fallback if no geolocation support
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const value = {
        city,
        currentWeather,
        forecast,
        astronomy,
        loading,
        error,
        unit,
        recentCities,
        loadWeather,
        toggleUnit,
    };

    return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

export function useWeather() {
    const ctx = useContext(WeatherContext);
    if (!ctx) throw new Error('useWeather must be used within WeatherProvider');
    return ctx;
}
