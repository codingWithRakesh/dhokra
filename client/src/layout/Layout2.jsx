import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import BackHome from "../component/BackHome.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";


export default function Layout2() {
    return (
        <div className="min-h-screen flex flex-col mx-auto">
            <Header />
            <Navbar />
            <BackHome />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main content area */}
                <Outlet />
            </main>
            <ScrollToTop />
            <Footer />
        </div>
    );
}