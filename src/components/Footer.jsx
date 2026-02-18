import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <p className="footer__text">
                    Designed & Built with <span className="footer__heart">❤️</span> using React & WeatherAPI
                </p>
                <div className="footer__links">
                    <Link to="/" className="footer__link">Home</Link>
                    <Link to="/history" className="footer__link">History</Link>
                    <Link to="/features" className="footer__link">All Features</Link>
                </div>
                <p className="footer__copyright">
                    © {new Date().getFullYear()} WeatherApp. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
