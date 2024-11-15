import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import ProductCard from "../components/elements/ProductCard";
import { useEffect, useState } from "react";

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    if (location.state?.newProduct) {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, location.state.newProduct];
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return updatedProducts;
      });
    }

    if (location.state?.updatedProduct) {
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((product) =>
          product.id === location.state.updatedProduct.id
            ? location.state.updatedProduct
            : product
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return updatedProducts;
      });
    }
  }, [location.state]); // Only depend on location.state

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
