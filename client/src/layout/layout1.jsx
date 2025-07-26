import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Slide from "../component/Slide";


export default function Layout1() {
    return (
        <div className="min-h-screen flex flex-col mx-auto">
            <Header />
            <div className="h-12 flex justify-center items-center md:hidden bg-emerald-700">
                <Slide />
            </div>
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main content area */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}