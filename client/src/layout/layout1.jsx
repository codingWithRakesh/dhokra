import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ScrollToTop from "../components/ScrollToTop";


export default function Layout1() {
    return (
        <div className="min-h-screen flex flex-col mx-auto">
            <Header />
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-2">
                {/* Main content area */}
                <Outlet />
            </main>
            <ScrollToTop />
            <Footer />
        </div>
    );
}