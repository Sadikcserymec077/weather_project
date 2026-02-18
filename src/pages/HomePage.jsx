import { useWeather } from '../context/WeatherContext';
import CurrentWeather from '../components/CurrentWeather';
import ForecastCards from '../components/ForecastCards';
import HourlyForecast from '../components/HourlyForecast';
import WeatherDetails from '../components/WeatherDetails';
import WeatherMap from '../components/WeatherMap';
import LoadingSkeleton from '../components/LoadingSkeleton';
import './HomePage.css';

export default function HomePage() {
    const { loading, error } = useWeather();

    if (error) {
        return (
            <div className="home-page">
                <div className="home-page__error" id="home-error">
                    <span className="home-page__error-icon">⚠️</span>
                    <h2>Oops! Something went wrong</h2>
                    <p>{error}</p>
                    <p className="home-page__error-hint">Try searching for a different city</p>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page" id="home-page">
            {loading ? (
                <LoadingSkeleton />
            ) : (
                <>
                    <CurrentWeather />
                    <HourlyForecast />
                    <ForecastCards />
                    <WeatherDetails />
                    <WeatherMap />
                </>
            )}
        </div>
    );
}
