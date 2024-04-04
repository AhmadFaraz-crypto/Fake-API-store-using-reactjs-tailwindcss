import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../apis/products";
import NotFoundPage from "../../components/404";
import ProductDetail from "../../components/ProductDetail";
import ProductDetailLoader from "../../components/ProductDetailLoader";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getProductData(id);
  }, [id]);

  async function getProductData(id) {
    setLoader(true);
    try {
      const response = await getProduct(id);
      if (response.data) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
    setLoader(false);
  }

  return (
    <>
      {loader ? (
        <ProductDetailLoader />
      ) : product?.id ? (
        <ProductDetail product={product} />
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
