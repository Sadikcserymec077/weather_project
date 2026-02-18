import { useWeather } from '../context/WeatherContext';
import './WeatherMap.css';

export default function WeatherMap() {
    const { currentWeather, loading } = useWeather();

    if (loading || !currentWeather) return null;

    const { location } = currentWeather;
    const lat = location.lat;
    const lon = location.lon;

    // Using OpenStreetMap embed with weather tile
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 2}%2C${lat - 2}%2C${lon + 2}%2C${lat + 2}&layer=mapnik&marker=${lat}%2C${lon}`;

    return (
        <section className="weather-map fade-in-up stagger-5" id="map-section">
            <h2 className="section-title">
                <span className="section-title__icon">🗺️</span>
                Location Map
            </h2>
            <div className="weather-map__container">
                <iframe
                    className="weather-map__iframe"
                    src={mapUrl}
                    title="Weather Location Map"
                    loading="lazy"
                />
                <div className="weather-map__overlay">
                    <div className="weather-map__coords">
                        <span>📍 {lat.toFixed(4)}°N, {lon.toFixed(4)}°E</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
