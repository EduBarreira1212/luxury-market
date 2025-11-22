import Header from '../_components/header';

const AboutPage = () => {
    return (
        <div className="flex h-screen flex-col items-center gap-4 bg-gray-100">
            <Header searchBarExists={false} variant="black" />
            <div className="max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-center text-4xl font-bold text-gray-900">
                    About Us
                </h1>
                <p className="text-lg leading-relaxed text-gray-700">
                    Welcome to <span className="font-semibold">Luxury Market</span>,
                    the premier destination for buying and selling the world&apos;s
                    most exclusive cars and motorcycles. Our platform is designed for
                    enthusiasts and collectors who demand excellence, offering a
                    curated selection of high-end vehicles from top brands.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                    At <span className="font-semibold">Luxury Market</span>, we
                    prioritize authenticity, transparency, and a seamless purchasing
                    experience. Whether you&apos;re looking for the latest supercar
                    or a rare classic motorcycle, our marketplace connects you with
                    verified sellers and trusted dealerships worldwide.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                    Explore our collection, discover unparalleled craftsmanship, and
                    drive home your dream ride today.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
