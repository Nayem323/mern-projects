import { Link } from "react-router";

const HeroBanner = () => {
    return (
        <section className="py-8 antialiased bg-gray-900">
            <div className="mx-auto grid max-w-screen-xl px-4 md:grid-cols-12 lg:gap-12 xl:gap-0">
                <div className="content-center justify-self-start md:col-span-7 md:text-start">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:max-w-2xl md:text-5xl xl:text-6xl">
                        Limited Time Offer!
                        <br />
                        Up to 50% OFF!
                    </h1>
                    <p className="mb-3 max-w-2xl text-gray-400 md:mb-12 md:text-lg lg:mb-5 lg:text-xl">
                        {"Don't Wait - Limited Stock at Unbeatable Prices!"}
                    </p>
                    <Link
                        to="/"
                        className="inline-block rounded-lg bg-blue-500 px-6 py-3.5 text-center font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-primary-300"
                    >
                        Shop Now
                    </Link>
                </div>
                <div className="hidden md:col-span-5 md:mt-0 md:flex">
                    <img
                        className=""
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg"
                        alt="shopping illustration"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
