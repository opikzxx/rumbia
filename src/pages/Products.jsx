import { useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import ProductCard from "../components/elements/ProductCard";
import { useState } from "react";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  return (
    <div className="container mx-auto p-6 mt-10">
      <div className="flex justify-between">
        <Button variant="primary" onClick={() => navigate("/add")} size="small">
          Add Product
        </Button>
      </div>

      <div className="flex flex-col items-center border-slate-200 border-2 rounded-3xl mt-4 p-6 h-m-screen">
        {products.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No products available. Add a new product.</p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                {...product}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
