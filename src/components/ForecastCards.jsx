import { useWeather } from '../context/WeatherContext';
import { getWeatherEmoji, formatDayShort } from '../utils/helpers';
import './ForecastCards.css';

export default function ForecastCards() {
    const { forecast, unit, loading } = useWeather();

    if (loading || !forecast) return null;

    const days = forecast.forecast?.forecastday || [];

    return (
        <section className="forecast-cards fade-in-up stagger-2" id="forecast-section">
            <h2 className="section-title">
                <span className="section-title__icon">📅</span>
                3-Day Forecast
            </h2>
            <div className="forecast-cards__grid">
                {days.map((day, idx) => {
                    const maxTemp = unit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f;
                    const minTemp = unit === 'C' ? day.day.mintemp_c : day.day.mintemp_f;
                    const emoji = getWeatherEmoji(day.day.condition.code, true);
                    const isToday = idx === 0;

                    return (
                        <div
                            className={`forecast-card ${isToday ? 'forecast-card--today' : ''}`}
                            key={day.date}
                            id={`forecast-day-${idx}`}
                        >
                            <div className="forecast-card__day">
                                {isToday ? 'Today' : formatDayShort(day.date)}
                            </div>
                            <div className="forecast-card__date">{day.date}</div>
                            <div className="forecast-card__emoji">{emoji}</div>
                            <img
                                className="forecast-card__icon"
                                src={`https:${day.day.condition.icon}`}
                                alt={day.day.condition.text}
                            />
                            <div className="forecast-card__condition">{day.day.condition.text}</div>
                            <div className="forecast-card__temps">
                                <span className="forecast-card__max">{Math.round(maxTemp)}°</span>
                                <span className="forecast-card__divider">/</span>
                                <span className="forecast-card__min">{Math.round(minTemp)}°</span>
                            </div>
                            <div className="forecast-card__details">
                                <div className="forecast-card__mini">
                                    <span>💧</span> {day.day.avghumidity}%
                                </div>
                                <div className="forecast-card__mini">
                                    <span>💨</span> {day.day.maxwind_kph} km/h
                                </div>
                                <div className="forecast-card__mini">
                                    <span>🌧️</span> {day.day.daily_chance_of_rain}%
                                </div>
                                <div className="forecast-card__mini">
                                    <span>☀️</span> UV {day.day.uv}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
