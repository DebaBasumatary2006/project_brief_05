import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../services/apiClient";
import { getCategories } from "../services/categoryService";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadCategories = async () => {
      try {
        const data = await getCategories({ signal: controller.signal });
        if (!controller.signal.aborted) {
          setCategories(data);
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(
            getApiErrorMessage(
              requestError,
              "Unable to load categories. Please try again.",
            ),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadCategories();
    return () => controller.abort();
  }, [reloadKey]);

  const refresh = () => {
    setIsLoading(true);
    setError("");
    setReloadKey((key) => key + 1);
  };

  return { categories, setCategories, isLoading, error, refresh };
}

export default useCategories;
