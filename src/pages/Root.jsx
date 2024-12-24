import { Outlet } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Root() {
    return (
        <>
            <Nav />
            <div id="main-content">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
