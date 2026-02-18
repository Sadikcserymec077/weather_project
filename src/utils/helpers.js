/**
 * Utility helpers for formatting and display
 */

/**
 * Get a gradient based on weather condition
 */
export function getWeatherGradient(conditionCode, isDay) {
    if (!isDay) return 'var(--gradient-sky-night)';

    // Thunder
    if (conditionCode >= 1087) return 'linear-gradient(180deg, #373B44 0%, #4286f4 100%)';
    // Rain / Drizzle
    if (conditionCode >= 1063 && conditionCode < 1087) return 'var(--gradient-sky-rain)';
    if (conditionCode >= 1150) return 'var(--gradient-sky-rain)';
    // Snow
    if ([1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(conditionCode))
        return 'linear-gradient(180deg, #E6DADA 0%, #274046 100%)';
    // Cloudy
    if ([1003, 1006, 1009].includes(conditionCode)) return 'var(--gradient-sky-cloudy)';
    // Mist/Fog
    if ([1030, 1135, 1147].includes(conditionCode)) return 'linear-gradient(180deg, #757F9A 0%, #D7DDE8 100%)';
    // Clear/Sunny
    return 'var(--gradient-sky-day)';
}

/**
 * Get weather icon class or emoji
 */
export function getWeatherEmoji(conditionCode, isDay) {
    if (!isDay) {
        if (conditionCode === 1000) return '🌙';
        if ([1003].includes(conditionCode)) return '☁️';
        return '🌧️';
    }
    if (conditionCode === 1000) return '☀️';
    if ([1003].includes(conditionCode)) return '⛅';
    if ([1006, 1009].includes(conditionCode)) return '☁️';
    if ([1030, 1135, 1147].includes(conditionCode)) return '🌫️';
    if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(conditionCode)) return '🌧️';
    if ([1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1117].includes(conditionCode)) return '❄️';
    if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) return '⛈️';
    if ([1069, 1072, 1168, 1171, 1198, 1201, 1204, 1207, 1237, 1249, 1252, 1261, 1264].includes(conditionCode)) return '🌨️';
    return '🌤️';
}

/**
 * Format date as readable string
 */
export function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Format short day name
 */
export function formatDayShort(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
}

/**
 * Format time from epoch
 */
export function formatTime(epoch) {
    const d = new Date(epoch * 1000);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Get UV index label
 */
export function getUVLabel(uv) {
    if (uv <= 2) return { label: 'Low', color: '#10b981' };
    if (uv <= 5) return { label: 'Moderate', color: '#f59e0b' };
    if (uv <= 7) return { label: 'High', color: '#f97316' };
    if (uv <= 10) return { label: 'Very High', color: '#ef4444' };
    return { label: 'Extreme', color: '#7c3aed' };
}

/**
 * Get AQI label
 */
export function getAQILabel(index) {
    if (!index) return { label: 'N/A', color: '#64748b' };
    if (index <= 1) return { label: 'Good', color: '#10b981' };
    if (index <= 2) return { label: 'Moderate', color: '#f59e0b' };
    if (index <= 3) return { label: 'Unhealthy (Sensitive)', color: '#f97316' };
    if (index <= 4) return { label: 'Unhealthy', color: '#ef4444' };
    if (index <= 5) return { label: 'Very Unhealthy', color: '#7c3aed' };
    return { label: 'Hazardous', color: '#991b1b' };
}

/**
 * Get wind direction label
 */
export function getWindDirection(degree) {
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round(degree / 22.5) % 16;
    return dirs[idx];
}

/**
 * Get wind compass rotation
 */
export function getWindRotation(degree) {
    return `rotate(${degree}deg)`;
}
