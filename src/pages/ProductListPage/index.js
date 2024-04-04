import React, { useEffect, useState } from "react";
import {
  getProducts,
  getCategories,
  getCategoryProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} from "../../apis/products";
import { formatApiData } from "../../utils/formatApiData";
import ProductsList from "../../components/ProductList";
import CategoriesList from "../../components/CategoriesList";
import Loader from "../../components/Loader";
import AddNewProductModal from "../../components/AddProductModal";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    rating: {rate: 0}
  });
  const [productsList, setProductsList] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsOpenModal] = useState(false);

  useEffect(() => {
    getProductsList();
    getCategoriesList();
  }, []);

  async function getCategoriesList() {
    setIsLoading(true);
    try {
      const response = await getCategories();
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
    setIsLoading(false);
  }

  async function getProductsList() {
    setIsLoading(true);
    try {
      const response = await getProducts();
      if (response.data) {
        setProductsList(response.data);
        setProducts(formatApiData(response.data));
      }
    } catch (error) {
      console.error("Error", error);
    }
    setIsLoading(false);
  }

  async function updateProductData(id, payload) {
    setLoader(true);
    try {
      const response = await updateProduct(id, payload);
      if (response.data) {
        for (let index = 0; index < productsList.length; index++) {
          if (productsList[index].id === id) {
            productsList[index] = payload;
          }
        }
        setProducts(formatApiData(productsList));
      }
    } catch (error) {
      console.error("Error", error);
    }
    setLoader(false);
    setIsOpenModal(false);
  }

  async function addNewProduct(payload) {
    setLoader(true);
    try {
      const response = await addProduct(payload);
      if (response.data) {
        productsList.splice(0, 0, response.data);
        setProducts(formatApiData(productsList));
      }
    } catch (error) {
      console.error("Error", error);
    }
    setLoader(false);
    setIsOpenModal(false);
  }

  async function deleteProductData(id) {
    setLoader(true);
    try {
      await deleteProduct(id);
      const filter = productsList.filter((product) => product.id !== id);
      setProducts(formatApiData(filter));
      setIsOpen(false);
    } catch (error) {
      console.error("Error", error);
    }
    setLoader(false);
  }

  async function getCategoryProductsList(category) {
    setIsLoading(true);
    setSelectedCategory(category);
    try {
      const response = await getCategoryProducts(category);
      if (response.data) {
        setProducts(formatApiData(response.data));
      }
    } catch (error) {
      console.error("Error", error);
    }
    setIsLoading(false);
  }

  function handleSearch(value) {
    const filter = productsList.filter((d) =>
      value ? d.title.toLowerCase().includes(value.toLowerCase()) : true
    );
    setProducts(formatApiData(filter));
  }

  function resetCategory() {
    setSelectedCategory("");
    setProducts(formatApiData(productsList));
  }

  function handleCloseModal() {
    setSelectedProduct({ title: "", description: "", category: "", image: "" });
    setIsOpenModal(false);
  }

  return (
    <main className="p-8">
      <div className="flex flex-wrap items-center md:justify-between sm:justify-center mb-5">
        <CategoriesList
          categories={categories}
          selectedCategory={selectedCategory}
          getCategoryProductsList={getCategoryProductsList}
          resetCategory={resetCategory}
        />
        <div className="flex justify-end w-2/4">
          <input
            className="shadow appearance-none border rounded md:w-1/2 sm:w-full py-2 px-3 mr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by product name"
          />
          <div
            onClick={() => setIsOpenModal(true)}
            className="inline-flex cursor-pointer items-center px-3 py-2 mr-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Add new product
          </div>
        </div>
      </div>
      {loading || !products.length ? (
        <Loader />
      ) : (
        <ProductsList
          products={products}
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          setIsOpenModal={setIsOpenModal}
          setIsOpen={setIsOpen} 
          isOpen={isOpen} 
          deleteItem={deleteProductData} 
          loader={loader}
        />
      )}
      <AddNewProductModal
        isModalOpen={isModalOpen}
        selectedProduct={selectedProduct}
        categories={categories}
        handleCloseModal={handleCloseModal}
        updateProductData={updateProductData}
        addNewProduct={addNewProduct}
        loader={loader}
      />
    </main>
  );
}
