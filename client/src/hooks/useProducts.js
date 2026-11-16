import { useEffect, useState } from "react";
import {
  getProductServiceErrorMessage,
  getProducts,
} from "../services/productService";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const data = await getProducts({ signal: controller.signal });
        if (!controller.signal.aborted) {
          setProducts(data);
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(
            getProductServiceErrorMessage(
              requestError,
              "Unable to load products. Please try again.",
            ),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();
    return () => controller.abort();
  }, [reloadKey]);

  const refresh = () => {
    setIsLoading(true);
    setError("");
    setReloadKey((key) => key + 1);
  };

  return { products, setProducts, isLoading, error, refresh };
}

export default useProducts;
