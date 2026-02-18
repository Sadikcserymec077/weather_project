import { useWeather } from '../context/WeatherContext';
import { getUVLabel, getAQILabel } from '../utils/helpers';
import './WeatherDetails.css';

export default function WeatherDetails() {
    const { currentWeather, unit, loading } = useWeather();

    if (loading || !currentWeather) return null;

    const { current } = currentWeather;
    const uvInfo = getUVLabel(current.uv);
    const aqiIndex = current.air_quality?.['us-epa-index'];
    const aqiInfo = getAQILabel(aqiIndex);
    const dewpoint = unit === 'C' ? current.dewpoint_c : current.dewpoint_f;

    return (
        <section className="weather-details fade-in-up stagger-4" id="details-section">
            <h2 className="section-title">
                <span className="section-title__icon">📊</span>
                Weather Details
            </h2>

            <div className="weather-details__grid">
                {/* Wind */}
                <div className="detail-card" id="wind-card">
                    <div className="detail-card__header">
                        <span className="detail-card__emoji">💨</span>
                        <span className="detail-card__title">Wind</span>
                    </div>
                    <div className="detail-card__body">
                        <div className="detail-card__compass">
                            <div className="detail-card__compass-ring">
                                <div
                                    className="detail-card__compass-arrow"
                                    style={{ transform: `rotate(${current.wind_degree}deg)` }}
                                >
                                    ↑
                                </div>
                            </div>
                            <span className="detail-card__compass-label">{current.wind_dir}</span>
                        </div>
                        <div className="detail-card__stats">
                            <div className="detail-card__stat">
                                <span className="detail-card__stat-value">{current.wind_kph}</span>
                                <span className="detail-card__stat-unit">km/h</span>
                            </div>
                            <div className="detail-card__stat">
                                <span className="detail-card__stat-label">Gust</span>
                                <span className="detail-card__stat-value">{current.gust_kph}</span>
                                <span className="detail-card__stat-unit">km/h</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* UV Index */}
                <div className="detail-card" id="uv-card">
                    <div className="detail-card__header">
                        <span className="detail-card__emoji">☀️</span>
                        <span className="detail-card__title">UV Index</span>
                    </div>
                    <div className="detail-card__body detail-card__body--center">
                        <div className="detail-card__uv-circle" style={{ borderColor: uvInfo.color }}>
                            <span className="detail-card__uv-value">{current.uv}</span>
                        </div>
                        <span className="detail-card__uv-label" style={{ color: uvInfo.color }}>{uvInfo.label}</span>
                        <div className="detail-card__uv-bar">
                            <div
                                className="detail-card__uv-fill"
                                style={{ width: `${Math.min((current.uv / 11) * 100, 100)}%`, background: uvInfo.color }}
                            />
                        </div>
                    </div>
                </div>

                {/* Air Quality */}
                <div className="detail-card" id="aqi-card">
                    <div className="detail-card__header">
                        <span className="detail-card__emoji">🌿</span>
                        <span className="detail-card__title">Air Quality</span>
                    </div>
                    <div className="detail-card__body detail-card__body--center">
                        <div className="detail-card__aqi-badge" style={{ background: aqiInfo.color }}>
                            {aqiIndex || '—'}
                        </div>
                        <span className="detail-card__aqi-label">{aqiInfo.label}</span>
                        {current.air_quality && (
                            <div className="detail-card__aqi-details">
                                <span>PM2.5: {current.air_quality.pm2_5?.toFixed(1)}</span>
                                <span>PM10: {current.air_quality.pm10?.toFixed(1)}</span>
                                <span>O₃: {current.air_quality.o3?.toFixed(1)}</span>
                                <span>CO: {current.air_quality.co?.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Humidity & Dew Point */}
                <div className="detail-card" id="humidity-card">
                    <div className="detail-card__header">
                        <span className="detail-card__emoji">💧</span>
                        <span className="detail-card__title">Humidity</span>
                    </div>
                    <div className="detail-card__body detail-card__body--center">
                        <div className="detail-card__humidity-ring">
                            <svg viewBox="0 0 100 100" className="detail-card__humidity-svg">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                                <circle
                                    cx="50" cy="50" r="40" fill="none"
                                    stroke="var(--color-accent-cool)"
                                    strokeWidth="8"
                                    strokeDasharray={`${(current.humidity / 100) * 251.2} 251.2`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                    className="detail-card__humidity-progress"
                                />
                                <text x="50" y="48" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">{current.humidity}%</text>
                                <text x="50" y="64" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Humidity</text>
                            </svg>
                        </div>
                        <div className="detail-card__stat">
                            <span className="detail-card__stat-label">Dew Point</span>
                            <span className="detail-card__stat-value">{Math.round(dewpoint)}°{unit}</span>
                        </div>
                    </div>
                </div>

                {/* Pressure */}
                <div className="detail-card" id="pressure-card">
                    <div className="detail-card__header">
                        <span className="detail-card__emoji">🌡️</span>
                        <span className="detail-card__title">Pressure</span>
                    </div>
                    <div className="detail-card__body detail-card__body--center">
                        <span className="detail-card__big-value">{current.pressure_mb}</span>
                        <span className="detail-card__big-unit">mb</span>
                        <span className="detail-card__secondary">{current.pressure_in} inHg</span>
                    </div>
                </div>

                {/* Visibility */}
                <div className="detail-card" id="visibility-card">
                    <div className="detail-card__header">
                        <span className="detail-card__emoji">👁️</span>
                        <span className="detail-card__title">Visibility</span>
                    </div>
                    <div className="detail-card__body detail-card__body--center">
                        <span className="detail-card__big-value">{current.vis_km}</span>
                        <span className="detail-card__big-unit">km</span>
                        <span className="detail-card__secondary">{current.vis_miles} miles</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
