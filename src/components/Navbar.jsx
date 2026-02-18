import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useWeather } from '../context/WeatherContext';
import { searchLocations } from '../utils/api';
import './Navbar.css';

export default function Navbar() {
    const { city, loadWeather, unit, toggleUnit, recentCities } = useWeather();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showRecent, setShowRecent] = useState(false);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const debounceRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
                setShowSuggestions(false);
                setShowRecent(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        const val = e.target.value;
        setQuery(val);
        setShowRecent(false);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (val.trim().length >= 2) {
            debounceRef.current = setTimeout(async () => {
                try {
                    const results = await searchLocations(val);
                    setSuggestions(results);
                    setShowSuggestions(true);
                } catch {
                    setSuggestions([]);
                }
            }, 300);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelect = (location) => {
        const q = location.name || location;
        setQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
        setShowRecent(false);
        loadWeather(q);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            loadWeather(query.trim());
            setQuery('');
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleFocus = () => {
        if (query.length < 2 && recentCities.length > 0) {
            setShowRecent(true);
        }
    };

    return (
        <nav className="navbar" id="navbar">
            <div className="navbar__inner">
                <Link to="/" className="navbar__brand" id="brand-logo">
                    <span className="navbar__icon">🌤️</span>
                    <h1 className="navbar__title">WeatherApp</h1>
                </Link>

                <form className="navbar__search" onSubmit={handleSubmit} id="search-form">
                    <div className="navbar__search-wrapper">
                        <svg className="navbar__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            className="navbar__input"
                            id="city-search-input"
                            placeholder="Search city, zip code, or coordinates..."
                            value={query}
                            onChange={handleSearch}
                            onFocus={handleFocus}
                            autoComplete="off"
                        />
                        {query && (
                            <button type="button" className="navbar__clear" onClick={() => { setQuery(''); setSuggestions([]); setShowSuggestions(false); }}>
                                ✕
                            </button>
                        )}
                    </div>

                    {(showSuggestions && suggestions.length > 0) && (
                        <ul className="navbar__suggestions" ref={suggestionsRef} id="search-suggestions">
                            {suggestions.map((loc) => (
                                <li key={loc.id} className="navbar__suggestion-item" onClick={() => handleSelect(loc)}>
                                    <span className="navbar__suggestion-icon">📍</span>
                                    <div>
                                        <span className="navbar__suggestion-name">{loc.name}</span>
                                        <span className="navbar__suggestion-region">{loc.region}, {loc.country}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {showRecent && recentCities.length > 0 && !showSuggestions && (
                        <ul className="navbar__suggestions" ref={suggestionsRef}>
                            <li className="navbar__suggestion-header">Recent Searches</li>
                            {recentCities.map((c, i) => (
                                <li key={i} className="navbar__suggestion-item" onClick={() => handleSelect(c)}>
                                    <span className="navbar__suggestion-icon">🕐</span>
                                    <span className="navbar__suggestion-name">{c}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </form>

                <div className="navbar__actions">
                    <button className="navbar__unit-toggle" id="unit-toggle" onClick={toggleUnit} title="Toggle temperature unit">
                        °{unit === 'C' ? 'C' : 'F'}
                    </button>
                    <div className="navbar__current-city" id="current-city-badge">
                        <span className="navbar__city-dot"></span>
                        {city}
                    </div>
                </div>
            </div>
        </nav>
    );
}
