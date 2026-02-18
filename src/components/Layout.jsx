import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout() {
    const location = useLocation();

    return (
        <>
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
