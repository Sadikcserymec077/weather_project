import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchCurrentWeather, fetchForecast, fetchAstronomy } from '../utils/api';

const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
    const [city, setCity] = useState(() => localStorage.getItem('weather_city') || 'Bangalore');
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
            setCurrentWeather(currentData);
            setForecast(forecastData);
            setAstronomy(astroData);

            // Update recent cities
            const cityName = currentData.location.name;
            setCity(cityName);
            localStorage.setItem('weather_city', cityName);

            setRecentCities((prev) => {
                const updated = [cityName, ...prev.filter((c) => c !== cityName)].slice(0, 8);
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
        loadWeather(city);
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
