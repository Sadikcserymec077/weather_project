import { useWeather } from '../context/WeatherContext';
import './HourlyForecast.css';

export default function HourlyForecast() {
    const { forecast, unit, loading } = useWeather();

    if (loading || !forecast) return null;

    const hours = forecast.forecast?.forecastday?.[0]?.hour || [];
    const currentHour = new Date().getHours();

    // Show remaining hours of today + some from tomorrow
    const todayHours = hours.filter((h) => {
        const hourNum = new Date(h.time).getHours();
        return hourNum >= currentHour;
    });

    const tomorrowHours = forecast.forecast?.forecastday?.[1]?.hour?.slice(0, 24 - todayHours.length) || [];
    const displayHours = [...todayHours, ...tomorrowHours].slice(0, 24);

    return (
        <section className="hourly-forecast fade-in-up stagger-3" id="hourly-section">
            <h2 className="section-title">
                <span className="section-title__icon">🕐</span>
                24-Hour Forecast
            </h2>
            <div className="hourly-forecast__scroll">
                {displayHours.map((hour, idx) => {
                    const time = new Date(hour.time);
                    const hourLabel = time.getHours() === currentHour && idx < todayHours.length
                        ? 'Now'
                        : time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
                    const temp = unit === 'C' ? hour.temp_c : hour.temp_f;

                    return (
                        <div
                            className={`hourly-card ${hourLabel === 'Now' ? 'hourly-card--now' : ''}`}
                            key={hour.time_epoch}
                            id={`hour-${idx}`}
                        >
                            <span className="hourly-card__time">{hourLabel}</span>
                            <img
                                className="hourly-card__icon"
                                src={`https:${hour.condition.icon}`}
                                alt={hour.condition.text}
                            />
                            <span className="hourly-card__temp">{Math.round(temp)}°</span>
                            <div className="hourly-card__rain">
                                <span className="hourly-card__rain-icon">💧</span>
                                <span>{hour.chance_of_rain}%</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
