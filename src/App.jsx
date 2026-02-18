import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import FeaturesPage from './pages/FeaturesPage';
import './index.css';

function App() {
  return (
    <WeatherProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="features" element={<FeaturesPage />} />

            {/* 404 Route */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--color-text-secondary)' }}>
                <h2>Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <Link to="/" style={{ color: 'var(--color-accent-primary)', marginTop: 'var(--space-4)', display: 'inline-block' }}>Back to Home</Link>
              </div>
            } />
          </Route>
        </Routes>
      </Router>
    </WeatherProvider>
  );
}

export default App;
