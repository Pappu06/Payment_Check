import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center items-center mt-20">

        <ProductCard />

      </div>

    </div>
  );
}

export default Home;