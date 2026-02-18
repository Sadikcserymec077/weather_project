import { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { fetchHistory } from '../utils/api';
import { getWeatherEmoji } from '../utils/helpers';
import './WeatherHistory.css';

export default function WeatherHistory() {
    const { city, unit } = useWeather();
    const [date, setDate] = useState('');
    const [historyData, setHistoryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchHistory = async () => {
        if (!date) return;
        setLoading(true);
        setError(null);
        try {
            const data = await fetchHistory(city, date);
            setHistoryData(data);
        } catch (err) {
            setError(err.message);
            setHistoryData(null);
        } finally {
            setLoading(false);
        }
    };

    const getMaxDate = () => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString().split('T')[0];
    };

    const day = historyData?.forecast?.forecastday?.[0];

    return (
        <section className="weather-history fade-in-up" id="history-section">
            <h2 className="section-title">
                <span className="section-title__icon">📜</span>
                Weather History
            </h2>

            <div className="weather-history__controls">
                <div className="weather-history__input-group">
                    <label className="weather-history__label">Select Date</label>
                    <input
                        type="date"
                        className="weather-history__date-input"
                        id="history-date-input"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        max={getMaxDate()}
                    />
                </div>
                <button
                    className="weather-history__btn"
                    id="fetch-history-btn"
                    onClick={handleFetchHistory}
                    disabled={!date || loading}
                >
                    {loading ? (
                        <span className="weather-history__spinner"></span>
                    ) : (
                        <>
                            <span>🔍</span> Fetch History
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="weather-history__error" id="history-error">
                    <span>⚠️</span> {error}
                </div>
            )}

            {day && (
                <div className="weather-history__result" id="history-result">
                    <div className="weather-history__hero">
                        <div className="weather-history__hero-left">
                            <span className="weather-history__hero-emoji">
                                {getWeatherEmoji(day.day.condition.code, true)}
                            </span>
                            <div>
                                <h3 className="weather-history__hero-date">{day.date}</h3>
                                <p className="weather-history__hero-condition">{day.day.condition.text}</p>
                            </div>
                        </div>
                        <div className="weather-history__hero-temps">
                            <div className="weather-history__hero-temp">
                                <span className="weather-history__temp-label">Max</span>
                                <span className="weather-history__temp-value weather-history__temp-value--max">
                                    {Math.round(unit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f)}°{unit}
                                </span>
                            </div>
                            <div className="weather-history__hero-temp">
                                <span className="weather-history__temp-label">Min</span>
                                <span className="weather-history__temp-value weather-history__temp-value--min">
                                    {Math.round(unit === 'C' ? day.day.mintemp_c : day.day.mintemp_f)}°{unit}
                                </span>
                            </div>
                            <div className="weather-history__hero-temp">
                                <span className="weather-history__temp-label">Avg</span>
                                <span className="weather-history__temp-value">
                                    {Math.round(unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f)}°{unit}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="weather-history__stats">
                        <div className="weather-history__stat">
                            <span className="weather-history__stat-icon">💧</span>
                            <span className="weather-history__stat-value">{day.day.avghumidity}%</span>
                            <span className="weather-history__stat-label">Humidity</span>
                        </div>
                        <div className="weather-history__stat">
                            <span className="weather-history__stat-icon">💨</span>
                            <span className="weather-history__stat-value">{day.day.maxwind_kph} km/h</span>
                            <span className="weather-history__stat-label">Max Wind</span>
                        </div>
                        <div className="weather-history__stat">
                            <span className="weather-history__stat-icon">🌧️</span>
                            <span className="weather-history__stat-value">{day.day.totalprecip_mm} mm</span>
                            <span className="weather-history__stat-label">Precipitation</span>
                        </div>
                        <div className="weather-history__stat">
                            <span className="weather-history__stat-icon">👁️</span>
                            <span className="weather-history__stat-value">{day.day.avgvis_km} km</span>
                            <span className="weather-history__stat-label">Visibility</span>
                        </div>
                        <div className="weather-history__stat">
                            <span className="weather-history__stat-icon">☀️</span>
                            <span className="weather-history__stat-value">{day.day.uv}</span>
                            <span className="weather-history__stat-label">UV Index</span>
                        </div>
                        <div className="weather-history__stat">
                            <span className="weather-history__stat-icon">❄️</span>
                            <span className="weather-history__stat-value">{day.day.totalsnow_cm} cm</span>
                            <span className="weather-history__stat-label">Snow</span>
                        </div>
                    </div>

                    {/* Hourly breakdown */}
                    <h3 className="weather-history__hourly-title">Hourly Breakdown</h3>
                    <div className="weather-history__hourly-scroll">
                        {day.hour.map((h, i) => {
                            const time = new Date(h.time);
                            const temp = unit === 'C' ? h.temp_c : h.temp_f;
                            return (
                                <div className="weather-history__hour-card" key={i}>
                                    <span className="weather-history__hour-time">
                                        {time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                                    </span>
                                    <img src={`https:${h.condition.icon}`} alt={h.condition.text} className="weather-history__hour-icon" />
                                    <span className="weather-history__hour-temp">{Math.round(temp)}°</span>
                                    <span className="weather-history__hour-rain">💧 {h.chance_of_rain}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {!historyData && !loading && !error && (
                <div className="weather-history__empty">
                    <span className="weather-history__empty-icon">📅</span>
                    <p>Select a date to view historical weather data for <strong>{city}</strong></p>
                </div>
            )}
        </section>
    );
}
