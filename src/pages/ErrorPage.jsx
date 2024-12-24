import { useRouteError } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <div id="error-page">
            <Nav />
            <section className="bg-white dark:bg-gray-700">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500 dark:text-white">
                            Ops!
                        </h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                            Sorry, an unexpected error has occurred.
                        </p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                            <i>{error.statusText || error.message}</i>
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
