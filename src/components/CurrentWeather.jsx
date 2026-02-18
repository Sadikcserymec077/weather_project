import { useWeather } from '../context/WeatherContext';
import { getWeatherGradient, getWeatherEmoji } from '../utils/helpers';
import './CurrentWeather.css';

export default function CurrentWeather() {
    const { currentWeather, astronomy, unit, loading } = useWeather();

    if (loading || !currentWeather) return null;

    const { location, current } = currentWeather;
    const condCode = current.condition.code;
    const isDay = current.is_day;
    const gradient = getWeatherGradient(condCode, isDay);
    const emoji = getWeatherEmoji(condCode, isDay);
    const temp = unit === 'C' ? current.temp_c : current.temp_f;
    const feelsLike = unit === 'C' ? current.feelslike_c : current.feelslike_f;
    const astro = astronomy?.astronomy?.astro;

    return (
        <section className="current-weather fade-in-up" id="current-weather" style={{ background: gradient }}>
            <div className="current-weather__overlay">
                {/* Background decoration */}
                <div className="current-weather__orbs">
                    <div className="current-weather__orb current-weather__orb--1"></div>
                    <div className="current-weather__orb current-weather__orb--2"></div>
                    <div className="current-weather__orb current-weather__orb--3"></div>
                </div>

                <div className="current-weather__content">
                    <div className="current-weather__left">
                        <div className="current-weather__location">
                            <h2 className="current-weather__city">{location.name}</h2>
                            <p className="current-weather__region">{location.region}, {location.country}</p>
                            <p className="current-weather__time">{location.localtime}</p>
                        </div>

                        <div className="current-weather__temp-block">
                            <span className="current-weather__emoji">{emoji}</span>
                            <div className="current-weather__temp-info">
                                <span className="current-weather__temp">{Math.round(temp)}°</span>
                                <span className="current-weather__unit">{unit}</span>
                            </div>
                        </div>

                        <p className="current-weather__condition">{current.condition.text}</p>
                        <p className="current-weather__feels">Feels like {Math.round(feelsLike)}°{unit}</p>
                    </div>

                    <div className="current-weather__right">
                        <div className="current-weather__detail-grid">
                            <div className="current-weather__detail" id="humidity-detail">
                                <span className="current-weather__detail-icon">💧</span>
                                <div>
                                    <span className="current-weather__detail-value">{current.humidity}%</span>
                                    <span className="current-weather__detail-label">Humidity</span>
                                </div>
                            </div>
                            <div className="current-weather__detail" id="wind-detail">
                                <span className="current-weather__detail-icon">💨</span>
                                <div>
                                    <span className="current-weather__detail-value">{current.wind_kph} km/h</span>
                                    <span className="current-weather__detail-label">Wind {current.wind_dir}</span>
                                </div>
                            </div>
                            <div className="current-weather__detail" id="pressure-detail">
                                <span className="current-weather__detail-icon">🌡️</span>
                                <div>
                                    <span className="current-weather__detail-value">{current.pressure_mb} mb</span>
                                    <span className="current-weather__detail-label">Pressure</span>
                                </div>
                            </div>
                            <div className="current-weather__detail" id="visibility-detail">
                                <span className="current-weather__detail-icon">👁️</span>
                                <div>
                                    <span className="current-weather__detail-value">{current.vis_km} km</span>
                                    <span className="current-weather__detail-label">Visibility</span>
                                </div>
                            </div>
                            <div className="current-weather__detail" id="uv-detail">
                                <span className="current-weather__detail-icon">☀️</span>
                                <div>
                                    <span className="current-weather__detail-value">{current.uv}</span>
                                    <span className="current-weather__detail-label">UV Index</span>
                                </div>
                            </div>
                            <div className="current-weather__detail" id="cloud-detail">
                                <span className="current-weather__detail-icon">☁️</span>
                                <div>
                                    <span className="current-weather__detail-value">{current.cloud}%</span>
                                    <span className="current-weather__detail-label">Cloud Cover</span>
                                </div>
                            </div>
                        </div>

                        {astro && (
                            <div className="current-weather__astro">
                                <div className="current-weather__astro-item">
                                    <span>🌅</span>
                                    <span>Sunrise: {astro.sunrise}</span>
                                </div>
                                <div className="current-weather__astro-item">
                                    <span>🌇</span>
                                    <span>Sunset: {astro.sunset}</span>
                                </div>
                                <div className="current-weather__astro-item">
                                    <span>🌙</span>
                                    <span>{astro.moon_phase}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
