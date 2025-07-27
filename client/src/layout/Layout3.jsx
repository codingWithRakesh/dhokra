import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Navbar2 from "../component/Navbar2.jsx";


export default function Layout3() {
    return (
        <div className="min-h-screen flex flex-col mx-auto">
            <Header />
            <Navbar2 />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main content area */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}