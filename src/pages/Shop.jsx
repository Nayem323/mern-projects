import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../features/api/apiSlice";

export default function Shop() {
    const { data: products } = useGetProductsQuery();
    return (
        <>
            <HeroBanner />
            <section className="bg-white flex my-8 flex-wrap justify-center">
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </section>
        </>
    );
}
