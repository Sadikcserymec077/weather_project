// WeatherAPI.com — Free tier API
// Docs: https://www.weatherapi.com/docs/

const API_KEY = 'd75e4cca0d934b10b1854117261802';
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Fetch current weather for a location
 * @param {string} query - City name, zip, IP, or lat/lon
 */
export async function fetchCurrentWeather(query) {
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(query)}&aqi=yes`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to fetch current weather');
  }
  return res.json();
}

/**
 * Fetch weather forecast (up to 3 days on free tier)
 * @param {string} query - City name, zip, IP, or lat/lon
 * @param {number} days - Number of days (1-3)
 */
export async function fetchForecast(query, days = 3) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=${days}&aqi=yes&alerts=yes`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to fetch forecast');
  }
  return res.json();
}

/**
 * Fetch weather history for a specific date
 * @param {string} query - City name
 * @param {string} date - Date in yyyy-MM-dd format
 */
export async function fetchHistory(query, date) {
  const url = `${BASE_URL}/history.json?key=${API_KEY}&q=${encodeURIComponent(query)}&dt=${date}`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to fetch weather history');
  }
  return res.json();
}

/**
 * Search/autocomplete locations
 * @param {string} query - Partial city name
 */
export async function searchLocations(query) {
  const url = `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to search locations');
  }
  return res.json();
}

/**
 * Fetch astronomy data (sunrise, sunset, moonrise, moonset)
 * @param {string} query - City name
 * @param {string} date - Optional date in yyyy-MM-dd format
 */
export async function fetchAstronomy(query, date) {
  const dt = date || new Date().toISOString().split('T')[0];
  const url = `${BASE_URL}/astronomy.json?key=${API_KEY}&q=${encodeURIComponent(query)}&dt=${dt}`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to fetch astronomy data');
  }
  return res.json();
}

/**
 * Fetch timezone info for a location
 * @param {string} query - City name
 */
export async function fetchTimezone(query) {
  const url = `${BASE_URL}/timezone.json?key=${API_KEY}&q=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to fetch timezone');
  }
  return res.json();
}

/**
 * Fetch marine/tide data
 * @param {string} query - Location near coast
 */
export async function fetchMarine(query) {
  const url = `${BASE_URL}/marine.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=1`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to fetch marine data');
  }
  return res.json();
}

/**
 * Fetch future weather (14-300 days ahead, paid tier)
 * @param {string} query - City name
 * @param {string} date - Date in yyyy-MM-dd format
 */
export async function fetchFuture(query, date) {
  const url = `${BASE_URL}/future.json?key=${API_KEY}&q=${encodeURIComponent(query)}&dt=${date}`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to fetch future weather');
  }
  return res.json();
}
