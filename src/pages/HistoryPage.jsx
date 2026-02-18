import WeatherHistory from '../components/WeatherHistory';
import './HistoryPage.css';

export default function HistoryPage() {
    return (
        <div className="history-page" id="history-page">
            <WeatherHistory />
        </div>
    );
}
