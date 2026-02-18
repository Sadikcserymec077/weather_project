import { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { fetchAstronomy, fetchTimezone, searchLocations } from '../utils/api';
import './FeaturesPage.css';

export default function FeaturesPage() {
    const { city, currentWeather, forecast, astronomy, unit } = useWeather();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    const [astroCity, setAstroCity] = useState('');
    const [astroDate, setAstroDate] = useState('');
    const [astroData, setAstroData] = useState(null);
    const [astroLoading, setAstroLoading] = useState(false);

    const [tzCity, setTzCity] = useState('');
    const [tzData, setTzData] = useState(null);
    const [tzLoading, setTzLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setSearchLoading(true);
        try {
            const results = await searchLocations(searchQuery);
            setSearchResults(results);
        } catch {
            setSearchResults([]);
        }
        setSearchLoading(false);
    };

    const handleAstro = async () => {
        if (!astroCity.trim()) return;
        setAstroLoading(true);
        try {
            const data = await fetchAstronomy(astroCity, astroDate || undefined);
            setAstroData(data);
        } catch {
            setAstroData(null);
        }
        setAstroLoading(false);
    };

    const handleTimezone = async () => {
        if (!tzCity.trim()) return;
        setTzLoading(true);
        try {
            const data = await fetchTimezone(tzCity);
            setTzData(data);
        } catch {
            setTzData(null);
        }
        setTzLoading(false);
    };

    const current = currentWeather?.current;
    const astro = astronomy?.astronomy?.astro;
    const alerts = forecast?.alerts?.alert || [];

    return (
        <div className="features-page" id="features-page">
            <div className="features-page__header fade-in-up">
                <h1 className="features-page__title">🌐 All Weather Features</h1>
                <p className="features-page__subtitle">
                    Explore all available features from the Weather API for <strong>{city}</strong>
                </p>
            </div>

            {/* Current Weather Summary */}
            {current && (
                <section className="feature-section fade-in-up stagger-1" id="feature-current">
                    <h2 className="feature-section__title">
                        <span>🌡️</span> Current Weather Summary
                    </h2>
                    <div className="feature-grid feature-grid--4">
                        <div className="feature-stat">
                            <span className="feature-stat__label">Temperature</span>
                            <span className="feature-stat__value">{unit === 'C' ? current.temp_c : current.temp_f}°{unit}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Feels Like</span>
                            <span className="feature-stat__value">{unit === 'C' ? current.feelslike_c : current.feelslike_f}°{unit}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Humidity</span>
                            <span className="feature-stat__value">{current.humidity}%</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Cloud Cover</span>
                            <span className="feature-stat__value">{current.cloud}%</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Wind</span>
                            <span className="feature-stat__value">{current.wind_kph} km/h {current.wind_dir}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Wind Gust</span>
                            <span className="feature-stat__value">{current.gust_kph} km/h</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Pressure</span>
                            <span className="feature-stat__value">{current.pressure_mb} mb</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Precipitation</span>
                            <span className="feature-stat__value">{current.precip_mm} mm</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">UV Index</span>
                            <span className="feature-stat__value">{current.uv}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Visibility</span>
                            <span className="feature-stat__value">{current.vis_km} km</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Dew Point</span>
                            <span className="feature-stat__value">{unit === 'C' ? current.dewpoint_c : current.dewpoint_f}°{unit}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Heat Index</span>
                            <span className="feature-stat__value">{unit === 'C' ? current.heatindex_c : current.heatindex_f}°{unit}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Wind Chill</span>
                            <span className="feature-stat__value">{unit === 'C' ? current.windchill_c : current.windchill_f}°{unit}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Condition</span>
                            <span className="feature-stat__value">{current.condition.text}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Is Day</span>
                            <span className="feature-stat__value">{current.is_day ? 'Yes ☀️' : 'No 🌙'}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Last Updated</span>
                            <span className="feature-stat__value">{current.last_updated}</span>
                        </div>
                    </div>
                </section>
            )}

            {/* Air Quality */}
            {current?.air_quality && (
                <section className="feature-section fade-in-up stagger-2" id="feature-aqi">
                    <h2 className="feature-section__title">
                        <span>🌿</span> Air Quality Index
                    </h2>
                    <div className="feature-grid feature-grid--4">
                        <div className="feature-stat">
                            <span className="feature-stat__label">US EPA Index</span>
                            <span className="feature-stat__value">{current.air_quality['us-epa-index']}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">GB DEFRA Index</span>
                            <span className="feature-stat__value">{current.air_quality['gb-defra-index']}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">CO</span>
                            <span className="feature-stat__value">{current.air_quality.co?.toFixed(2)} μg/m³</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">NO₂</span>
                            <span className="feature-stat__value">{current.air_quality.no2?.toFixed(2)} μg/m³</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">O₃</span>
                            <span className="feature-stat__value">{current.air_quality.o3?.toFixed(2)} μg/m³</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">SO₂</span>
                            <span className="feature-stat__value">{current.air_quality.so2?.toFixed(2)} μg/m³</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">PM 2.5</span>
                            <span className="feature-stat__value">{current.air_quality.pm2_5?.toFixed(2)} μg/m³</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">PM 10</span>
                            <span className="feature-stat__value">{current.air_quality.pm10?.toFixed(2)} μg/m³</span>
                        </div>
                    </div>
                </section>
            )}

            {/* Astronomy */}
            {astro && (
                <section className="feature-section fade-in-up stagger-3" id="feature-astronomy">
                    <h2 className="feature-section__title">
                        <span>🌌</span> Astronomy Data
                    </h2>
                    <div className="feature-grid feature-grid--3">
                        <div className="feature-stat">
                            <span className="feature-stat__label">Sunrise</span>
                            <span className="feature-stat__value">🌅 {astro.sunrise}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Sunset</span>
                            <span className="feature-stat__value">🌇 {astro.sunset}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Moonrise</span>
                            <span className="feature-stat__value">🌙 {astro.moonrise}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Moonset</span>
                            <span className="feature-stat__value">🌑 {astro.moonset}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Moon Phase</span>
                            <span className="feature-stat__value">{astro.moon_phase}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Moon Illumination</span>
                            <span className="feature-stat__value">{astro.moon_illumination}%</span>
                        </div>
                    </div>
                </section>
            )}

            {/* Weather Alerts */}
            <section className="feature-section fade-in-up stagger-4" id="feature-alerts">
                <h2 className="feature-section__title">
                    <span>🚨</span> Weather Alerts
                </h2>
                {alerts.length > 0 ? (
                    <div className="feature-alerts">
                        {alerts.map((alert, i) => (
                            <div className="feature-alert" key={i}>
                                <h3 className="feature-alert__title">{alert.headline}</h3>
                                <p className="feature-alert__desc">{alert.desc}</p>
                                <div className="feature-alert__meta">
                                    <span>Severity: {alert.severity}</span>
                                    <span>Category: {alert.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="feature-empty">
                        <span>✅</span>
                        <p>No active weather alerts for {city}</p>
                    </div>
                )}
            </section>

            {/* Location Search */}
            <section className="feature-section fade-in-up stagger-5" id="feature-search">
                <h2 className="feature-section__title">
                    <span>🔍</span> Location Search / Autocomplete
                </h2>
                <div className="feature-input-group">
                    <input
                        type="text"
                        className="feature-input"
                        placeholder="Search any city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button className="feature-btn" onClick={handleSearch} disabled={searchLoading}>
                        {searchLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
                {searchResults.length > 0 && (
                    <div className="feature-search-results">
                        {searchResults.map((loc) => (
                            <div className="feature-search-item" key={loc.id}>
                                <span className="feature-search-item__name">📍 {loc.name}</span>
                                <span className="feature-search-item__detail">{loc.region}, {loc.country}</span>
                                <span className="feature-search-item__coords">{loc.lat}, {loc.lon}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Astronomy Lookup */}
            <section className="feature-section fade-in-up" id="feature-astro-lookup">
                <h2 className="feature-section__title">
                    <span>🔭</span> Astronomy Lookup
                </h2>
                <div className="feature-input-group">
                    <input
                        type="text"
                        className="feature-input"
                        placeholder="City name..."
                        value={astroCity}
                        onChange={(e) => setAstroCity(e.target.value)}
                    />
                    <input
                        type="date"
                        className="feature-input"
                        value={astroDate}
                        onChange={(e) => setAstroDate(e.target.value)}
                    />
                    <button className="feature-btn" onClick={handleAstro} disabled={astroLoading}>
                        {astroLoading ? 'Loading...' : 'Get Astronomy'}
                    </button>
                </div>
                {astroData?.astronomy?.astro && (
                    <div className="feature-grid feature-grid--3">
                        <div className="feature-stat">
                            <span className="feature-stat__label">Sunrise</span>
                            <span className="feature-stat__value">🌅 {astroData.astronomy.astro.sunrise}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Sunset</span>
                            <span className="feature-stat__value">🌇 {astroData.astronomy.astro.sunset}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Moon Phase</span>
                            <span className="feature-stat__value">{astroData.astronomy.astro.moon_phase}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Moonrise</span>
                            <span className="feature-stat__value">🌙 {astroData.astronomy.astro.moonrise}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Moonset</span>
                            <span className="feature-stat__value">🌑 {astroData.astronomy.astro.moonset}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Illumination</span>
                            <span className="feature-stat__value">{astroData.astronomy.astro.moon_illumination}%</span>
                        </div>
                    </div>
                )}
            </section>

            {/* Timezone Lookup */}
            <section className="feature-section fade-in-up" id="feature-timezone">
                <h2 className="feature-section__title">
                    <span>🕐</span> Timezone Lookup
                </h2>
                <div className="feature-input-group">
                    <input
                        type="text"
                        className="feature-input"
                        placeholder="City name..."
                        value={tzCity}
                        onChange={(e) => setTzCity(e.target.value)}
                    />
                    <button className="feature-btn" onClick={handleTimezone} disabled={tzLoading}>
                        {tzLoading ? 'Loading...' : 'Get Timezone'}
                    </button>
                </div>
                {tzData?.location && (
                    <div className="feature-grid feature-grid--3">
                        <div className="feature-stat">
                            <span className="feature-stat__label">Timezone</span>
                            <span className="feature-stat__value">{tzData.location.tz_id}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">Local Time</span>
                            <span className="feature-stat__value">{tzData.location.localtime}</span>
                        </div>
                        <div className="feature-stat">
                            <span className="feature-stat__label">UTC Offset (hours)</span>
                            <span className="feature-stat__value">{tzData.location.utc_offset}</span>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
